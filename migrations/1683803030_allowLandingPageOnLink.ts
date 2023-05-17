import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single link field "Page" (`page`) in model "Link" (`link`)'
  );
  await client.fields.update("214320", {
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [
          "38234",
          "38235",
          "38237",
          "38238",
          "38242",
          "38245",
          "40014",
          "40180",
          "40181",
          "862258",
          "2035421",
        ],
      },
    },
  });
}
