import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Caption" (`caption`) in block model "Responsive video" (`responsive_video`)'
  );
  newFields["BOh-mqy1TM6NJd5-UJp14g"] = await client.fields.create("44361", {
    label: "Caption",
    field_type: "string",
    api_key: "caption",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "",
  });
}
