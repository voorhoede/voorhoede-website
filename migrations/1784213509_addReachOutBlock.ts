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

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "262363",
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
          "BSet0e3fTeWC8-a8odR7VA",
          "G8-kViMTTG62MbHNzPc7PQ",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
          "ZoimmZOiR0mkjwIEXN-9Ag",
        ],
      },
    },
  });

  console.log(
    'Update Modular Content (Single block) field "Section" (`section`) in model "\uD83D\uDCC4 Page Partial" (`page_partial`)',
  );
  await client.fields.update("YitgdnMGTpuQkl6GFYkGLQ", {
    validators: {
      single_block_blocks: {
        item_types: [
          "262363",
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
          "ZoimmZOiR0mkjwIEXN-9Ag",
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
          "BSet0e3fTeWC8-a8odR7VA",
          "CL2tcnR9TimpzQxNR2RKCg",
          "CrAZK2ukS-Cev0D-CSbA2g",
          "G8-kViMTTG62MbHNzPc7PQ",
          "ZoimmZOiR0mkjwIEXN-9Ag",
        ],
      },
    },
  });

  console.log("Finalize models/block models");

  console.log('Update block model "\uD83D\uDCDD Text Block" (`text_block`)');
  await client.itemTypes.update("BSet0e3fTeWC8-a8odR7VA", {
    presentation_title_field: { id: "I77l-rzcRaqrWAFbEGFDDA", type: "field" },
  });

  console.log("Manage schema menu items");

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCEB Reach Out Block" (`reach_out_block`)',
  );
  await client.schemaMenuItems.update("cHcgOOPgQnmNK1KhQtszyA", {
    position: 0,
    parent: { id: "fHSQg75fSUuJUP45LOV4XA", type: "schema_menu_item" },
  });

  console.log(
    'Update model schema menu item for model "\uD83D\uDCC4 Page Partial" (`page_partial`)',
  );
  await client.schemaMenuItems.update("IkynxKb9Q-ivP1066lXSUw", {
    position: 8,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.schemaMenuItems.update("DSeGziuYRt-wnoOnR6Dqfg", {
    position: 11,
  });

  console.log(
    'Update block schema menu item for block model "Link Section" (`link_section`)',
  );
  await client.schemaMenuItems.update("FABui7CwQeylJ0oeqlTipw", {
    position: 48,
  });

  console.log(
    'Update model schema menu item for model "Join our team" (`join_our_team`)',
  );
  await client.schemaMenuItems.update("d2TcEb-QSt-s7M0Kga-5yg", {
    position: 46,
  });

  console.log(
    'Update model schema menu item for model "testimonial item" (`testimonial_item`)',
  );
  await client.schemaMenuItems.update("GkP77CQ0TJqwHV5EP4qYMQ", {
    position: 71,
  });

  console.log(
    'Update block schema menu item for block model "Blue Text" (`structured_text_blue_text`)',
  );
  await client.schemaMenuItems.update("XDZwP2uhQheRorJYE5AVzA", {
    position: 12,
  });

  console.log(
    'Update model schema menu item for model "Contact item" (`contact_item`)',
  );
  await client.schemaMenuItems.update("MC-j0JBQSb6OFrRjnhD1ww", {
    position: 25,
  });

  console.log('Update model schema menu item for model "Service" (`service`)');
  await client.schemaMenuItems.update("NsiaNm-dQMuzw2RwgRk4jQ", {
    position: 58,
  });

  console.log(
    'Update model schema menu item for model "Case overview" (`case_overview`)',
  );
  await client.schemaMenuItems.update("FT0PsXYPQemNLfD8cay0ow", {
    position: 19,
  });

  console.log(
    'Update block schema menu item for block model "Timeline item" (`timeline_item`)',
  );
  await client.schemaMenuItems.update("Ossj_SlFQjS17k_xTZlIxA", {
    position: 73,
  });

  console.log('Update model schema menu item for model "Meet" (`meet`)');
  await client.schemaMenuItems.update("H_cxwJp6Sa-TcCGzRqXzRA", {
    position: 75,
  });

  console.log('Update model schema menu item for model "Tag" (`tag`)');
  await client.schemaMenuItems.update("btkIhgW0S6OODEExy7dzMw", {
    position: 76,
  });

  console.log(
    'Update model schema menu item for model "Service overview" (`service_overview`)',
  );
  await client.schemaMenuItems.update("b_TAq35JTJS5AhF1_3QH3Q", {
    position: 59,
  });

  console.log(
    'Update model schema menu item for model "Service page series" (`service_page_series`)',
  );
  await client.schemaMenuItems.update("YRjnRk3mSW-omOd02vL1YQ", {
    position: 60,
  });

  console.log('Update model schema menu item for model "Job" (`job`)');
  await client.schemaMenuItems.update("C11xkczHRiu-N49upw9l8w", {
    position: 43,
  });

  console.log(
    'Update block schema menu item for block model "Buttons List" (`structured_text_buttons_list`)',
  );
  await client.schemaMenuItems.update("KuKJx2DbQkizqWEOf9CD8A", {
    position: 15,
  });

  console.log(
    'Update model schema menu item for model "Case item" (`case_item`)',
  );
  await client.schemaMenuItems.update("Aw_p_53MRc6AeFaENXWPjA", {
    position: 17,
  });

  console.log(
    'Update model schema menu item for model "Case metadata" (`case_md`)',
  );
  await client.schemaMenuItems.update("EiIwCFmzQZKInWBj61RX2Q", {
    position: 18,
  });

  console.log(
    'Update model schema menu item for model "Interstitial CTA" (`interstitial_cta`)',
  );
  await client.schemaMenuItems.update("fO16Fy59QFKInh4eT5q8fQ", {
    position: 42,
  });

  console.log('Update model schema menu item for model "Menu" (`menu`)');
  await client.schemaMenuItems.update("caSXJTrQR-CHE1-96kLVuw", {
    position: 51,
  });

  console.log(
    'Update model schema menu item for model "Open graph image" (`open_graph_image`)',
  );
  await client.schemaMenuItems.update("KPxhZmJpT6SDLklEjVMpfQ", {
    position: 52,
  });

  console.log(
    'Update block schema menu item for block model "Code pen block" (`code_pen_block`)',
  );
  await client.schemaMenuItems.update("H85_ZT6dTDGRUBYOBqi4gA", {
    position: 22,
  });

  console.log(
    'Update block schema menu item for block model "Gallery block" (`gallery_block`)',
  );
  await client.schemaMenuItems.update("AdyMjETWSXO_bfH7myLtng", {
    position: 36,
  });

  console.log(
    'Update block schema menu item for block model "Generic text block" (`generic_text_block`)',
  );
  await client.schemaMenuItems.update("epuQnEGxRxu8fExjuu74KA", {
    position: 37,
  });

  console.log(
    'Update block schema menu item for block model "Highlighted List" (`structured_text_highlighted_list`)',
  );
  await client.schemaMenuItems.update("ZkCv2pANRk-CEzzYaFM22Q", {
    position: 38,
  });

  console.log(
    'Update block schema menu item for block model "Highlighted List Item" (`structured_text_highlighted_list_item`)',
  );
  await client.schemaMenuItems.update("DAsacEYVT5WPnHFeZrcAEA", {
    position: 39,
  });

  console.log(
    'Update model schema menu item for model "Event item" (`event_item`)',
  );
  await client.schemaMenuItems.update("W9UvYjCaQ0SKwZCaowAPbw", {
    position: 29,
  });

  console.log(
    'Update model schema menu item for model "Event label" (`event_label`)',
  );
  await client.schemaMenuItems.update("G3Q9Zp8mRKKSQDUjHjn7zA", {
    position: 30,
  });

  console.log(
    'Update model schema menu item for model "Event location" (`event_location`)',
  );
  await client.schemaMenuItems.update("b33SVUkzStK0LyrCIXsJmQ", {
    position: 31,
  });

  console.log('Update model schema menu item for model "App" (`app`)');
  await client.schemaMenuItems.update("IAFR9vR0RSOQCvzmqhP6qg", {
    position: 11,
  });

  console.log(
    'Update model schema menu item for model "Blog post" (`blog_post`)',
  );
  await client.schemaMenuItems.update("cM1yIda_SuOccnlzEjXJCQ", {
    position: 13,
  });

  console.log(
    'Update model schema menu item for model "Blog post overview" (`blog_post_overview`)',
  );
  await client.schemaMenuItems.update("XnoRQvfDSS-NhtcaN1GrMw", {
    position: 14,
  });

  console.log(
    'Update model schema menu item for model "Contact confirmation" (`contact_confirmation`)',
  );
  await client.schemaMenuItems.update("MQbPf0ilTn6tklrt1PAxjA", {
    position: 24,
  });

  console.log('Update model schema menu item for model "Person" (`person`)');
  await client.schemaMenuItems.update("G2HaBpR7TDyvt5WtYTCLFw", {
    position: 53,
  });

  console.log(
    'Update model schema menu item for model "Pivot section" (`pivot_section`)',
  );
  await client.schemaMenuItems.update("eYO1IoXFQJGe81e2OllobQ", {
    position: 54,
  });

  console.log(
    'Update model schema menu item for model "Redirect" (`redirect`)',
  );
  await client.schemaMenuItems.update("Qd_Twj5sSWKYlAqvOQGUnA", {
    position: 56,
  });

  console.log(
    'Update block schema menu item for block model "Testimonial block" (`testimonial_block`)',
  );
  await client.schemaMenuItems.update("Lxd7fcK2R2WIdKcOy30DVw", {
    position: 70,
  });

  console.log(
    'Update block schema menu item for block model "Storytelling block" (`storytelling_block`)',
  );
  await client.schemaMenuItems.update("FWRJF-0_R0mllfM6MjxVSw", {
    position: 61,
  });

  console.log(
    'Update model schema menu item for model "Storytelling section" (`storytelling_section`)',
  );
  await client.schemaMenuItems.update("KjD-mnxwTYujik0ltXXbbw", {
    position: 63,
  });

  console.log(
    'Update model schema menu item for model "Team grid panel" (`team_grid_panel`)',
  );
  await client.schemaMenuItems.update("UpfJTn7jTSCQW1codGrfXg", {
    position: 68,
  });

  console.log(
    'Update block schema menu item for block model "List item" (`list_item`)',
  );
  await client.schemaMenuItems.update("GlWUXmKmQMGDNqQdOrc3rA", {
    position: 49,
  });

  console.log(
    'Update block schema menu item for block model "Storytelling item" (`storytelling_item`)',
  );
  await client.schemaMenuItems.update("V9_HnmIVTzmvedRyRjIqHA", {
    position: 62,
  });

  console.log(
    'Update model schema menu item for model "Technology" (`technology`)',
  );
  await client.schemaMenuItems.update("Tg6qFp6tRaaU2beEdMnvLw", {
    position: 69,
  });

  console.log(
    'Update block schema menu item for block model "Quote" (`quote`)',
  );
  await client.schemaMenuItems.update("aXV_71m1RhOlE_jaHVIZDg", {
    position: 55,
  });

  console.log(
    'Update block schema menu item for block model "Structured text" (`structured_text`)',
  );
  await client.schemaMenuItems.update("DPiRiE_AQYyqC79dJ1axHw", {
    position: 64,
  });

  console.log(
    'Update block schema menu item for block model "Code block" (`code_block`)',
  );
  await client.schemaMenuItems.update("Hut0XgTCRlWSjK7seXKYcg", {
    position: 21,
  });

  console.log(
    'Update block schema menu item for block model "Call to action" (`call_to_action`)',
  );
  await client.schemaMenuItems.update("Z-nb-ZgFQHOTbUrubdcgNQ", {
    position: 16,
  });

  console.log(
    'Update model schema menu item for model "Case teaser" (`case_teaser`)',
  );
  await client.schemaMenuItems.update("BpL70l8ST7-Q18ui5axaeA", {
    position: 20,
  });

  console.log('Update model schema menu item for model "Contact" (`contact`)');
  await client.schemaMenuItems.update("X7eUilkISDKTFGvvZBLUVQ", {
    position: 23,
  });

  console.log(
    'Update model schema menu item for model "Event overview" (`event_overview`)',
  );
  await client.schemaMenuItems.update("VBp1egYOSrqTw-hSnSqp4A", {
    position: 32,
  });

  console.log(
    'Update model schema menu item for model "Expertise" (`expertise`)',
  );
  await client.schemaMenuItems.update("eIXr7LdiTJOsBgj5AP9hyA", {
    position: 33,
  });

  console.log('Update model schema menu item for model "Footer" (`footer`)');
  await client.schemaMenuItems.update("bhezfz6eR62QA66dzuSloQ", {
    position: 34,
  });

  console.log('Update model schema menu item for model "Gallery" (`gallery`)');
  await client.schemaMenuItems.update("U-GEhMMhQ62-586boI2Ydg", {
    position: 35,
  });

  console.log('Update model schema menu item for model "Job CTA" (`job_cta`)');
  await client.schemaMenuItems.update("Ah1Oo0joSOGL6hFpu6yg4Q", {
    position: 44,
  });

  console.log(
    'Update model schema menu item for model "Job overview" (`job_overview`)',
  );
  await client.schemaMenuItems.update("Q5Cc_ppSQVGSQb0AzaKdNw", {
    position: 45,
  });

  console.log(
    'Update model schema menu item for model "Location" (`location`)',
  );
  await client.schemaMenuItems.update("UJGS9sdYTemZeO2VqadQ7Q", {
    position: 50,
  });

  console.log(
    'Update block schema menu item for block model "Image" (`image`)',
  );
  await client.schemaMenuItems.update("FHH-bLx4SrCVS8kddAAXpQ", {
    position: 41,
  });

  console.log(
    'Update model schema menu item for model "Custom Page" (`custom_page`)',
  );
  await client.schemaMenuItems.update("JiL-NBt1Rsa0YU6q9GJpJQ", {
    position: 26,
  });

  console.log(
    'Update model schema menu item for model "Deliverable" (`deliverable`)',
  );
  await client.schemaMenuItems.update("Clfcu-nKQJ-U9VcTVhXurQ", {
    position: 27,
  });

  console.log(
    'Update model schema menu item for model "Error page" (`error_page`)',
  );
  await client.schemaMenuItems.update("YbYUK_XERBehXHeYB0cBjw", {
    position: 28,
  });

  console.log(
    'Update block schema menu item for block model "Responsive video" (`responsive_video`)',
  );
  await client.schemaMenuItems.update("QZbs6Q2WQfSuneseJZpA1w", {
    position: 57,
  });

  console.log(
    'Update block schema menu item for block model "Section Glossary" (`section_glossary`)',
  );
  await client.schemaMenuItems.update("MsHPuZ9YTWmT1s5a1_sdCw", {
    position: 79,
  });

  console.log(
    'Update model schema menu item for model "Glossary Term" (`glossary_term`)',
  );
  await client.schemaMenuItems.update("YCPrcCHYQpiysCLjifgDHg", {
    position: 80,
  });

  console.log('Update block schema menu item "\uD83C\uDF42 Legacy"');
  await client.schemaMenuItems.update("dW6KK2DNQranQqopeW-xrg", {
    position: 78,
  });

  console.log(
    'Update block schema menu item for block model "Structured Text Image" (`structured_text_image`)',
  );
  await client.schemaMenuItems.update("W2-a81_fRYeaLUqAesYbiw", {
    position: 65,
  });

  console.log(
    'Update block schema menu item for block model "Legal item" (`legal_item`)',
  );
  await client.schemaMenuItems.update("Fcrln98cS-qt8HuUaZBwgQ", {
    position: 47,
  });

  console.log('Update model schema menu item for model "Usp" (`usp`)');
  await client.schemaMenuItems.update("XcVV-O4pQEKhDCamO6kccw", {
    position: 74,
  });

  console.log(
    'Update block schema menu item for block model "Menu Item" (`menu_item`)',
  );
  await client.schemaMenuItems.update("XIFAxFYFRtq35uE-qKP8ZA", {
    position: 77,
  });

  console.log(
    'Update block schema menu item for block model "Counter Item" (`counter_item`)',
  );
  await client.schemaMenuItems.update("BAzt0ofiRsmEpIzCb2FxlQ", {
    position: 66,
  });

  console.log(
    'Update block schema menu item for block model "Counter Item List" (`structured_text_counter_item_list`)',
  );
  await client.schemaMenuItems.update("N9qjN7BSSDeavY2J8mYdsA", {
    position: 67,
  });
}
