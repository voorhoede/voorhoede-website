# Voorhoede -> HeadStart: Blocks & Models (Before / After)

This document lists every Voorhoede DatoCMS **model** and **block** and describes what it becomes after migrating onto the HeadStart (Astro) template.

Legend for **After**:
- **MAP** = direct HeadStart equivalent
- **MERGE** = consolidated into an existing HeadStart block
- **NEW** = net-new block/model to build in HeadStart
- **PAGE** = deprecated model, content becomes a generic `Page`
- **BLOG** = content becomes a `Blog` record
- **AS-IS** = ported to Astro as a dedicated model, largely unchanged
- **DROP** = removed (replaced by a HeadStart-native mechanism)

---

## Models (47)

| Voorhoede model | api_key | After | What it looks like afterwards |
|---|---|---|---|
| App | `app` | MERGE -> Website `app` | Single global. HeadStart `Website` gains contact info (email/phone/addresses), social URLs and legal info from Voorhoede `app`. |
| Home | `home_page` | MAP -> `home_page` | Singleton home; `sections` -> `body_blocks`; gains `seo` + `preview`. |
| Page | `page` | MAP (target) | The generic page. Adds `parent_page` tree, `has_table_of_contents`, `preview`, `tags`, `subtitle`, `preview_image`; `social` -> `seo`; `sections` -> `body_blocks`. |
| Page Partial | `page_partial` | MAP -> `page_partial` | Reusable partial; `section` (single_block) -> `body` (rich_text blocks). |
| Custom Page | `custom_page` | PAGE | Becomes a plain `Page` (was only title/social/slug). |
| Case item | `case_item` | PAGE (+ `case` tag) | Generic `Page` under `/cases`, tagged `case`. Content -> `body_blocks`; quote/teaser -> Quote/preview fields. |
| Case metadata | `case_md` | DROP / fold | Not rebuilt as relational block (accepted loss); any needed labels become Text blocks. |
| Case overview | `case_overview` | PAGE + TagOverviewBlock | `/cases` page hosting a `TagOverviewBlock(tag: case)` (Phase 4). |
| Case teaser | `case_teaser` | DROP | Replaced by `Page.subtitle` + `preview_image`. |
| Contact | `contact` | PAGE | `/contact` generic Page; labels/addresses -> Address/Text/Action blocks. |
| Contact confirmation | `contact_confirmation` | PAGE | Generic Page. |
| Contact item | `contact_item` | NEW block / fold | Rendered via a small block or Text/Address blocks on the contact Page. |
| Service | `service` | PAGE (+ `service` tag) | Generic Page; hierarchy via `parent_page`; card/summary -> preview fields. |
| Service overview | `service_overview` | PAGE + TagOverviewBlock | `/services` page hosting `TagOverviewBlock(tag: service)`. |
| Service page series | `service_page_series` | DROP | Replaced by HeadStart `parent_page` page tree. |
| Job | `job` | PAGE (+ `job` tag) | Generic Page; salary/employment/valid_until become body content (accepted loss of JobPosting schema). |
| Job CTA | `job_cta` | NEW / Action Block | Rendered as an Action/CTA block. |
| Job overview | `job_overview` | PAGE + TagOverviewBlock | `/jobs` page hosting `TagOverviewBlock(tag: job)`. |
| Join our team | `join_our_team` | NEW / Action Block | A CTA block on a Page. |
| Event item | `event_item` | BLOG | Becomes a `Blog` record (has `date` + `authors`); tagged `event`. |
| Event overview | `event_overview` | PAGE + list | Generic Page hosting a date-sorted Blog/event list. |
| Event label | `event_label` | DROP / Tag | Folds into `Tag` (or dropped). |
| Event location | `event_location` | AS-IS / fold | Kept as small data model or inlined as text. |
| Blog post | `blog_post` | AS-IS -> `Blog` | Dedicated `Blog` model; gains `date`; keeps authors(Person), tags, related, `body_blocks`. |
| Blog post overview | `blog_post_overview` | PAGE + list | Generic Page hosting date-sorted Blog list. |
| Person | `person` | AS-IS | Dedicated model + detail route; referenced by authors, team gallery, CTAs. |
| Meet | `meet` | AS-IS | Dedicated small model linked from Person. |
| Team grid panel | `team_grid_panel` | NEW block | Rendered inside a TeamGallery block. |
| Tag (blog) | `tag` | AS-IS / merge into Tag | Blog topics; may unify with the new `Tag` model. |
| Glossary Term | `glossary_term` | AS-IS | Dedicated model; listed by a Glossary block. |
| Expertise | `expertise` | AS-IS | Taxonomy model (kept separate). |
| Technology | `technology` | AS-IS | Taxonomy model (kept separate). |
| Deliverable | `deliverable` | AS-IS | Taxonomy model (kept separate). |
| Location | `location` | AS-IS | Office/contact data model. |
| Gallery | `gallery` | AS-IS | Image collection model (HeadStart has none). |
| Menu | `menu` | MAP -> Website `menu_items` | Menu items become HeadStart `menu_item_internal/external/group` blocks on Website. |
| Footer | `footer` | NEW model/component | Net-new (HeadStart has no footer); ported as-is. |
| Redirect | `redirect` | MAP -> `redirect_rule` | `http_status_code` -> `status_code`. |
| Schema migration | `schema_migration` | MAP 1:1 | Identical concept. |
| Translation | `translation` | MAP 1:1 | Key/value translations. |
| Error page | `error_page` | MAP -> `not_found_page` | Collapses to single 404 (multi-code support dropped). |
| Open graph image | `open_graph_image` | DROP | Replaced by per-record `seo` field. |
| Pivot section | `pivot_section` | NEW block | Forms + Mailchimp + ad conversion ported as a bespoke block. |
| Storytelling section | `storytelling_section` | NEW block | Ported as a Storytelling block. |
| Usp | `usp` | FOLD | Rendered via Text Image / Icon block. |
| testimonial item | `testimonial_item` | AS-IS | Small model referenced by Testimonial block. |
| Interstitial CTA | `interstitial_cta` | FOLD -> Action Block | Call/mail CTA rendered as Action block. |

