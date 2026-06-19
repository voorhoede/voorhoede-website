import type { Client} from "datocms/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Structured text field "Text" (`text`) in block model "Section Image Card Grid" (`section_image_card_grid`)',
  );
  await client.fields.create("1757574", {
    id: "ZQa4n-GXSHysd0KepXvkNQ",
    label: "Text",
    field_type: "structured_text",
    api_key: "text",
    validators: {
      structured_text_blocks: { item_types: ["2034503", "2037919"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: [
          "strong",
          "code",
          "emphasis",
          "underline",
          "strikethrough",
          "highlight",
        ],
        nodes: [
          "blockquote",
          "code",
          "heading",
          "inlineItem",
          "itemLink",
          "link",
          "list",
          "thematicBreak",
        ],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: null,
  });

  console.log(
    'Create Structured text field "Text" (`text`) in block model "\uD83D\uDCBC Section Case List" (`section_case_list`)',
  );
  await client.fields.create("2486431", {
    id: "RkmmaYGcQ8WhFyHB0aCFSQ",
    label: "Text",
    field_type: "structured_text",
    api_key: "text",
    validators: {
      structured_text_blocks: { item_types: ["2034503", "2037919"] },
      structured_text_inline_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: [
          "strong",
          "code",
          "emphasis",
          "underline",
          "strikethrough",
          "highlight",
        ],
        nodes: [
          "blockquote",
          "code",
          "heading",
          "inlineItem",
          "itemLink",
          "link",
          "list",
          "thematicBreak",
        ],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: null,
  });
}
