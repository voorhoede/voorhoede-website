import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular content field "Link" (`links`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  newFields["9475475"] = await client.fields.create("1757575", {
    label: "Link",
    field_type: "rich_text",
    api_key: "links",
    validators: {
      rich_text_blocks: { item_types: ["2034503", "2037919"] },
      size: { max: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });
}
