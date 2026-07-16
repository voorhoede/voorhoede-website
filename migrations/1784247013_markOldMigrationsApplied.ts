import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 13: Register orphaned migration records in new-data-models.
 *
 * When new-data-models was forked from primary, migrations
 *   1783437273_addDatoPlugin.ts
 *   1784213509_addReachOutBlock.ts
 * were already applied on primary but their effects were copied to the fork
 * WITHOUT creating schema_migration tracking records in new-data-models.
 *
 * This migration creates those records so that future `migrations:run` calls
 * against new-data-models do not attempt to re-run those scripts.
 *
 * NOTE: This migration must NOT be run against the primary environment
 * (those records already exist there).
 */
export default async function (client: Client) {
  const SCHEMA_MIGRATION_MODEL = "1757573";

  // Get existing schema_migration records to avoid duplicates
  const existing = await client.items.list({
    filter: { type: SCHEMA_MIGRATION_MODEL },
  });
  const existingNames = new Set(
    existing.map((r) => (r as unknown as { name: string }).name),
  );
  console.log("Existing migration records:", [...existingNames].slice(-5).join(", "), "...");

  const toRegister = [
    "1783437273_addDatoPlugin.ts",
    "1784213509_addReachOutBlock.ts",
  ];

  for (const name of toRegister) {
    if (existingNames.has(name)) {
      console.log(`  ${name} already registered, skipping`);
    } else {
      await client.items.create({
        item_type: { type: "item_type", id: SCHEMA_MIGRATION_MODEL },
        name,
      });
      console.log(`  ${name} registered`);
    }
  }

  console.log("✅ Orphaned migration records registered");
}
