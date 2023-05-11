import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log('Create block model "Section Timeline" (`section_timeline`)');
  newItemTypes["1469424"] = await client.itemTypes.create(
    {
      name: "Section Timeline",
      api_key: "section_timeline",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular content field "Items" (`items`) in block model "Section Timeline" (`section_timeline`)'
  );
  newFields["7504272"] = await client.fields.create(newItemTypes["1469424"], {
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: ["1994404"] },
      size: { min: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Sections" (`sections`) in model "Landing Page" (`landing_page`)'
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "1466128",
          newItemTypes["1469424"].id,
          "1757574",
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
