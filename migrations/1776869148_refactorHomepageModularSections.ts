import type { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create block model "\uD83D\uDDC2\uFE0F Grouping Item" (`grouping_item`)',
  );
  await client.itemTypes.create(
    {
      id: "X-p4BCeGTZW3byYyovSV2g",
      name: "\uD83D\uDDC2\uFE0F Grouping Item",
      api_key: "grouping_item",
      modular_block: true,
      draft_saving_active: false,
      hint: "",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "BlC03-W1RAWEpWsw8mn2IQ",
    },
  );

  console.log('Create model "\uD83C\uDFE0 Home" (`home_page`)');
  await client.itemTypes.create(
    {
      id: "NDtfKQsmTP6B48gv9tf8dg",
      name: "\uD83C\uDFE0 Home",
      singleton: true,
      api_key: "home_page",
      draft_mode_active: true,
      draft_saving_active: false,
      all_locales_required: true,
      collection_appearance: "table",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "eGo_r3pxQa2kApDyuL4BIg",
    },
  );

  console.log(
    'Create block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.itemTypes.create(
    {
      id: "CL2tcnR9TimpzQxNR2RKCg",
      name: "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image",
      api_key: "section_text_image",
      modular_block: true,
      draft_saving_active: false,
      hint: "",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "DSeGziuYRt-wnoOnR6Dqfg",
    },
  );

  console.log(
    'Create block model "\uD83D\uDDC3\uFE0F Section Grouping" (`section_grouping`)',
  );
  await client.itemTypes.create(
    {
      id: "CrAZK2ukS-Cev0D-CSbA2g",
      name: "\uD83D\uDDC3\uFE0F Section Grouping",
      api_key: "section_grouping",
      modular_block: true,
      draft_saving_active: false,
      hint: "",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "Yn4cW8mzRNaSalvV9q79NQ",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "\uD83D\uDDC2\uFE0F Grouping Item" (`grouping_item`)',
  );
  await client.fields.create("X-p4BCeGTZW3byYyovSV2g", {
    id: "Ipe69MR0QX2zZsKQ-MZM7A",
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: null,
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Sections" (`sections`) in block model "\uD83D\uDDC2\uFE0F Grouping Item" (`grouping_item`)',
  );
  await client.fields.create("X-p4BCeGTZW3byYyovSV2g", {
    id: "FxBFf79zSWCCdltngnrOkg",
    label: "Sections",
    field_type: "rich_text",
    api_key: "sections",
    validators: {
      rich_text_blocks: { item_types: ["CL2tcnR9TimpzQxNR2RKCg"] },
      size: { min: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create("NDtfKQsmTP6B48gv9tf8dg", {
    id: "PioDjVJ-TnCj-u4TUYdkIA",
    label: "Title",
    field_type: "string",
    api_key: "title",
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true, placeholder: null },
    },
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create("NDtfKQsmTP6B48gv9tf8dg", {
    id: "fpBmhCyxS769yC2MLVsgYA",
    label: "SEO",
    field_type: "seo",
    api_key: "seo",
    localized: true,
    validators: {
      required_seo_fields: {
        title: false,
        description: true,
        image: false,
        twitter_card: false,
      },
      title_length: { max: 60 },
      description_length: { max: 160 },
    },
    appearance: {
      addons: [],
      editor: "seo",
      parameters: {
        fields: ["title", "description", "image", "twitter_card"],
        previews: ["facebook", "google", "twitter"],
      },
    },
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create("NDtfKQsmTP6B48gv9tf8dg", {
    id: "Y66TEEOYTDuIltz0RySVEA",
    label: "Sections",
    field_type: "rich_text",
    api_key: "sections",
    localized: true,
    validators: {
      rich_text_blocks: {
        item_types: [
          "1757574",
          "2037668",
          "2040174",
          "2040362",
          "2486431",
          "CL2tcnR9TimpzQxNR2RKCg",
          "CrAZK2ukS-Cev0D-CSbA2g",
        ],
      },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Create Multiple links field "Pivots" (`pivots`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create("NDtfKQsmTP6B48gv9tf8dg", {
    id: "IIJ8C77mRoyG8ee-O9wM_Q",
    label: "Pivots",
    field_type: "links",
    api_key: "pivots",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["61898"],
      },
    },
    appearance: {
      addons: [],
      editor: "links_embed",
      parameters: { filters: [] },
    },
    default_value: null,
  });

  console.log(
    'Create Structured text field "Text" (`text`) in block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.fields.create("CL2tcnR9TimpzQxNR2RKCg", {
    id: "aLbLyiFcSkuNvFhKuGnQrg",
    label: "Text",
    field_type: "structured_text",
    api_key: "text",
    validators: {
      required: {},
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
        marks: [
          "strong",
          "code",
          "emphasis",
          "underline",
          "strikethrough",
          "highlight",
        ],
        nodes: [
          "blockquote",
          "code",
          "heading",
          "inlineItem",
          "itemLink",
          "link",
          "list",
          "thematicBreak",
        ],
        heading_levels: [2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: null,
  });

  console.log(
    'Create Single asset field "Image" (`image`) in block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.fields.create("CL2tcnR9TimpzQxNR2RKCg", {
    id: "ZtyPOv-MTNuZXfsw243TpA",
    label: "Image",
    field_type: "file",
    api_key: "image",
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: "image" },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Layout" (`layout`) in block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.fields.create("CL2tcnR9TimpzQxNR2RKCg", {
    id: "X99vbiqQQBiIaxB0fGKBfw",
    label: "Layout",
    field_type: "string",
    api_key: "layout",
    validators: {
      required: {},
      enum: { values: ["text-image", "image-text"] },
    },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: "text-image",
  });

  console.log(
    'Create Single-line string field "Theme" (`theme`) in block model "\uD83D\uDDC3\uFE0F Section Grouping" (`section_grouping`)',
  );
  await client.fields.create("CrAZK2ukS-Cev0D-CSbA2g", {
    id: "YyHVva_mS4ClXwv6LVI9Qg",
    label: "Theme",
    field_type: "string",
    api_key: "theme",
    hint: "Section background color",
    validators: {
      required: {},
      enum: { values: ["none", "pastel-yellow", "gray"] },
    },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "None", value: "none" },
          { hint: "", label: "Gray", value: "gray" },
          { hint: "", label: "Yellow", value: "pastel-yellow" },
        ],
      },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Accent Position" (`accent_position`) in block model "\uD83D\uDDC3\uFE0F Section Grouping" (`section_grouping`)',
  );
  await client.fields.create("CrAZK2ukS-Cev0D-CSbA2g", {
    id: "NTCvHql9QL2IKL6cyXphow",
    label: "Accent Position",
    field_type: "string",
    api_key: "accent_position",
    hint: "Display a yellow accent decoration and choose whether it appears on the left or right side.",
    validators: { required: {}, enum: { values: ["none", "left", "right"] } },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "None", value: "none" },
          { hint: "", label: "Left", value: "left" },
          { hint: "", label: "Right", value: "right" },
        ],
      },
    },
    default_value: "none",
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Items" (`items`) in block model "\uD83D\uDDC3\uFE0F Section Grouping" (`section_grouping`)',
  );
  await client.fields.create("CrAZK2ukS-Cev0D-CSbA2g", {
    id: "fF_Mq_O0TD67C1feR-lH6A",
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: ["X-p4BCeGTZW3byYyovSV2g"] },
      size: { min: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Style" (`style`) in block model "External Link" (`external_link`)',
  );
  await client.fields.create("2034503", {
    id: "PY5FAWaSS1KXQFb65_KZBw",
    label: "Style",
    field_type: "string",
    api_key: "style",
    validators: { enum: { values: ["primary", "secondary"] } },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Primary", value: "primary" },
          { hint: "", label: "Secondary", value: "secondary" },
        ],
      },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "layout" (`layout`) in block model "Section Header" (`section_header`)',
  );
  await client.fields.create("2037668", {
    id: "KYngLO0GTaegpnV8ZTdHig",
    label: "layout",
    field_type: "string",
    api_key: "layout",
    validators: { required: {}, enum: { values: ["compact", "full-height"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: "compact",
  });

  console.log(
    'Create Single-line string field "style" (`style`) in block model "Section Header" (`section_header`)',
  );
  await client.fields.create("2037668", {
    id: "HP_aymPXS4CKD3MArOfQ3g",
    label: "style",
    field_type: "string",
    api_key: "style",
    validators: { required: {}, enum: { values: ["static", "animated"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: "static",
  });

  console.log(
    'Create Single-line string field "Style" (`style`) in block model "Internal Link" (`internal_link`)',
  );
  await client.fields.create("2037919", {
    id: "OVmOsXDxS7mOnt03uFPfGA",
    label: "Style",
    field_type: "string",
    api_key: "style",
    validators: { enum: { values: ["primary", "secondary"] } },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Primary", value: "primary" },
          { hint: "", label: "Secondary", value: "secondary" },
        ],
      },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.fields.create("2486431", {
    id: "GZZFmtN-Q5u68L4wBYajCg",
    label: "Title",
    field_type: "string",
    api_key: "title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: null,
  });

  console.log(
    'Create Integer number field "Columns" (`columns`) in block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.fields.create("2486431", {
    id: "BwHjmPrtQrWshZggh76eDg",
    label: "Columns",
    field_type: "integer",
    api_key: "columns",
    appearance: {
      addons: [],
      editor: "integer",
      parameters: { placeholder: null },
    },
    default_value: 3,
  });

  console.log(
    'Update Single-line string field "layout" (`layout`) in block model "Section Header" (`section_header`)',
  );
  await client.fields.update("KYngLO0GTaegpnV8ZTdHig", { position: 1 });

  console.log(
    'Update Single-line string field "style" (`style`) in block model "Section Header" (`section_header`)',
  );
  await client.fields.update("HP_aymPXS4CKD3MArOfQ3g", { position: 2 });

  console.log(
    'Update Asset gallery field "Logos" (`logos`) in block model "\uD83C\uDFF7\uFE0F Section Logo Grid" (`section_logo_grid`)',
  );
  await client.fields.update("10482071", {
    validators: { extension: { extensions: [], predefined_list: "image" } },
  });

  console.log(
    'Update Multiple-paragraph text field "Body" (`body`) in block model "\uD83E\uDDD1\u200D\uD83E\uDDD2\u200D\uD83E\uDDD2 Section Dialogue CTA" (`section_dialogue_cta`)',
  );
  await client.fields.update("10483193", {
    appearance: {
      addons: [],
      editor: "wysiwyg",
      parameters: {
        toolbar: [
          "bold",
          "italic",
          "link",
          "ordered_list",
          "show_source",
          "strikethrough",
          "unordered_list",
        ],
      },
    },
  });

  console.log(
    'Update Multiple links field "Cases" (`cases`) in block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.fields.update("13026206", { position: 2 });

  console.log("Finalize models/block models");

  console.log(
    'Update block model "\uD83D\uDDC2\uFE0F Grouping Item" (`grouping_item`)',
  );
  await client.itemTypes.update("X-p4BCeGTZW3byYyovSV2g", {
    presentation_title_field: { id: "Ipe69MR0QX2zZsKQ-MZM7A", type: "field" },
  });

  console.log('Update model "\uD83C\uDFE0 Home" (`home_page`)');
  await client.itemTypes.update("NDtfKQsmTP6B48gv9tf8dg", {
    presentation_title_field: { id: "PioDjVJ-TnCj-u4TUYdkIA", type: "field" },
    title_field: { id: "PioDjVJ-TnCj-u4TUYdkIA", type: "field" },
  });

  console.log(
    'Update block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.itemTypes.update("CL2tcnR9TimpzQxNR2RKCg", {
    presentation_title_field: { id: "X99vbiqQQBiIaxB0fGKBfw", type: "field" },
    presentation_image_field: { id: "ZtyPOv-MTNuZXfsw243TpA", type: "field" },
  });

  console.log('Update model "\uD83D\uDCD1 Page" (`page`)');
  await client.itemTypes.update("2035421", { name: "\uD83D\uDCD1 Page" });

  console.log(
    'Update block model "\uD83C\uDFF7\uFE0F Section Logo Grid" (`section_logo_grid`)',
  );
  await client.itemTypes.update("2040174", {
    name: "\uD83C\uDFF7\uFE0F Section Logo Grid",
  });

  console.log(
    'Update block model "\uD83E\uDDD1\u200D\uD83E\uDDD2\u200D\uD83E\uDDD2 Section Dialogue CTA" (`section_dialogue_cta`)',
  );
  await client.itemTypes.update("2040362", {
    name: "\uD83E\uDDD1\u200D\uD83E\uDDD2\u200D\uD83E\uDDD2 Section Dialogue CTA",
  });

  console.log(
    'Update block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.itemTypes.update("2486431", {
    name: "\uD83D\uDCBC Section Case List",
    api_key: "section_case_list",
    presentation_title_field: { id: "GZZFmtN-Q5u68L4wBYajCg", type: "field" },
  });

  console.log("Manage menu items");

  console.log('Create menu item "\uD83C\uDFE0 Home"');
  await client.menuItems.create({
    id: "YpuMcBLjSx-Eka0_FgBfhg",
    label: "\uD83C\uDFE0 Home",
    item_type: { id: "NDtfKQsmTP6B48gv9tf8dg", type: "item_type" },
  });

  console.log('Update menu item "\uD83C\uDFE0 Home"');
  await client.menuItems.update("YpuMcBLjSx-Eka0_FgBfhg", { position: 14 });

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.schemaMenuItems.update("Z0EtJ3vRRJawpSGv9I-YKA", {
    position: 97,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDDC3\uFE0F Section Grouping" (`section_grouping`)',
  );
  await client.schemaMenuItems.update("Yn4cW8mzRNaSalvV9q79NQ", {
    position: 95,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.schemaMenuItems.update("eGo_r3pxQa2kApDyuL4BIg", {
    position: 93,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.schemaMenuItems.update("DSeGziuYRt-wnoOnR6Dqfg", {
    position: 94,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDDC2\uFE0F Grouping Item" (`grouping_item`)',
  );
  await client.schemaMenuItems.update("BlC03-W1RAWEpWsw8mn2IQ", {
    position: 96,
  });
}
