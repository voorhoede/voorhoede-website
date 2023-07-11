import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Image position" (`image_position`) in block model "Image" (`image`)'
  );
  newFields["10353018"] = await client.fields.create("41672", {
    label: "Image position",
    field_type: "string",
    api_key: "image_position",
    validators: { enum: { values: ["left", "right", "top"] } },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Left", value: "left" },
          { hint: "", label: "Right", value: "right" },
          { hint: "", label: "Top", value: "top" },
        ],
      },
    },
    default_value: "top",
  });
}
