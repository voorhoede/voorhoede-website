import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};
  const newFieldsets: Record<string, SimpleSchemaTypes.Fieldset> = {};

  console.log("Creating new fields/fieldsets");

  console.log('Create fieldset "Certificates" in model "Footer" (`footer`)');
  newFieldsets["712332"] = await client.fieldsets.create("47595", {
    title: "Certificates",
    collapsible: true,
  });

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
    fieldset: newFieldsets["712332"],
  });

  console.log(
    'Create Single asset field "Bcorp logo" (`bcorp_logo`) in model "Footer" (`footer`)'
  );
  newFields["9338640"] = await client.fields.create("47595", {
    label: "Bcorp logo",
    field_type: "file",
    api_key: "bcorp_logo",
    validators: {
      extension: { extensions: [], predefined_list: "transformable_image" },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
    fieldset: newFieldsets["712332"],
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
    fieldset: newFieldsets["712332"],
  });

  console.log(
    'Create Single asset field "Dutch digital agencies logo" (`dutch_digital_agencies_logo`) in model "Footer" (`footer`)'
  );
  newFields["9338642"] = await client.fields.create("47595", {
    label: "Dutch digital agencies logo",
    field_type: "file",
    api_key: "dutch_digital_agencies_logo",
    validators: {
      extension: { extensions: [], predefined_list: "transformable_image" },
    },
    appearance: { addons: [], editor: "file", parameters: {} },
    fieldset: newFieldsets["712332"],
  });

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single-line string field "B corp link" (`b_corp_link`) in model "Footer" (`footer`)'
  );
  await client.fields.update(newFields["9263009"], { position: 0 });

  console.log(
    'Update Single-line string field "Dutch digital agencies link" (`dutch_digital_agencies_link`) in model "Footer" (`footer`)'
  );
  await client.fields.update(newFields["9263012"], { position: 2 });

  console.log(
    'Update Single asset field "Bcorp logo" (`bcorp_logo`) in model "Footer" (`footer`)'
  );
  await client.fields.update(newFields["9338640"], { position: 1 });

  console.log(
    'Update Single asset field "Dutch digital agencies logo" (`dutch_digital_agencies_logo`) in model "Footer" (`footer`)'
  );
  await client.fields.update(newFields["9338642"], { position: 3 });

  console.log("Finalize models/block models");

  console.log('Update model "Footer" (`footer`)');
  await client.itemTypes.update("47595", {
    image_preview_field: newFields["9338640"],
  });
}
