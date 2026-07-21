import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 19: Migrate service records → page records + "service" tag.
 *
 * Creates a "service" tag (category=service), then for each service record:
 *   title (l)             → title (l)
 *   subtitle (l)          → subtitle (l)
 *   slug (l)              → slug (EN value)
 *   social (seo,l)        → seo (l)
 *   header_illustration   → preview_image
 *   items (rich_text, l)  → body_blocks (EN copy — service.items was localized)
 *   tags                  → [service_tag_id]
 *
 * Idempotent: skips pages whose slug already exists.
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const PAGE_MODEL_ID = allTypes.find((t) => t.api_key === "page")!.id;
  const TAG_MODEL_ID = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // Ensure "service" tag exists
  const existingTags = await client.items.list({ filter: { type: "tag" } });
  let serviceTagId: string | null = null;
  for (const t of existingTags) {
    const cat = (t as Record<string, unknown>).category;
    const slug = (t as Record<string, unknown>).slug;
    if (
      cat === "service" &&
      typeof slug === "object" && slug !== null &&
      (slug as { en?: string }).en === "service"
    ) {
      serviceTagId = t.id;
      break;
    }
  }
  if (!serviceTagId) {
    const serviceTag = await client.items.create({
      item_type: { type: "item_type", id: TAG_MODEL_ID },
      title: { en: "Service", nl: "Service" },
      slug: { en: "service", nl: "service" },
      category: "service",
      description: { en: "Service", nl: "Service" },
      seo: {
        en: { title: "Service", description: "Service" },
        nl: { title: "Service", description: "Service" },
      },
    } as Record<string, unknown>);
    serviceTagId = serviceTag.id;
    console.log(`Created "service" tag: ${serviceTagId}`);
  } else {
    console.log(`"service" tag already exists: ${serviceTagId}`);
  }

  // Get existing page slugs
  const existingPages = await client.items.list({ filter: { type: "page" } });
  const existingSlugs = new Set(
    existingPages.map((p) => (p as Record<string, unknown>).slug as string).filter(Boolean),
  );

  const services = await client.items.list({ filter: { type: "service" } });
  console.log(`service: ${services.length} records to migrate`);
  let created = 0, skipped = 0;

  for (const svc of services) {
    const r = svc as Record<string, unknown>;

    const slugField = r.slug as Record<string, string> | string | undefined;
    const slug = typeof slugField === "object" && slugField !== null
      ? (slugField.en ?? Object.values(slugField)[0])
      : (slugField as string | undefined);

    if (!slug) { console.warn(`  SKIP: service ${svc.id} has no slug`); skipped++; continue; }
    if (existingSlugs.has(slug)) {
      console.log(`  SKIP: page "${slug}" already exists`);
      skipped++;
      continue;
    }

    // service.items is localized rich_text — use EN value
    const itemsField = r.items;
    const bodyBlocks = typeof itemsField === "object" && itemsField !== null && "en" in (itemsField as object)
      ? (itemsField as { en: unknown }).en
      : itemsField;

    try {
      const titleEn = typeof r.title === "object" && r.title !== null
        ? ((r.title as { en?: string }).en ?? slug)
        : slug;
      const titleNl = typeof r.title === "object" && r.title !== null
        ? ((r.title as { nl?: string }).nl ?? titleEn)
        : titleEn;
      const rawSeo = r.social as Record<string, { title?: string; description?: string }> | null | undefined;
      const seoVal = {
        en: { title: rawSeo?.en?.title ?? titleEn, description: rawSeo?.en?.description ?? titleEn },
        nl: { title: rawSeo?.nl?.title ?? titleNl, description: rawSeo?.nl?.description ?? titleNl },
      };
      // NOTE: service.items is localized rich_text; block IDs can't be moved.
      // Create page with metadata only.
      await client.items.create({
        item_type: { type: "item_type", id: PAGE_MODEL_ID },
        title: r.title,
        subtitle: r.subtitle,
        slug,
        seo: seoVal,
        preview_image: r.header_illustration,
        tags: [serviceTagId],
      } as Record<string, unknown>);
      existingSlugs.add(slug);
      created++;
      console.log(`  Created page: "${slug}"`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  ERROR: service ${svc.id} "${slug}": ${msg.slice(0, 200)}`);
      skipped++;
    }
  }

  console.log(`\n✅ service → page: ${created} created, ${skipped} skipped/failed`);
}
