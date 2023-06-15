import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newItemTypes: Record<string, SimpleSchemaTypes.ItemType> = {};

  console.log("Create new models/block models");

  console.log(
    'Create block model "Structured text image" (`structured_text_image`)'
  );
  newItemTypes["1897306"] = await client.itemTypes.create(
    {
      name: "Structured Text Image",
      api_key: "structured_text_image",
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true }
  );

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single asset field "Image" (`image`) in block model "Structured text image" (`structured_text_image`)'
  );
  newFields["9864789"] = await client.fields.create(newItemTypes["1897306"], {
    label: "Image",
    field_type: "file",
    api_key: "image",
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: "image" },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
  });

  console.log(
    'Create Single-line string field "Caption" (`caption`) in block model "Structured text image" (`structured_text_image`)'
  );
  newFields["9864790"] = await client.fields.create(newItemTypes["1897306"], {
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

  console.log(
    'Create Single-line string field "Layout" (`layout`) in block model "Structured text image" (`structured_text_image`)'
  );
  newFields["9864791"] = await client.fields.create(newItemTypes["1897306"], {
    label: "Layout",
    field_type: "string",
    api_key: "layout",
    validators: {
      required: {},
      enum: { values: ["default", "narrow", "left", "right"] },
    },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "default",
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.fields.update("10483125", {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          "41672",
          "1775016",
          newItemTypes["1897306"].id,
          "2040400",
          "2040401",
          "2040408",
        ],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
  });
}
