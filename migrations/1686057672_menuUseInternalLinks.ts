import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Creating new fields/fieldsets");

  const newLinksField = await client.fields.create("55608", {
    label: "Links new",
    field_type: "rich_text",
    api_key: "links_new",
    localized: true,
    validators: { rich_text_blocks: { item_types: ["2037919"] } },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Create Modular content field "Call to action" (`call_to_actions`) in model "Menu" (`menu`)'
  );
  const newcallToActionField = await client.fields.create("55608", {
    label: "Call to action new",
    field_type: "rich_text",
    api_key: "call_to_actions_new",
    localized: true,
    validators: {
      rich_text_blocks: { item_types: ["2037919"] },
      size: { eq: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
  });

  console.log()

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Multiple links field "Links" (`links`) in model "Menu" (`menu`)'
  );
  await client.fields.destroy("214318");

  console.log(
    'Delete Single link field "Call to Action" (`call_to_action`) in model "Menu" (`menu`)'
  );
  await client.fields.destroy("214319");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Links" (`links`) in model "Menu" (`menu`)'
  );
  await client.fields.update(newLinksField, { position: 1 });

  console.log(
    'Update Modular content field "Call to action" (`call_to_actions`) in model "Menu" (`menu`)'
  );
  await client.fields.update(newcallToActionField, { position: 2 });

  console.log(
    'Update Single-line string field "Title" (`title`) in model "Menu" (`menu`)'
  );
  await client.fields.update("214227", { position: 0 });

  // Update fields with pretty api keys, now old fields are removed

   await client.fields.update(newLinksField.id, {
    label: "Links",
    api_key: "links",
  });

  console.log(
    'Create Modular content field "Call to action" (`call_to_actions`) in model "Menu" (`menu`)'
  );
   await client.fields.update(newcallToActionField.id, {
    label: "Call to action",
    api_key: "call_to_actions",
  });
}
