import { readFileSync, writeFileSync } from 'node:fs';
import type { Client } from '@datocms/lib/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';

const DUMP_PATH = '/tmp/ref-all-pages.json';
const REPORT_PATH = '/tmp/ref-to-tar-page-migration-report.json';
const CONTACT_PAGE_ID = 'cuV2B4i9TAmnkCR9akJcCg';
const SKIP_SLUGS = new Set(['test']);

const REF = {
  header: '2037668',
  structuredText: '2040351',
  imageCardGrid: '1757574',
  imageText: '2037669',
  imageGrid: '2037940',
  dialogueCta: '2040362',
  interstitialCta: '2037920',
  newsletter: '2037933',
  logoGrid: '2040174',
  video: 'Y2qM8sXMR0-lwk-NZ0YZNg',
  teamGallery: '1646744',
  caseList: '2486431',
  blogsSection: '1514671',
  eventsSection: '1517179',
  jobsList: '1466128',
  pagePartial: 'G8-kViMTTG62MbHNzPc7PQ',
  callToAction: '262363',
  timeline: '1471996',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  blueText: '2040400',
  imageBlock: '41672',
  buttonsList: '2040408',
  counterItemList: '1775016',
  highlightedList: '2040401',
  structuredTextImage: '1939441',
  twoColumn: '1939442',
  internalLink: '2037919',
  externalLink: '2034503',
} as const;

const TAR = {
  pageHeader: '2037668',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  textImageBlock: 'CL2tcnR9TimpzQxNR2RKCg',
  imageGridBlock: 'VjlVydOmSp-kj5GVXeVG4g',
  imageGridItem: 'YMMwC_xjQ6qxjCepnLpPug',
  reachOutBlock: 'ZoimmZOiR0mkjwIEXN-9Ag',
  logoGrid: 'WD0Wl9MeQpOid4dRmNTUfw',
  videoEmbed: 'Y2qM8sXMR0-lwk-NZ0YZNg',
  teamGallery: '1646744',
  caseList: '2486431',
  blogList: '1514671',
  eventsList: '1517179',
  pageList: '1466128',
  pagePartial: 'G8-kViMTTG62MbHNzPc7PQ',
  imageBlock: '41672',
  actionBlock: 'RdEUS5_JT0yu3cYRxaPVqw',
  listBlock: 'BPorHoA0SeiqEt8ZCFcpBQ',
  listItem: '42658',
  counterBlock: '1994024',
  internalLink: '2037919',
  externalLink: '2034503',
} as const;

type Locale = 'en' | 'nl';
type StMode = 'text' | 'textImage' | 'caseList';
type BlockRecord = ReturnType<typeof buildBlockRecord>;

type FileValue = {
  upload_id: string;
  alt: string | null;
  title: string | null;
  custom_data: Record<string, string>;
  focal_point: { x: number; y: number } | null;
};

type StNode = {
  type: string;
  children?: StNode[];
  value?: string;
  marks?: string[];
  level?: number;
  url?: string;
  meta?: { id: string; value: string }[];
  item?: {
    id?: string;
    __itemTypeId?: string;
    attributes?: Record<string, unknown>;
  };
};

type StDocument = {
  schema: 'dast';
  document: { type: 'root'; children: StNode[] };
};

type RefBlock = {
  id: string;
  __itemTypeId?: string;
  attributes?: Record<string, unknown>;
};

type SkipEntry = {
  pageId: string;
  slug: string;
  locale: Locale | 'all';
  refTypeId: string;
  refTypeKey?: string;
  reason: string;
};

type DataLossEntry = {
  pageId: string;
  slug: string;
  locale: Locale;
  note: string;
};

type PageResult = {
  pageId: string;
  slug: string;
  status: 'ok' | 'ok_with_skips' | 'failed';
  blockCount: { en: number; nl: number };
  published: boolean;
  error?: string;
};

function ref(id: string) {
  return { type: 'item_type' as const, id };
}

function attrs(block: RefBlock): Record<string, unknown> {
  return (block.attributes ?? block) as Record<string, unknown>;
}

function normalizeFile(
  file: FileValue | null | undefined,
  fallbackAlt = '',
): FileValue | null {
  if (!file?.upload_id) return null;
  return {
    upload_id: file.upload_id,
    alt: file.alt ?? fallbackAlt,
    title: file.title ?? null,
    custom_data: file.custom_data ?? {},
    focal_point: file.focal_point ?? null,
  };
}

function emptySt(): StDocument {
  return { schema: 'dast', document: { type: 'root', children: [] } };
}

