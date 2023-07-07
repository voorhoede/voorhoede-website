import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Modular content field "Services section" (`services_sections`) in model "Home" (`home`)'
  );
  newFields["9730458"] = await client.fields.create("38242", {
    label: "Services section",
    field_type: "rich_text",
    api_key: "services_sections",
    localized: true,
    validators: {
      rich_text_blocks: { item_types: ["1757574"] },
      size: { eq: 1 },
    },
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: false },
    },
    default_value: { en: null, nl: null },
  });

  console.log(
    'Create Single-line string field "Card orientation" (`card_orientation`) in block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  newFields["9879168"] = await client.fields.create("1757574", {
    label: "Card orientation",
    field_type: "string",
    api_key: "card_orientation",
    validators: { required: {}, enum: { values: ["vertical", "horizontal"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "vertical",
  });

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Single-line string field "Services header" (`services_header`) in model "Home" (`home`)'
  );
  await client.fields.destroy("145722");

  console.log(
    'Delete Multiple links field "Services" (`services`) in model "Home" (`home`)'
  );
  await client.fields.destroy("145723");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular content field "Services section" (`services_sections`) in model "Home" (`home`)'
  );
  await client.fields.update(newFields["9730458"], { position: 7 });
}
