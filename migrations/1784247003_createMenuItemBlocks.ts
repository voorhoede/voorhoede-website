import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 03: Create menu item blocks — menu_item_internal, menu_item_external, menu_item_group
 *
 * These are self-referential (items can nest each other). Strategy:
 * 1. Create the three block types first (no items field yet)
 * 2. Add the items (rich_text) field to each, referencing all three
 *
 * menu_item_internal and menu_item_external also get:
 *   - style (enum: button | link | text)
 *   - image (file, optional) — if set, shown instead of title
 *
 * link on menu_item_internal references:
 *   page, home_page, blog_post, case_item, event
 * These IDs are filled in at palette-wiring time (migration 12).
 * Here we create the block with link validators empty; migration 12 updates them.
 */
export default async function (client: Client) {
  const styleField = (required = true) => ({
    label: "Style",
    field_type: "string" as const,
    api_key: "style",
    validators: required ? { required: {} } : {},
    appearance: {
      addons: [],
      editor: "string_select" as const,
      parameters: {
        options: [
          { label: "Button", value: "button", hint: "" },
          { label: "Link", value: "link", hint: "" },
          { label: "Text", value: "text", hint: "" },
        ],
      },
    },
    default_value: "link",
  });

  const imageField = () => ({
    label: "Image",
    field_type: "file" as const,
    api_key: "image",
    hint: "If set, the image will be shown instead of the title text.",
    validators: {},
    appearance: { addons: [], editor: "file" as const, parameters: {} },
    default_value: null,
  });

  // ── Step 1: Create all three block types ─────────────────────────────────
  console.log('Create block "Menu Item (Internal)" (menu_item_internal)');
  const miInternal = await client.itemTypes.create(
    {
      name: "🔽 Menu Item (Internal)",
      api_key: "menu_item_internal",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true },
  );

  console.log('Create block "Menu Item (External)" (menu_item_external)');
  const miExternal = await client.itemTypes.create(
    {
      name: "🔽 Menu Item (External)",
      api_key: "menu_item_external",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true },
  );

  console.log('Create block "Menu Item (Group)" (menu_item_group)');
  const miGroup = await client.itemTypes.create(
    {
      name: "🔽 Menu Item (Group)",
      api_key: "menu_item_group",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true },
  );

  console.log("Block shells created:", miInternal.id, miExternal.id, miGroup.id);

  // ── Step 2: Add fields to menu_item_internal ─────────────────────────────
  // title is optional — image replaces it when set
  await client.fields.create(miInternal.id, {
    label: "Title",
    field_type: "string",
    api_key: "title",
    hint: "Leave empty if using an image.",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  // link: references filled in by migration 12 (after all page-like models created)
  await client.fields.create(miInternal.id, {
    label: "Link",
    field_type: "link",
    api_key: "link",
    validators: { required: {}, item_item_type: { item_types: [] } },
    appearance: { addons: [], editor: "link_select", parameters: { filters: [] } },
    default_value: null,
  });
  await client.fields.create(miInternal.id, styleField());
  await client.fields.create(miInternal.id, imageField());
  // items (nested menu blocks) — added after all three are created
  await client.fields.create(miInternal.id, {
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: [miInternal.id, miExternal.id, miGroup.id] },
    },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  });

  // ── Step 3: Add fields to menu_item_external ─────────────────────────────
  await client.fields.create(miExternal.id, {
    label: "Title",
    field_type: "string",
    api_key: "title",
    hint: "Leave empty if using an image.",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await client.fields.create(miExternal.id, {
    label: "Link",
    field_type: "string",
    api_key: "link",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: "https://" } },
    default_value: null,
  });
  await client.fields.create(miExternal.id, styleField());
  await client.fields.create(miExternal.id, imageField());
  await client.fields.create(miExternal.id, {
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: [miInternal.id, miExternal.id, miGroup.id] },
    },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  });

  // ── Step 4: Add fields to menu_item_group ────────────────────────────────
  await client.fields.create(miGroup.id, {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await client.fields.create(miGroup.id, {
    label: "Items",
    field_type: "rich_text",
    api_key: "items",
    validators: {
      rich_text_blocks: { item_types: [miInternal.id, miExternal.id, miGroup.id] },
    },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  });

  console.log("✅ Menu item blocks created");
  console.log("  menu_item_internal:", miInternal.id);
  console.log("  menu_item_external:", miExternal.id);
  console.log("  menu_item_group:", miGroup.id);
  console.log("NOTE: menu_item_internal.link targets will be wired in migration 12.");
}
