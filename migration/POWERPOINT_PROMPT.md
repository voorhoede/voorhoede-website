# Prompt: PowerPoint presentation — "Migrating Voorhoede.nl to HeadStart (Astro)"

Copy-paste the prompt below into your presentation-generation tool (Gamma, Copilot for PowerPoint, Beautiful.ai, Tome, or an LLM that outputs slides / a Marp / reveal.js deck).

---

## Prompt

You are an expert technical presentation designer. Create a professional, visually clean **slide deck (16:9)** titled **"Migrating voorhoede.nl to HeadStart (Astro)"** for a mixed audience of developers, content editors, and project stakeholders.

**Tone:** confident, pragmatic, engineering-led. **Style:** minimal, lots of whitespace, one big idea per slide, use simple diagrams/icons over dense text, max ~5 bullets per slide, use the Voorhoede brand accent (yellow) sparingly. Include speaker notes under each slide.

Produce the following slides:

1. **Title** — "Migrating voorhoede.nl to HeadStart (Astro)". Subtitle: "From a Nuxt site with many special page types to a simple, generic, tag-driven CMS." Add presenter/date placeholders.

2. **Why migrate** — The problem today: Nuxt site with 47 models and 54 blocks; six special page types (Cases, Contact, Events, Jobs, Services, Custom Pages) each with bespoke logic; block usage is complex. Goal: simplify.

3. **The vision** — One generic **Page** model + a **Tag/collection** system. "A page tagged `case` becomes an item in the `/cases` overview." Simpler for editors, less code to maintain.

4. **Before vs After (models)** — Left: many special models. Right: generic `Page` + `Blog` + a small set of kept models (Person, taxonomies, data models). Emphasize: 6 page types collapse into `Page`; Events move into `Blog`.

5. **Before vs After (blocks)** — 54 Voorhoede blocks consolidate onto HeadStart's structured-text-first block set; many merge (Text/TextImage), some are net-new (TagOverview, Timeline, Storytelling, Testimonial).

6. **How HeadStart works** — Structured-text-first: a Page has `body_blocks`; blocks are dispatched by `Blocks.astro` + `blocksByTypename.ts`; each block is a folder (`.astro` + GraphQL fragment). Simple, convention-based.

7. **The Tag/collection system** — Diagram: `Page (tags)` -> `Tag` <- `TagOverviewBlock`. Child pages carry a tag; an overview page renders them as cards (title + subtitle + preview image). Adapted from the `feat/poc-tags-and-collections` proof of concept.

8. **What we consciously give up** — Honest trade-offs: cases lose relational Expertise/Technology filtering; jobs lose Google-for-Jobs schema; multi-code error pages become a single 404. Framed as acceptable for simplicity.

9. **Prerequisites** — Three gates before migration: (1) Upgrade HeadStart to **Astro 7**; (2) Ship the **Tag system** in HeadStart first; (3) **Protect the DatoCMS main environment** — migrate in a sandbox fork, promote after validation.

10. **The plan (phases)** — Timeline/roadmap: P0 Prerequisites -> Phase 0 Schema contract -> Phase 1 Core models & routing -> Phase 2 Block library port -> Phase 3 Globals & layout -> Phase 4 Overviews (deferred) -> Phase 5 Cleanup & QA.

11. **How the work gets done** — AI-agent-driven: work is split into small, self-contained tickets; specialized subagents (schema, block-porter, model/routing, content-migration, QA/test). Human reviews each PR.

12. **Content migration** — Content is preserved and moved by dedicated AI agents into the new schema, running against a protected/sandboxed DatoCMS environment. Design is ported to match today's look & feel.

13. **Risks & mitigations** — Astro 7 breaking changes (mitigate: upgrade first, green tests); data loss (mitigate: env protection + sandbox); scope creep on bespoke blocks (mitigate: consolidate aggressively, defer overviews).

14. **Success criteria** — Fewer models/blocks, editor-friendly generic pages, feature parity on live pages, redirects in place, tests green, preview mode working.

15. **Next steps & timeline** — Immediate: prerequisites. Then phased rollout with placeholders for dates/owners.

16. **Closing / Q&A** — One-line recap: "Simpler content model, same site, less to maintain."

**Deliverable format:** editable slides with concise on-slide text and detailed speaker notes. If output is code, produce a **Marp markdown** deck.

---

### Optional design tokens to pass along
- Accent color: Voorhoede yellow (`#FFE600`-ish) on white/near-black.
- Fonts: a clean geometric sans (e.g., Inter / system-ui).
- Use simple flow diagrams for slides 6 and 7.
