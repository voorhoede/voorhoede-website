import type { Client } from "datocms/lib/cma-client-node";

const INTERNAL_LINK_ID = "2037919";
const EXTERNAL_LINK_ID = "2034503";
const PAGE_ID = "2035421";
const HOME_ID = "NDtfKQsmTP6B48gv9tf8dg";
const GLOSSARY_TERM_ID = "IsaADh7aRxGueq_pxmIIQg";

const BODY_BLOCKS_MODELS = [
  { id: "2035421", field: "body_blocks" },
  { id: "NDtfKQsmTP6B48gv9tf8dg", field: "body_blocks" },
  { id: "38241", field: "body_blocks" },
  { id: "38240", field: "body_blocks" },
  { id: "XPo_c_5wTB2S8UWF1q2HoA", field: "blocks" },
];

export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => allTypes.find((t) => t.api_key === key);

  const notFoundPage = byKey("not_found_page");
  const eventModel = byKey("event");
  if (notFoundPage) {
    BODY_BLOCKS_MODELS.push({ id: notFoundPage.id, field: "body_blocks" });
  }
  if (eventModel) {
    BODY_BLOCKS_MODELS.push({ id: eventModel.id, field: "body_blocks" });
  }

  let imageGridItem = byKey("image_grid_item");
  if (!imageGridItem) {
    console.log('Create block model "Image Grid Item" (`image_grid_item`)');
    imageGridItem = await client.itemTypes.create(
      {
        name: "🖼️ Image Grid Item",
        api_key: "image_grid_item",
        modular_block: true,
        draft_saving_active: false,
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
  }

  let imageGridBlock = byKey("image_grid_block");
  if (!imageGridBlock) {
    console.log('Create block model "Image Grid Block" (`image_grid_block`)');
    imageGridBlock = await client.itemTypes.create(
      {
        name: "🖼️ Image Grid Block",
        api_key: "image_grid_block",
        modular_block: true,
        draft_saving_active: false,
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
  }

  const itemFields = await client.fields.list(imageGridItem.id);
  const hasField = (apiKey: string) =>
    itemFields.some((field) => field.api_key === apiKey);

  if (!hasField("title")) {
    await client.fields.create(imageGridItem.id, {
      label: "Title",
      field_type: "string",
      api_key: "title",
      validators: { required: {} },
      appearance: {
        addons: [],
        editor: "single_line",
        parameters: { heading: true, placeholder: null },
      },
      default_value: "",
    });
  }

  if (!hasField("image")) {
    await client.fields.create(imageGridItem.id, {
      label: "Image",
      field_type: "file",
      api_key: "image",
      hint: "Use a square illustration for card layout (170×170px).",
      validators: {
        required: {},
        extension: { extensions: [], predefined_list: "image" },
        required_alt_title: { title: false, alt: true },
      },
      appearance: { addons: [], editor: "file", parameters: {} },
      default_value: null,
    });
  }

  if (!hasField("body")) {
    await client.fields.create(imageGridItem.id, {
      label: "Body",
      field_type: "structured_text",
      api_key: "body",
      validators: {
        structured_text_blocks: { item_types: [] },
        structured_text_inline_blocks: { item_types: [] },
        structured_text_links: {
          on_publish_with_unpublished_references_strategy: "fail",
          on_reference_unpublish_strategy: "delete_references",
          on_reference_delete_strategy: "delete_references",
          item_types: [PAGE_ID, HOME_ID, GLOSSARY_TERM_ID],
        },
      },
      appearance: {
        addons: [],
        editor: "structured_text",
        parameters: {
          marks: ["strong", "emphasis"],
          nodes: ["link", "list"],
          heading_levels: [],
          blocks_start_collapsed: false,
          show_links_meta_editor: false,
          show_links_target_blank: true,
        },
      },
      default_value: null,
    });
  }

  if (!hasField("links")) {
    await client.fields.create(imageGridItem.id, {
      label: "Link",
      field_type: "rich_text",
      api_key: "links",
      validators: {
        rich_text_blocks: { item_types: [INTERNAL_LINK_ID, EXTERNAL_LINK_ID] },
        size: { max: 1 },
      },
      appearance: {
        addons: [],
        editor: "rich_text",
        parameters: { start_collapsed: false },
      },
      default_value: null,
    });
  }

  if (!hasField("is_full_width")) {
    await client.fields.create(imageGridItem.id, {
      label: "Is full width",
      field_type: "boolean",
      api_key: "is_full_width",
      appearance: { addons: [], editor: "boolean", parameters: {} },
      default_value: false,
    });
  }

  if (!hasField("is_highlighted")) {
    await client.fields.create(imageGridItem.id, {
      label: "Is highlighted",
      field_type: "boolean",
      api_key: "is_highlighted",
      appearance: { addons: [], editor: "boolean", parameters: {} },
      default_value: false,
    });
  }

  const blockFields = await client.fields.list(imageGridBlock.id);
  const hasBlockField = (apiKey: string) =>
    blockFields.some((field) => field.api_key === apiKey);

  if (!hasBlockField("title")) {
    await client.fields.create(imageGridBlock.id, {
      label: "Title",
      field_type: "string",
      api_key: "title",
      appearance: {
        addons: [],
        editor: "single_line",
        parameters: { heading: true, placeholder: null },
      },
      default_value: "",
    });
  }

  if (!hasBlockField("layout")) {
    await client.fields.create(imageGridBlock.id, {
      label: "Layout",
      field_type: "string",
      api_key: "layout",
      validators: {
        required: {},
        enum: { values: ["mosaic", "cards"] },
      },
      appearance: {
        addons: [],
        editor: "string_select",
        parameters: {
          options: [
            { label: "Mosaic (photo grid)", value: "mosaic", hint: "" },
            { label: "Cards (illustration cards)", value: "cards", hint: "" },
          ],
        },
      },
      default_value: "cards",
    });
  }

  if (!hasBlockField("card_orientation")) {
    await client.fields.create(imageGridBlock.id, {
      label: "Card orientation",
      field_type: "string",
      api_key: "card_orientation",
      validators: {
        required: {},
        enum: { values: ["vertical", "horizontal"] },
      },
      appearance: {
        addons: [],
        editor: "string_select",
        parameters: {
          options: [
            { label: "Vertical", value: "vertical", hint: "" },
            { label: "Horizontal", value: "horizontal", hint: "" },
          ],
        },
      },
      default_value: "vertical",
    });
  }

  if (!hasBlockField("items")) {
    await client.fields.create(imageGridBlock.id, {
      label: "Items",
      field_type: "rich_text",
      api_key: "items",
      validators: {
        rich_text_blocks: { item_types: [imageGridItem.id] },
        size: { min: 1 },
      },
      appearance: {
        addons: [],
        editor: "rich_text",
        parameters: { start_collapsed: true },
      },
      default_value: null,
    });
  }

  const findField = async (modelId: string, apiKey: string) => {
    const fields = await client.fields.list(modelId);
    return fields.find((f) => f.api_key === apiKey);
  };

  const appendBlockType = async (modelId: string, fieldApiKey: string) => {
    const field = await findField(modelId, fieldApiKey);
    if (!field) return;

    const current =
      field.validators?.rich_text_blocks?.item_types ?? [];
    if (current.includes(imageGridBlock.id)) return;

    await client.fields.update(field.id, {
      validators: {
        ...field.validators,
        rich_text_blocks: {
          item_types: [...current, imageGridBlock.id],
        },
      },
    });
  };

  console.log("Wiring image_grid_block into body_blocks palettes...");
  for (const { id, field } of BODY_BLOCKS_MODELS) {
    await appendBlockType(id, field);
  }

  const groupingItem = byKey("grouping_item");
  if (groupingItem) {
    await appendBlockType(groupingItem.id, "sections");
  }

  console.log("✅ image_grid_block + image_grid_item ready");
}
