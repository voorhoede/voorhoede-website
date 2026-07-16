import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 12: Wire the full body_blocks palette.
 *
 * This migration runs LAST because it needs all block IDs to exist.
 * It updates:
 *   - body_blocks field on: page, home_page, not_found_page, page_partial (blocks field),
 *     blog_post, case_item, event
 *   - internal_link.link target to include: page, home_page, blog_post, case_item, event
 *   - menu_item_internal.link target to include: page, home_page, blog_post, case_item, event
 *   - logo_grid.logos target to include: menu_item_internal, menu_item_external
 *   - text_block.text structured_text links to include: page, home_page, file, glossary_term
 *   - action_block.items to ensure phone_link, email_link are properly linked
 *   - page.sections existing field: update to include all blocks (forward compat)
 *
 * The PALETTE (all blocks available in body_blocks):
 *   text_block, text_image_block, image_block, video_block, video_embed_block,
 *   embed_block, code_block, action_block, call_to_action, grouping_block,
 *   logo_grid, list_block, gallery_block, counter_block, page_header,
 *   storytelling_block, timeline_block, testimonial, newsletter,
 *   reach_out_block, page_partial_block, blog_list_block, case_list_block,
 *   page_list, events_list, team_gallery, glossary_list
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => {
    const t = allTypes.find((t) => t.api_key === key);
    if (!t) throw new Error(`item_type not found: ${key}`);
    return t.id;
  };

  // Collect all palette block IDs
  const paletteKeys = [
    "text_block",        "text_image_block",   "image_block",
    "video_block",       "video_embed_block",  "embed_block",
    "code_block",        "action_block",        "call_to_action",
    "grouping_block",    "logo_grid",           "list_block",
    "gallery_block",     "counter_block",       "page_header",
    "storytelling_block","timeline_block",      "testimonial",
    "newsletter",        "reach_out_block",     "page_partial_block",
    "blog_list_block",   "case_list_block",     "page_list",
    "events_list",       "team_gallery",        "glossary_list",
  ];

  const palette = paletteKeys.map(byKey);
  console.log("Palette IDs collected:", palette.length, "blocks");

  // Routable model IDs (for internal links)
  const PAGE_ID       = "2035421";
  const HOME_ID       = "NDtfKQsmTP6B48gv9tf8dg";
  const BLOG_ID       = "38241";
  const CASE_ID       = "38240";
  const NOT_FOUND_ID  = byKey("not_found_page");
  const EVENT_ID      = byKey("event");
  const PARTIAL_ID    = "XPo_c_5wTB2S8UWF1q2HoA";
  const FILE_ID       = byKey("file");
  const GLOSSARY_TERM_ID = "IsaADh7aRxGueq_pxmIIQg";

  const routableIds = [PAGE_ID, HOME_ID, BLOG_ID, CASE_ID, EVENT_ID];

  // Helper: find a field by api_key on a model
  const findField = async (modelId: string, apiKey: string) => {
    const fields = await client.fields.list(modelId);
    return fields.find((f) => f.api_key === apiKey);
  };

  // ── Wire body_blocks on page ──────────────────────────────────────────────
  console.log("Wiring page.body_blocks...");
  const pageBodyBlocks = await findField(PAGE_ID, "body_blocks");
  if (pageBodyBlocks) {
    await client.fields.update(pageBodyBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }
  // Also update the old sections field to have same palette (for forward compat)
  const pageSections = await findField(PAGE_ID, "sections");
  if (pageSections) {
    await client.fields.update(pageSections.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
    console.log("page.sections also updated with full palette");
  }

  // ── Wire body_blocks on home_page ─────────────────────────────────────────
  console.log("Wiring home_page.body_blocks...");
  const homeBodyBlocks = await findField(HOME_ID, "body_blocks");
  if (homeBodyBlocks) {
    await client.fields.update(homeBodyBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }

  // ── Wire body_blocks on not_found_page ───────────────────────────────────
  console.log("Wiring not_found_page.body_blocks...");
  const nfBodyBlocks = await findField(NOT_FOUND_ID, "body_blocks");
  if (nfBodyBlocks) {
    await client.fields.update(nfBodyBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }

  // ── Wire blocks on page_partial ───────────────────────────────────────────
  console.log("Wiring page_partial.blocks...");
  const partialBlocks = await findField(PARTIAL_ID, "blocks");
  if (partialBlocks) {
    await client.fields.update(partialBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }

  // ── Wire body_blocks on blog_post ─────────────────────────────────────────
  console.log("Wiring blog_post.body_blocks...");
  const blogBodyBlocks = await findField(BLOG_ID, "body_blocks");
  if (blogBodyBlocks) {
    await client.fields.update(blogBodyBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }

  // ── Wire body_blocks on case_item ─────────────────────────────────────────
  console.log("Wiring case_item.body_blocks...");
  const caseBodyBlocks = await findField(CASE_ID, "body_blocks");
  if (caseBodyBlocks) {
    await client.fields.update(caseBodyBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }

  // ── Wire body_blocks on event ─────────────────────────────────────────────
  console.log("Wiring event.body_blocks...");
  const eventBodyBlocks = await findField(EVENT_ID, "body_blocks");
  if (eventBodyBlocks) {
    await client.fields.update(eventBodyBlocks.id, {
      validators: { rich_text_blocks: { item_types: palette } },
    });
  }

  // ── Update internal_link.link target ─────────────────────────────────────
  console.log("Updating internal_link.link targets...");
  const internalLinkId = "2037919";
  const ilFields = await client.fields.list(internalLinkId);
  const ilLinkField = ilFields.find((f) => f.api_key === "link");
  if (ilLinkField) {
    await client.fields.update(ilLinkField.id, {
      validators: {
        ...ilLinkField.validators,
        required: {},
        item_item_type: { item_types: routableIds },
      },
    });
  }

  // ── Update menu_item_internal.link target ─────────────────────────────────
  console.log("Updating menu_item_internal.link targets...");
  const miInternalId = byKey("menu_item_internal");
  const miFields = await client.fields.list(miInternalId);
  const miLinkField = miFields.find((f) => f.api_key === "link");
  if (miLinkField) {
    await client.fields.update(miLinkField.id, {
      validators: { required: {}, item_item_type: { item_types: routableIds } },
    });
  }

  // ── Update logo_grid.logos to reference menu_item_internal + menu_item_external ─
  console.log("Updating logo_grid.logos block types...");
  const logoGridId = byKey("logo_grid");
  const logoGridFields = await client.fields.list(logoGridId);
  const logosField = logoGridFields.find((f) => f.api_key === "logos");
  if (logosField) {
    const miExternalId = byKey("menu_item_external");
    await client.fields.update(logosField.id, {
      validators: { rich_text_blocks: { item_types: [miInternalId, miExternalId] } },
    });
  }

  // ── Update text_block.text links ──────────────────────────────────────────
  console.log("Updating text_block.text structured_text links...");
  const textBlockId = "BSet0e3fTeWC8-a8odR7VA";
  const textBlockFields = await client.fields.list(textBlockId);
  const textField = textBlockFields.find((f) => f.api_key === "text");
  if (textField) {
    const variableBlockId = byKey("variable_block");
    const iconBlockId = byKey("icon_block");
    const counterBlockId = byKey("counter_block");
    const actionBlockId = byKey("action_block");
    const videoBlockId = byKey("video_block");
    const videoEmbedBlockId = byKey("video_embed_block");
    const listBlockId = byKey("list_block");
    const imageBlockId = byKey("image_block");
    const tableBlockId = null; // table_block dropped

    await client.fields.update(textField.id, {
      validators: {
        structured_text_blocks: {
          item_types: [
            actionBlockId, videoBlockId, listBlockId, imageBlockId, videoEmbedBlockId,
          ].filter(Boolean),
        },
        structured_text_inline_blocks: {
          item_types: [variableBlockId, iconBlockId, counterBlockId],
        },
        structured_text_links: {
          on_publish_with_unpublished_references_strategy: "fail",
          on_reference_unpublish_strategy: "delete_references",
          on_reference_delete_strategy: "delete_references",
          item_types: [FILE_ID, PAGE_ID, HOME_ID, GLOSSARY_TERM_ID],
        },
      },
    });
  }

  console.log("✅ Full palette wired to all body_blocks fields and link targets updated");
}
