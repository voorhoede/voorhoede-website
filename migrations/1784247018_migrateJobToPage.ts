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
      description: { en: "", nl: "" },
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
      await client.items.create({
        item_type: { type: "item_type", id: PAGE_MODEL_ID },
        title: r.title,
        subtitle: r.subtitle,
        slug,
        seo: r.social,
        preview_image: r.job_image,
        body_blocks: r.job_content,
        tags: [jobTagId],
      } as Record<string, unknown>);
      existingSlugs.add(slug);
      created++;
      console.log(`  Created page: "${slug}"`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  ERROR: job ${job.id} "${slug}": ${msg.slice(0, 200)}`);
      skipped++;
    }
  }

  console.log(`\n✅ job → page: ${created} created, ${skipped} skipped/failed`);
}