function descriptionToBody(description: string): StDocument {
  if (!description.trim()) return emptySt();
  return {
    schema: 'dast',
    document: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'span', value: description }],
        },
      ],
    },
  };
}

function linkStyle(style: string | null | undefined): 'primary' | 'secondary' {
  return style === 'secondary' ? 'secondary' : 'primary';
}

function addBlueMarks(nodes: StNode[]): StNode[] {
  return nodes.map((node) => {
    if (node.type === 'span' && node.value) {
      const marks = node.marks ?? [];
      return {
        ...node,
        marks: marks.includes('blue') ? marks : [...marks, 'blue'],
      };
    }
    if (node.children) return { ...node, children: addBlueMarks(node.children) };
    return node;
  });
}

function rebuildEmbeddedImageBlock(
  item: NonNullable<StNode['item']>,
): BlockRecord {
  const data = item.attributes ?? {};
  const image = normalizeFile(
    data.image as FileValue | null,
    String(data.caption ?? 'Image'),
  );
  if (!image) throw new Error('Embedded image block missing image');
  return buildBlockRecord({
    item_type: ref(TAR.imageBlock),
    image,
    caption: String(data.caption ?? ''),
    full_width: Boolean(data.full_width),
    caption_position: String(data.caption_position ?? 'bottom'),
  });
}

function stripEmbeddedBlocks(nodes: StNode[]): StNode[] {
  const result: StNode[] = [];
  for (const node of nodes) {
    if (node.type === 'block' || node.type === 'inlineBlock') continue;
    if (node.children) {
      result.push({ ...node, children: stripEmbeddedBlocks(node.children) });
      continue;
    }
    result.push(node);
  }
  return result;
}

function buttonsToLinkParagraphs(buttons: RefBlock[]): StNode[] {
  const nodes: StNode[] = [];
  for (const button of buttons) {
    const data = attrs(button);
    const title = String(data.title ?? 'Link');
    const url = String(data.url ?? '');
    if (url) {
      nodes.push({
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url,
            children: [{ type: 'span', value: title }],
          },
        ],
      });
      continue;
    }
    nodes.push({
      type: 'paragraph',
      children: [{ type: 'span', value: title }],
    });
  }
  return nodes;
}

function buildActionBlockFromButtons(
  buttons: RefBlock[],
  ctx: MapContext,
): BlockRecord | null {
  const items: BlockRecord[] = [];
  for (const button of buttons) {
    const built = buildLinkBlock(button, ctx);
    if (built) items.push(built);
  }
  if (items.length === 0) return null;
  return buildBlockRecord({
    item_type: ref(TAR.actionBlock),
    items,
  });
}

function firstPlainText(nodes: StNode[]): string {
  for (const node of nodes) {
    if (node.type === 'span' && node.value?.trim()) return node.value.trim();
    if (node.children) {
      const nested = firstPlainText(node.children);
      if (nested) return nested;
    }
  }
  return '';
}

function buildListBlockFromHighlighted(items: RefBlock[]): BlockRecord | null {
  const listItems: BlockRecord[] = [];
  for (const item of items) {
    const data = attrs(item);
    const body = data.body as StDocument | undefined;
    if (!body?.document) continue;
    const children = stripEmbeddedBlocks(body.document.children);
    const label = firstPlainText(children) || 'Item';
    listItems.push(
      buildBlockRecord({
        item_type: ref(TAR.listItem),
        // TAR list_item.body is required non-blank text
        body: label,
        text: {
          schema: 'dast',
          document: {
            type: 'root',
            children,
          },
        },
      }),
    );
  }
  if (listItems.length === 0) return null;
  return buildBlockRecord({
    item_type: ref(TAR.listBlock),
    items: listItems,
    list_type: 'numbered',
    start_number: 1,
  });
}

