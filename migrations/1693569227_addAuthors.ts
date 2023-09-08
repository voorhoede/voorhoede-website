import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log('Create block model "Cases List" (`cases_list`)');
  newItemTypes["2435781"] = await client.itemTypes.create(
    {
      name: "Cases List",
      api_key: "cases_list",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Multiple links field "Cases" (`cases`) in block model "Cases List" (`cases_list`)'
  );
  newFields["12754652"] = await client.fields.create(newItemTypes["2435781"], {
    label: "Cases",
    field_type: "links",
    api_key: "cases",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38240"],
      },
      size: { min: 1 },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Items" (`items`) in model "Service" (`service`)'
  );
  await client.fields.update("164064", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "41672",
          "44361",
          "262363",
          "316629",
          "2040351",
          newItemTypes["2435781"].id,
        ],
      },
    },
  });
}
