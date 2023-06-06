import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log(
    'Create block model "Section Team Gallery" (`section_team_gallery`)'
  );
  newItemTypes["1602503"] = await client.itemTypes.create(
    {
      name: "Section Team Gallery",
      api_key: "section_team_gallery",
      modular_block: true,
      hint: "https://www.datocms-assets.com/6524/1685609517-section-team-gallery-preview.png",
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Multiple links field "Persons" (`persons`) in block model "Section Team Gallery" (`section_team_gallery`)'
  );
  newFields["8299171"] = await client.fields.create(newItemTypes["1602503"], {
    label: "Persons",
    field_type: "links",
    api_key: "persons",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38233"],
      },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Boolean field "Full width" (`full_width`) in block model "Image" (`image`)'
  );

  console.log(
    'Update Modular content field "Sections" (`sections`) in model "Landing Page" (`landing_page`)'
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          newItemTypes["1602503"].id,
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
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log("Manage menu items");

  console.log('Update menu item "Landing Page"');
  await client.menuItems.update("1261998", {
    label: "Landing Page",
    position: 58,
  });
}
