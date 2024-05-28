import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};
  const newMenuItems: Record<string, SimpleSchemaTypes.MenuItem> = {};

  console.log('Rename model "Tag" (`tag`)');

  console.log('Update block model "Counter Item List" (`counter_item_list`)');
  await client.itemTypes.update("1775016", {
    name: "Counter Item List",
    api_key: "structured_text_counter_item_list",
  });

  console.log('Update block model "Counter Item" (`counter_item`)');
  await client.itemTypes.update("1994024", {
    name: "Counter Item",
    api_key: "counter_item",
  });

  console.log("Create new models/block models");

  console.log('Create model "Tag" (`tag`)');
  newItemTypes["L6X45m4qSbe9KUR9J42WoQ"] = await client.itemTypes.create(
    {
      name: "Tag",
      api_key: "tag",
      collection_appearance: "table",
      inverse_relationships_enabled: false,
      all_locales_required: true,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in model "Tag" (`tag`)'
  );
  newFields["YQlq6npeQ-ye9GRd6kzlZA"] = await client.fields.create(
    newItemTypes["L6X45m4qSbe9KUR9J42WoQ"],
    {
      label: "Title",
      field_type: "string",
      api_key: "title",
      localized: true,
      appearance: {
        addons: [],
        editor: "single_line",
        parameters: { heading: false },
      },
      default_value: { en: "", nl: "" },
    }
  );

  console.log('Create Slug field "Slug" (`slug`) in model "Tag" (`tag`)');
  newFields["Pdx_CmhQScSROi_y-nV9CQ"] = await client.fields.create(
    newItemTypes["L6X45m4qSbe9KUR9J42WoQ"],
    {
      label: "Slug",
      field_type: "slug",
      api_key: "slug",
      localized: true,
      validators: {
        slug_title_field: {
          title_field_id: newFields["YQlq6npeQ-ye9GRd6kzlZA"].id,
        },
        slug_format: { predefined_pattern: "webpage_slug" },
        required: {},
        unique: {},
      },
      appearance: {
        addons: [],
        editor: "slug",
        parameters: { url_prefix: null },
      },
    }
  );

  console.log(
    'Create Multiple links field "Tags" (`tags`) in model "Blog post" (`blog_post`)'
  );
  newFields["WK7wupK2Tme8U1B-LlMz0g"] = await client.fields.create("38241", {
    label: "Tags",
    field_type: "links",
    api_key: "tags",
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [newItemTypes["L6X45m4qSbe9KUR9J42WoQ"].id],
      },
    },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    default_value: null,
  });

  console.log("Finalize models/block models");

  await client.itemTypes.update(newItemTypes["L6X45m4qSbe9KUR9J42WoQ"], {
    title_field: newFields["YQlq6npeQ-ye9GRd6kzlZA"],
  });

  console.log("Manage menu items");

  console.log('Create menu item "Tags"');
  newMenuItems["FwJmlOZ0QrSGeMIlGUanqg"] = await client.menuItems.create({
    label: "Tags",
    item_type: newItemTypes["L6X45m4qSbe9KUR9J42WoQ"],
  });

  console.log('Update menu item "Tags"');
  await client.menuItems.update(newMenuItems["FwJmlOZ0QrSGeMIlGUanqg"], {
    position: 10,
  });
}
