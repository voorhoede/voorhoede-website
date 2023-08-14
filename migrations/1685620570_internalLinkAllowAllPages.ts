import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single link field "Link" (`link`) in block model "Internal Link" (`internal_link`)'
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
          "38242",
          "40014",
          "40181",
          "2035421",
        ],
      },
      required: {},
    },
  });
}
