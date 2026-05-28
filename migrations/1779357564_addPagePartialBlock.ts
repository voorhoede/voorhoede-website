import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log(
    'Create block model "\uD83D\uDD17 Page Partial Block" (`page_partial_block`)',
  );
  await client.itemTypes.create(
    {
      id: "G8-kViMTTG62MbHNzPc7PQ",
      name: "\uD83D\uDD17 Page Partial Block",
      api_key: "page_partial_block",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "KQWwPgP0TvyzZmrgzj1kng",
    },
  );

  console.log('Create model "\uD83D\uDCC4 Page Partial" (`page_partial`)');
  await client.itemTypes.create(
    {
      id: "XPo_c_5wTB2S8UWF1q2HoA",
      name: "\uD83D\uDCC4 Page Partial",
      api_key: "page_partial",
      draft_mode_active: true,
      draft_saving_active: false,
      all_locales_required: true,
      collection_appearance: "table",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "IkynxKb9Q-ivP1066lXSUw",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single link field "Item" (`item`) in block model "\uD83D\uDD17 Page Partial Block" (`page_partial_block`)',
  );
  await client.fields.create("G8-kViMTTG62MbHNzPc7PQ", {
    id: "MitgdnMGTpuQkl6GFYPOLQ",
    label: "Item",
    field_type: "link",
    api_key: "item",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["XPo_c_5wTB2S8UWF1q2HoA"],
      },
    },
    appearance: {
      addons: [],
      editor: "link_embed",
      parameters: { filters: [] },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83D\uDCC4 Page Partial" (`page_partial`)',
  );
  await client.fields.create("XPo_c_5wTB2S8UWF1q2HoA", {
    id: "MQ4wms33QUOw1eVFO5Z_Hw",
    label: "Title",
    field_type: "string",
    api_key: "title",
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: true, placeholder: null },
    },
  });

  console.log(
    'Create Modular Content (Single block) field "Section" (`section`) in model "\uD83D\uDCC4 Page Partial" (`page_partial`)',
  );
  await client.fields.create("XPo_c_5wTB2S8UWF1q2HoA", {
    id: "YitgdnMGTpuQkl6GFYkGLQ",
    label: "Section",
    field_type: "single_block",
    api_key: "section",
    localized: true,
    validators: {
      single_block_blocks: {
        item_types: [
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          "1646744",
          "1757574",
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "2040174",
          "2040351",
          "2040362",
          "2486431",
          "CL2tcnR9TimpzQxNR2RKCg",
          "CrAZK2ukS-Cev0D-CSbA2g",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
        ],
      },
    },
    appearance: {
      addons: [],
      editor: "framed_single_block",
      parameters: { start_collapsed: false },
    },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          "1646744",
          "1757574",
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "2040174",
          "2040351",
          "2040362",
          "2486431",
          "AjYd96IgQYuBzefFaL5VBA",
          "G8-kViMTTG62MbHNzPc7PQ",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
        ],
      },
    },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update("Y66TEEOYTDuIltz0RySVEA", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "1757574",
          "2037668",
          "2040174",
          "2040362",
          "2486431",
          "CL2tcnR9TimpzQxNR2RKCg",
          "CrAZK2ukS-Cev0D-CSbA2g",
          "G8-kViMTTG62MbHNzPc7PQ",
          "AjYd96IgQYuBzefFaL5VBA"
        ],
      },
    },
  });

  console.log("Finalize models/block models");

  console.log('Update model "\uD83D\uDCC4 Page Partial" (`page_partial`)');
  await client.itemTypes.update("XPo_c_5wTB2S8UWF1q2HoA", {
    presentation_title_field: { id: "MQ4wms33QUOw1eVFO5Z_Hw", type: "field" },
    title_field: { id: "MQ4wms33QUOw1eVFO5Z_Hw", type: "field" },
  });

  console.log("Manage menu items");

  console.log('Create menu item "\uD83D\uDCC4 Page Partial"');
  await client.menuItems.create({
    id: "Oy1aApRhSiOwAxJ_k7nJJQ",
    label: "\uD83D\uDCC4 Page Partial",
    item_type: { id: "XPo_c_5wTB2S8UWF1q2HoA", type: "item_type" },
  });
}
