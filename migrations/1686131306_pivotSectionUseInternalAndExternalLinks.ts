import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular content field "Link" (`links`) in model "Pivot section" (`pivot_section`)'
  );
  newFields["8405234"] = await client.fields.create("61898", {
    label: "Link",
    field_type: "rich_text",
    api_key: "links",
    localized: true,
    validators: {
      rich_text_blocks: { item_types: ["2034503", "2037919"] },
      size: { max: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: { en: null, nl: null },
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Link" (`links`) in model "Pivot section" (`pivot_section`)'
  );
  await client.fields.update(newFields["8405234"], { position: 6 });

  console.log(
    'Update Single link field "Internal link" (`internal_link`) in model "Pivot section" (`pivot_section`)'
  );
  await client.fields.update("236126", {
    label: "Internal link",
    api_key: "internal_link",
  });
}
