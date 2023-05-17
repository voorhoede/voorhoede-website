import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log(
    'Create block model "Section Events Section" (`section_events_section`)'
  );
  newItemTypes["1770007"] = await client.itemTypes.create(
    {
      name: "Section Events Section",
      api_key: "section_events_section",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Section Events Section" (`section_events_section`)'
  );
  newFields["7649987"] = await client.fields.create(newItemTypes["1770007"], {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Multiple links field "Items" (`items`) in block model "Section Events Section" (`section_events_section`)'
  );
  newFields["9165469"] = await client.fields.create(newItemTypes["1770007"], {
    label: "Items",
    field_type: "links",
    api_key: "items",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38232"],
      },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
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
          "1471996",
          "1757574",
          "1514671",
          newItemTypes["1770007"].id,
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
