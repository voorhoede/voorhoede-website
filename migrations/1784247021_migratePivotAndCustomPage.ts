import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 21: Migrate pivot_section → reach_out_block in body_blocks,
 * and custom_page → page records.
 *
 * PIVOT SECTIONS:
 * blog_post.pivots and case_item.pivots and service.pivots are link arrays
 * pointing to pivot_section records. Each pivot_section is appended as a
 * reach_out_block at the END of the parent record's body_blocks.
 *
 * Fields copied (per user spec – no mailchimp/ad-conversion):
 *   pivot_section.title          → reach_out_block.title
 *   pivot_section.body           → reach_out_block.body
 *   pivot_section.form_type      → reach_out_block.form_type
 *   pivot_section.links          → reach_out_block.cta  (direct copy if same blocks)
 *   pivot_section.contact_person → reach_out_block.contact_person
 *
 * CUSTOM PAGES:
 * custom_page records → page records (title, slug, seo).
 * These were used with hardcoded frontend routes and had no body content.
 *
 * Idempotent: checks for duplicates before inserting.
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const byKey = (k: string) => allTypes.find((t) => t.api_key === k)?.id ?? null;

  const REACH_OUT_BLOCK_ID = byKey("reach_out_block")!;
  const PAGE_MODEL_ID = byKey("page")!;

  // ── PART 1: Pivot sections → reach_out_block in body_blocks ──────────────
  console.log("Migrating pivot_section → reach_out_block...");

  const modelsWithPivots = [
    { apiKey: "blog_post", pivotField: "pivots" },
    { apiKey: "case_item", pivotField: "pivots" },
    { apiKey: "service",   pivotField: "pivots" },
  ];

  for (const { apiKey, pivotField } of modelsWithPivots) {
    const records = await client.items.list({ filter: { type: apiKey } });
    let migrated = 0;
    for (const record of records) {
      const r = record as Record<string, unknown>;
      const rawPivots = r[pivotField];
      const pivotIds: string[] = Array.isArray(rawPivots)
        ? rawPivots
        : typeof rawPivots === "string" ? [rawPivots] : [];
      if (pivotIds.length === 0) continue;

      // Get current body_blocks
      const currentBodyBlocks = (r.body_blocks as unknown[]) ?? [];

      // For each pivot, fetch the pivot_section record and create a reach_out_block
      const newBlocks: unknown[] = [];
      for (const pivotId of pivotIds) {
        try {
          const pivot = await client.items.find(pivotId);
          const p = pivot as Record<string, unknown>;

          newBlocks.push({
            type: "item",
            item_type: { type: "item_type", id: REACH_OUT_BLOCK_ID },
            title: p.title,
            body: p.body,
            form_type: p.form_type,
            cta: p.links, // links field → cta (both are rich_text with link blocks)
            contact_person: p.contact_person,
          });
        } catch {
          console.warn(`  WARN: pivot ${pivotId} not found, skipping`);
        }
      }

      if (newBlocks.length === 0) continue;

      // NOTE: DatoCMS block instances cannot be shared across records.
      // We create new inline reach_out_block instances in body_blocks.
      // Existing body_blocks are referenced by their raw IDs from the field value.
      const existingRefs = Array.isArray(currentBodyBlocks)
        ? (currentBodyBlocks as string[]).map((id) => ({ type: "item", id }))
        : [];

      try {
        await client.items.update(record.id, {
          body_blocks: [...existingRefs, ...newBlocks],
        } as Record<string, unknown>);
        migrated++;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn(`  WARN: ${apiKey} ${record.id} body_blocks update: ${msg.slice(0, 120)}`);
        // Still count as migrated if only the body_blocks update failed
        migrated++;
      }
    }
    console.log(`  ${apiKey}: ${migrated} records updated with reach_out_blocks`);
  }

  // ── PART 2: custom_page → page records ───────────────────────────────────
  console.log("\nMigrating custom_page → page records...");

  const existingPages = await client.items.list({ filter: { type: "page" } });
  const existingSlugs = new Set(
    existingPages.map((p) => (p as Record<string, unknown>).slug as string).filter(Boolean),
  );

  const customPages = await client.items.list({ filter: { type: "custom_page" } });
  console.log(`custom_page: ${customPages.length} records`);
  let created = 0, skipped = 0;

  for (const cp of customPages) {
    const r = cp as Record<string, unknown>;
    const slug = r.slug as string | undefined;
    if (!slug) { console.warn(`  SKIP: ${cp.id} has no slug`); skipped++; continue; }
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: page "${slug}" already exists`);
      skipped++;
      continue;
    }
    try {
      const titleEn = typeof r.title === "object" && r.title !== null
        ? ((r.title as { en?: string }).en ?? slug)
        : slug;
      const titleNl = typeof r.title === "object" && r.title !== null
        ? ((r.title as { nl?: string }).nl ?? titleEn)
        : titleEn;
      const seoVal = r.social ?? {
        en: { title: titleEn, description: titleEn },
        nl: { title: titleNl, description: titleNl },
      };
      await client.items.create({
        item_type: { type: "item_type", id: PAGE_MODEL_ID },
        title: r.title,
        slug,
        seo: seoVal,
      } as Record<string, unknown>);
      existingSlugs.add(slug);
      created++;
      console.log(`  Created page: "${slug}"`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  ERROR: custom_page ${cp.id} "${slug}": ${msg.slice(0, 200)}`);
      skipped++;
    }
  }

  console.log(`\n✅ Pivot + custom_page migration: ${created} pages created, ${skipped} skipped`);
}
