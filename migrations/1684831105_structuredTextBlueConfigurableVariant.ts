import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Variant" (`variant`) in block model "Structured Text - Blue Text" (`structured_text_blue_text`)'
  );
  newFields["9359142"] = await client.fields.create("2040400", {
    label: "Variant",
    field_type: "string",
    api_key: "variant",
    validators: { required: {}, enum: { values: ["default", "intro"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "default",
  });
}