function convertStructuredTextBody(
  body: StDocument,
  ctx: MapContext,
  mode: StMode,
): StDocument {
  const noteSkip = (typeId: string, reason: string) => {
    ctx.skips.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      refTypeId: typeId,
      refTypeKey: 'embedded_block',
      reason,
    });
  };

  const walk = (nodes: StNode[]): StNode[] => {
    const result: StNode[] = [];
    for (const node of nodes) {
      if (node.type === 'block' && node.item) {
        const typeId = node.item.__itemTypeId ?? '';
        const data = node.item.attributes ?? {};

        if (typeId === REF.blueText && data.body) {
          const inner = data.body as StDocument;
          result.push(...walk(addBlueMarks(inner.document.children)));
          continue;
        }

        if (typeId === REF.imageBlock || typeId === REF.structuredTextImage) {
          if (mode !== 'text') {
            noteSkip(typeId, `embedded image dropped in ${mode} (blocks not allowed)`);
            continue;
          }
          try {
            result.push({
              type: 'block',
              item: rebuildEmbeddedImageBlock(node.item) as StNode['item'],
            });
          } catch (error) {
            noteSkip(typeId, `embedded image rebuild failed: ${String(error).slice(0, 120)}`);
          }
          continue;
        }

        if (typeId === REF.buttonsList) {
          const buttons = (data.buttons as RefBlock[] | undefined) ?? [];
          if (mode === 'text') {
            const action = buildActionBlockFromButtons(buttons, ctx);
            if (action) {
              result.push({ type: 'block', item: action as StNode['item'] });
            } else {
              noteSkip(typeId, 'buttons list produced no action items');
            }
          } else {
            result.push(...buttonsToLinkParagraphs(buttons));
            ctx.dataLoss.push({
              pageId: ctx.pageId,
              slug: ctx.slug,
              locale: ctx.locale,
              note: `buttons list flattened to link paragraphs in ${mode}`,
            });
          }
          continue;
        }

        if (typeId === REF.counterItemList) {
          if (mode !== 'text') {
            noteSkip(typeId, `counter item list dropped in ${mode}`);
            continue;
          }
          const counters = (data.items as RefBlock[] | undefined) ?? [];
          for (const counter of counters) {
            const cData = attrs(counter);
            result.push({
              type: 'paragraph',
              children: [
                {
                  type: 'inlineBlock',
                  item: buildBlockRecord({
                    item_type: ref(TAR.counterBlock),
                    amount: Number(cData.amount ?? 0),
                    label: String(cData.label ?? ''),
                  }) as StNode['item'],
                },
              ],
            });
          }
          continue;
        }

        if (typeId === REF.highlightedList) {
          if (mode !== 'text') {
            noteSkip(typeId, `highlighted list dropped in ${mode}`);
            continue;
          }
          const list = buildListBlockFromHighlighted(
            (data.items as RefBlock[] | undefined) ?? [],
          );
          if (list) {
            result.push({ type: 'block', item: list as StNode['item'] });
          } else {
            noteSkip(typeId, 'highlighted list produced no items');
          }
          continue;
        }

        if (typeId === REF.twoColumn) {
          if (mode !== 'text') {
            noteSkip(typeId, `two_column_block dropped in ${mode}`);
            continue;
          }
          const sides = [
            ...((data.left_items as RefBlock[] | undefined) ?? []),
            ...((data.right_items as RefBlock[] | undefined) ?? []),
          ];
          for (const side of sides) {
            if ((side.__itemTypeId ?? '') !== REF.structuredTextImage) continue;
            try {
              result.push({
                type: 'block',
                item: rebuildEmbeddedImageBlock({
                  attributes: attrs(side),
                }) as StNode['item'],
              });
            } catch {
              noteSkip(REF.twoColumn, 'two_column image item missing upload');
            }
          }
          ctx.dataLoss.push({
            pageId: ctx.pageId,
            slug: ctx.slug,
            locale: ctx.locale,
            note: 'two_column_block flattened to sequential image blocks',
          });
          continue;
        }

        noteSkip(typeId, `unsupported embedded block type ${typeId}`);
        continue;
      }

      if (node.children) {
        result.push({ ...node, children: walk(node.children) });
        continue;
      }
      result.push(node);
    }
    return result;
  };

  if (!body?.document?.children) return emptySt();
  return {
    schema: 'dast',
    document: { type: 'root', children: walk(body.document.children) },
  };
}

function foldTitleIntoText(
  title: string,
  body: StDocument,
  ctx: MapContext,
): StDocument {
  const converted = convertStructuredTextBody(body, ctx, 'textImage');
  if (!title.trim()) return converted;
  return {
    schema: 'dast',
    document: {
      type: 'root',
      children: [
        {
          type: 'heading',
          level: 2,
          children: [{ type: 'span', value: title }],
        },
        ...converted.document.children,
      ],
    },
  };
}

type MapContext = {
  pageId: string;
  slug: string;
  locale: Locale;
  existingHeaderId?: string;
  existingIds: Set<string>;
  existingUploadIds: Set<string>;
  skips: SkipEntry[];
  dataLoss: DataLossEntry[];
};

function skip(
  ctx: MapContext,
  section: RefBlock,
  reason: string,
  refTypeKey?: string,
): null {
  ctx.skips.push({
    pageId: ctx.pageId,
    slug: ctx.slug,
    locale: ctx.locale,
    refTypeId: section.__itemTypeId ?? '',
    refTypeKey,
    reason,
  });
  return null;
}

