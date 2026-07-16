import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 22: Delete all deprecated models, singletons, and block types.
 *
 * ORDER matters — delete "leaf" models first, then those that reference them.
 *
 * Step 0: Nullify foreign-key link fields that point at deprecated models,
 *         so DatoCMS doesn't block deletion of the referenced model.
 * Step 1: Delete all records of deprecated models.
 * Step 2: Delete the deprecated item_type definitions (models + blocks).
 * Step 3: Remove deprecated block types from all body_blocks/sections validators.
 *
 * Deprecated MODELS (non-singleton):
 *   expertise, technology, deliverable, event_label  (→ tag, mig 16)
 *   meet                                              (→ person.meet_url, mig 20)
 *   event_item                                        (→ event, mig 17)
 *   job                                               (→ page, mig 18)
 *   service                                           (→ page, mig 19)
 *   custom_page                                       (→ page, mig 21)
 *   case_md, case_teaser
 *   pivot_section                                     (→ reach_out_block, mig 21)
 *   service_page_series
 *   open_graph_image
 *   testimonial_item
 *   usp
 *   contact_item
 *   team_grid_panel
 *   interstitial_cta
 *   job_cta
 *   storytelling_section
 *   event_location                                    (→ location, merged in Phase 1)
 *   gallery                                           (the old standalone gallery model)
 *
 * Deprecated SINGLETONS:
 *   menu, footer                                      (→ app, mig 10)
 *   job_overview, service_overview, case_overview
 *   blog_post_overview, event_overview, join_our_team
 *   contact, contact_confirmation                     (→ page)
 *   error_page                                        (→ not_found_page)
 *
 * Deprecated BLOCKS (block item_types):
 *   section_image_card_grid  (1757574)
 *   section_interstitial_cta (2037920)
 *   section_image_grid       (2037940)
 *   section_logo_grid        (2040174)
 *   section_structured_text  (2040351)
 *   section_dialogue_cta     (2040362)
 *   structured_text_blue_text, structured_text_highlighted_list,
 *   structured_text_highlighted_list_item, structured_text_buttons_list
 *   two_column_block, structured_text_image, structured_text
 *   text_section, generic_text_block, responsive_video
 *   link_section, page_introduction_section, quote
 *   address, legal_item
 *   counter_item (renamed to counter_block)  ← only if still exists
 */
