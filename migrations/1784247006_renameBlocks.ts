import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 06: Rename existing item types to their new api_keys and names.
 *
 * These renames do NOT delete or modify fields — those changes happen in
 * subsequent migrations. This is purely cosmetic/identifier cleanup.
 *
 * Existing-ID → new api_key mapping (from VH schema analysis):
 *   section_grouping   (CrAZK2ukS-Cev0D-CSbA2g) → grouping_block
 *   section_text_image (CL2tcnR9TimpzQxNR2RKCg)  → text_image_block
 *   section_video      (Y2qM8sXMR0-lwk-NZ0YZNg)  → video_embed_block
 *   section_header     (2037668)                  → page_header
 *   section_newsletter (2037933)                  → newsletter
 *   section_team_gallery (1646744)                → team_gallery
 *   section_blogs_section (1514671)               → blog_list_block
 *   section_case_list  (2486431)                  → case_list_block
 *   section_events_section (1517179)              → events_list
 *   section_glossary   (AjYd96IgQYuBzefFaL5VBA)  → glossary_list
 *   section_timeline   (1471996)                  → timeline_block
 *   testimonial_block  (316629)                   → testimonial
 *   section_image_card_grid_item (1757575)        → image_card_item
 *   counter_item       (1994024)                  → counter_block
 *   image              (41672)                    → image_block
 *   redirect           (49825)                    → redirect_rule
 *   section_jobs_list  (1466128)                  → page_list
 *   code_pen_block     (1854913)                  → embed_block
 */
export default async function (client: Client) {
  const renames: Array<{ id: string; api_key: string; name: string }> = [
    { id: "CrAZK2ukS-Cev0D-CSbA2g", api_key: "grouping_block",  name: "🗃️ Grouping Block" },
    { id: "CL2tcnR9TimpzQxNR2RKCg", api_key: "text_image_block", name: "📝 🖼️ Text Image Block" },
    { id: "Y2qM8sXMR0-lwk-NZ0YZNg", api_key: "video_embed_block", name: "🎬 Video Embed Block" },
    { id: "2037668",                api_key: "page_header",     name: "📄 Page Header" },
    { id: "2037933",                api_key: "newsletter",      name: "📨 Newsletter" },
    { id: "1646744",                api_key: "team_gallery",    name: "🧑‍🤝‍🧑 Team Gallery" },
    { id: "1514671",                api_key: "blog_list_block", name: "📝 Blog List Block" },
    { id: "2486431",                api_key: "case_list_block", name: "💼 Case List Block" },
    { id: "1517179",                api_key: "events_list",     name: "📅 Events List" },
    { id: "AjYd96IgQYuBzefFaL5VBA", api_key: "glossary_list",  name: "📖 Glossary List" },
    { id: "1471996",                api_key: "timeline_block",  name: "📅 Timeline Block" },
    { id: "316629",                 api_key: "testimonial",     name: "💬 Testimonial" },
    { id: "1757575",                api_key: "image_card_item", name: "🖼️ Image Card Item" },
    { id: "1994024",                api_key: "counter_block",   name: "🔢 Counter Block" },
    { id: "41672",                  api_key: "image_block",     name: "🖼️ Image Block" },
    { id: "49825",                  api_key: "redirect_rule",   name: "↪️ Redirect Rule" },
    { id: "1466128",                api_key: "page_list",       name: "📋 Page List" },
    { id: "1854913",                api_key: "embed_block",     name: "📎 Embed Block" },
  ];

  for (const { id, api_key, name } of renames) {
    console.log(`Rename ${id} → ${api_key}`);
    await client.itemTypes.update(id, { api_key, name });
  }

  console.log("✅ All renames done");
}