function filterExistingIds(ids: unknown, ctx: MapContext): string[] {
  if (!Array.isArray(ids)) return [];
  return ids
    .map((id) => String(id))
    .filter((id) => {
      if (!id) return false;
      if (ctx.existingIds.has(id)) return true;
      return false;
    });
}

async function warmExistingIds(client: Client, seed: string[]): Promise<Set<string>> {
  // Only IDs confirmed via find() — never pre-seed unchecked refs
  const set = new Set<string>([CONTACT_PAGE_ID]);
  for (const id of seed) {
    if (!id || set.has(id)) continue;
    try {
      await client.items.find(id);
      set.add(id);
    } catch {
      // missing in TAR
    }
  }
  return set;
}

async function ensureExists(
  client: Client,
  id: string,
  cache: Set<string>,
): Promise<boolean> {
  if (cache.has(id)) return true;
  try {
    await client.items.find(id);
    cache.add(id);
    return true;
  } catch {
    return false;
  }
}

function buildLinkBlock(
  link: RefBlock,
  ctx: MapContext,
  options?: { forceContact?: boolean },
): BlockRecord | null {
  const data = attrs(link);
  const typeId = link.__itemTypeId ?? '';

  if (typeId === REF.externalLink || data.url) {
    return buildBlockRecord({
      item_type: ref(TAR.externalLink),
      title: String(data.title ?? ''),
      url: String(data.url ?? ''),
      style: linkStyle(String(data.style ?? '')),
      open_in_new_tab: Boolean(data.open_in_new_tab ?? false),
    });
  }

  let target = String(data.link ?? '');
  if (options?.forceContact) {
    target = CONTACT_PAGE_ID;
  }

  if (!target) {
    skip(ctx, link, 'internal link missing target', 'internal_link');
    return null;
  }

  if (!options?.forceContact && !ctx.existingIds.has(target)) {
    // Prefer contact rewrite for unknown meet-like targets when forceContact not set:
    // keep as-is only if present; otherwise skip
    skip(ctx, link, `internal link target missing in TAR: ${target}`, 'internal_link');
    return null;
  }

  return buildBlockRecord({
    item_type: ref(TAR.internalLink),
    title: String(data.title ?? ''),
    link: target,
    style: linkStyle(String(data.style ?? '')),
  });
}

function buildPageHeader(section: RefBlock, ctx: MapContext): BlockRecord {
  const data = attrs(section);
  const payload: Record<string, unknown> = {
    item_type: ref(TAR.pageHeader),
    layout: String(data.layout ?? 'compact'),
    style: String(data.style ?? 'static'),
    title: String(data.title ?? ''),
    subtitle: String(data.subtitle ?? ''),
    illustration: normalizeFile(
      data.illustration as FileValue | null,
      'Illustration',
    ),
    body: String(data.body ?? ''),
  };
  if (ctx.existingHeaderId) {
    payload.id = ctx.existingHeaderId;
  }
  return buildBlockRecord(payload);
}

function buildTextBlock(section: RefBlock, ctx: MapContext): BlockRecord {
  const data = attrs(section);
  const text = (data.text ?? data.body) as StDocument;
  return buildBlockRecord({
    item_type: ref(TAR.textBlock),
    text: convertStructuredTextBody(text, ctx, 'text'),
  });
}

function buildTextImage(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  const title = String(data.title ?? '');
  const body = data.body as StDocument | undefined;
  const image = normalizeFile(data.image as FileValue | null, title || 'Image');
  if (!image) return skip(ctx, section, 'text_image missing image', 'section_image_text');
  if (!body) return skip(ctx, section, 'text_image missing body', 'section_image_text');

  const imagePosition = String(data.image_position ?? 'right');
  const layout = imagePosition === 'left' ? 'image-text' : 'text-image';

  return buildBlockRecord({
    item_type: ref(TAR.textImageBlock),
    text: foldTitleIntoText(title, body, ctx),
    image,
    layout,
    style: 'default',
  });
}

