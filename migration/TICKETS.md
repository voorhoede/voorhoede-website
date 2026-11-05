# Migration Tickets (for AI agents)

Each ticket is self-contained: context, dependencies, the subagent that should run it, concrete tasks, files to touch, and acceptance criteria. Tickets are ordered; respect `Depends on`.

Repos:
- `head-start` (Astro) — `/Users/marleendijkman/Documents/GitHub/head-start`
- `voorhoede-website` (Nuxt, source of truth for design/content) — this repo

---

## Suggested subagents (roles)

- **`upgrade-agent`** — dependency/framework upgrades (Astro 7), fixes breaking changes, keeps build+tests green.
- **`tag-system-agent`** — ports the Tag/collection PoC and TagOverviewBlock foundation.
- **`dato-ops-agent`** — DatoCMS environment/config operations (protection, sandbox forks, promotion). Non-code.
- **`schema-contract-agent`** — authors the target DatoCMS schema spec (the contract for content migration).
- **`model-routing-agent`** — Astro content collections, routing fragments, detail routes.
- **`block-porter-agent`** — repeatable worker that ports one batch of blocks (`.astro` + fragment + register + CSS). Run many in parallel, one per batch.
- **`globals-agent`** — Website/app merge, menu, footer, redirects, translations, SEO/404.
- **`overview-agent`** — TagOverviewBlock + overview pages (Phase 4).
- **`qa-agent`** — tests, type checks, visual/preview verification, redirects.
- **`content-migration-agent`** — (user-owned) moves DatoCMS records into the new schema in the sandbox env.

---

## Phase P0 — Prerequisites

### TICKET P0-1 — Upgrade HeadStart to Astro 7
- **Subagent:** `upgrade-agent`
- **Depends on:** none
- **Context:** All migration work targets Astro 7. HeadStart is currently on an older Astro.
- **Tasks:**
  - Bump `astro` to v7 and update all Astro integrations/adapters to compatible versions.
  - Apply Astro 7 breaking-change updates (config, content layer API, env, middleware, image service as applicable).
  - Fix type errors and failing tests introduced by the upgrade.
- **Acceptance:** `npm run build` succeeds; `npm test`/vitest suite passes; dev server renders home + a sample page; no Astro deprecation warnings at build.
- **Files:** `package.json`, `astro.config.*`, `tsconfig.json`, any deprecated API usages.

### TICKET P0-2 — Land the Tag/collection system in HeadStart `main`
- **Subagent:** `tag-system-agent`
- **Depends on:** P0-1
- **Context:** De-risk the core architecture before porting blocks/models. Adapt `origin/feat/poc-tags-and-collections`.
- **Tasks:**
  - Add `Tag` model collection (`src/content/Tags/`) + `src/lib/routing/TagRoute.fragment.graphql`; register in `src/content/config.ts` `collectionMap`.
  - Add `tags` field to the `Page` fragment/query; wire `PageRouteFields`/`PageRouteParent` parent-tree fragments from the PoC.
  - Implement `TagOverviewBlock` foundation in `src/blocks/TagOverviewBlock/` (prop: 1 Tag reference; render tagged pages via `_allReferencingPages` / `getCollection` filter). Register in `blocksByTypename.ts`.
- **Acceptance:** A page with a tag appears in a `TagOverviewBlock` rendering; build + tests green; merged to `main`.
- **Files:** `src/content/Tags/*`, `src/content/config.ts`, `src/lib/routing/*`, `src/blocks/TagOverviewBlock/*`, `src/blocks/blocksByTypename.ts`.

### TICKET P0-3 — Protect Voorhoede DatoCMS `main` environment
- **Subagent:** `dato-ops-agent`
- **Depends on:** none (can run in parallel)
- **Context:** Automated migrations must not touch production.
- **Tasks:**
  - Enable environment protection on the `main` (primary) DatoCMS environment.
  - Create a forked **sandbox** environment for all schema + content migration.
  - Document the promote-after-validation workflow and access/tokens for migration agents (scoped to sandbox).
- **Acceptance:** `main` is protected; a sandbox fork exists; migration agents have sandbox-only credentials; promotion process documented.
- **Files:** `migration/DATOCMS_ENV_WORKFLOW.md` (new doc).

---

## Phase 0 — Schema contract

