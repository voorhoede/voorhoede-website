import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 17: Migrate event_item records → new event model records.
 *
 * event_item fields → event fields:
 *   title (l)             → title (l)
 *   slug (non-l)          → slug
 *   social (seo, l)       → seo (l)
 *   header_illustration   → header_illustration
 *   date                  → date
 *   image                 → image
 *   label (link→event_label) → tags (via event_label→tag map from mig 16)
 *   event_is_online       → event_is_online
 *   online_event_url      → online_event_url
 *   location (link→location) → location
 *   price                 → price
 *   url                   → url
 *   call_to_action_label  → call_to_action_label
 *   items (rich_text)     → body_blocks (direct copy)
 *
 * Idempotent: skips events whose slug already exists.
 */
export default async function (client: Client) {
  const EVENT_MODEL_ID = (await client.itemTypes.list())
    .find((t) => t.api_key === "event")!.id;
  const TAG_MODEL_ID = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // Build event_label → tag lookup
  const tagRecords = await client.items.list({ filter: { type: "tag" } });
  // We need the original event_label IDs. Since the title was used to generate
  // the tag slug, we'll match by category=event.
  const eventLabelRecords = await client.items.list({ filter: { type: "event_label" } });
  const labelToTagId = new Map<string, string>();

  for (const label of eventLabelRecords) {
    const titleField = (label as Record<string, unknown>).title;
    const titleEn = typeof titleField === "object" && titleField !== null
      ? (titleField as { en?: string }).en ?? String(titleField)
      : String(titleField ?? "");
    const slugEn = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const matchTag = tagRecords.find((t) => {
      const s = (t as Record<string, unknown>).slug;
      return typeof s === "object" && s !== null && (s as { en?: string }).en === slugEn;
    });
    if (matchTag) labelToTagId.set(label.id, matchTag.id);
  }
  console.log(`event_label → tag map: ${labelToTagId.size} entries`);

  // Get existing event slugs to avoid duplicates
  const existingEvents = await client.items.list({ filter: { type: "event" } });
  const existingEventSlugs = new Set(
    existingEvents.map((e) => (e as Record<string, unknown>).slug as string).filter(Boolean),
  );

  // Migrate event_item records
  const eventItems = await client.items.list({ filter: { type: "event_item" } });
  console.log(`event_item: ${eventItems.length} records to migrate`);

  let created = 0;
  let skipped = 0;

  for (const item of eventItems) {
    const r = item as Record<string, unknown>;
    const slug = r.slug as string | undefined;
    if (!slug) { console.warn(`  SKIP: ${item.id} has no slug`); skipped++; continue; }
    if (existingEventSlugs.has(slug)) {
      console.log(`  SKIP: event "${slug}" already exists`);
      skipped++;
      continue;
    }

    // Build tag list from label
    const labelId = r.label as string | undefined;
    const tagIds = labelId && labelToTagId.has(labelId) ? [labelToTagId.get(labelId)!] : [];

    // Build title - title is localized
    const title = r.title as Record<string, string> | string | undefined;

    // price fallback
    const price = (r.price as string | undefined) ?? "Free";
    // url is required
    const url = (r.url as string | undefined) ?? "";

    if (!url) {
      console.warn(`  SKIP: ${item.id} "${slug}" has no url`);
      skipped++;
      continue;
    }

    try {
      await client.items.create({
        item_type: { type: "item_type", id: EVENT_MODEL_ID },
        title,
        slug,
        header_illustration: r.header_illustration,
        date: r.date,
        image: r.image,
        event_is_online: r.event_is_online ?? false,
        online_event_url: r.online_event_url,
        location: r.location,
        price,
        url,
        call_to_action_label: r.call_to_action_label,
        tags: tagIds,
        body_blocks: r.items, // direct copy (renamed blocks work)
      } as Record<string, unknown>);
      existingEventSlugs.add(slug);
      created++;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  ERROR: ${item.id} "${slug}": ${msg.slice(0, 200)}`);
      skipped++;
    }
  }

  console.log(`\n✅ event_item → event: ${created} created, ${skipped} skipped/failed`);
  console.log("NOTE: event_item records will be deleted in migration 22.");
}
