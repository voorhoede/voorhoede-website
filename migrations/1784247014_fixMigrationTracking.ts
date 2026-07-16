import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 14: Fix migration tracking for forked environment.
 * Registers the .ts-suffixed names for two migrations whose effects
 * already exist in new-data-models but were not tracked correctly.
 */
export default async function (client: Client) {
  const SCHEMA_MIGRATION_MODEL = "1757573";

  const existing = await client.items.list({
    filter: { type: SCHEMA_MIGRATION_MODEL },
  });
  const existingNames = new Set(
    existing.map((r) => (r as unknown as { name: string }).name),
  );

  const toRegister = [
    "1783437273_addDatoPlugin.ts",
    "1784213509_addReachOutBlock.ts",
  ];

  for (const name of toRegister) {
    if (existingNames.has(name)) {
      console.log(`  ${name} already registered`);
    } else {
      await client.items.create({
        item_type: { type: "item_type", id: SCHEMA_MIGRATION_MODEL },
        name,
      });
      console.log(`  Registered: ${name}`);
    }
  }
  console.log("✅ Migration tracking fixed");
}