### TICKET 0-1 — Author target DatoCMS schema contract
- **Subagent:** `schema-contract-agent`
- **Depends on:** P0-2
- **Context:** Single source of truth handed to `content-migration-agent`.
- **Tasks:** Specify, per model/field: target `Page` (add `tags`, `subtitle`, `preview_image`, `parent_page`, `has_table_of_contents`, `seo`, `preview`, `body_blocks`); `Blog` (add `date`, `authors`->Person, `tags`); `Tag`; kept taxonomy/data models; `app`->Website merge; `menu`->menu_items; `footer`; `redirect`->`redirect_rule`; `error_page`->`not_found_page`; `social`->`seo`; drop `open_graph_image`. Include field-by-field source->target mapping and value transforms.
- **Acceptance:** `migration/SCHEMA_CONTRACT.md` covers all 47 models + 54 blocks with explicit source->target field mappings and transforms.
- **Files:** `migration/SCHEMA_CONTRACT.md` (new).

---

## Phase 1 — Core models & routing (Astro)

### TICKET 1-1 — Finalize Page model extensions
- **Subagent:** `model-routing-agent`
- **Depends on:** P0-2, 0-1
- **Tasks:** Ensure `Page` query/fragment/collection expose `tags`, `subtitle`, `previewImage`; render `subtitle` in `src/pages/[locale]/[...path]/index.astro`.
- **Acceptance:** Page renders subtitle; types generated; build green.

### TICKET 1-2 — Add Blog model (absorbs Events)
- **Subagent:** `model-routing-agent`
- **Depends on:** 0-1
- **Tasks:** Create `src/content/Blog/` (clone Pages pattern) with `date`, `authors`->Person, `tags`, `body_blocks`; add blog/event detail route; register in `collectionMap`.
- **Acceptance:** A Blog record renders at its route with author + date; build/tests green.
- **Files:** `src/content/Blog/*`, `src/content/config.ts`, `src/pages/[locale]/...`.

### TICKET 1-3 — Person model + detail route
- **Subagent:** `model-routing-agent`
- **Depends on:** 0-1
- **Tasks:** Add `Person` collection + detail route; add `Meet` fragment (linked from Person).
- **Acceptance:** Person page renders; referenced correctly by Blog authors.

### TICKET 1-4 — Taxonomy & data-model fragments
- **Subagent:** `model-routing-agent`
- **Depends on:** 0-1
- **Tasks:** Add fragments/collections as needed for `Expertise`, `Technology`, `Deliverable`, `GlossaryTerm`, `Location`, `Gallery`, `testimonial_item`.
- **Acceptance:** Fragments compile and are queryable; used by relevant blocks.

---

## Phase 2 — Block library port (parallelizable)

> Run one `block-porter-agent` per batch. Each block: create `src/blocks/<Name>/<Name>.astro` + `<Name>.fragment.graphql` + `.test.ts` + `.preview.txt`, register in `blocksByTypename.ts`, add the fragment to the Page/Text body query, and **port CSS** from the matching `src/components/Blocks/*` Vue component in `voorhoede-website`. Depends on: P0-1, P0-2.

### TICKET 2-A — Text family -> TextBlock
- **Subagent:** `block-porter-agent`
- **Maps:** `structured_text`, `section_structured_text`, `text_section` -> `TextBlock`.
- **Acceptance:** Content renders; headings/marks preserved; styles match Voorhoede.

### TICKET 2-B — Text+Image -> TextImageBlock
- **Subagent:** `block-porter-agent`
- **Maps:** `section_text_image`, `section_image_text`, `generic_text_block` -> `TextImageBlock`.
- **Acceptance:** Layout variants + responsive behavior match Voorhoede.

### TICKET 2-C — Media blocks
- **Subagent:** `block-porter-agent`
- **Maps:** extend `ImageBlock` (caption/full_width/caption_position); `Gallery`; `VideoBlock`/`VideoEmbedBlock` (+caption/gif); `CodeBlock`; CodePen->`EmbedBlock`; `Quote`.
- **Acceptance:** Each renders with parity; captions/gif/quote-author supported.

### TICKET 2-D — Layout / grouping
- **Subagent:** `block-porter-agent`
- **Maps:** `two_column_block`, `section_grouping`, `section_image_grid`(+item), `section_image_card_grid`(+item), `section_logo_grid` -> `GroupingBlock`/`GroupingItem`.
- **Acceptance:** Grid/column layouts + item flags render correctly.

### TICKET 2-E — CTAs & links
- **Subagent:** `block-porter-agent`
- **Maps:** `call_to_action`, `section_interstitial_cta`, `section_dialogue_cta`, `structured_text_buttons_list`, `link_section`, `external_link`, `internal_link`, `address`, `legal_item`.
- **Acceptance:** CTAs (incl. person/secondary link), links, and address/legal render with parity.

