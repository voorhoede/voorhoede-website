import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log('Create block model "Section Glossary" (`section_glossary`)');
  await client.itemTypes.create(
    {
      id: "AjYd96IgQYuBzefFaL5VBA",
      name: "Section Glossary",
      api_key: "section_glossary",
      modular_block: true,
      draft_saving_active: false,
      hint: "",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "MsHPuZ9YTWmT1s5a1_sdCw",
    },
  );

  console.log('Create model "Glossary Term" (`glossary_term`)');
  await client.itemTypes.create(
    {
      id: "IsaADh7aRxGueq_pxmIIQg",
      name: "Glossary Term",
      api_key: "glossary_term",
      draft_mode_active: true,
      draft_saving_active: false,
      collection_appearance: "table",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "YCPrcCHYQpiysCLjifgDHg",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Section Glossary" (`section_glossary`)',
  );
  await client.fields.create("AjYd96IgQYuBzefFaL5VBA", {
    id: "SRhhC7BNSQaPBQyCINhKzw",
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true, placeholder: null },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Term" (`term`) in model "Glossary Term" (`glossary_term`)',
  );
  await client.fields.create("IsaADh7aRxGueq_pxmIIQg", {
    id: "YJS6KTrfTqCWoQ-7-mkxLA",
    label: "Term",
    field_type: "string",
    api_key: "term",
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Question" (`question`) in model "Glossary Term" (`glossary_term`)',
  );
  await client.fields.create("IsaADh7aRxGueq_pxmIIQg", {
    id: "JQGonmz-QDaslK1FjIMifg",
    label: "Question",
    field_type: "string",
    api_key: "question",
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
  });

  console.log(
    'Create Multiple-paragraph text field "Definition" (`definition`) in model "Glossary Term" (`glossary_term`)',
  );
  await client.fields.create("IsaADh7aRxGueq_pxmIIQg", {
    id: "ZOB3ilCnTZO7tYss9ZvHBw",
    label: "Definition",
    field_type: "text",
    api_key: "definition",
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: { toolbar: ["bold", "italic", "link"] },
    },
  });

  console.log(
    'Create Slug field "Slug" (`slug`) in model "Glossary Term" (`glossary_term`)',
  );
  await client.fields.create("IsaADh7aRxGueq_pxmIIQg", {
    id: "EqDMCh4eS3y6FCQAYDKe_w",
    label: "Slug",
    field_type: "slug",
    api_key: "slug",
    localized: true,
    validators: {
      slug_title_field: { title_field_id: "YJS6KTrfTqCWoQ-7-mkxLA" },
      slug_format: { predefined_pattern: "webpage_slug" },
      required: {},
      unique: {},
    },
    appearance: {
      addons: [],
      editor: "slug",
      parameters: { url_prefix: null, placeholder: null },
    },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Intro body" (`intro_body`) in model "Case overview" (`case_overview`)',
  );
  await client.fields.update("9388984", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Intro body" (`intro_body`) in model "Service overview" (`service_overview`)',
  );
  await client.fields.update("9388985", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)',
  );
  await client.fields.update("9103273", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: [] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Structured text" (`structured_text`)',
  );
  await client.fields.update("10116334", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040408"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          "1646744",
          "1757574",
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "2040174",
          "2040351",
          "2040362",
          "2486431",
          "AjYd96IgQYuBzefFaL5VBA",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
        ],
      },
    },
  });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Image & Text" (`section_image_text`)',
  );
  await client.fields.update("9216964", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)',
  );
  await client.fields.update("10483125", {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          "41672",
          "1775016",
          "1939441",
          "1939442",
          "2040400",
          "2040401",
          "2040408",
        ],
      },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Blue body" (`body`) in block model "Blue Text" (`structured_text_blue_text`)',
  );
  await client.fields.update("10483442", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040408"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Highlighted List Item" (`structured_text_highlighted_list_item`)',
  );
  await client.fields.update("10483443", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: [] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log(
    'Update Structured text field "Text" (`text`) in block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.fields.update("aLbLyiFcSkuNvFhKuGnQrg", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: [] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["IsaADh7aRxGueq_pxmIIQg"],
      },
    },
  });

  console.log("Finalize models/block models");

  console.log('Update block model "Section Glossary" (`section_glossary`)');
  await client.itemTypes.update("AjYd96IgQYuBzefFaL5VBA", {
    presentation_title_field: { id: "SRhhC7BNSQaPBQyCINhKzw", type: "field" },
  });

  console.log('Update model "Glossary Term" (`glossary_term`)');
  await client.itemTypes.update("IsaADh7aRxGueq_pxmIIQg", {
    presentation_title_field: { id: "YJS6KTrfTqCWoQ-7-mkxLA", type: "field" },
    title_field: { id: "YJS6KTrfTqCWoQ-7-mkxLA", type: "field" },
  });

  console.log("Manage menu items");

  console.log('Create menu item "Glossary Term"');
  await client.menuItems.create({
    id: "f0MdDYr4SxuwmDurVSmqMA",
    label: "Glossary Term",
    item_type: { id: "IsaADh7aRxGueq_pxmIIQg", type: "item_type" },
  });
}
