import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Boolean field "Show table of contents" (`toc`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  newFields["7662689"] = await client.fields.create("2040351", {
    label: "Show table of contents",
    field_type: "boolean",
    api_key: "toc",
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: false,
  });
}
