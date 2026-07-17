import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 23: Remove remaining deprecated block types that were not fully
 * cleaned up in Migration 22. These blocks are not part of the new schema
 * and should not appear in any body_blocks validators.
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

  const NEW_PALETTE = [
    "text_block", "text_image_block", "image_block", "video_block", "video_embed_block",
    "embed_block", "code_block", "action_block", "call_to_action", "grouping_block",
    "logo_grid", "list_block", "gallery_block", "counter_block", "page_header",
    "storytelling_block", "timeline_block", "testimonial", "newsletter", "reach_out_block",
    "page_partial_block", "blog_list_block", "case_list_block", "page_list",
    "events_list", "team_gallery", "glossary_list",
  ];

  const allTypes = await client.itemTypes.list();
  const byKey = (k: string) => allTypes.find((t) => t.api_key === k);

  const paletteIds = NEW_PALETTE.map((k) => byKey(k)?.id).filter(Boolean) as string[];
  console.log(`New palette has ${paletteIds.length} block types`);

  // Step 1: Update all body_blocks field validators to only include the new palette
  const BODY_BLOCK_FIELDS = [
    { model: "page",           field: "body_blocks" },
    { model: "home_page",      field: "body_blocks" },
    { model: "not_found_page", field: "body_blocks" },
    { model: "page_partial",   field: "blocks" },
    { model: "blog_post",      field: "body_blocks" },
    { model: "case_item",      field: "body_blocks" },
    { model: "event",          field: "body_blocks" },
  ];

  console.log("\nStep 1: Updating body_blocks validators...");
  for (const { model, field } of BODY_BLOCK_FIELDS) {
    const m = byKey(model);
    if (!m) { console.log(`  SKIP: model "${model}" not found`); continue; }
    const fields = await client.fields.list(m.id);
    const f = fields.find((ff) => ff.api_key === field);
    if (!f) { console.log(`  SKIP: ${model}.${field} not found`); continue; }
    try {
      await client.fields.update(f.id, {
        validators: { rich_text_blocks: { item_types: paletteIds } },
      });
      console.log(`  ✓ ${model}.${field}: validators updated`);
    } catch (e: unknown) {
      console.warn(`  WARN ${model}.${field}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  // Step 2: Delete deprecated block item_types
  console.log("\nStep 2: Deleting deprecated block types...");
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

  console.log("\n✅ Cleanup of deprecated blocks complete");
}
