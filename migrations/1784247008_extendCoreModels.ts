import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 08: Extend core page-like models (additive — no deletions).
 *
 * page (2035421):
 *   Current: title, sections (rich_text), slug, social, preview_link
 *   Add: subtitle, preview_image, tags (→tag), parent_page (→page),
 *        has_table_of_contents, body_blocks (rich_text, palette wired mig 12)
 *   Rename: social → seo, sections stays (kept for content migration), preview_link stays
 *
 * home_page (NDtfKQsmTP6B48gv9tf8dg):
 *   Current: title, seo, sections (rich_text)
 *   Add: body_blocks (rich_text, palette wired mig 12), preview (json)
 *   sections field stays (kept for content migration)
 *
 * page_partial (XPo_c_5wTB2S8UWF1q2HoA):
 *   Current: title, section (single_block)
 *   Add: blocks (rich_text, full palette wired mig 12)
 *   section field stays (kept for content migration)
 */
export default async function (client: Client) {
  const PAGE_ID = "2035421";
  const HOME_ID = "NDtfKQsmTP6B48gv9tf8dg";
  const PARTIAL_ID = "XPo_c_5wTB2S8UWF1q2HoA";
  const TAG_ID = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // ── page ──────────────────────────────────────────────────────────────────
  console.log("Extending page model...");

  // Rename social → seo
  await client.fields.update("10442604", { api_key: "seo", label: "SEO" });
  console.log("page: renamed social → seo");

  await client.fields.create(PAGE_ID, {
    label: "Subtitle",
    field_type: "string",
    api_key: "subtitle",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });

  await client.fields.create(PAGE_ID, {
    label: "Preview image",
    field_type: "file",
    api_key: "preview_image",
    validators: {},
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });

  await client.fields.create(PAGE_ID, {
    label: "Tags",
    field_type: "links",
    api_key: "tags",
    validators: { items_item_type: { item_types: [TAG_ID] } },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    default_value: null,
  });

  await client.fields.create(PAGE_ID, {
    label: "Parent page",
    field_type: "link",
    api_key: "parent_page",
    validators: { item_item_type: { item_types: [PAGE_ID] } },
    appearance: { addons: [], editor: "link_select", parameters: { filters: [] } },
    default_value: null,
  });

  await client.fields.create(PAGE_ID, {
    label: "Has Table of Contents",
    field_type: "boolean",
    api_key: "has_table_of_contents",
    validators: {},
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: false,
  });

  // body_blocks: palette wired in migration 12
  await client.fields.create(PAGE_ID, {
    label: "Body",
    field_type: "rich_text",
    api_key: "body_blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: true } },
    default_value: null,
  });

  console.log("page: all new fields added");

  // ── home_page ─────────────────────────────────────────────────────────────
  console.log("Extending home_page...");

  // body_blocks: palette wired in migration 12
  await client.fields.create(HOME_ID, {
    label: "Body",
    field_type: "rich_text",
    api_key: "body_blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: true } },
    default_value: null,
  });

  await client.fields.create(HOME_ID, {
    label: "Preview",
    field_type: "json",
    api_key: "preview",
    validators: {},
    appearance: { addons: [], editor: "json", parameters: {} },
    default_value: null,
  });

  console.log("home_page: body_blocks + preview added");

  // ── page_partial ──────────────────────────────────────────────────────────
  console.log("Extending page_partial...");

  // blocks: full palette wired in migration 12
  await client.fields.create(PARTIAL_ID, {
    label: "Blocks",
    field_type: "rich_text",
    api_key: "blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  });

  console.log("page_partial: blocks field added");
  console.log("✅ Core models extended. NOTE: old sections/section fields kept for Phase 2 migration.");
}
