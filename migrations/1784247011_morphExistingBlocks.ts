import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 11: Morph existing blocks to match new schema.
 * Fully idempotent: checks existing fields before creating.
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => {
    const t = allTypes.find((t) => t.api_key === key);
    if (!t) throw new Error(`item_type not found: ${key}`);
    return t.id;
  };

  const tagId     = byKey("tag");
  const pageId    = "2035421";
  const partialId = "XPo_c_5wTB2S8UWF1q2HoA";
  const phoneLinkId = byKey("phone_link");
  const emailLinkId = byKey("email_link");
  const internalLinkId = "2037919";
  const externalLinkId = "2034503";

  // Helper: add field only if api_key not already present
  const addField = async (modelId: string, fieldDef: Parameters<typeof client.fields.create>[1]) => {
    const key = (fieldDef as { api_key: string }).api_key;
    const existing = await client.fields.list(modelId);
    if (existing.find((f) => f.api_key === key)) {
      console.log(`  ${modelId}/${key} already exists, skipping`);
      return;
    }
    await client.fields.create(modelId, fieldDef);
    console.log(`  ${modelId}/${key} created`);
  };

  // ── counter_block: add label (may already exist) ──────────────────────────
  console.log("counter_block: ensure label field");
  await addField("1994024", {
    label: "Label", field_type: "string", api_key: "label",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: "Users" } },
    default_value: null,
  });

  // ── testimonial: add inline fields ───────────────────────────────────────
  console.log("testimonial: add inline fields");
  for (const fd of [
    { label: "Author",  field_type: "string" as const, api_key: "author",    validators: {}, appearance: { addons: [], editor: "single_line" as const, parameters: { heading: false, placeholder: null } }, default_value: null },
    { label: "Company", field_type: "string" as const, api_key: "company",   validators: {}, appearance: { addons: [], editor: "single_line" as const, parameters: { heading: false, placeholder: null } }, default_value: null },
    { label: "Quote",   field_type: "text"   as const, api_key: "quote",     validators: { required: {} }, appearance: { addons: [], editor: "textarea" as const, parameters: { placeholder: null } }, default_value: null },
    { label: "Validated",  field_type: "boolean" as const, api_key: "validated",  validators: {}, appearance: { addons: [], editor: "boolean" as const, parameters: {} }, default_value: null },
    { label: "Full width", field_type: "boolean" as const, api_key: "fullwidth",  validators: {}, appearance: { addons: [], editor: "boolean" as const, parameters: {} }, default_value: null },
  ]) {
    await addField("316629", fd);
  }

  // ── call_to_action: add variant + ctas ───────────────────────────────────
  console.log("call_to_action: add variant + ctas");
  await addField("262363", {
    label: "Variant", field_type: "string", api_key: "variant",
    validators: { enum: { values: ["default", "dialogue", "interstitial"] } },
    appearance: { addons: [], editor: "string_select", parameters: { options: [
      { label: "Default", value: "default", hint: "" },
      { label: "Dialogue (person + text)", value: "dialogue", hint: "" },
      { label: "Interstitial (full-width CTA)", value: "interstitial", hint: "" },
    ]}},
    default_value: "default",
  });
  await addField("262363", {
    label: "CTAs", field_type: "rich_text", api_key: "ctas",
    validators: { rich_text_blocks: { item_types: [internalLinkId, externalLinkId, phoneLinkId, emailLinkId] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  });

  // ── external_link: add open_in_new_tab ───────────────────────────────────
  console.log("external_link: add open_in_new_tab");
  await addField("2034503", {
    label: "Open in new tab", field_type: "boolean", api_key: "open_in_new_tab",
    validators: {},
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: null,
  });

  // ── newsletter: add title + body ─────────────────────────────────────────
  console.log("newsletter: add title + body");
  await addField("2037933", {
    label: "Title", field_type: "string", api_key: "title",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await addField("2037933", {
    label: "Body", field_type: "text", api_key: "body",
    validators: {},
    appearance: { addons: [], editor: "textarea", parameters: { placeholder: null } },
    default_value: null,
  });

  // ── page_header: add body ────────────────────────────────────────────────
  console.log("page_header: add body");
  await addField("2037668", {
    label: "Body", field_type: "text", api_key: "body",
    validators: {},
    appearance: { addons: [], editor: "textarea", parameters: { placeholder: null } },
    default_value: null,
  });

  // ── blog_list_block: add description + tag_filter ────────────────────────
  console.log("blog_list_block: add description + tag_filter");
  await addField("1514671", {
    label: "Description", field_type: "text", api_key: "description",
    validators: {},
    appearance: { addons: [], editor: "textarea", parameters: { placeholder: null } },
    default_value: null,
  });
  await addField("1514671", {
    label: "Tag filter", field_type: "link", api_key: "tag_filter",
    hint: "If set, only posts with this tag are shown.",
    validators: { item_item_type: { item_types: [tagId] } },
    appearance: { addons: [], editor: "link_select", parameters: { filters: [] } },
    default_value: null,
  });

  // ── page_list: add title + tag_filter + pinned + columns ─────────────────
  console.log("page_list: add title + tag_filter + pinned + columns");
  await addField("1466128", {
    label: "Title", field_type: "string", api_key: "title",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await addField("1466128", {
    label: "Tag filter", field_type: "link", api_key: "tag_filter",
    hint: "Pages with this tag will be listed.",
    validators: { item_item_type: { item_types: [tagId] } },
    appearance: { addons: [], editor: "link_select", parameters: { filters: [] } },
    default_value: null,
  });
  await addField("1466128", {
    label: "Pinned", field_type: "links", api_key: "pinned",
    hint: "These pages are shown at the top of the list.",
    validators: { items_item_type: { item_types: [pageId] } },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    default_value: null,
  });
  await addField("1466128", {
    label: "Columns", field_type: "integer", api_key: "columns",
    validators: {},
    appearance: { addons: [], editor: "integer", parameters: { placeholder: null } },
    default_value: 3,
  });

  // ── list_item: add text (structured_text) ────────────────────────────────
  console.log("list_item: add text field");
  await addField("42658", {
    label: "Text", field_type: "structured_text", api_key: "text",
    validators: {
      structured_text_blocks: { item_types: [] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["strong", "code", "emphasis", "underline", "strikethrough"],
        nodes: ["link"],
        heading_levels: [],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: null,
  });

  // ── page_partial_block: add items + layout ───────────────────────────────
  console.log("page_partial_block: add items + layout");
  await addField("G8-kViMTTG62MbHNzPc7PQ", {
    label: "Items", field_type: "links", api_key: "items",
    validators: { items_item_type: { item_types: [partialId] } },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    default_value: null,
  });
  await addField("G8-kViMTTG62MbHNzPc7PQ", {
    label: "Layout", field_type: "string", api_key: "layout",
    validators: { required: {} },
    appearance: { addons: [], editor: "string_select", parameters: { options: [
      { label: "Default", value: "default", hint: "" },
      { label: "Full width", value: "full_width", hint: "" },
    ]}},
    default_value: "default",
  });

  // ── embed_block: add data ─────────────────────────────────────────────────
  console.log("embed_block: add data field");
  await addField("1854913", {
    label: "Data", field_type: "json", api_key: "data",
    validators: {},
    appearance: { addons: [], editor: "json", parameters: {} },
    default_value: null,
  });

  // ── redirect_rule: rename http_status_code → status_code ─────────────────
  console.log("redirect_rule: rename http_status_code → status_code");
  const redirectFields = await client.fields.list("49825");
  const httpStatusField = redirectFields.find((f) => f.api_key === "http_status_code");
  if (httpStatusField) {
    await client.fields.update(httpStatusField.id, { api_key: "status_code", label: "Type" });
    console.log("  renamed to status_code");
  } else {
    console.log("  http_status_code not found (already renamed or doesn't exist), skipping");
  }

  // ── gallery_block: add title + images ────────────────────────────────────
  console.log("gallery_block: add title + images");
  await addField("1992764", {
    label: "Title", field_type: "string", api_key: "title",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await addField("1992764", {
    label: "Images", field_type: "gallery", api_key: "images",
    validators: {},
    appearance: { addons: [], editor: "gallery", parameters: {} },
    default_value: null,
  });

  console.log("✅ Existing blocks morphed");
}