function buildCardGrid(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  const items = (data.items as RefBlock[] | undefined) ?? [];
  const gridItems: BlockRecord[] = [];

  for (const item of items) {
    const itemData = attrs(item);
    const title = String(itemData.title ?? '');
    const image = normalizeFile(
      itemData.image as FileValue | null,
      title || 'Image',
    );
    if (!image) {
      skip(ctx, item, `card item missing image: ${title}`, 'section_image_card_grid_item');
      continue;
    }

    const links = ((itemData.links as RefBlock[] | undefined) ?? [])
      .map((l) => buildLinkBlock(l, ctx))
      .filter(Boolean) as BlockRecord[];

    const rawBody = (itemData.body as StDocument | undefined) ?? emptySt();
    gridItems.push(
      buildBlockRecord({
        item_type: ref(TAR.imageGridItem),
        title,
        image,
        body: convertStructuredTextBody(rawBody, ctx, 'textImage'),
        links,
        is_full_width: false,
        is_highlighted: false,
      }),
    );
  }

  if (gridItems.length === 0) {
    return skip(ctx, section, 'card grid has no valid items', 'section_image_card_grid');
  }

  return buildBlockRecord({
    item_type: ref(TAR.imageGridBlock),
    title: String(data.title ?? ''),
    layout: 'cards',
    card_orientation: String(data.card_orientation ?? 'vertical'),
    items: gridItems,
  });
}

function buildMosaicGrid(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  const items = (data.items as RefBlock[] | undefined) ?? [];
  const gridItems: BlockRecord[] = [];

  for (const item of items) {
    const itemData = attrs(item);
    const title = String(itemData.title ?? '').trim() || ' ';
    const description = String(itemData.description ?? '');
    const image = normalizeFile(
      itemData.image as FileValue | null,
      title.trim() || 'Image',
    );
    if (!image) {
      skip(ctx, item, 'mosaic item missing image', 'section_image_grid_item');
      continue;
    }

    gridItems.push(
      buildBlockRecord({
        item_type: ref(TAR.imageGridItem),
        title: title.trim() || 'Image',
        image,
        body: descriptionToBody(description),
        links: [],
        is_full_width: Boolean(itemData.is_full_width),
        is_highlighted: Boolean(itemData.is_highlighted),
      }),
    );
  }

  if (gridItems.length === 0) {
    return skip(ctx, section, 'mosaic grid has no valid items', 'section_image_grid');
  }

  return buildBlockRecord({
    item_type: ref(TAR.imageGridBlock),
    title: String(data.title ?? ''),
    layout: 'mosaic',
    card_orientation: 'vertical',
    items: gridItems,
  });
}

function buildReachOutFromDialogue(
  section: RefBlock,
  ctx: MapContext,
): BlockRecord {
  const data = attrs(section);
  const ctas = ((data.ctas as RefBlock[] | undefined) ?? [])
    .map((cta) => {
      const ctaData = attrs(cta);
      // Meeting / meet records → contact page
      if (cta.__itemTypeId === REF.internalLink || ctaData.link) {
        return buildLinkBlock(cta, ctx, { forceContact: true });
      }
      return buildLinkBlock(cta, ctx);
    })
    .filter(Boolean) as BlockRecord[];

  const person = data.person ? String(data.person) : null;

  return buildBlockRecord({
    item_type: ref(TAR.reachOutBlock),
    title: String(data.title ?? ''),
    body: String(data.body ?? ''),
    form_type: 'none',
    contact_person: person && ctx.existingIds.has(person) ? person : null,
    cta: ctas,
  });
}

function buildReachOutFromInterstitial(
  section: RefBlock,
  ctx: MapContext,
): BlockRecord {
  const data = attrs(section);
  if (data.background_color) {
    ctx.dataLoss.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      note: `interstitial background_color=${String(data.background_color)} dropped (no TAR field)`,
    });
  }

  const resolved: BlockRecord[] = [];
  for (const cta of (data.ctas as RefBlock[] | undefined) ?? []) {
    const ctaData = attrs(cta);
    if (cta.__itemTypeId === REF.externalLink || ctaData.url) {
      const built = buildLinkBlock(cta, ctx);
      if (built) resolved.push(built);
      continue;
    }
    const target = String(ctaData.link ?? '');
    if (target && ctx.existingIds.has(target)) {
      const built = buildLinkBlock(cta, ctx);
      if (built) resolved.push(built);
      continue;
    }
    // Meeting / missing internal targets → contact (same as dialogue)
    const built = buildLinkBlock(cta, ctx, { forceContact: true });
    if (built) {
      resolved.push(built);
      if (target) {
        ctx.dataLoss.push({
          pageId: ctx.pageId,
          slug: ctx.slug,
          locale: ctx.locale,
          note: `interstitial CTA link ${target} rewritten to contact`,
        });
      }
    }
  }

  return buildBlockRecord({
    item_type: ref(TAR.reachOutBlock),
    title: String(data.title ?? ''),
    body: '',
    form_type: 'none',
    contact_person: null,
    cta: resolved,
  });
}

