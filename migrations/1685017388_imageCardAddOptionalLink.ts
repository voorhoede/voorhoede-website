import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single link field "Link" (`link`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  newFields["7992343"] = await client.fields.create("1757575", {
    label: "Link",
    field_type: "link",
    api_key: "link",
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: ["55657"],
      },
    },
    appearance: { addons: [], editor: "link_select", parameters: {} },
  });
}
