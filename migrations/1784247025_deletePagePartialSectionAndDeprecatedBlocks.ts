import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 25: Delete page_partial.section legacy field and all remaining
 * deprecated block types.
 *
 * page_partial.section is an old single_block field that still references
 * 7 deprecated blocks in its single_block_blocks validator. It is replaced
 * by page_partial.blocks (modular_content, already exists with new palette).
 *
 * Deletion order matters: delete containers first (those whose validators
 * reference other deprecated blocks), then leaf blocks.
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const byKey = (k: string) => allTypes.find((t) => t.api_key === k);

  // ── Step 1: Delete page_partial.section (legacy single_block field) ───────
  console.log("Step 1: Deleting page_partial.section legacy field...");
  const pp = byKey("page_partial");
  if (pp) {
    const fields = await client.fields.list(pp.id);
    const sectionField = fields.find((f) => f.api_key === "section");
    if (sectionField) {
      await client.fields.destroy(sectionField.id);
      console.log("  ✓ Deleted page_partial.section");
    } else {
      console.log("  SKIP: page_partial.section not found");
    }
  }

  // ── Step 2: Delete deprecated blocks in dependency order ──────────────────
  // Delete containers first (those with validators referencing others),
  // then mid-level, then leaf blocks.
  console.log("\nStep 2: Deleting deprecated blocks (containers first)...");

  const DELETION_ORDER = [
    // Top-level: referenced by page_partial.section AND/OR reference other deprecated blocks
    "section_structured_text",      // refs: structured_text_counter_item_list, structured_text_image, two_column_block, structured_text_blue_text, structured_text_highlighted_list, structured_text_buttons_list
    "section_image_grid",           // refs: section_image_grid_item
    "section_image_text",           // refs: structured_text_blue_text, structured_text_buttons_list
    "section_logo_grid",            // no internal deprecated refs
    "section_image_card_grid",      // no internal deprecated refs
    "section_interstitial_cta",     // no internal deprecated refs
    "section_dialogue_cta",         // no internal deprecated refs
    // Mid-level: reference leaf deprecated blocks
    "two_column_block",             // refs: structured_text_image, structured_text
    "structured_text_highlighted_list",  // refs: structured_text_highlighted_list_item
    "structured_text_blue_text",    // refs: structured_text_buttons_list
    "structured_text",              // refs: structured_text_buttons_list
    // Leaf blocks (no deprecated references)
    "structured_text_counter_item_list",
    "structured_text_image",
    "structured_text_highlighted_list_item",
    "structured_text_buttons_list",
    "section_image_grid_item",
    // Any remaining that may have been missed
    "text_section",
    "generic_text_block",
    "responsive_video",
    "quote",
    "address",
    "legal_item",
  ];

  for (const apiKey of DELETION_ORDER) {
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

  console.log("\n✅ Deprecated blocks cleanup complete");
}
