import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Job content" (`job_content`) in model "Job" (`job`)'
  );
  await client.fields.update("182802", {
    validators: { rich_text_blocks: { item_types: ["1992764", "2040351"] } },
  });

  console.log("Destroy models/block models");

  console.log('Delete block model "Generic text block" (`generic_text_block`)');
  await client.itemTypes.destroy("41836", { skip_menu_items_deletion: true });
}