> HeadStart-only models kept as provided: `file`, `video_text_track`, `variable`.

---

## Blocks (54)

| Voorhoede block | api_key | After | What it looks like afterwards |
|---|---|---|---|
| Text Block | `text_block` | MAP 1:1 | HeadStart `TextBlock` (structured text). |
| Structured text | `structured_text` | MERGE -> TextBlock | Same rendering via TextBlock. |
| Section Structured Text | `section_structured_text` | MERGE -> TextBlock | Loses grid_alignment/background_color; ToC is page-level. |
| Text Section | `text_section` | MERGE -> TextBlock | Title becomes a heading inside the structured text. |
| Generic text block | `generic_text_block` | MERGE -> TextImageBlock | Title/body/image consolidated. |
| Section Text Image | `section_text_image` | MAP 1:1 -> TextImageBlock | text/image/layout identical. |
| Section Image & Text | `section_image_text` | MERGE -> TextImageBlock | Loses background_color/font_size. |
| Structured Text Image | `structured_text_image` | MAP -> ImageBlock (inline) | Caption support added to ImageBlock. |
| Image | `image` | MAP -> ImageBlock (extended) | ImageBlock extended with caption/full_width/caption_position. |
| Gallery block | `gallery_block` | NEW / multiple ImageBlocks | Ported as a Gallery block (HeadStart has none). |
| Section Logo Grid | `section_logo_grid` | NEW / GroupingBlock | Logo grid via Grouping/Gallery. |
| Section Image Card Grid | `section_image_card_grid` | MAP -> GroupingBlock | Loses card_orientation/background_color. |
| Section Image Card Grid Item | `section_image_card_grid_item` | MAP -> GroupingItem | Card item. |
| Section Image Grid | `section_image_grid` | MAP -> GroupingBlock | Image grid. |
| Section Image Grid Item | `section_image_grid_item` | MAP -> GroupingItem | Loses is_full_width/is_highlighted (or re-add). |
| Two column block | `two_column_block` | MAP -> GroupingBlock (layout) | Two-column layout. |
| Section Grouping | `section_grouping` | MAP -> GroupingBlock | theme/accent_position -> layout. |
| Grouping Item | `grouping_item` | MAP -> GroupingItem | sections -> blocks. |
| Responsive video | `responsive_video` | MAP -> VideoBlock/VideoEmbedBlock | Add caption + gif support. |
| Section Video | `section_video` | MAP -> VideoEmbedBlock | Add caption. |
| Code block | `code_block` | Text `code` node / NEW | Rendered via structured-text code node or a small CodeBlock. |
| Code pen block | `code_pen_block` | MAP -> EmbedBlock | Loses preview_type/caption/iframe title. |
| Quote | `quote` | Text blockquote / NEW | Blockquote node or a Quote block with author. |
| Call to action | `call_to_action` | MERGE -> ActionBlock (+ links) | May need custom CTA for person/secondary link. |
| Section Interstitial CTA | `section_interstitial_cta` | MERGE -> ActionBlock | Loses background_color. |
| Section Dialogue CTA | `section_dialogue_cta` | NEW / ActionBlock | Person + variant. |
| Buttons List | `structured_text_buttons_list` | MAP -> ActionBlock | Button/link list. |
| Link Section | `link_section` | MAP -> Internal/External Link | Single link. |
| External Link | `external_link` | MAP -> ExternalLink | HeadStart adds open_in_new_tab. |
| Internal Link | `internal_link` | MAP 1:1 -> InternalLink | Record link. |
| Menu Item | `menu_item` | MAP -> Menu Item blocks | Loses `image` field on menu items. |
| Counter Item | `counter_item` | MAP -> CounterBlock (extended) | Add amount(int)+label to CounterBlock. |
| Counter Item List | `structured_text_counter_item_list` | MAP -> Grouping/List of counters | Counter group. |
| Highlighted List | `structured_text_highlighted_list` | MAP -> ListBlock | Highlighted list. |
| Highlighted List Item | `structured_text_highlighted_list_item` | MAP -> List item | List item. |
| List item | `list_item` | MAP -> List item | body text -> structured_text. |
| Blue Text | `structured_text_blue_text` | NEW / structured-text mark | variant + alignment. |
| Section Header | `section_header` | NEW (page header) | layout/style/illustration header. |
| Page introduction section | `page_introduction_section` | MAP -> TextImage / NEW header | image/title/body intro. |
| Section Newsletter | `section_newsletter` | NEW | Newsletter signup block. |
| Storytelling block | `storytelling_block` | NEW | Storytelling scroller. |
| Storytelling item | `storytelling_item` | NEW | Storytelling item. |
| Section Timeline | `section_timeline` | NEW | Timeline block. |
| Timeline item | `timeline_item` | NEW | Timeline item. |
| Testimonial block | `testimonial_block` | NEW | References testimonial_item. |
| Section Team Gallery | `section_team_gallery` | NEW | Persons grid. |
| Section Blogs Section | `section_blogs_section` | NEW (list) | Blog list (Phase 4). |
| Section Events Section | `section_events_section` | NEW (list) | Event (Blog) list (Phase 4). |
| Section Jobs List | `section_jobs_list` | NEW (list) | Jobs list via TagOverviewBlock (Phase 4). |
| Section Glossary | `section_glossary` | NEW (list) | Glossary term list. |
| Section Case List | `section_case_list` | NEW (list) | Case list via TagOverviewBlock (Phase 4). |
| Page Partial Block | `page_partial_block` | MAP -> PagePartialBlock | single `item` -> `items` + layout. |
| Address | `address` | NEW / Text | Address block. |
| Legal item | `legal_item` | NEW / Text | Legal line block. |

---

## Net-new HeadStart building blocks required
- `TagOverviewBlock` (core of the collection system)
- Extended `ImageBlock` (caption/full_width/caption_position), `Gallery`
- Extended `CounterBlock` (amount + label)
- `Quote`, `CodeBlock`, `SectionHeader`, `PageIntroduction`
- `Newsletter`, `Storytelling`(+item), `Timeline`(+item), `Testimonial`, `TeamGallery`, `Glossary`
- `PivotSection` (forms/Mailchimp), `Address`, `LegalItem`
- `Footer` model/component; `Blog` model gains a `date` field
