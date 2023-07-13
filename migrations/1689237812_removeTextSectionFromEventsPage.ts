import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log(
    'Update Modular content field "Items" (`items`) in model "Event item" (`event_item`)'
  );
  await client.fields.update("217329", {
    validators: {
      rich_text_blocks: {
        item_types: ["2040351", "41672", "41885", "41924"],
      },
    },
  });
}