function buildLogoGrid(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  const logos = Array.isArray(data.logos) ? (data.logos as FileValue[]) : [];
  const validLogos = logos
    .map((logo) => normalizeFile(logo))
    .filter((logo): logo is FileValue => {
      if (!logo) return false;
      return ctx.existingUploadIds.has(logo.upload_id);
    });

  if (validLogos.length < logos.length) {
    ctx.dataLoss.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      note: `logo_grid dropped ${logos.length - validLogos.length} missing uploads`,
    });
  }
  if (validLogos.length === 0) {
    return skip(ctx, section, 'logo_grid has no valid uploads in TAR', 'section_logo_grid');
  }

  return buildBlockRecord({
    item_type: ref(TAR.logoGrid),
    title: String(data.title ?? ''),
    logos: validLogos,
  });
}

function buildVideo(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  if (!data.video) {
    return skip(ctx, section, 'video missing video field', 'section_video');
  }
  return buildBlockRecord({
    item_type: ref(TAR.videoEmbed),
    video: data.video,
    mute: Boolean(data.mute),
    autoplay: Boolean(data.autoplay),
    loop: Boolean(data.loop),
    caption: String(data.caption ?? ''),
  });
}

function buildTeamGallery(section: RefBlock, ctx: MapContext): BlockRecord {
  const data = attrs(section);
  const persons = filterExistingIds(data.persons, ctx);
  if (
    Array.isArray(data.persons) &&
    persons.length < (data.persons as unknown[]).length
  ) {
    ctx.dataLoss.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      note: `team_gallery dropped ${
        (data.persons as unknown[]).length - persons.length
      } missing person refs`,
    });
  }
  return buildBlockRecord({
    item_type: ref(TAR.teamGallery),
    persons,
  });
}

function buildCaseList(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  const cases = filterExistingIds(data.cases, ctx);
  if (cases.length === 0) {
    return skip(ctx, section, 'case_list has no valid case refs', 'section_case_list');
  }
  return buildBlockRecord({
    item_type: ref(TAR.caseList),
    title: String(data.title ?? ''),
    cases,
    columns: Number(data.columns ?? 2),
    text: data.text
      ? convertStructuredTextBody(data.text as StDocument, ctx, 'caseList')
      : emptySt(),
  });
}

function buildBlogList(section: RefBlock, ctx: MapContext): BlockRecord {
  const data = attrs(section);
  const items = filterExistingIds(data.items, ctx);
  const pinned = filterExistingIds(data.pinned_items, ctx);
  if (data.background_color) {
    ctx.dataLoss.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      note: `blog_list background_color=${String(data.background_color)} dropped`,
    });
  }
  return buildBlockRecord({
    item_type: ref(TAR.blogList),
    title: String(data.title ?? ''),
    items,
    pinned_items: pinned,
    item_size: String(data.item_size ?? 'small'),
  });
}

function buildEventsList(section: RefBlock, ctx: MapContext): BlockRecord {
  const data = attrs(section);
  const items = filterExistingIds(data.items, ctx);
  if (data.background_color) {
    ctx.dataLoss.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      note: `events_list background_color=${String(data.background_color)} dropped`,
    });
  }
  return buildBlockRecord({
    item_type: ref(TAR.eventsList),
    title: String(data.title ?? ''),
    items,
  });
}

function buildPageList(section: RefBlock, ctx: MapContext): BlockRecord {
  const data = attrs(section);
  // jobs model removed; keep empty jobs unless ids happen to exist as pages
  const jobs = filterExistingIds(data.jobs, ctx);
  if (Array.isArray(data.jobs) && (data.jobs as unknown[]).length > 0 && jobs.length === 0) {
    ctx.dataLoss.push({
      pageId: ctx.pageId,
      slug: ctx.slug,
      locale: ctx.locale,
      note: 'jobs_list job refs dropped (job model removed / ids missing)',
    });
  }
  return buildBlockRecord({
    item_type: ref(TAR.pageList),
    title: String(data.title ?? ''),
    jobs,
    tag_filter: data.tag_filter && ctx.existingIds.has(String(data.tag_filter))
      ? String(data.tag_filter)
      : null,
  });
}

function buildPagePartial(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const data = attrs(section);
  const itemId = String(data.item ?? '');
  if (!itemId || !ctx.existingIds.has(itemId)) {
    return skip(
      ctx,
      section,
      `page_partial item missing in TAR: ${itemId || '(empty)'}`,
      'page_partial_block',
    );
  }
  return buildBlockRecord({
    item_type: ref(TAR.pagePartial),
    item: itemId,
    layout: String(data.layout ?? 'default'),
    theme: String(data.theme ?? 'none'),
  });
}