export default async function (client: Client) {
  // ── Helpers ───────────────────────────────────────────────────────────────
  const allTypes = await client.itemTypes.list();
  const byKey = (k: string) => allTypes.find((t) => t.api_key === k);

  const safeDeleteItems = async (modelApiKey: string) => {
    const model = byKey(modelApiKey);
    if (!model) { console.log(`  SKIP delete items: "${modelApiKey}" not found`); return; }
    let page = 1, deleted = 0;
    while (true) {
      const records = await client.items.list({
        filter: { type: modelApiKey },
        page: { limit: 50, offset: (page - 1) * 50 },
      });
      if (records.length === 0) break;
      for (const r of records) {
        try {
          await client.items.destroy(r.id);
          deleted++;
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          console.warn(`  WARN: delete ${modelApiKey}/${r.id} failed: ${msg.slice(0, 100)}`);
        }
      }
      if (records.length < 50) break;
      page++;
    }
    console.log(`  Deleted ${deleted} "${modelApiKey}" records`);
  };

  const safeDeleteType = async (apiKey: string) => {
    const t = byKey(apiKey);
    if (!t) { console.log(`  SKIP: "${apiKey}" not found`); return; }
    try {
      await client.itemTypes.destroy(t.id);
      console.log(`  Deleted type: "${apiKey}" (${t.id})`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  WARN: delete type "${apiKey}" failed: ${msg.slice(0, 200)}`);
    }
  };

  // ── Step 0: Nullify/clear link fields pointing at deprecated models ───────
  console.log("Step 0: clearing links to deprecated models...");

  // case_item.meta_data → case_md: clear it
  {
    const records = await client.items.list({ filter: { type: "case_item" } });
    for (const r of records) {
      if ((r as Record<string, unknown>).meta_data) {
        try {
          await client.items.update(r.id, { meta_data: null } as Record<string, unknown>);
        } catch {}
      }
    }
    console.log("  Cleared case_item.meta_data");
  }
  // blog_post.pivots, case_item.pivots, service.pivots
  for (const { apiKey, field } of [
    { apiKey: "blog_post", field: "pivots" },
    { apiKey: "case_item", field: "pivots" },
    { apiKey: "service",   field: "pivots" },
  ]) {
    const records = await client.items.list({ filter: { type: apiKey } });
    for (const r of records) {
      if (Array.isArray((r as Record<string, unknown>)[field]) && ((r as Record<string, unknown>)[field] as unknown[]).length > 0) {
        try {
          await client.items.update(r.id, { [field]: [] } as Record<string, unknown>);
        } catch {}
      }
    }
    console.log(`  Cleared ${apiKey}.${field}`);
  }
  // event_item.label → event_label
  {
    const records = await client.items.list({ filter: { type: "event_item" } });
    for (const r of records) {
      if ((r as Record<string, unknown>).label) {
        try { await client.items.update(r.id, { label: null } as Record<string, unknown>); } catch {}
      }
    }
    console.log("  Cleared event_item.label");
  }
  // person links to meet records (meet.person → just delete meets)
  // service.service_series → service_page_series
  {
    const records = await client.items.list({ filter: { type: "service" } });
    for (const r of records) {
      if (Array.isArray((r as Record<string, unknown>).service_series) && ((r as Record<string, unknown>).service_series as unknown[]).length > 0) {
        try { await client.items.update(r.id, { service_series: [] } as Record<string, unknown>); } catch {}
      }
    }
    console.log("  Cleared service.service_series");
  }
  // service.breadcrumbs_next_service → service
  {
    const records = await client.items.list({ filter: { type: "service" } });
    for (const r of records) {
      if ((r as Record<string, unknown>).breadcrumbs_next_service) {
        try { await client.items.update(r.id, { breadcrumbs_next_service: null } as Record<string, unknown>); } catch {}
      }
    }
    console.log("  Cleared service.breadcrumbs_next_service");
  }

  // ── Step 1: Delete all deprecated records ────────────────────────────────
  console.log("\nStep 1: deleting deprecated records...");

  // Delete in leaf-first order
  const RECORD_DELETION_ORDER = [
    "case_md",
    "case_teaser",
    "meet",
    "expertise",
    "technology",
    "deliverable",
    "event_label",
    "service_page_series",
    "open_graph_image",
    "testimonial_item",
    "usp",
    "contact_item",
    "team_grid_panel",
    "interstitial_cta",
    "job_cta",
    "storytelling_section",
    "event_location",
    "gallery",
    "pivot_section",
    "event_item",
    "job",
    "service",
    "custom_page",
    // Singletons: delete their sole record
    "menu",
    "footer",
    "job_overview",
    "service_overview",
    "case_overview",
    "blog_post_overview",
    "event_overview",
    "join_our_team",
    "contact",
    "contact_confirmation",
    "error_page",
  ];

  for (const apiKey of RECORD_DELETION_ORDER) {
    await safeDeleteItems(apiKey);
  }

  // ── Step 2: Remove deprecated block types from all validators ─────────────
  console.log("\nStep 2: removing legacy blocks from validators...");

  const LEGACY_BLOCK_KEYS = [
    "section_image_card_grid",
    "section_interstitial_cta",
    "section_image_grid",
    "section_logo_grid",
    "section_structured_text",
    "section_dialogue_cta",
  ];
  const legacyIds = new Set(
    LEGACY_BLOCK_KEYS.map((k) => byKey(k)?.id).filter(Boolean) as string[],
  );

  const paletteKeys = [
    "text_block","text_image_block","image_block","video_block","video_embed_block",
    "embed_block","code_block","action_block","call_to_action","grouping_block",
    "logo_grid","list_block","gallery_block","counter_block","page_header",
    "storytelling_block","timeline_block","testimonial","newsletter","reach_out_block",
    "page_partial_block","blog_list_block","case_list_block","page_list",
    "events_list","team_gallery","glossary_list",
  ];
  const paletteIds = paletteKeys.map((k) => byKey(k)?.id).filter(Boolean) as string[];

  const MODELS_WITH_BODY_BLOCKS = [
    { apiKey: "page",           fieldKey: "body_blocks" },
    { apiKey: "home_page",      fieldKey: "body_blocks" },
    { apiKey: "not_found_page", fieldKey: "body_blocks" },
    { apiKey: "page_partial",   fieldKey: "blocks" },
    { apiKey: "blog_post",      fieldKey: "body_blocks" },
    { apiKey: "case_item",      fieldKey: "body_blocks" },
    { apiKey: "event",          fieldKey: "body_blocks" },
  ];

  for (const { apiKey, fieldKey } of MODELS_WITH_BODY_BLOCKS) {
    const model = byKey(apiKey);
    if (!model) continue;
    const fields = await client.fields.list(model.id);
    const field = fields.find((f) => f.api_key === fieldKey);
    if (!field) continue;
    await client.fields.update(field.id, {
      validators: { rich_text_blocks: { item_types: paletteIds } },
    });
    console.log(`  ${apiKey}.${fieldKey}: legacy blocks removed from validators`);
  }

  // Also clean validators on any remaining sections/items fields
  // so they don't reference deleted blocks
  const SECTIONS_FIELDS = [
    { apiKey: "page",        fieldKey: "sections" },
    { apiKey: "blog_post",   fieldKey: "items" },
    { apiKey: "case_item",   fieldKey: "content" },
    { apiKey: "home_page",   fieldKey: "sections" },
  ];
  for (const { apiKey, fieldKey } of SECTIONS_FIELDS) {
    const model = byKey(apiKey);
    if (!model) continue;
    const fields = await client.fields.list(model.id);
    const field = fields.find((f) => f.api_key === fieldKey);
    if (!field) continue;
    try {
      await client.fields.update(field.id, {
        validators: { rich_text_blocks: { item_types: paletteIds } },
      });
      console.log(`  ${apiKey}.${fieldKey}: cleaned up validators`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  WARN: ${apiKey}.${fieldKey}: ${msg.slice(0, 100)}`);
    }
  }

  // ── Step 3: Delete deprecated item_type definitions ───────────────────────
  console.log("\nStep 3: deleting deprecated item types...");

  const TYPE_DELETION_ORDER = [
    // Blocks that were in old palette but not in new (legacy):
    "section_image_card_grid",
    "section_interstitial_cta",
    "section_image_grid",
    "section_logo_grid",
    "section_structured_text",
    "section_dialogue_cta",
    // Other deprecated blocks:
    "structured_text_blue_text",
    "structured_text_highlighted_list",
    "structured_text_highlighted_list_item",
    "structured_text_buttons_list",
    "two_column_block",
    "structured_text_image",
    "structured_text",
    "text_section",
    "generic_text_block",
    "responsive_video",
    "link_section",
    "page_introduction_section",
    "quote",
    "address",
    "legal_item",
    "section_image_card_grid_item",  // sub-item of old image card grid
    "usp_block",                     // old usp block if exists
    // Deprecated models:
    "case_md",
    "case_teaser",
    "meet",
    "expertise",
    "technology",
    "deliverable",
    "event_label",
    "service_page_series",
    "open_graph_image",
    "testimonial_item",
    "usp",
    "contact_item",
    "team_grid_panel",
    "interstitial_cta",
    "job_cta",
    "storytelling_section",
    "event_location",
    "gallery",
    "pivot_section",
    "event_item",
    "job",
    "service",
    "custom_page",
    // Singleton models (their records were deleted above):
    "menu",
    "footer",
    "job_overview",
    "service_overview",
    "case_overview",
    "blog_post_overview",
    "event_overview",
    "join_our_team",
    "contact",
    "contact_confirmation",
    "error_page",
  ];

  for (const apiKey of TYPE_DELETION_ORDER) {
    await safeDeleteType(apiKey);
  }

  console.log("\n✅ Cleanup complete");
}
