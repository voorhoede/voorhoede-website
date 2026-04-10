import type { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log('Create block model "Menu Item" (`menu_item`)');
  await client.itemTypes.create(
    {
      id: "F3_9OXD7SVmcNnbSpj1yGg",
      name: "Menu Item",
      api_key: "menu_item",
      modular_block: true,
      draft_saving_active: false,
      hint: "",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "XIFAxFYFRtq35uE-qKP8ZA",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular Content (Single block) field "Link" (`link`) in block model "Menu Item" (`menu_item`)',
  );
  await client.fields.create("F3_9OXD7SVmcNnbSpj1yGg", {
    id: "KiG_qn-oQ4CHhOpnzAhrwQ",
    label: "Link",
    field_type: "single_block",
    api_key: "link",
    validators: {
      single_block_blocks: { item_types: ["2034503", "2037919"] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: "framed_single_block",
      parameters: { start_collapsed: false },
    },
    default_value: null,
  });

  console.log(
    'Create Single asset field "Image" (`image`) in block model "Menu Item" (`menu_item`)',
  );
  await client.fields.create("F3_9OXD7SVmcNnbSpj1yGg", {
    id: "Wc-VzQQTQrqc7mWfzpkN1A",
    label: "Image",
    field_type: "file",
    api_key: "image",
    validators: { required_alt_title: { title: false, alt: true } },
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });

  console.log('Create fieldset "Certificates" in model "Footer" (`footer`)');
  await client.fieldsets.create("47595", {
    id: "PvqIQFN4S1C_cbXc9vc-9g",
    title: "Certificates",
    collapsible: true,
    start_collapsed: true,
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Certificates Grid" (`certificates_grid`) in model "Footer" (`footer`)',
  );
  await client.fields.create("47595", {
    id: "F4MXL-00Sr-KfJn_gQAKYA",
    label: "Certificates Grid",
    field_type: "rich_text",
    api_key: "certificates_grid",
    validators: {
      rich_text_blocks: { item_types: ["F3_9OXD7SVmcNnbSpj1yGg"] },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: null,
    fieldset: { id: "PvqIQFN4S1C_cbXc9vc-9g", type: "fieldset" },
  });

  console.log("Destroy fields in existing models/block models");

  console.log('Delete fieldset "Certificates" in model "Footer" (`footer`)');
  await client.fieldsets.destroy("722063");

  console.log(
    'Delete Single asset field "Bcorp logo" (`bcorp_logo`) in model "Footer" (`footer`)',
  );
  await client.fields.destroy("9412470");

  console.log(
    'Delete Modular Content (Multiple blocks) field "B corp link" (`b_corp_links`) in model "Footer" (`footer`)',
  );
  await client.fields.destroy("9412471");

  console.log(
    'Delete Single asset field "Dutch digital agencies logo" (`dutch_digital_agencies_logo`) in model "Footer" (`footer`)',
  );
  await client.fields.destroy("9412472");

  console.log(
    'Delete Modular Content (Multiple blocks) field "Dutch digital agencies link" (`dutch_digital_agencies_links`) in model "Footer" (`footer`)',
  );
  await client.fields.destroy("9412473");

  console.log(
    'Delete Single asset field "ISO 27001 certification" (`iso27001certification`) in model "Footer" (`footer`)',
  );
  await client.fields.destroy("X9FELyPSTE20jpwSOrcxTA");

  console.log(
    'Delete Modular Content (Multiple blocks) field "ISO 27001 certification link" (`iso27001certification_link`) in model "Footer" (`footer`)',
  );
  await client.fields.destroy("I1Y_4gjeRdOdLpuK8LjubA");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Certificates Grid" (`certificates_grid`) in model "Footer" (`footer`)',
  );
  await client.fields.update("F4MXL-00Sr-KfJn_gQAKYA", { position: 0 });

  console.log('Update fieldset "Certificates" in model "Footer" (`footer`)');
  await client.fieldsets.update("PvqIQFN4S1C_cbXc9vc-9g", { position: 7 });

  console.log(
    'Update Single-line string field "Copyright link" (`copyright_link`) in model "Footer" (`footer`)',
  );
  await client.fields.update("181847", { position: 6 });

  console.log("Finalize models/block models");

  console.log('Update block model "Menu Item" (`menu_item`)');
  await client.itemTypes.update("F3_9OXD7SVmcNnbSpj1yGg", {
    presentation_title_field: { id: "KiG_qn-oQ4CHhOpnzAhrwQ", type: "field" },
    presentation_image_field: { id: "Wc-VzQQTQrqc7mWfzpkN1A", type: "field" },
  });

  console.log('Update model "Footer" (`footer`)');
  await client.itemTypes.update("47595", {
    presentation_image_field: null,
    image_preview_field: null,
  });
}
