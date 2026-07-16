import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 09: Extend content models — blog_post, case_item, person.
 *
 * blog_post (38241):
 *   Current: is_archived, on_mounted_script, title, on_unmounted_script,
 *            subtitle, header_illustration, slug, social, authors, intro_title,
 *            items, pivots, open_graph_image, preview_link, tags, related_blog_posts
 *   Add: date, body_blocks (palette → mig 12)
 *   Rename: social → seo
 *   Keep all old fields (pivots/intro_title/etc. removed in Phase 3 cleanup)
 *
 * case_item (38240):
 *   Current: title, subtitle, hero_illustration, slug, social, meta_data,
 *            case_teaser, content, quote, author, pivots, preview_links
 *   Add: tags (→tag), body_blocks (palette → mig 12)
 *   Rename: social → seo
 *   Keep all old fields
 *
 * person (38233):
 *   Add: meet_url (string, optional)
 *   Keep all old fields (meet link removed in Phase 3)
 */
export default async function (client: Client) {
  const BLOG_ID   = "38241";
  const CASE_ID   = "38240";
  const PERSON_ID = "38233";
  const TAG_ID    = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // ── blog_post ─────────────────────────────────────────────────────────────
  console.log("Extending blog_post...");

  // Rename social → seo
  await client.fields.update("145708", { api_key: "seo", label: "SEO" });

  // Add date field
  await client.fields.create(BLOG_ID, {
    label: "Date",
    field_type: "date_time",
    api_key: "date",
    validators: {},
    appearance: { addons: [], editor: "date_time_picker", parameters: {} },
    default_value: null,
  });

  // Add body_blocks (palette wired in migration 12)
  await client.fields.create(BLOG_ID, {
    label: "Body",
    field_type: "rich_text",
    api_key: "body_blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: true } },
    default_value: null,
  });

  console.log("blog_post extended");

  // ── case_item ─────────────────────────────────────────────────────────────
  console.log("Extending case_item...");

  // Rename social → seo
  await client.fields.update("145692", { api_key: "seo", label: "SEO" });

  // Add tags
  await client.fields.create(CASE_ID, {
    label: "Tags",
    field_type: "links",
    api_key: "tags",
    validators: { items_item_type: { item_types: [TAG_ID] } },
    appearance: { addons: [], editor: "links_select", parameters: {} },
    default_value: null,
  });

  // Add body_blocks (palette wired in migration 12)
  await client.fields.create(CASE_ID, {
    label: "Body",
    field_type: "rich_text",
    api_key: "body_blocks",
    validators: { rich_text_blocks: { item_types: [] } },
    appearance: { addons: [], editor: "rich_text", parameters: { start_collapsed: true } },
    default_value: null,
  });

  console.log("case_item extended");

  // ── person ────────────────────────────────────────────────────────────────
  console.log("Extending person...");

  // Add meet_url (replaces the separate meet model link)
  await client.fields.create(PERSON_ID, {
    label: "Meet URL",
    field_type: "string",
    api_key: "meet_url",
    hint: "Direct link to book a meeting (e.g. Calendly). Replaces the separate Meet model.",
    validators: {},
    appearance: { addons: [], editor: "single_line", parameters: { heading: false, placeholder: "https://meet.voorhoede.nl/..." } },
    default_value: null,
  });

  console.log("person extended");
  console.log("✅ Content models extended. NOTE: old fields kept for Phase 2 migration.");
}
