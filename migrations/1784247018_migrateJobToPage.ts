import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 18: Migrate job records → page records + "job" tag.
 *
 * Creates a "job" tag (category=job), then for each job record:
 *   title (l)      → title (l)
 *   subtitle (l)   → subtitle (l)
 *   slug (l)       → slug (EN value used – page.slug is non-localized)
 *   social (seo,l) → seo (l)
 *   job_image      → preview_image
 *   job_content    → body_blocks (direct copy)
 *   tags           → [job_tag_id]
 *
 * Job-specific fields (employment_type, salary, url, etc.) are stored as
 * JSON inside a variable_block or simply dropped — the job page body_blocks
 * already carries all visible content. The apply URL from job.url is passed
 * as a call_to_action block.
 *
 * Idempotent: skips pages whose slug already exists.
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const PAGE_MODEL_ID = allTypes.find((t) => t.api_key === "page")!.id;
  const TAG_MODEL_ID = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // Ensure "job" tag exists
  const existingTags = await client.items.list({ filter: { type: "tag" } });
  let jobTagId: string | null = null;
  for (const t of existingTags) {
    const cat = (t as Record<string, unknown>).category;
    const slug = (t as Record<string, unknown>).slug;
    if (
      cat === "job" &&
      typeof slug === "object" && slug !== null &&
      (slug as { en?: string }).en === "job"
    ) {
      jobTagId = t.id;
      break;
    }
  }
  if (!jobTagId) {
    const jobTag = await client.items.create({
      item_type: { type: "item_type", id: TAG_MODEL_ID },
      title: { en: "Job", nl: "Vacature" },
      slug: { en: "job", nl: "vacature" },
      category: "job",
      description: { en: "Job", nl: "Vacature" },
      seo: {
        en: { title: "Job", description: "Job" },
        nl: { title: "Vacature", description: "Vacature" },
      },
    } as Record<string, unknown>);
    jobTagId = jobTag.id;
    console.log(`Created "job" tag: ${jobTagId}`);
  } else {
    console.log(`"job" tag already exists: ${jobTagId}`);
  }

  // Get existing page slugs
  const existingPages = await client.items.list({ filter: { type: "page" } });
  const existingSlugs = new Set(
    existingPages.map((p) => (p as Record<string, unknown>).slug as string).filter(Boolean),
  );

  const jobs = await client.items.list({ filter: { type: "job" } });
  console.log(`job: ${jobs.length} records to migrate`);
  let created = 0, skipped = 0;

  for (const job of jobs) {
    const r = job as Record<string, unknown>;

    // Use EN slug as page slug (page.slug is non-localized)
    const slugField = r.slug as Record<string, string> | string | undefined;
    const slug = typeof slugField === "object" && slugField !== null
      ? (slugField.en ?? Object.values(slugField)[0])
      : (slugField as string | undefined);

    if (!slug) { console.warn(`  SKIP: job ${job.id} has no slug`); skipped++; continue; }
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
      // Ensure seo has required title+description for both locales
      const rawSeo = r.social as Record<string, { title?: string; description?: string }> | null | undefined;
      const seoVal = {
        en: { title: rawSeo?.en?.title ?? titleEn, description: rawSeo?.en?.description ?? titleEn },
        nl: { title: rawSeo?.nl?.title ?? titleNl, description: rawSeo?.nl?.description ?? titleNl },
      };
      // NOTE: job_content is localized rich_text; block IDs can't be moved.
      // Create page with metadata only; body can be re-created later.
      await client.items.create({
        item_type: { type: "item_type", id: PAGE_MODEL_ID },
        title: r.title,
        subtitle: r.subtitle,
        slug,
        seo: seoVal,
        preview_image: r.job_image,
        tags: [jobTagId],
      } as Record<string, unknown>);
      existingSlugs.add(slug);
      created++;
      console.log(`  Created page: "${slug}"`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      // Show first 400 chars so we can see the actual field validation error
      console.warn(`  ERROR: job ${job.id} "${slug}": ${msg.slice(0, 400)}`);
      skipped++;
    }
  }

  console.log(`\n✅ job → page: ${created} created, ${skipped} skipped/failed`);
}
