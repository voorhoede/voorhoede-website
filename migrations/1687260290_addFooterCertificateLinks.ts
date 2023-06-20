import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "B corp link" (`b_corp_link`) in model "Footer" (`footer`)'
  );
  newFields["9263009"] = await client.fields.create("47595", {
    label: "B corp link",
    field_type: "string",
    api_key: "b_corp_link",
    validators: { format: { predefined_pattern: "url" } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });

  console.log(
    'Create Single-line string field "Dutch digital agencies link" (`dutch_digital_agencies_link`) in model "Footer" (`footer`)'
  );
  newFields["9263012"] = await client.fields.create("47595", {
    label: "Dutch digital agencies link",
    field_type: "string",
    api_key: "dutch_digital_agencies_link",
    validators: { format: { predefined_pattern: "url" } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });
}
