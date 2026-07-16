import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 10: Extend app singleton with footer fieldset.
 *
 * App (57935) current fields:
 *   email_address, phone_number, addresses (rich_text→address blocks),
 *   twitter_url, github_url, youtube_url, linkedin_url, legal (rich_text→legal_item)
 *
 * HeadStart app fields to keep as-is (or these may already be on a different
 * version of the app model — we check and skip if present):
 *   allow_ai_bots, llms_intro, menu_items, open_page_in_llm_prompt, open_page_in_llm_option
 *
 * Footer fieldset adds:
 *   1a) footer_items  — rich_text → menu_item_internal/external/group
 *   1b) socials       — rich_text → external_link (hint: title=twitter/youtube/github/linkedin)
 *   1c) certificates  — rich_text → menu_item_internal/external
 *   1d) legal_items   — rich_text → variable_block/internal_link/external_link/phone_link/email_link
 *   1e) privacy       — rich_text → same as legal_items
 *
 * Also add HS menu_items field if not present:
 *   menu_items — rich_text → menu_item_internal/external/group
 *
 * Block IDs for new blocks are resolved by api_key lookup (they were created
 * in migrations 02–04).
 */
export default async function (client: Client) {
  const APP_ID = "57935";

  const allTypes = await client.itemTypes.list();
  const byKey = (key: string) => {
    const t = allTypes.find((t) => t.api_key === key);
    if (!t) throw new Error(`item_type not found: ${key}`);
    return t.id;
  };

  const miInternalId  = byKey("menu_item_internal");
  const miExternalId  = byKey("menu_item_external");
  const miGroupId     = byKey("menu_item_group");
  const externalLinkId = "2034503";
  const internalLinkId = "2037919";
  const phoneLinkId   = byKey("phone_link");
  const emailLinkId   = byKey("email_link");
  const variableBlockId = byKey("variable_block");

  // Check existing fields on app to avoid duplicates
  const appFields = await client.fields.list(APP_ID);
  const existingKeys = new Set(appFields.map((f) => f.api_key));
  console.log("Existing app fields:", [...existingKeys].join(", "));

  // Add menu_items if not present (HS field)
  if (!existingKeys.has("menu_items")) {
    await client.fields.create(APP_ID, {
      label: "Menu Items",
      field_type: "rich_text",
      api_key: "menu_items",
      validators: { rich_text_blocks: { item_types: [miInternalId, miExternalId, miGroupId] } },
      appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
      default_value: null,
    });
    console.log("app: menu_items added");
  } else {
    console.log("app: menu_items already present, skipping");
  }

  // Create footer fieldset
  const footerFieldset = await client.fieldsets.create(APP_ID, {
    title: "Footer",
    hint: "Footer navigation, social links, certificates, and legal/privacy items.",
    collapsible: true,
    start_collapsed: true,
    position: 99,
  });
  console.log("Footer fieldset created:", footerFieldset.id);

  const withFieldset = (extra: object) => ({ ...extra, fieldset: { id: footerFieldset.id, type: "fieldset" as const } });

  // 1a) footer_items
  await client.fields.create(APP_ID, withFieldset({
    label: "Footer items",
    field_type: "rich_text",
    api_key: "footer_items",
    validators: { rich_text_blocks: { item_types: [miInternalId, miExternalId, miGroupId] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  }));

  // 1b) socials
  await client.fields.create(APP_ID, withFieldset({
    label: "Socials",
    field_type: "rich_text",
    api_key: "socials",
    hint: "Use external_link blocks. The title must be 'twitter', 'youtube', 'github', or 'linkedin' for the icon to appear.",
    validators: { rich_text_blocks: { item_types: [externalLinkId] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  }));

  // 1c) certificates
  await client.fields.create(APP_ID, withFieldset({
    label: "Certificates",
    field_type: "rich_text",
    api_key: "certificates",
    hint: "Certificate/partner logo links. Use an image on the menu item to show a logo.",
    validators: { rich_text_blocks: { item_types: [miInternalId, miExternalId] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  }));

  // 1d) legal_items
  await client.fields.create(APP_ID, withFieldset({
    label: "Legal items",
    field_type: "rich_text",
    api_key: "legal_items",
    validators: { rich_text_blocks: { item_types: [variableBlockId, internalLinkId, externalLinkId, phoneLinkId, emailLinkId] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  }));

  // 1e) privacy
  await client.fields.create(APP_ID, withFieldset({
    label: "Privacy",
    field_type: "rich_text",
    api_key: "privacy",
    validators: { rich_text_blocks: { item_types: [variableBlockId, internalLinkId, externalLinkId, phoneLinkId, emailLinkId] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: false } },
    default_value: null,
  }));

  console.log("✅ App footer fieldset added");
}
