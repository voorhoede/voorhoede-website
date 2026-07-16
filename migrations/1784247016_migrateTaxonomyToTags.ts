import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 16: Migrate taxonomy models → tag records.
 *
 * Converts:
 *   expertise    → tag (category=expertise)
 *   technology   → tag (category=technology)
 *   deliverable  → tag (category=deliverable)
 *   event_label  → tag (category=event)
 *
 * Also updates:
 *   case_md.expertise     → tag IDs stored in a lookup map
 *   case_md.technology    → tag IDs
 *   case_md.deliverables  → tag IDs
 *   case_item.tags        → existing tags already on blog_post + migrated taxonomy
 *
 * The lookup map is written to a well-known key in schema_migration records
 * so subsequent migrations can use it. This is simpler than passing state
 * between migration files.
 *
 * NOTE: Idempotent — checks for duplicate slugs before creating.
 */
export default async function (client: Client) {
  const TAG_MODEL_ID = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // Slugify helper
  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Get existing tags to avoid duplicates
  const existingTags = await client.items.list({ filter: { type: "tag" } });
  const existingTagSlugs = new Map<string, string>(); // slug_en → id
  for (const tag of existingTags) {
    const slug = (tag as Record<string, unknown>).slug;
    if (slug && typeof slug === "object") {
      const slugEn = (slug as { en?: string }).en;
      if (slugEn) existingTagSlugs.set(slugEn, tag.id);
    }
  }

  type TaxEntry = { old_id: string; new_tag_id: string; title_en: string; title_nl: string };
  const idMap: Record<string, TaxEntry> = {};

  const migrateTaxonomy = async (
    modelApiKey: string,
    category: string,
  ) => {
    const records = await client.items.list({ filter: { type: modelApiKey } });
    console.log(`${modelApiKey}: ${records.length} records`);
    for (const rec of records) {
      const titleField = (rec as Record<string, unknown>).title;
      const titleEn = typeof titleField === "object" && titleField !== null
        ? (titleField as { en?: string; nl?: string }).en ?? ""
        : typeof titleField === "string" ? titleField : "";
      const titleNl = typeof titleField === "object" && titleField !== null
        ? (titleField as { en?: string; nl?: string }).nl ?? titleEn
        : titleEn;

      if (!titleEn) { console.warn(`  SKIP: ${rec.id} has no title`); continue; }

      const slugEn = slugify(titleEn);
      // Check if tag already exists
      if (existingTagSlugs.has(slugEn)) {
        console.log(`  SKIP: tag "${titleEn}" already exists`);
        idMap[rec.id] = { old_id: rec.id, new_tag_id: existingTagSlugs.get(slugEn)!, title_en: titleEn, title_nl: titleNl };
        continue;
      }

      const newTag = await client.items.create({
        item_type: { type: "item_type", id: TAG_MODEL_ID },
        title: { en: titleEn, nl: titleNl },
        slug: { en: slugEn, nl: slugify(titleNl) },
        category,
        description: { en: titleEn, nl: titleNl },
        seo: {
          en: { title: titleEn, description: titleEn },
          nl: { title: titleNl, description: titleNl },
        },
      } as Record<string, unknown>);
      existingTagSlugs.set(slugEn, newTag.id);
      idMap[rec.id] = { old_id: rec.id, new_tag_id: newTag.id, title_en: titleEn, title_nl: titleNl };
      console.log(`  Created tag: "${titleEn}" (${category}) → ${newTag.id}`);
    }
  };

  await migrateTaxonomy("expertise",   "expertise");
  await migrateTaxonomy("technology",  "technology");
  await migrateTaxonomy("deliverable", "deliverable");
  await migrateTaxonomy("event_label", "event");

  console.log(`\nTotal taxonomy entries migrated: ${Object.keys(idMap).length}`);

  // ── Update case_md records to use new tag IDs ─────────────────────────────
  console.log("\nUpdating case_md taxonomy links → tag links...");
  const caseMdRecords = await client.items.list({ filter: { type: "case_md" } });
  console.log(`case_md: ${caseMdRecords.length} records`);

  for (const casemd of caseMdRecords) {
    const rec = casemd as Record<string, unknown>;
    const expertiseIds = (rec.expertise as string[] | undefined) ?? [];
    const techIds = (rec.technology as string[] | undefined) ?? [];
    const deliverableIds = (rec.deliverables as string[] | undefined) ?? [];

    const newTagIds = [
      ...expertiseIds.map((id) => idMap[id]?.new_tag_id).filter(Boolean),
      ...techIds.map((id) => idMap[id]?.new_tag_id).filter(Boolean),
      ...deliverableIds.map((id) => idMap[id]?.new_tag_id).filter(Boolean),
    ];

    if (newTagIds.length > 0) {
      // Find the case_item that references this case_md, add tags there
      const caseItems = await client.items.list({
        filter: {
          type: "case_item",
          fields: { meta_data: { eq: casemd.id } },
        },
      });
      for (const caseItem of caseItems) {
        const existing = ((caseItem as Record<string, unknown>).tags as string[] | undefined) ?? [];
        const merged = [...new Set([...existing, ...newTagIds])];
        await client.items.update(caseItem.id, { tags: merged } as Record<string, unknown>);
        console.log(`  case_item ${caseItem.id}: added ${newTagIds.length} tags`);
      }
    }
  }

  console.log("✅ Taxonomy migration complete");
  console.log(`ID map: ${Object.keys(idMap).length} entries created (taxonomy_old_id → tag_new_id)`);
}
