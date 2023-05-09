import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};
  const newMenuItems: Record<string, SimpleSchemaTypes.MenuItem> = {};

  console.log("Create new models/block models");

  console.log('Create model "Schema migration" (`schema_migration`)');
  newItemTypes["1447538"] = await client.itemTypes.create(
    {
      name: "Schema migration",
      api_key: "schema_migration",
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log('Create block model "Section Jobs List" (`section_jobs_list`)');
  newItemTypes["1447539"] = await client.itemTypes.create(
    {
      name: "Section Jobs List",
      api_key: "section_jobs_list",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Migration file name" (`name`) in model "Schema migration" (`schema_migration`)'
  );
  newFields["7395752"] = await client.fields.create(newItemTypes["1447538"], {
    label: "Migration file name",
    field_type: "string",
    api_key: "name",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Multiple links field "Jobs" (`jobs`) in block model "Section Jobs List" (`section_jobs_list`)'
  );
  newFields["7395753"] = await client.fields.create(newItemTypes["1447539"], {
    label: "Jobs",
    field_type: "links",
    api_key: "jobs",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38231"],
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
          "1440862",
          newItemTypes["1447539"].id,
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

  console.log("Finalize models/block models");

  console.log('Update model "Schema migration" (`schema_migration`)');
  await client.itemTypes.update(newItemTypes["1447538"], {
    title_field: newFields["7395752"],
  });

  console.log("Manage menu items");

  console.log('Create menu item "Schema migration"');
  newMenuItems["752165"] = await client.menuItems.create({
    label: "Schema migration",
    item_type: newItemTypes["1447538"],
  });
}
