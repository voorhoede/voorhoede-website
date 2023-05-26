import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Timeline" (`section_timeline`)'
  );
  newFields["8022292"] = await client.fields.create("1471996", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Blogs Section" (`section_blogs_section`)'
  );
  newFields["8022293"] = await client.fields.create("1514671", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Events Section" (`section_events_section`)'
  );
  newFields["8022294"] = await client.fields.create("1517179", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  newFields["8022295"] = await client.fields.create("1757574", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Image & Text" (`section_image_text`)'
  );
  newFields["8022296"] = await client.fields.create("2037669", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Interstitial CTA" (`section_interstitial_cta`)'
  );
  newFields["8022297"] = await client.fields.create("2037920", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Newsletter" (`section_newsletter`)'
  );
  newFields["8022298"] = await client.fields.create("2037933", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Image Grid" (`section_image_grid`)'
  );
  newFields["8022301"] = await client.fields.create("2037940", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Structured Text" (`section_structured_text`)'
  );
  newFields["8022299"] = await client.fields.create("2040351", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log(
    'Create Single-line string field "Background color" (`background_color`) in block model "Section Dialogue CTA" (`section_dialogue_cta`)'
  );
  newFields["8022300"] = await client.fields.create("2040362", {
    label: "Background color",
    field_type: "string",
    api_key: "background_color",
    validators: { required: {}, enum: { values: ["none", "pastel-yellow"] } },
    appearance: {
      addons: [],
      editor: "single_line",
      parameters: { heading: false },
    },
    default_value: "none",
  });

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete fieldset "Configuration" in model "Landing Page" (`landing_page`)'
  );
  await client.fieldsets.destroy("573695");

  console.log(
    'Delete Single-line string field "Background color" (`background_color`) in model "Landing Page" (`landing_page`)'
  );
  await client.fields.destroy("9346499");
}
