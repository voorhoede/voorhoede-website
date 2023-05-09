import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log('Create block model "Tag list" (`tag_list`)');
  newItemTypes["1751533"] = await client.itemTypes.create(
    {
      name: "Tag list",
      api_key: "tag_list",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular content field "Items" (`items`) in block model "Tag list" (`tag_list`)'
  );
  newFields["9072594"] = await client.fields.create(newItemTypes["1751533"], {
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: ["1994024"] },
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
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.fields.update("10483125", {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          newItemTypes["1751533"].id,
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
