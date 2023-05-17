import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log('Create block model "Section Blogs Section" (`section_blogs_section`)');
  newItemTypes["1769919"] = await client.itemTypes.create(
    {
      name: "Section Blogs Section",
      api_key: "section_blogs_section",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Section Blogs Section" (`section_blogs_section`)'
  );
  newFields["9165190"] = await client.fields.create(newItemTypes["1769919"], {
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
    'Create Multiple links field "Items" (`items`) in block model "Section Blogs Section" (`section_blogs_section`)'
  );
  newFields["9165191"] = await client.fields.create(newItemTypes["1769919"], {
    label: "Items",
    field_type: "links",
    api_key: "items",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38241"],
      },
      size: { min: 1 },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
  });

  console.log(
    'Create Multiple links field "Pinned items" (`pinned_items`) in block model "Section Blogs Section" (`section_blogs_section`)'
  );
  newFields["9165192"] = await client.fields.create(newItemTypes["1769919"], {
    label: "Pinned items",
    field_type: "links",
    api_key: "pinned_items",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38241"],
      },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
  });

  console.log(
    'Create Single-line string field "Item size" (`item_size`) in block model "Section Blogs Section" (`section_blogs_section`)'
  );
  newFields["9165193"] = await client.fields.create(newItemTypes["1769919"], {
    label: "Item size",
    field_type: "string",
    api_key: "item_size",
    validators: { required: {}, enum: { values: ["small", "large"] } },
    appearance: {
      addons: [],
      editor: "string_radio_group",
      parameters: {
        radios: [
          { hint: "", label: "Small", value: "small" },
          { hint: "", label: "Large", value: "large" },
        ],
      },
    },
    default_value: "large",
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
          newItemTypes["1769919"].id,
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
