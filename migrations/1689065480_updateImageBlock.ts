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

  console.log("Finalize models/block models");

  console.log(
    'Update model "[Deprecated] Image with description" (`image_with_description`)'
  );
  await client.itemTypes.update("41923", {
    name: "[Deprecated] Image with description",
  });

  console.log(
    'Update block model "[Deprecated] Image with text" (`image_with_text`)'
  );
  await client.itemTypes.update("41924", {
    name: "[Deprecated] Image with text",
    hint: "This block type is deprecated, please use Image instead.",
  });
}
