import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log(
    'Create block model "Structured Text Image" (`structured_text_image`)'
  );
  newItemTypes["1934886"] = await client.itemTypes.create(
    {
      name: "Structured Text Image",
      api_key: "structured_text_image",
      modular_block: true,
      hint: "https://www.datocms-assets.com/6524/1687254596-structured-text-image-preview.png",
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Two column block" (`two_column_block`)');
  newItemTypes["1934887"] = await client.itemTypes.create(
    {
      name: "Two column block",
      api_key: "two_column_block",
      modular_block: true,
      hint: "https://www.datocms-assets.com/6524/1687254602-two-column-block-preview.png",
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Structured text" (`structured_text`)');
  newItemTypes["1934888"] = await client.itemTypes.create(
    {
      name: "Structured text",
      api_key: "structured_text",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single asset field "Image" (`image`) in block model "Structured Text Image" (`structured_text_image`)'
  );
  newFields["10089810"] = await client.fields.create(newItemTypes["1934886"], {
    label: "Image",
    field_type: "file",
    api_key: "image",
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: "image" },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
  });

  console.log(
    'Create Single-line string field "Caption" (`caption`) in block model "Structured Text Image" (`structured_text_image`)'
  );
  newFields["10089811"] = await client.fields.create(newItemTypes["1934886"], {
    label: "Caption",
    field_type: "string",
    api_key: "caption",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Modular content field "Left content" (`left_items`) in block model "Two column block" (`two_column_block`)'
  );
  newFields["10089812"] = await client.fields.create(newItemTypes["1934887"], {
    label: "Left content",
    field_type: "rich_text",
    api_key: "left_items",
    validators: {
      rich_text_blocks: {
        item_types: [newItemTypes["1934886"].id, newItemTypes["1934888"].id],
      },
      size: { eq: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Modular content field "Right content" (`right_items`) in block model "Two column block" (`two_column_block`)'
  );
  newFields["10089813"] = await client.fields.create(newItemTypes["1934887"], {
    label: "Right content",
    field_type: "rich_text",
    api_key: "right_items",
    validators: {
      rich_text_blocks: {
        item_types: [newItemTypes["1934886"].id, newItemTypes["1934888"].id],
      },
      size: { eq: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Structured text field "Body" (`body`) in block model "Structured text" (`structured_text`)'
  );
  newFields["10089814"] = await client.fields.create(newItemTypes["1934888"], {
    label: "Body",
    field_type: "structured_text",
    api_key: "body",
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040408"] },
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
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.fields.update("10483125", {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          "41672",
          "1775016",
          newItemTypes["1934886"].id,
          newItemTypes["1934887"].id,
          "2040400",
          "2040401",
          "2040408",
        ],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
  });
}
