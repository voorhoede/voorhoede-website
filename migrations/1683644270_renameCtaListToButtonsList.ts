import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Buttons" (`buttons`) in block model "Structured Text - Buttons List" (`structured_text_buttons_list`)'
  );
  await client.fields.update("10483476", {
    label: "Buttons",
    api_key: "buttons",
  });

  console.log("Finalize models/block models");

  console.log(
    'Update block model "Structured Text - Buttons List" (`structured_text_buttons_list`)'
  );
  await client.itemTypes.update("2040408", {
    name: "Structured Text - Buttons List",
    api_key: "structured_text_buttons_list",
  });
}
