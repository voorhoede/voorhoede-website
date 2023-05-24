import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Text alignment" (`text_alignment`) in block model "Structured Text - Blue Text" (`structured_text_blue_text`)'
  );
  newFields["7968708"] = await client.fields.create("2040400", {
    label: "Text alignment",
    field_type: "string",
    api_key: "text_alignment",
    validators: { required: {}, enum: { values: ["left", "center"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "left",
  });
}
