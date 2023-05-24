import { Client, SimpleSchemaTypes } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  const newFields: Record<string, SimpleSchemaTypes.Field> = {};

  console.log("Creating new fields/fieldsets");

  console.log(
    'Create Structured text field "Intro structured body" (`intro_structured_body`) in model "Case overview" (`case_overview`)'
  );
  newFields["7957839"] = await client.fields.create("38237", {
    label: "Intro structured body",
    field_type: "structured_text",
    api_key: "intro_structured_body",
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["strong", "emphasis"],
        nodes: ["link"],
        heading_levels: [],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null, nl: null },
  });

  console.log(
    'Create Structured text field "Intro structured body" (`intro_structured_body`) in model "Service overview" (`service_overview`)'
  );
  newFields["7958310"] = await client.fields.create("40181", {
    label: "Intro structured body",
    field_type: "structured_text",
    api_key: "intro_structured_body",
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["strong", "emphasis"],
        nodes: ["heading", "link"],
        heading_levels: [],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null, nl: null },
  });

  console.log(
    'Create Structured text field "Intro structured body" (`intro_structured_body`) in model "Work At" (`workat`)'
  );
  newFields["7958313"] = await client.fields.create("862258", {
    label: "Intro structured body",
    field_type: "structured_text",
    api_key: "intro_structured_body",
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["strong", "emphasis"],
        nodes: ["link", "list"],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null, nl: null },
  });

  console.log(
    'Create Structured text field "Middle structured body" (`middle_structured_body`) in model "Work At" (`workat`)'
  );
  newFields["7958315"] = await client.fields.create("862258", {
    label: "Middle structured body",
    field_type: "structured_text",
    api_key: "middle_structured_body",
    localized: true,
    validators: {
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["strong", "emphasis"],
        nodes: ["link", "list"],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null, nl: null },
  });

  console.log(
    'Create Structured text field "Intro structured body" (`intro_structured_body`) in model "Lustrum" (`lustrum`)'
  );
  newFields["7957851"] = await client.fields.create("1993980", {
    label: "Intro structured body",
    field_type: "structured_text",
    api_key: "intro_structured_body",
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["emphasis", "strong"],
        nodes: ["link", "list"],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null, nl: null },
  });

  console.log(
    'Create Structured text field "Middle structured body" (`middle_structured_body`) in model "Lustrum" (`lustrum`)'
  );
  newFields["7958274"] = await client.fields.create("1993980", {
    label: "Middle structured body",
    field_type: "structured_text",
    api_key: "middle_structured_body",
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: { item_types: ["2040400", "2040408"] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: "fail",
        on_reference_unpublish_strategy: "delete_references",
        on_reference_delete_strategy: "delete_references",
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: "structured_text",
      parameters: {
        marks: ["emphasis", "strong"],
        nodes: ["link", "list"],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { en: null, nl: null },
  });

  console.log("Destroy fields in existing models/block models");

  console.log(
    'Delete Multiple-paragraph text field "Body" (`body`) in block model "Section Image & Text" (`section_image_text`)'
  );
  await client.fields.destroy("10462463");

  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Structured text field "Intro structured body" (`intro_structured_body`) in model "Case overview" (`case_overview`)'
  );
  await client.fields.update(newFields["7957839"], { position: 8 });

  console.log(
    'Update Structured text field "Intro structured body" (`intro_structured_body`) in model "Service overview" (`service_overview`)'
  );
  await client.fields.update(newFields["7958310"], { position: 12 });

  console.log(
    'Update Structured text field "Intro structured body" (`intro_structured_body`) in model "Work At" (`workat`)'
  );
  await client.fields.update(newFields["7958313"], { position: 8 });

  console.log(
    'Update Structured text field "Middle structured body" (`middle_structured_body`) in model "Work At" (`workat`)'
  );
  await client.fields.update(newFields["7958315"], { position: 13 });

  console.log(
    'Update Structured text field "Intro structured body" (`intro_structured_body`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.update(newFields["7957851"], { position: 10 });

  console.log(
    'Update Structured text field "Middle structured body" (`middle_structured_body`) in model "Lustrum" (`lustrum`)'
  );
  await client.fields.update(newFields["7958274"], { position: 16 });

  console.log(
    'Update Structured text field "Body" (`body`) in block model "Section Image & Text" (`section_image_text`)'
  );
  await client.fields.update("9216964", { label: "Body", api_key: "body" });
}
