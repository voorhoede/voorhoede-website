import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 05: Create not_found_page singleton and event model.
 * Idempotent: handles partial application state.
 */
export default async function (client: Client) {
  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => allTypes.find((t) => t.api_key === key);

  const locationId = "1068766";
  const tagId = byKey("tag")!.id;

  const strField = (label: string, apiKey: string, required = false, placeholder: string | null = null) => ({
    label, field_type: "string" as const, api_key: apiKey,
    validators: required ? { required: {} } : {},
    appearance: { addons: [], editor: "single_line" as const, parameters: { heading: false, placeholder } },
    default_value: null,
  });

  const ensureField = async (
    modelId: string,
    existingFields: Awaited<ReturnType<typeof client.fields.list>>,
    fieldDef: Parameters<typeof client.fields.create>[1],
  ) => {
    const key = (fieldDef as { api_key: string }).api_key;
    if (existingFields.find((f) => f.api_key === key)) {
      console.log(`  ${key} already exists, skipping`);
      return;
    }
    const result = await client.fields.create(modelId, fieldDef);
    console.log(`  ${key} created:`, result.id);
    return result;
  };

  // ── not_found_page singleton ──────────────────────────────────────────────
  let notFoundPage = byKey("not_found_page");
  if (!notFoundPage) {
    console.log('Create singleton "Not found" (not_found_page)');
    notFoundPage = await client.itemTypes.create(
      {
        name: "🤷 Not found",
        api_key: "not_found_page",
        modular_block: false,
        singleton: true,
        draft_mode_active: false,
        draft_saving_active: false,
        all_locales_required: false,
        collection_appearance: "compact",
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
    console.log("not_found_page created:", notFoundPage.id);
  } else {
    console.log("not_found_page already exists:", notFoundPage.id);
  }

  const nfFields = await client.fields.list(notFoundPage.id);
  await ensureField(notFoundPage.id, nfFields, {
    label: "Title", field_type: "string", api_key: "title",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: true, placeholder: null } },
    default_value: null,
  });
  await ensureField(notFoundPage.id, nfFields, {
    label: "Body", field_type: "rich_text", api_key: "body_blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  });
  await ensureField(notFoundPage.id, nfFields, {
    label: "Preview", field_type: "json", api_key: "preview",
    validators: {},
    appearance: { addons: [], editor: "json", parameters: {} },
    default_value: null,
  });

  // ── event model ───────────────────────────────────────────────────────────
  let eventModel = byKey("event");
  if (!eventModel) {
    console.log('Create model "Event" (event)');
    eventModel = await client.itemTypes.create(
      {
        name: "📅 Event",
        api_key: "event",
        modular_block: false,
        singleton: false,
        draft_mode_active: true,
        draft_saving_active: false,
        all_locales_required: false,
        collection_appearance: "table",
        inverse_relationships_enabled: false,
      },
      { skip_menu_item_creation: true },
    );
    console.log("event created:", eventModel.id);
  } else {
    console.log("event already exists:", eventModel.id);
  }

  const evFields = await client.fields.list(eventModel.id);
  const findOrCreate = async (fieldDef: Parameters<typeof client.fields.create>[1]) =>
    ensureField(eventModel!.id, evFields, fieldDef);

  // title field — capture ID for slug validator
  let titleFieldId: string | null = null;
  const existingTitle = evFields.find((f) => f.api_key === "title");
  if (existingTitle) {
    titleFieldId = existingTitle.id;
    console.log("  title already exists:", titleFieldId);
  } else {
    const titleField = await client.fields.create(eventModel.id, {
      label: "Title", field_type: "string", api_key: "title",
      validators: { required: {} },
      appearance: { addons: [], editor: "single_line", parameters: { heading: true, placeholder: null } },
      default_value: null,
    });
    titleFieldId = titleField.id;
    console.log("  title created:", titleFieldId);
  }

  // slug — references title field by ID
  if (!evFields.find((f) => f.api_key === "slug")) {
    await client.fields.create(eventModel.id, {
      label: "Slug", field_type: "slug", api_key: "slug",
      validators: {
        slug_title_field: { title_field_id: titleFieldId },
        slug_format: { predefined_pattern: "webpage_slug" },
        required: {},
        unique: {},
      },
      appearance: { addons: [], editor: "slug", parameters: { url_prefix: null, placeholder: null } },
      default_value: null,
    });
    console.log("  slug created");
  } else {
    console.log("  slug already exists, skipping");
  }

  await findOrCreate({
    label: "SEO", field_type: "seo", api_key: "seo",
    validators: { required_seo_fields: { title: false, description: true, image: false, twitter_card: false }, title_length: { max: 60 }, description_length: { max: 160 } },
    appearance: { addons: [], editor: "seo", parameters: { fields: ["title", "description", "image", "twitter_card"], previews: ["google", "twitter", "facebook"] } },
    default_value: null,
  });
  await findOrCreate({
    label: "Header illustration", field_type: "file", api_key: "header_illustration",
    validators: {},
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });
  await findOrCreate({
    label: "Date", field_type: "date_time", api_key: "date",
    validators: { required: {} },
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    default_value: null,
  });
  await findOrCreate({
    label: "Image", field_type: "file", api_key: "image",
    validators: {},
    appearance: { addons: [], editor: "file", parameters: {} },
    default_value: null,
  });
  await findOrCreate({
    label: "Event is online", field_type: "boolean", api_key: "event_is_online",
    validators: {},
    appearance: { addons: [], editor: "boolean", parameters: {} },
    default_value: null,
  });
  await findOrCreate(strField("Online event URL", "online_event_url", false, "https://"));
  await findOrCreate({
    label: "Location", field_type: "link", api_key: "location",
    validators: { item_item_type: { item_types: [locationId] } },
    appearance: { addons: [], editor: "link_select", parameters: { filters: [] } },
    default_value: null,
  });
  await findOrCreate(strField("Price", "price", true, "Free / €25"));
  await findOrCreate(strField("Call to action URL", "url", true, "https://"));
  await findOrCreate(strField("Call to action label", "call_to_action_label"));
  await findOrCreate({
    label: "Tags", field_type: "links", api_key: "tags",
    validators: { items_item_type: { item_types: [tagId] } },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    default_value: null,
  });
  await findOrCreate({
    label: "Body", field_type: "rich_text", api_key: "body_blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: true } },
    default_value: null,
  });
  await findOrCreate({
    label: "Preview", field_type: "json", api_key: "preview",
    validators: {},
    appearance: { addons: [], editor: "json", parameters: {} },
    default_value: null,
  });

  console.log("✅ not_found_page + event created");
  console.log("NOTE: body_blocks palette will be wired in migration 12.");
}