function mapSection(section: RefBlock, ctx: MapContext): BlockRecord | null {
  const typeId = section.__itemTypeId ?? '';

  switch (typeId) {
    case REF.header:
      return buildPageHeader(section, ctx);
    case REF.structuredText:
    case REF.textBlock:
      return buildTextBlock(section, ctx);
    case REF.imageText:
      return buildTextImage(section, ctx);
    case REF.imageCardGrid:
      return buildCardGrid(section, ctx);
    case REF.imageGrid:
      return buildMosaicGrid(section, ctx);
    case REF.dialogueCta:
      return buildReachOutFromDialogue(section, ctx);
    case REF.interstitialCta:
      return buildReachOutFromInterstitial(section, ctx);
    case REF.logoGrid:
      return buildLogoGrid(section, ctx);
    case REF.video:
      return buildVideo(section, ctx);
    case REF.teamGallery:
      return buildTeamGallery(section, ctx);
    case REF.caseList:
      return buildCaseList(section, ctx);
    case REF.blogsSection:
      return buildBlogList(section, ctx);
    case REF.eventsSection:
      return buildEventsList(section, ctx);
    case REF.jobsList:
      return buildPageList(section, ctx);
    case REF.pagePartial:
      return buildPagePartial(section, ctx);
    case REF.timeline:
      return skip(ctx, section, 'section_timeline skipped by plan', 'section_timeline');
    case REF.newsletter:
      return skip(
        ctx,
        section,
        'no TAR newsletter block (content-only migration)',
        'section_newsletter',
      );
    case REF.callToAction:
      return skip(
        ctx,
        section,
        'no TAR call_to_action block (action_block is links-only; skipped)',
        'call_to_action',
      );
    default:
      return skip(
        ctx,
        section,
        `unknown REF section type ${typeId}`,
        'unknown',
      );
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateWithRetry(
  client: Client,
  pageId: string,
  bodyBlocks: Record<string, BlockRecord[]>,
  maxAttempts = 8,
) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await client.items.update(pageId, { body_blocks: bodyBlocks });
      return;
    } catch (error) {
      const message = String(error);
      const retryable =
        message.includes('ITEM_LOCKED') || message.includes('NOT_FOUND');
      if (!retryable || attempt === maxAttempts) throw error;
      const delayMs = attempt * 3000;
      console.log(
        `[${pageId}] retryable error attempt ${attempt}/${maxAttempts}, wait ${delayMs}ms`,
      );
      await sleep(delayMs);
    }
  }
}

function collectRefIds(sections: RefBlock[]): string[] {
  const ids = new Set<string>();
  const walk = (value: unknown) => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      for (const v of value) walk(v);
      return;
    }
    const obj = value as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj)) {
      if (
        (k === 'link' ||
          k === 'person' ||
          k === 'item' ||
          k === 'tag_filter' ||
          k === 'contact_person') &&
        typeof v === 'string'
      ) {
        ids.add(v);
      }
      if (
        (k === 'cases' ||
          k === 'items' ||
          k === 'pinned_items' ||
          k === 'persons' ||
          k === 'jobs') &&
        Array.isArray(v)
      ) {
        for (const id of v) {
          if (typeof id === 'string') ids.add(id);
        }
      }
      walk(v);
    }
  };
  walk(sections);
  return [...ids];
}

