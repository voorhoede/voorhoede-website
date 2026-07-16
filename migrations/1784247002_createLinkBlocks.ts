import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 02: Create new link blocks — phone_link, email_link
 * These are HS blocks not present in VH.
 * NOTE: style enum values are: "button" | "link" | "text"
 */
export default async function (client: Client) {
  const styleField = () => ({
    label: "Style",
    field_type: "string" as const,
    api_key: "style",
    validators: { required: {} },
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

  // ── phone_link ───────────────────────────────────────────────────────────
  console.log('Create block "Phone Link" (phone_link)');
  const phoneLinkBlock = await client.itemTypes.create(
    {
      name: "📞 Phone Link",
      api_key: "phone_link",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true },
  );
  await client.fields.create(phoneLinkBlock.id, {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await client.fields.create(phoneLinkBlock.id, {
    label: "Phone number",
    field_type: "string",
    api_key: "phone_number",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: "+31 (0)20 123 4567" } },
    default_value: null,
  });
  await client.fields.create(phoneLinkBlock.id, {
    label: "Action",
    field_type: "string",
    api_key: "action",
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { label: "Call", value: "call", hint: "" },
          { label: "SMS", value: "sms", hint: "" },
        ],
      },
    },
    default_value: "call",
  });
  await client.fields.create(phoneLinkBlock.id, {
    label: "Text",
    field_type: "text",
    api_key: "text",
    validators: {},
    appearance: { addons: [], editor: "textarea", parameters: { placeholder: null } },
    default_value: null,
  });
  await client.fields.create(phoneLinkBlock.id, styleField());
  console.log("phone_link done:", phoneLinkBlock.id);

  // ── email_link ───────────────────────────────────────────────────────────
  console.log('Create block "Email Link" (email_link)');
  const emailLinkBlock = await client.itemTypes.create(
    {
      name: "📧 Email Link",
      api_key: "email_link",
      modular_block: true,
      draft_saving_active: false,
      inverse_relationships_enabled: false,
    },
    { skip_menu_item_creation: true },
  );
  await client.fields.create(emailLinkBlock.id, {
    label: "Title",
    field_type: "string",
    api_key: "title",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await client.fields.create(emailLinkBlock.id, {
    label: "Email address",
    field_type: "string",
    api_key: "email_address",
    validators: { required: {} },
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: "hello@example.com" } },
    default_value: null,
  });
  await client.fields.create(emailLinkBlock.id, {
    label: "Email Subject",
    field_type: "string",
    api_key: "email_subject",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: null } },
    default_value: null,
  });
  await client.fields.create(emailLinkBlock.id, {
    label: "Email Body",
    field_type: "text",
    api_key: "email_body",
    validators: {},
    appearance: { addons: [], editor: "textarea", parameters: { placeholder: null } },
    default_value: null,
  });
  await client.fields.create(emailLinkBlock.id, styleField());
  console.log("email_link done:", emailLinkBlock.id);

  console.log("✅ Link blocks created");
}
