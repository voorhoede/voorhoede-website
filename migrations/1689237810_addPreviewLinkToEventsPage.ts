import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create JSON field "Preview link" (`preview_link`) in model "Event item" (`event_item`)'
  );
  newFields["10482182"] = await client.fields.create("38232", {
    label: "Preview link",
    field_type: "json",
    api_key: "preview_link",
    appearance: {
      addons: [],
      editor: "116851",
      parameters: {
        urlPattern:
          "/{ locale }/events/{ slug }?preview=true&previewSecret=blue-unsalted-ravioli",
      },
    },
  });
}
