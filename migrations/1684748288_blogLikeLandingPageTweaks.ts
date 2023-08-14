import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newFieldsets: Record<string, SimpleSchemaTypes.Fieldset> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create fieldset "Configuration" in model "Landing Page" (`landing_page`)'
  );
  newFieldsets["573474"] = await client.fieldsets.create("2035421", {
    title: "Configuration",
    collapsible: true,
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in model "Landing Page" (`landing_page`)'
  );
  newFields["9341651"] = await client.fields.create("2035421", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["white", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "white",
    fieldset: newFieldsets["573474"],
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update fieldset "Configuration" in model "Landing Page" (`landing_page`)'
  );
  await client.fieldsets.update(newFieldsets["573474"], { position: 2 });

  console.log(
    'Update Single-line string field "Background color" (`background_color`) in model "Landing Page" (`landing_page`)'
  );
  await client.fields.update(newFields["9341651"], { position: 0 });

  console.log(
    'Update fieldset "Content" in model "Landing Page" (`landing_page`)'
  );
  await client.fieldsets.update("574681", { collapsible: true });

  console.log(
    'Update Modular content field "Sections" (`sections`) in model "Landing Page" (`landing_page`)'
  );
  await client.fields.update("10461611", {
    appearance: {
      addons: [],
      editor: "rich_text",
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Update fieldset "Metadata" in model "Landing Page" (`landing_page`)'
  );
  await client.fieldsets.update("574680", { collapsible: true });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.fields.update("10483125", {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: ["41672", "1775016", "2040400", "2040401", "2040408"],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
  });

  console.log(
    'Update Structured text field "Blue body" (`body`) in block model "Structured Text - Blue Text" (`structured_text_blue_text`)'
  );
  await client.fields.update("10483442", {
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
  });
}
