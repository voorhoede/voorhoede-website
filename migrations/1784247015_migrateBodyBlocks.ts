import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 15: Extend body_blocks palette with legacy block types, then copy
 * content from old fields → body_blocks for all page-like models.
 *
 * Strategy: rather than converting each legacy block type into its new
 * equivalent (complex, error-prone), we temporarily add the 6 legacy block
 * types that existed in page.sections but are NOT in the new palette to the
 * body_blocks validators. This allows a direct block-reference copy.
 * The legacy types will be deleted in migration 22 (cleanup), which
 * automatically removes their instances from body_blocks.
 *
 * Legacy blocks added to palette:
 *   1757574  section_image_card_grid
 *   2037920  section_interstitial_cta → will become call_to_action v=interstitial
 *   2037940  section_image_grid
 *   2040174  section_logo_grid
 *   2040351  section_structured_text → will become text_block
 *   2040362  section_dialogue_cta → will become call_to_action v=dialogue
 *
 * Content copied:
 *   page.sections         → page.body_blocks
 *   blog_post.items       → blog_post.body_blocks
 *   case_item.content     → case_item.body_blocks
 *   home_page.sections    → home_page.body_blocks   (if sections exists)
 *   service.items         → kept as is (migrated to page in mig 19)
 *   event_item.items      → kept as is (migrated to event in mig 17)
 */
export default async function (client: Client) {
  // ── Step 1: Extend body_blocks validators with legacy block types ─────────
  console.log("Adding legacy blocks to body_blocks palette...");

  const LEGACY_BLOCK_IDS = [
    "1757574",  // section_image_card_grid
    "2037920",  // section_interstitial_cta
    "2037940",  // section_image_grid
    "2040174",  // section_logo_grid
    "2040351",  // section_structured_text
    "2040362",  // section_dialogue_cta
  ];

  const CORE_PALETTE_IDS = [
    // The 27 blocks wired in migration 12
    "BSet0e3fTeWC8-a8odR7VA", // text_block
    "CL2tcnR9TimpzQxNR2RKCg", // text_image_block
    "41672",                   // image_block
    "2034503",                 // external_link (used inside action_block, not in main palette)
    "2037919",                 // internal_link
  ];

  // Get palette IDs by looking up block api_keys
  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => allTypes.find((t) => t.api_key === key)?.id ?? null;

  const paletteKeys = [
    "text_block","text_image_block","image_block","video_block","video_embed_block",
    "embed_block","code_block","action_block","call_to_action","grouping_block",
    "logo_grid","list_block","gallery_block","counter_block","page_header",
    "storytelling_block","timeline_block","testimonial","newsletter","reach_out_block",
    "page_partial_block","blog_list_block","case_list_block","page_list",
    "events_list","team_gallery","glossary_list",
  ];
  const paletteIds = paletteKeys.map(byKey).filter(Boolean) as string[];
  const fullPalette = [...paletteIds, ...LEGACY_BLOCK_IDS];
  console.log(`Palette: ${paletteIds.length} new + ${LEGACY_BLOCK_IDS.length} legacy = ${fullPalette.length} total`);

  // Update body_blocks field on each page-like model to include legacy blocks
  const modelsToUpdate = [
    { modelId: "2035421",                   fieldKey: "body_blocks", name: "page" },
    { modelId: "NDtfKQsmTP6B48gv9tf8dg",    fieldKey: "body_blocks", name: "home_page" },
    { modelId: byKey("not_found_page")!,    fieldKey: "body_blocks", name: "not_found_page" },
    { modelId: "XPo_c_5wTB2S8UWF1q2HoA",   fieldKey: "blocks",      name: "page_partial" },
    { modelId: "38241",                     fieldKey: "body_blocks", name: "blog_post" },
    { modelId: "38240",                     fieldKey: "body_blocks", name: "case_item" },
    { modelId: byKey("event")!,             fieldKey: "body_blocks", name: "event" },
  ];

  for (const { modelId, fieldKey, name } of modelsToUpdate) {
    const fields = await client.fields.list(modelId);
    const field = fields.find((f) => f.api_key === fieldKey);
    if (!field) { console.log(`  ${name}.${fieldKey} not found, skipping`); continue; }
    await client.fields.update(field.id, {
      validators: { rich_text_blocks: { item_types: fullPalette } },
    });
    console.log(`  ${name}.${fieldKey} updated`);
  }

  // ── Step 2: Copy sections → body_blocks for page records ─────────────────
  console.log("\nCopying content from old fields → body_blocks...");

  const copyBlocks = async (
    modelApiKey: string,
    sourceField: string,
    destField: string,
    totalLabel: string,
  ) => {
    let page = 1;
    let copied = 0;
    let skipped = 0;
    while (true) {
      const records = await client.items.list({
        filter: { type: modelApiKey },
        page: { limit: 50, offset: (page - 1) * 50 },
      });
      if (records.length === 0) break;
      for (const record of records) {
        const srcVal = (record as Record<string, unknown>)[sourceField];
        const destVal = (record as Record<string, unknown>)[destField];
        // Skip if dest already has content or src is empty
        if (Array.isArray(destVal) && destVal.length > 0) { skipped++; continue; }
        if (!srcVal || (Array.isArray(srcVal) && srcVal.length === 0)) { skipped++; continue; }
        try {
          await client.items.update(record.id, { [destField]: srcVal } as Record<string, unknown>);
          copied++;
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          console.warn(`  WARN: ${record.id} copy failed: ${msg.slice(0, 120)}`);
          skipped++;
        }
      }
      if (records.length < 50) break;
      page++;
    }
    console.log(`  ${totalLabel}: ${copied} copied, ${skipped} skipped`);
  };

  await copyBlocks("page",       "sections", "body_blocks", "page.sections → body_blocks");
  await copyBlocks("blog_post",  "items",    "body_blocks", "blog_post.items → body_blocks");
  await copyBlocks("case_item",  "content",  "body_blocks", "case_item.content → body_blocks");

  // home_page: check field name (may be different)
  const homeFields = await client.fields.list("NDtfKQsmTP6B48gv9tf8dg");
  const homeSections = homeFields.find((f) => f.api_key === "sections");
  if (homeSections) {
    await copyBlocks("home_page", "sections", "body_blocks", "home_page.sections → body_blocks");
  }

  console.log("✅ Body blocks migration complete");
  console.log("NOTE: Legacy block type instances remain in body_blocks until migration 22 cleanup.");
}
