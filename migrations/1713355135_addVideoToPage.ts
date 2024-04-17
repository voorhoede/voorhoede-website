import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.fields.update("10483125", {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          "41672",
          "44361",
          "1775016",
          "1939441",
          "1939442",
          "2040400",
          "2040401",
          "2040408",
        ],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
  });
}
