import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Items" (`items`) in model "Service" (`service`)'
  );
  await client.fields.update("164064", {
    validators: {
      rich_text_blocks: {
        item_types: ["41672", "41836", "44361", "262363", "316629", "2040351"],
      },
    },
  });
}