export default async function (client: Client): Promise<void> {
  const dump = JSON.parse(readFileSync(DUMP_PATH, 'utf8')) as {
    pages: Array<{
      id: string;
      slug: string;
      status: string | null;
      sections: Record<string, RefBlock[]>;
    }>;
  };

  const allSkips: SkipEntry[] = [];
  const allDataLoss: DataLossEntry[] = [];
  const results: PageResult[] = [];

  // Prefetch existence for all referenced ids across dump
  const allRefIds = new Set<string>([CONTACT_PAGE_ID]);
  for (const page of dump.pages) {
    for (const loc of ['en', 'nl'] as const) {
      for (const id of collectRefIds(page.sections[loc] ?? [])) {
        allRefIds.add(id);
      }
    }
  }

  console.log(`Checking ${allRefIds.size} referenced record ids in TAR...`);
  const existingIds = await warmExistingIds(client, [...allRefIds]);
  console.log(`Found ${existingIds.size} existing refs in TAR`);

  const logoUploadIds = new Set<string>();
  for (const page of dump.pages) {
    for (const loc of ['en', 'nl'] as const) {
      for (const section of page.sections[loc] ?? []) {
        if (section.__itemTypeId !== REF.logoGrid) continue;
        const logos = (attrs(section).logos as FileValue[] | undefined) ?? [];
        for (const logo of logos) {
          if (logo?.upload_id) logoUploadIds.add(logo.upload_id);
        }
      }
    }
  }
  console.log(`Checking ${logoUploadIds.size} logo upload ids in TAR...`);
  const existingUploadIds = new Set<string>();
  for (const uploadId of logoUploadIds) {
    try {
      await client.uploads.find(uploadId);
      existingUploadIds.add(uploadId);
    } catch {
      // missing in TAR
    }
  }
  console.log(`Found ${existingUploadIds.size} existing logo uploads in TAR`);

  for (const page of dump.pages) {
    if (SKIP_SLUGS.has(page.slug)) {
      console.log(`Skip page slug=${page.slug}`);
      continue;
    }

    console.log(`Migrating ${page.slug} (${page.id})...`);
    const pageSkips: SkipEntry[] = [];
    const pageDataLoss: DataLossEntry[] = [];

    try {
      const tarPage = await client.items.find(page.id, {
        nested: true,
        version: 'current',
      });
      const wasPublished = tarPage.meta.status === 'published';
      const existingHeaders: Partial<Record<Locale, string>> = {};
      for (const loc of ['en', 'nl'] as const) {
        const blocks = ((tarPage.body_blocks as Record<string, RefBlock[]>)?.[
          loc
        ] ?? []) as RefBlock[];
        const header = blocks.find((b) => b.__itemTypeId === TAR.pageHeader);
        if (header?.id) existingHeaders[loc] = header.id;
      }

      const bodyBlocks: Record<Locale, BlockRecord[]> = { en: [], nl: [] };

      for (const locale of ['en', 'nl'] as const) {
        const sections = page.sections[locale] ?? [];
        const ctx: MapContext = {
          pageId: page.id,
          slug: page.slug,
          locale,
          existingHeaderId: existingHeaders[locale],
          existingIds,
          existingUploadIds,
          skips: pageSkips,
          dataLoss: pageDataLoss,
        };

        for (const section of sections) {
          try {
            const mapped = mapSection(section, ctx);
            if (mapped) bodyBlocks[locale].push(mapped);
          } catch (error) {
            skip(
              ctx,
              section,
              `mapper threw: ${String(error).slice(0, 200)}`,
              'error',
            );
          }
        }
      }

      // Only update locales that had REF sections (or always write both)
      const payload: Record<string, BlockRecord[]> = {};
      if ((page.sections.en ?? []).length > 0 || bodyBlocks.en.length > 0) {
        payload.en = bodyBlocks.en;
      }
      if ((page.sections.nl ?? []).length > 0 || bodyBlocks.nl.length > 0) {
        payload.nl = bodyBlocks.nl;
      }

      if (Object.keys(payload).length === 0) {
        throw new Error('No body_blocks to write');
      }

      await updateWithRetry(client, page.id, payload);

      let published = false;
      if (wasPublished) {
        try {
          await client.items.publish(page.id);
          published = true;
        } catch (error) {
          console.error(
            `Publish failed for ${page.slug}:`,
            String(error).slice(0, 200),
          );
          pageDataLoss.push({
            pageId: page.id,
            slug: page.slug,
            locale: 'en',
            note: `publish failed after update: ${String(error).slice(0, 200)}`,
          });
        }
      }

      results.push({
        pageId: page.id,
        slug: page.slug,
        status: pageSkips.length ? 'ok_with_skips' : 'ok',
        blockCount: {
          en: bodyBlocks.en.length,
          nl: bodyBlocks.nl.length,
        },
        published,
      });
    } catch (error) {
      results.push({
        pageId: page.id,
        slug: page.slug,
        status: 'failed',
        blockCount: { en: 0, nl: 0 },
        published: false,
        error: String(error).slice(0, 500),
      });
      console.error(`FAILED ${page.slug}:`, String(error).slice(0, 300));
    }

    allSkips.push(...pageSkips);
    allDataLoss.push(...pageDataLoss);
  }

  const report = {
    refEnvironment: 'slugs-and-blocks',
    tarEnvironment: 'new-data-models',
    summary: {
      pages: results.length,
      ok: results.filter((r) => r.status === 'ok').length,
      okWithSkips: results.filter((r) => r.status === 'ok_with_skips').length,
      failed: results.filter((r) => r.status === 'failed').length,
      skippedSections: allSkips.length,
      dataLossNotes: allDataLoss.length,
    },
    results,
    skips: allSkips,
    dataLoss: allDataLoss,
  };

  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.summary, null, 2));
  console.log(`Report written to ${REPORT_PATH}`);
}
