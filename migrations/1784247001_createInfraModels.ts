import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 01: Create HS infra models — variable, file, video_text_track
 * These are HeadStart-native models not present in VH.
 * Idempotent: checks if model/fields already exist before creating.
 */
export default async function (client: Client) {
  console.log("Creating infra models: variable, file, video_text_track");

  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => allTypes.find((t) => t.api_key === key);

  const ensureField = async (
    modelId: string,
    existingFields: Awaited<ReturnType<typeof client.fields.list>>,
    fieldDef: Parameters<typeof client.fields.create>[1],
  ) => {
    const key = (fieldDef as { api_key: string }).api_key;
    if (existingFields.find((f) => f.api_key === key)) {
      console.log(`  field ${key} already exists, skipping`);
      return;
    }
    await client.fields.create(modelId, fieldDef);
    console.log(`  field ${key} created`);
  };

  // ── variable ────────────────────────────────────────────────────────────
  let variableModel = byKey("variable");
  if (!variableModel) {
    console.log('Create model "Variables" (variable)');
    variableModel = await client.itemTypes.create(
      {
        name: "🔣 Variables",
        api_key: "variable",
        modular_block: false,
        singleton: false,
        draft_mode_active: false,
        draft_saving_active: false,
        all_locales_required: false,
        collection_appearance: "table",
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
    console.log("variable created:", variableModel.id);
  } else {
    console.log("variable already exists:", variableModel.id);
  }

  const variableFields = await client.fields.list(variableModel.id);
  await ensureField(variableModel.id, variableFields, {
    label: "Title", field_type: "string", api_key: "title",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(variableModel.id, variableFields, {
    label: "Value", field_type: "string", api_key: "value",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(variableModel.id, variableFields, {
    label: "Display Title", field_type: "string", api_key: "display_title",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });

  // ── file ────────────────────────────────────────────────────────────────
  let fileModel = byKey("file");
  if (!fileModel) {
    console.log('Create model "File" (file)');
    fileModel = await client.itemTypes.create(
      {
        name: "📦 File",
        api_key: "file",
        modular_block: false,
        singleton: false,
        draft_mode_active: false,
        draft_saving_active: false,
        all_locales_required: false,
        collection_appearance: "table",
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
    console.log("file created:", fileModel.id);
  } else {
    console.log("file already exists:", fileModel.id);
  }

  const fileFields = await client.fields.list(fileModel.id);
  await ensureField(fileModel.id, fileFields, {
    label: "File", field_type: "file", api_key: "file",
    validators: { required: {} },
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });
  await ensureField(fileModel.id, fileFields, {
    label: "Title", field_type: "string", api_key: "title",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(fileModel.id, fileFields, {
    label: "Locale", field_type: "string", api_key: "locale",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(fileModel.id, fileFields, {
    label: "Path", field_type: "string", api_key: "path",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });

  // ── video_text_track ────────────────────────────────────────────────────
  let trackModel = byKey("video_text_track");
  if (!trackModel) {
    console.log('Create model "Video Text Track" (video_text_track)');
    trackModel = await client.itemTypes.create(
      {
        name: "🔡 Video Text Track",
        api_key: "video_text_track",
        modular_block: false,
        singleton: false,
        draft_mode_active: false,
        draft_saving_active: false,
        all_locales_required: false,
        collection_appearance: "table",
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
    console.log("video_text_track created:", trackModel.id);
  } else {
    console.log("video_text_track already exists:", trackModel.id);
  }

  const trackFields = await client.fields.list(trackModel.id);
  await ensureField(trackModel.id, trackFields, {
    label: "Title", field_type: "string", api_key: "title",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(trackModel.id, trackFields, {
    label: "Locale", field_type: "string", api_key: "locale",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(trackModel.id, trackFields, {
    label: "Kind", field_type: "string", api_key: "kind",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await ensureField(trackModel.id, trackFields, {
    label: "File", field_type: "file", api_key: "file",
    validators: { required: {} },
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });

  console.log("✅ Infra models complete");
}
