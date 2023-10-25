import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client): Promise<void> {
  console.log("Creating new fields/fieldsets");

  console.log(
    'Create String field "Height" (`height`) in block model "Code pen block" (`code_pen_block`)'
  );

  await client.fields.create("1854913", {
    label: "Height",
    field_type: "string",
    api_key: "height",
    hint: "Height in px",
    default_value: "400",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
  });
}