### TICKET 2-F — Counters & lists
- **Subagent:** `block-porter-agent`
- **Maps:** extend `CounterBlock` (amount+label); `counter_item_list`; `ListBlock` (highlighted_list + item); `list_item`; `BlueText`.
- **Acceptance:** Counters animate/label; lists + blue-text variants render.

### TICKET 2-G — Bespoke sections
- **Subagent:** `block-porter-agent`
- **Maps:** `SectionHeader`, `PageIntroduction`, `Newsletter`, `Storytelling`(+item), `Timeline`(+item), `Testimonial`, `TeamGallery`, `Glossary`, `PivotSection` (forms/Mailchimp).
- **Acceptance:** Each bespoke section reaches visual + functional parity (forms submit, storytelling/timeline interactions work).

### TICKET 2-H — PagePartialBlock adjust
- **Subagent:** `block-porter-agent`
- **Maps:** `page_partial_block` (single `item` -> HeadStart `items` + `layout`).
- **Acceptance:** Partials render inline as before.

---

## Phase 3 — Globals & layout

### TICKET 3-1 — Merge app -> Website
- **Subagent:** `globals-agent`
- **Tasks:** Add Voorhoede `app` fields (email/phone/addresses/socials/legal) to HeadStart `Website`; surface in layout/footer.
- **Acceptance:** Global contact/social data available site-wide.

### TICKET 3-2 — Menu -> Website menu_items
- **Subagent:** `globals-agent`
- **Tasks:** Map Voorhoede `menu` to `menu_item_internal/external/group`; note dropped `image` field.
- **Acceptance:** Header/nav renders from menu_items.

### TICKET 3-3 — Footer
- **Subagent:** `globals-agent`
- **Tasks:** Build Footer model/component (net-new); port Voorhoede footer design.
- **Acceptance:** Footer renders with links/certificates/legal.

### TICKET 3-4 — Redirects, translations, 404, SEO
- **Subagent:** `globals-agent`
- **Tasks:** `redirect`->`redirect_rule`; `translation` 1:1; `error_page`->`not_found_page`; `social`->`seo`; drop `open_graph_image`.
- **Acceptance:** Redirects work; 404 renders; localized strings + SEO meta correct.

---

## Phase 4 — Overviews / listings (deferred)

### TICKET 4-1 — TagOverviewBlock (full)
- **Subagent:** `overview-agent`
- **Depends on:** P0-2, Phase 1
- **Tasks:** Complete `TagOverviewBlock` card rendering (title + subtitle + preview_image); sorting/pagination as needed.
- **Acceptance:** Overview renders tagged pages as cards with parity.

### TICKET 4-2 — Recreate overview pages
- **Subagent:** `overview-agent`
- **Tasks:** Build `/cases`, `/services`, `/jobs` as generic Pages hosting `TagOverviewBlock`; blog + event overviews as date-sorted lists; glossary list.
- **Acceptance:** Each overview matches the old listing experience.

---

## Phase 5 — Cleanup & QA

### TICKET 5-1 — Remove deprecated models/blocks
- **Subagent:** `dato-ops-agent` + `model-routing-agent`
- **Depends on:** content migration complete (user agents)
- **Tasks:** Remove deprecated models (`case_*`, `contact*`, `event_*`, `job*`, `service*`, `custom_page`, overviews, `open_graph_image`, `service_page_series`) and unused blocks after data is migrated.
- **Acceptance:** No orphaned models/queries; build green.

### TICKET 5-2 — URL redirects for changed paths
- **Subagent:** `globals-agent`
- **Tasks:** Add redirects for old `/cases`, `/services`, `/jobs`, `/events`, `/contact` URLs to new paths.
- **Acceptance:** Old URLs 301 to new equivalents.

### TICKET 5-3 — Test & QA pass
- **Subagent:** `qa-agent`
- **Tasks:** Port/adjust `.test.ts`, run type check + full build, verify preview mode + SEO meta, spot-check visual parity vs voorhoede.nl.
- **Acceptance:** All tests green; preview mode works; key pages visually match.

---

## Handoff: Content migration (user-owned agents)
- **Subagent:** `content-migration-agent`
- **Depends on:** 0-1 (schema contract), P0-3 (protected env)
- **Tasks:** Transform + move DatoCMS records from old models into the new schema **in the sandbox environment** per `SCHEMA_CONTRACT.md`; validate; promote to `main`.
- **Acceptance:** All content present in new schema; no data loss; promoted after validation.
