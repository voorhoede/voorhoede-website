import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Caption position" (`caption_position`) in block model "Image" (`image`)'
  );
  newFields["10353018"] = await client.fields.create("41672", {
    label: "Caption position",
    field_type: "string",
    api_key: "caption_position",
    validators: { enum: { values: ["left", "right", "bottom"] } },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { hint: "", label: "Left", value: "left" },
          { hint: "", label: "Right", value: "right" },
          { hint: "", label: "Bottom", value: "bottom" },
        ],
      },
    },
    default_value: "bottom",
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
