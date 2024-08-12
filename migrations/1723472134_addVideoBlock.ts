import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Create new models/block models");

  console.log('Create block model "Section Video" (`section_video`)');
  await client.itemTypes.create(
    {
      id: "Y2qM8sXMR0-lwk-NZ0YZNg",
      name: "Section Video",
      api_key: "section_video",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: "by5IJkHxSoaaQ0JAR7IXWg",
    }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create External video field "Video" (`video`) in block model "Section Video" (`section_video`)'
  );
  await client.fields.create("Y2qM8sXMR0-lwk-NZ0YZNg", {
    id: "RkU7Y5QuSIujWdF3abplCA",
    label: "Video",
    field_type: "video",
    api_key: "video",
    validators: { required: {} },
    appearance: { addons: [], editor: "video", parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Boolean field "Mute" (`mute`) in block model "Section Video" (`section_video`)'
  );
  await client.fields.create("Y2qM8sXMR0-lwk-NZ0YZNg", {
    id: "IfP0Ne7DQtOIskIBYPm8Mw",
    label: "Mute",
    field_type: "boolean",
    api_key: "mute",
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Boolean field "Autoplay" (`autoplay`) in block model "Section Video" (`section_video`)'
  );
  await client.fields.create("Y2qM8sXMR0-lwk-NZ0YZNg", {
    id: "OIFWUK51R7qax9lT4mumgQ",
    label: "Autoplay",
    field_type: "boolean",
    api_key: "autoplay",
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Boolean field "Loop" (`loop`) in block model "Section Video" (`section_video`)'
  );
  await client.fields.create("Y2qM8sXMR0-lwk-NZ0YZNg", {
    id: "ZtRDfr3mR6yu0itK9B34kw",
    label: "Loop",
    field_type: "boolean",
    api_key: "loop",
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: false,
  });

  console.log(
    'Create Single-line string field "Caption" (`caption`) in block model "Section Video" (`section_video`)'
  );
  await client.fields.create("Y2qM8sXMR0-lwk-NZ0YZNg", {
    id: "XZrWuVflTHuhi5rqdeSmsg",
    label: "Caption",
    field_type: "string",
    api_key: "caption",
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false, placeholder: null },
    },
    default_value: "",
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Modular Content (Multiple blocks) field "Sections" (`sections`) in model "Page" (`page`)'
  );
  await client.fields.update("10461611", {
    validators: {
      rich_text_blocks: {
        item_types: [
          "1466128",
          "1471996",
          "1514671",
          "1517179",
          "1646744",
          "1757574",
          "2037668",
          "2037669",
          "2037920",
          "2037933",
          "2037940",
          "2040174",
          "2040351",
          "2040362",
          "Y2qM8sXMR0-lwk-NZ0YZNg",
        ],
      },
    },
  });
}
