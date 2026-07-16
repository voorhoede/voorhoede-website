import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 20: Migrate meet records → person.meet_url field.
 *
 * The meet model has a field linking to a person and a URL.
 * We find each meet record, read the person link and url, then
 * update person.meet_url.
 *
 * Idempotent: skips persons that already have meet_url set.
 */
export default async function (client: Client) {
  // First, discover the actual field names in meet
  const allTypes = await client.itemTypes.list();
  const meetType = allTypes.find((t) => t.api_key === "meet");
  if (!meetType) {
    console.log("meet model not found — skipping");
    return;
  }

  const meetFields = await client.fields.list(meetType.id);
  console.log(`meet fields: ${meetFields.map((f) => f.api_key).join(", ")}`);

  const meetRecords = await client.items.list({ filter: { type: "meet" } });
  console.log(`meet: ${meetRecords.length} records`);
  let updated = 0, skipped = 0;

  for (const meet of meetRecords) {
    const r = meet as Record<string, unknown>;

    // Common field names in meet model: person, url / meet_url / calendly_url
    const personId = (r.person ?? r.person_id) as string | undefined;
    const url = (r.url ?? r.meet_url ?? r.calendly_url ?? r.link) as string | undefined;

    if (!personId || !url) {
      console.warn(`  SKIP: meet ${meet.id} — missing person or url. Fields: ${JSON.stringify(r)}`);
      skipped++;
      continue;
    }

    try {
      const person = await client.items.find(personId);
      const existing = (person as Record<string, unknown>).meet_url;
      if (existing) {
        console.log(`  SKIP: person ${personId} already has meet_url`);
        skipped++;
        continue;
      }
      await client.items.update(personId, { meet_url: url } as Record<string, unknown>);
      updated++;
      console.log(`  Updated person ${personId}: meet_url="${url}"`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  ERROR: meet ${meet.id}: ${msg.slice(0, 200)}`);
      skipped++;
    }
  }

  console.log(`\n✅ meet → person.meet_url: ${updated} updated, ${skipped} skipped/failed`);
}
