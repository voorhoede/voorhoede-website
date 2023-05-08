import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log(
    'Create block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  newItemTypes["1440862"] = await client.itemTypes.create(
    {
      name: "Section Image Card Grid",
      api_key: "section_image_card_grid",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log(
    'Create block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  newItemTypes["1440863"] = await client.itemTypes.create(
    {
      name: "Section Image Card Grid Item",
      api_key: "section_image_card_grid_item",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  newFields["7363639"] = await client.fields.create(newItemTypes["1440862"], {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true },
      type: "title",
    },
    default_value: "",
  });

  console.log(
    'Create Modular content field "Items" (`items`) in block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  newFields["7363640"] = await client.fields.create(newItemTypes["1440862"], {
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: [newItemTypes["1440863"].id] },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  newFields["7363641"] = await client.fields.create(newItemTypes["1440863"], {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true },
      type: "title",
    },
    default_value: "",
  });

  console.log(
    'Create Single asset field "Image" (`image`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  newFields["7364028"] = await client.fields.create(newItemTypes["1440863"], {
    label: "Image",
    field_type: "file",
    api_key: "image",
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: "image" },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
  });

  console.log(
    'Create Multiple-paragraph text field "Body" (`body`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  newFields["7364029"] = await client.fields.create(newItemTypes["1440863"], {
    label: "Body",
    field_type: "text",
    api_key: "body",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: { toolbar: [] },
      type: "markdown",
    },
    default_value: "",
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Sections" (`sections`) in model "Landing Page" (`landing_page`)'
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          newItemTypes["1440862"].id,
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "2040174",
          "2040351",
          "2040362",
        ],
      },
    },
  });
}
