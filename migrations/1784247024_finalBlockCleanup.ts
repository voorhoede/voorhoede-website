import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 24: Final cleanup of deprecated blocks.
 *
 * Migration 23 ran but couldn't delete the blocks because 3 fields
 * still referenced them:
 *   - grouping_item.sections  (had section_logo_grid in validator)
 *   - app.addresses            (used the deprecated 'address' block)
 *   - app.legal                (used the deprecated 'legal_item' block)
 *
 * This migration:
 *   1. Fixes grouping_item.sections validator (removes section_logo_grid)
 *   2. Deletes app.addresses field (address block is deprecated, no replacement needed)
 *   3. Deletes app.legal field (legal_item block is deprecated; replaced by legal_items)
 *   4. Deletes all remaining deprecated block types
 */
export default async function (client: Client) {
  const DEPRECATED_BLOCKS = [
    "section_logo_grid",
    "section_image_card_grid",
    "section_interstitial_cta",
    "section_image_grid",
    "section_image_grid_item",
    "section_structured_text",
    "section_dialogue_cta",
    "section_image_text",
    "structured_text_blue_text",
    "structured_text_highlighted_list",
    "structured_text_highlighted_list_item",
    "structured_text_buttons_list",
    "structured_text_image",
    "structured_text_counter_item_list",
    "structured_text",
    "two_column_block",
    "text_section",
    "generic_text_block",
    "responsive_video",
    "quote",
    "address",
    "legal_item",
  ];

  const allTypes = await client.itemTypes.list();
  const byKey = (k: string) => allTypes.find((t) => t.api_key === k);
  const deprecatedIds = new Set(DEPRECATED_BLOCKS.map((k) => byKey(k)?.id).filter(Boolean) as string[]);

  // ── Step 1: Fix grouping_item.sections validator ───────────────────────────
  console.log("Step 1: Fixing grouping_item.sections validator...");
  const groupingItem = byKey("grouping_item");
  if (groupingItem) {
    const fields = await client.fields.list(groupingItem.id);
    const sectionsField = fields.find((f) => f.api_key === "sections");
    if (sectionsField) {
      const validators = (sectionsField as { validators?: { rich_text_blocks?: { item_types?: string[] } } }).validators;
      const currentIds = validators?.rich_text_blocks?.item_types ?? [];
      const cleanIds = currentIds.filter((id) => !deprecatedIds.has(id));
      await client.fields.update(sectionsField.id, {
        validators: { rich_text_blocks: { item_types: cleanIds } },
      });
      console.log(`  ✓ grouping_item.sections: removed ${currentIds.length - cleanIds.length} deprecated refs (${cleanIds.length} remain)`);
    }
  }

  // ── Step 2: Delete app.addresses field ────────────────────────────────────
  console.log("\nStep 2: Deleting app.addresses and app.legal fields...");
  const app = byKey("app");
  if (app) {
    const appFields = await client.fields.list(app.id);
    for (const fieldKey of ["addresses", "legal"]) {
      const field = appFields.find((f) => f.api_key === fieldKey);
      if (!field) { console.log(`  SKIP: app.${fieldKey} not found`); continue; }
      try {
        await client.fields.destroy(field.id);
        console.log(`  ✓ Deleted app.${fieldKey}`);
      } catch (e: unknown) {
        console.warn(`  WARN: could not delete app.${fieldKey}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }

  // ── Step 3: Delete deprecated block types ─────────────────────────────────
  console.log("\nStep 3: Deleting deprecated block types...");
  for (const apiKey of DEPRECATED_BLOCKS) {
    const t = byKey(apiKey);
    if (!t) { console.log(`  SKIP: "${apiKey}" not found`); continue; }
    try {
      await client.itemTypes.destroy(t.id);
      console.log(`  ✓ Deleted: "${apiKey}"`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  WARN deleting "${apiKey}": ${msg.slice(0, 200)}`);
    }
  }

  console.log("\n✅ Final block cleanup complete");
}
