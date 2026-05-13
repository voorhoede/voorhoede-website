import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single link field "Link" (`link`) in block model "\uD83D\uDD17 Internal Link" (`internal_link`)',
  );
  await client.fields.update("10463316", {
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "fail",
        on_reference_delete_strategy: "delete_references",
        item_types: [
          "38231",
          "38232",
          "38233",
          "38234",
          "38235",
          "38237",
          "38238",
          "38240",
          "38241",
          "40014",
          "40181",
          "2035421",
          "NDtfKQsmTP6B48gv9tf8dg",
          "OGDIRNe7SYm59ELNb_wwwA",
        ],
      },
      required: {},
    },
    appearance: {
      addons: [],
      editor: "link_select",
      parameters: { filters: [] },
    },
  });

  console.log(
    'Update Single asset field "Image" (`image`) in block model "Menu Item" (`menu_item`)',
  );
  await client.fields.update("Wc-VzQQTQrqc7mWfzpkN1A", {
    validators: { required: {} },
  });

  console.log("Destroy models/block models");

  console.log('Delete model "Home" (`home`)');
  await client.itemTypes.destroy("38242", { skip_menu_items_deletion: true });

  console.log('Delete block model "Text blocks item" (`text_blocks_item`)');
  await client.itemTypes.destroy("2019776", { skip_menu_items_deletion: true });

  console.log("Finalize models/block models");

  console.log('Update model "\uD83C\uDF10 Translation" (`translation`)');
  await client.itemTypes.update("55443", { name: "\uD83C\uDF10 Translation" });

  console.log(
    'Update block model "\uD83D\uDD17 External Link" (`external_link`)',
  );
  await client.itemTypes.update("2034503", {
    name: "\uD83D\uDD17 External Link",
  });

  console.log(
    'Update block model "\uD83D\uDD17 Internal Link" (`internal_link`)',
  );
  await client.itemTypes.update("2037919", {
    name: "\uD83D\uDD17 Internal Link",
  });

  console.log("Manage menu items");

  console.log('Delete menu item "Home"');
  await client.menuItems.destroy("34962");

  console.log('Delete menu item "Schema migration"');
  await client.menuItems.destroy("831459");

  console.log('Delete menu item "Redirect"');
  await client.menuItems.destroy("VF9uUibuRn68cZyNK1ePUg");

  console.log('Update menu item "Testimonials"');
  await client.menuItems.update("249748", { position: 61 });

  console.log('Update menu item "Tags"');
  await client.menuItems.update("DoTcSiJHRRSWdCtYB-kTSw", { position: 22 });

  console.log('Update menu item "Pivots"');
  await client.menuItems.update("52453", { position: 20 });

  console.log('Update menu item "Interstitial CTA"');
  await client.menuItems.update("601507", { position: 19 });

  console.log('Update menu item "\uD83C\uDF10 Translation"');
  await client.menuItems.update("48044", { label: "\uD83C\uDF10 Translation" });

  console.log("Manage schema menu items");

  console.log('Create block schema menu item "Sections"');
  await client.schemaMenuItems.create({
    id: "fKs80RlmQYODY14hZuMcug",
    label: "Sections",
    kind: "modular_block",
  });

  console.log('Create block schema menu item "\uD83C\uDF42 Legacy"');
  await client.schemaMenuItems.create({
    id: "dW6KK2DNQranQqopeW-xrg",
    label: "\uD83C\uDF42 Legacy",
    kind: "modular_block",
  });

  console.log(
    'Update block schema menu item for block model "Section Video" (`section_video`)',
  );
  await client.schemaMenuItems.update("by5IJkHxSoaaQ0JAR7IXWg", {
    position: 0,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Two column block" (`two_column_block`)',
  );
  await client.schemaMenuItems.update("S6y8KsIDTnCxfD3vNiVR1g", {
    position: 0,
    parent: { id: "dW6KK2DNQranQqopeW-xrg", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Text Section" (`text_section`)',
  );
  await client.schemaMenuItems.update("QBIUT5X-QrKiFGyWuavSOQ", {
    position: 2,
    parent: { id: "dW6KK2DNQranQqopeW-xrg", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Timeline" (`section_timeline`)',
  );
  await client.schemaMenuItems.update("NoSLKt5OSRyamo6su-esOQ", {
    position: 1,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Team Gallery" (`section_team_gallery`)',
  );
  await client.schemaMenuItems.update("DN6wPHtaT4mlSXTIO7OWHQ", {
    position: 2,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Structured Text" (`section_structured_text`)',
  );
  await client.schemaMenuItems.update("WN5udfaISQGRBJN8fuiL_g", {
    position: 3,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Newsletter" (`section_newsletter`)',
  );
  await client.schemaMenuItems.update("CeucRjeGQx2ro3zwWvG1YQ", {
    position: 4,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Jobs List" (`section_jobs_list`)',
  );
  await client.schemaMenuItems.update("V7FV0xpCS1mJ-eMdnScEHA", {
    position: 6,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Interstitial CTA" (`section_interstitial_cta`)',
  );
  await client.schemaMenuItems.update("CzvQoQpIQh2X-z5itjcD3w", {
    position: 7,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Image & Text" (`section_image_text`)',
  );
  await client.schemaMenuItems.update("BEFP-BQDTnWxsZNs-AWKHA", {
    position: 8,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Header" (`section_header`)',
  );
  await client.schemaMenuItems.update("ScrTHsOsTPat4AcdY9qJTw", {
    position: 5,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Image Grid Item" (`section_image_grid_item`)',
  );
  await client.schemaMenuItems.update("LgjW6kYrR1aJZQkuRhp-RA", {
    position: 10,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Image Grid" (`section_image_grid`)',
  );
  await client.schemaMenuItems.update("cVKDa3UjTki4zA9XB7v7JA", {
    position: 9,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Image Card Grid Item" (`section_image_card_grid_item`)',
  );
  await client.schemaMenuItems.update("UkMxUSXPSUSLXmENRBbhBQ", {
    position: 12,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Image Card Grid" (`section_image_card_grid`)',
  );
  await client.schemaMenuItems.update("IoW0N4iqQ8mzM-lA8x5Q1w", {
    position: 11,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Page introduction section" (`page_introduction_section`)',
  );
  await client.schemaMenuItems.update("UApc-xfWRtikW33oDkFI-w", {
    position: 1,
    parent: { id: "dW6KK2DNQranQqopeW-xrg", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Events Section" (`section_events_section`)',
  );
  await client.schemaMenuItems.update("IcHs9SeBTdGgRzeNmuU1iA", {
    position: 13,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "Section Blogs Section" (`section_blogs_section`)',
  );
  await client.schemaMenuItems.update("Rt41-cBMTjieHyDkj9QiMA", {
    position: 14,
    parent: { id: "fKs80RlmQYODY14hZuMcug", type: "schema_menu_item" },
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDDC2\uFE0F Grouping Item" (`grouping_item`)',
  );
  await client.schemaMenuItems.update("BlC03-W1RAWEpWsw8mn2IQ", {
    position: 2,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCDD \uD83D\uDDBC\uFE0F Section Text Image" (`section_text_image`)',
  );
  await client.schemaMenuItems.update("DSeGziuYRt-wnoOnR6Dqfg", {
    position: 1,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDDC3\uFE0F Section Grouping" (`section_grouping`)',
  );
  await client.schemaMenuItems.update("Yn4cW8mzRNaSalvV9q79NQ", {
    position: 5,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.schemaMenuItems.update("Z0EtJ3vRRJawpSGv9I-YKA", {
    position: 6,
  });

  console.log('Update block schema menu item "Sections"');
  await client.schemaMenuItems.update("fKs80RlmQYODY14hZuMcug", {
    position: 9,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.schemaMenuItems.update("eGo_r3pxQa2kApDyuL4BIg", {
    position: 13,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDF10 Translation" (`translation`)',
  );
  await client.schemaMenuItems.update("I_4vyXBTQAS8VOGJ0ZdquA", {
    position: 12,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFF7\uFE0F Section Logo Grid" (`section_logo_grid`)',
  );
  await client.schemaMenuItems.update("W1LYVIDmRye4gZ0GgBdenQ", {
    position: 4,
  });

  console.log(
    'Update block schema menu item for block model "\uD83E\uDDD1\u200D\uD83E\uDDD2\u200D\uD83E\uDDD2 Section Dialogue CTA" (`section_dialogue_cta`)',
  );
  await client.schemaMenuItems.update("QebsWueNQAuuVxcjJBCmgA", {
    position: 3,
  });

  console.log(
    'Update model schema menu item for model "Schema migration" (`schema_migration`)',
  );
  await client.schemaMenuItems.update("RP3zbsUgTgSsXmycSHQqfg", {
    position: 11,
  });

  console.log(
    'Update model schema menu item for model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.schemaMenuItems.update("E6xqsK2dSNmbcbb85vqZew", {
    position: 14,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDD17 Internal Link" (`internal_link`)',
  );
  await client.schemaMenuItems.update("NyWUF8WTR7SeMyLryOoZFQ", {
    position: 7,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDD17 External Link" (`external_link`)',
  );
  await client.schemaMenuItems.update("FbmUrfaOThWf3MOzUDpnVw", {
    position: 8,
  });

  console.log('Update block schema menu item "\uD83C\uDF42 Legacy"');
  await client.schemaMenuItems.update("dW6KK2DNQranQqopeW-xrg", {
    position: 82,
  });

  console.log(
    'Update block schema menu item for block model "Blue Text" (`structured_text_blue_text`)',
  );
  await client.schemaMenuItems.update("XDZwP2uhQheRorJYE5AVzA", {
    position: 18,
  });

  console.log(
    'Update block schema menu item for block model "Buttons List" (`structured_text_buttons_list`)',
  );
  await client.schemaMenuItems.update("KuKJx2DbQkizqWEOf9CD8A", {
    position: 19,
  });

  console.log(
    'Update model schema menu item for model "Blog post overview" (`blog_post_overview`)',
  );
  await client.schemaMenuItems.update("XnoRQvfDSS-NhtcaN1GrMw", {
    position: 17,
  });

  console.log(
    'Update block schema menu item for block model "Call to action" (`call_to_action`)',
  );
  await client.schemaMenuItems.update("Z-nb-ZgFQHOTbUrubdcgNQ", {
    position: 20,
  });

  console.log('Update model schema menu item for model "App" (`app`)');
  await client.schemaMenuItems.update("IAFR9vR0RSOQCvzmqhP6qg", {
    position: 15,
  });

  console.log(
    'Update model schema menu item for model "Blog post" (`blog_post`)',
  );
  await client.schemaMenuItems.update("cM1yIda_SuOccnlzEjXJCQ", {
    position: 16,
  });

  console.log(
    'Update block schema menu item for block model "Image" (`image`)',
  );
  await client.schemaMenuItems.update("FHH-bLx4SrCVS8kddAAXpQ", {
    position: 45,
  });

  console.log(
    'Update model schema menu item for model "Interstitial CTA" (`interstitial_cta`)',
  );
  await client.schemaMenuItems.update("fO16Fy59QFKInh4eT5q8fQ", {
    position: 46,
  });

  console.log(
    'Update model schema menu item for model "Location" (`location`)',
  );
  await client.schemaMenuItems.update("UJGS9sdYTemZeO2VqadQ7Q", {
    position: 54,
  });

  console.log('Update model schema menu item for model "Job" (`job`)');
  await client.schemaMenuItems.update("C11xkczHRiu-N49upw9l8w", {
    position: 47,
  });

  console.log('Update model schema menu item for model "Job CTA" (`job_cta`)');
  await client.schemaMenuItems.update("Ah1Oo0joSOGL6hFpu6yg4Q", {
    position: 48,
  });

  console.log(
    'Update model schema menu item for model "Open graph image" (`open_graph_image`)',
  );
  await client.schemaMenuItems.update("KPxhZmJpT6SDLklEjVMpfQ", {
    position: 56,
  });

  console.log(
    'Update block schema menu item for block model "Legal item" (`legal_item`)',
  );
  await client.schemaMenuItems.update("Fcrln98cS-qt8HuUaZBwgQ", {
    position: 51,
  });

  console.log(
    'Update model schema menu item for model "Job overview" (`job_overview`)',
  );
  await client.schemaMenuItems.update("Q5Cc_ppSQVGSQb0AzaKdNw", {
    position: 49,
  });

  console.log(
    'Update model schema menu item for model "Join our team" (`join_our_team`)',
  );
  await client.schemaMenuItems.update("d2TcEb-QSt-s7M0Kga-5yg", {
    position: 50,
  });

  console.log(
    'Update block schema menu item for block model "Link Section" (`link_section`)',
  );
  await client.schemaMenuItems.update("FABui7CwQeylJ0oeqlTipw", {
    position: 52,
  });

  console.log(
    'Update block schema menu item for block model "List item" (`list_item`)',
  );
  await client.schemaMenuItems.update("GlWUXmKmQMGDNqQdOrc3rA", {
    position: 53,
  });

  console.log('Update model schema menu item for model "Menu" (`menu`)');
  await client.schemaMenuItems.update("caSXJTrQR-CHE1-96kLVuw", {
    position: 55,
  });

  console.log(
    'Update block schema menu item for block model "Menu Item" (`menu_item`)',
  );
  await client.schemaMenuItems.update("XIFAxFYFRtq35uE-qKP8ZA", {
    position: 81,
  });

  console.log(
    'Update block schema menu item for block model "Responsive video" (`responsive_video`)',
  );
  await client.schemaMenuItems.update("QZbs6Q2WQfSuneseJZpA1w", {
    position: 61,
  });

  console.log(
    'Update block schema menu item for block model "Quote" (`quote`)',
  );
  await client.schemaMenuItems.update("aXV_71m1RhOlE_jaHVIZDg", {
    position: 59,
  });

  console.log(
    'Update model schema menu item for model "Redirect" (`redirect`)',
  );
  await client.schemaMenuItems.update("Qd_Twj5sSWKYlAqvOQGUnA", {
    position: 60,
  });

  console.log('Update model schema menu item for model "Person" (`person`)');
  await client.schemaMenuItems.update("G2HaBpR7TDyvt5WtYTCLFw", {
    position: 57,
  });

  console.log(
    'Update model schema menu item for model "Pivot section" (`pivot_section`)',
  );
  await client.schemaMenuItems.update("eYO1IoXFQJGe81e2OllobQ", {
    position: 58,
  });

  console.log(
    'Update block schema menu item for block model "Address" (`address`)',
  );
  await client.schemaMenuItems.update("Ri4zRm6BTReWQCfsvm8kyA", {
    position: 10,
  });

  console.log('Update model schema menu item for model "Usp" (`usp`)');
  await client.schemaMenuItems.update("XcVV-O4pQEKhDCamO6kccw", {
    position: 78,
  });

  console.log('Update model schema menu item for model "Meet" (`meet`)');
  await client.schemaMenuItems.update("H_cxwJp6Sa-TcCGzRqXzRA", {
    position: 79,
  });

  console.log('Update model schema menu item for model "Tag" (`tag`)');
  await client.schemaMenuItems.update("btkIhgW0S6OODEExy7dzMw", {
    position: 80,
  });

  console.log(
    'Update block schema menu item for block model "Testimonial block" (`testimonial_block`)',
  );
  await client.schemaMenuItems.update("Lxd7fcK2R2WIdKcOy30DVw", {
    position: 74,
  });

  console.log('Update model schema menu item for model "Service" (`service`)');
  await client.schemaMenuItems.update("NsiaNm-dQMuzw2RwgRk4jQ", {
    position: 62,
  });

  console.log(
    'Update model schema menu item for model "Service overview" (`service_overview`)',
  );
  await client.schemaMenuItems.update("b_TAq35JTJS5AhF1_3QH3Q", {
    position: 63,
  });

  console.log(
    'Update model schema menu item for model "Service page series" (`service_page_series`)',
  );
  await client.schemaMenuItems.update("YRjnRk3mSW-omOd02vL1YQ", {
    position: 64,
  });

  console.log(
    'Update model schema menu item for model "Storytelling section" (`storytelling_section`)',
  );
  await client.schemaMenuItems.update("KjD-mnxwTYujik0ltXXbbw", {
    position: 67,
  });

  console.log(
    'Update block schema menu item for block model "Timeline item" (`timeline_item`)',
  );
  await client.schemaMenuItems.update("Ossj_SlFQjS17k_xTZlIxA", {
    position: 77,
  });

  console.log(
    'Update model schema menu item for model "Team grid panel" (`team_grid_panel`)',
  );
  await client.schemaMenuItems.update("UpfJTn7jTSCQW1codGrfXg", {
    position: 72,
  });

  console.log(
    'Update model schema menu item for model "Technology" (`technology`)',
  );
  await client.schemaMenuItems.update("Tg6qFp6tRaaU2beEdMnvLw", {
    position: 73,
  });

  console.log(
    'Update block schema menu item for block model "Storytelling block" (`storytelling_block`)',
  );
  await client.schemaMenuItems.update("FWRJF-0_R0mllfM6MjxVSw", {
    position: 65,
  });

  console.log(
    'Update block schema menu item for block model "Storytelling item" (`storytelling_item`)',
  );
  await client.schemaMenuItems.update("V9_HnmIVTzmvedRyRjIqHA", {
    position: 66,
  });

  console.log(
    'Update block schema menu item for block model "Structured text" (`structured_text`)',
  );
  await client.schemaMenuItems.update("DPiRiE_AQYyqC79dJ1axHw", {
    position: 68,
  });

  console.log(
    'Update block schema menu item for block model "Structured Text Image" (`structured_text_image`)',
  );
  await client.schemaMenuItems.update("W2-a81_fRYeaLUqAesYbiw", {
    position: 69,
  });

  console.log(
    'Update block schema menu item for block model "Counter Item" (`counter_item`)',
  );
  await client.schemaMenuItems.update("BAzt0ofiRsmEpIzCb2FxlQ", {
    position: 70,
  });

  console.log(
    'Update block schema menu item for block model "Counter Item List" (`structured_text_counter_item_list`)',
  );
  await client.schemaMenuItems.update("N9qjN7BSSDeavY2J8mYdsA", {
    position: 71,
  });

  console.log(
    'Update model schema menu item for model "testimonial item" (`testimonial_item`)',
  );
  await client.schemaMenuItems.update("GkP77CQ0TJqwHV5EP4qYMQ", {
    position: 75,
  });
}
