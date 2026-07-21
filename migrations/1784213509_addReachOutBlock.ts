import type { Client } from "datocms/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Manage upload filters");

  console.log("Create new models/block models");

  console.log(
    'Create block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.itemTypes.create(
    {
      id: "ZoimmZOiR0mkjwIEXN-9Ag",
      name: "\uD83D\uDCEB Reach Out Block",
      api_key: "reach_out_block",
      modular_block: true,
      draft_saving_active: false,
      hint: "",
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "cHcgOOPgQnmNK1KhQtszyA",
    },
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.fields.create("ZoimmZOiR0mkjwIEXN-9Ag", {
    id: "EHp6zyE8SviAA_ZP6_7IGw",
    label: "Title",
    field_type: "string",
    api_key: "title",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: null,
  });

  console.log(
    'Create Multiple-paragraph text field "Body" (`body`) in block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.fields.create("ZoimmZOiR0mkjwIEXN-9Ag", {
    id: "Y6t6FaY5Rja6wCh_U7EvIA",
    label: "Body",
    field_type: "text",
    api_key: "body",
    appearance: {
      addons: [],
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
    },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Form type" (`form_type`) in block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.fields.create("ZoimmZOiR0mkjwIEXN-9Ag", {
    id: "IyHLcfV7QpK-uRt2q3b-zQ",
    label: "Form type",
    field_type: "string",
    api_key: "form_type",
    validators: { enum: { values: ["none", "contact", "newsletter"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: "none",
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "CTA" (`cta`) in block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.fields.create("ZoimmZOiR0mkjwIEXN-9Ag", {
    id: "H489EN_rRLGImXYDsKVe4w",
    label: "CTA",
    field_type: "rich_text",
    api_key: "cta",
    validators: {
      rich_text_blocks: { item_types: ["2034503", "2037919"] },
      size: { max: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: null,
  });

  console.log(
    'Create Single link field "Contact person" (`contact_person`) in block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.fields.create("ZoimmZOiR0mkjwIEXN-9Ag", {
    id: "BKWwqY4oTn-D1sat_BhjQA",
    label: "Contact person",
    field_type: "link",
    api_key: "contact_person",
    hint: "Only used for 'contact' form type",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["38233"],
      },
    },
    appearance: {
      addons: [],
      editor: "link_select",
      parameters: { filters: [] },
    },
    default_value: null,
  });
}
