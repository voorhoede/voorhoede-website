import { readFileSync } from 'node:fs';
import type { Client } from '@datocms/lib/cma-client-node';
import { buildBlockRecord } from '@datocms/cma-client';

const PAGE_ID = '111438583';
const CONTACT_PAGE_ID = 'cuV2B4i9TAmnkCR9akJcCg';
const PERSON_ID = '340340';

const REF_SECTION = {
  header: '2037668',
  structuredText: '2040351',
  imageCardGrid: '1757574',
  imageText: '2037669',
  imageGrid: '2037940',
  dialogueCta: '2040362',
} as const;

const REF_EMBEDDED = {
  blueText: '2040400',
  imageBlock: '41672',
} as const;

const BLOCK = {
  pageHeader: '2037668',
  textBlock: 'BSet0e3fTeWC8-a8odR7VA',
  textImageBlock: 'CL2tcnR9TimpzQxNR2RKCg',
  groupingBlock: 'CrAZK2ukS-Cev0D-CSbA2g',
  groupingItem: 'X-p4BCeGTZW3byYyovSV2g',
  imageBlock: '41672',
  reachOutBlock: 'ZoimmZOiR0mkjwIEXN-9Ag',
  imageGridBlock: 'VjlVydOmSp-kj5GVXeVG4g',
  imageGridItem: 'YMMwC_xjQ6qxjCepnLpPug',
  internalLink: '2037919',
  externalLink: '2034503',
} as const;

const HEADER_BLOCK_IDS = {
  en: '111460067',
  nl: '111460068',
} as const;

type Locale = 'en' | 'nl';

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
    attributes?: Record<string, string | boolean | FileValue | StDocument | null>;
  };
};

type StDocument = {
  schema: 'dast';
  document: {
    type: 'root';
    children: StNode[];
  };
  blocks?: ReturnType<typeof buildBlockRecord>[];
};

type RefBlock = {
  id: string;
  __itemTypeId?: string;
  attributes?: Record<string, string | boolean | FileValue | StDocument | RefBlock[] | null>;
};

function ref(id: string) {
  return { type: 'item_type' as const, id };
}

function attrs(block: RefBlock): Record<string, string | boolean | FileValue | StDocument | RefBlock[] | null> {
  return (block.attributes ?? block) as Record<string, string | boolean | FileValue | StDocument | RefBlock[] | null>;
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

function addBlueMarks(nodes: StNode[]): StNode[] {
  return nodes.map((node) => {
    if (node.type === 'span' && node.value) {
      const marks = node.marks ?? [];
      return { ...node, marks: marks.includes('blue') ? marks : [...marks, 'blue'] };
    }
    if (node.children) {
      return { ...node, children: addBlueMarks(node.children) };
    }
    return node;
  });
}

function rebuildEmbeddedImageBlock(item: NonNullable<StNode['item']>): ReturnType<typeof buildBlockRecord> {
  const data = item.attributes ?? {};
  const image = normalizeFile(data.image as FileValue | null, String(data.caption ?? 'Image'));
  if (!image) {
    throw new Error('Embedded image block is missing image upload');
  }

  return buildBlockRecord({
    item_type: ref(BLOCK.imageBlock),
    image,
    caption: String(data.caption ?? ''),
    full_width: Boolean(data.full_width),
    caption_position: String(data.caption_position ?? 'bottom'),
  });
}

function convertStructuredTextBody(body: StDocument): StDocument {
  const walk = (nodes: StNode[]): StNode[] => {
    const result: StNode[] = [];

    for (const node of nodes) {
      if (node.type === 'block' && node.item) {
        const typeId = node.item.__itemTypeId ?? '';

        if (typeId === REF_EMBEDDED.blueText && node.item.attributes?.body) {
          const inner = node.item.attributes.body as StDocument;
          result.push(...walk(addBlueMarks(inner.document.children)));
          continue;
        }

        if (typeId === REF_EMBEDDED.imageBlock) {
          const rebuilt = rebuildEmbeddedImageBlock(node.item);
          result.push({
            type: 'block',
            item: rebuilt as StNode['item'],
          });
          continue;
        }
      }

      if (node.children) {
        result.push({ ...node, children: walk(node.children) });
        continue;
      }

      result.push(node);
    }

    return result;
  };

  return {
    schema: 'dast',
    document: {
      type: 'root',
      children: walk(body.document.children),
    },
  };
}

function buildTextImageStructuredText(title: string, body: StDocument): StDocument {
  const converted = convertStructuredTextBody(body);
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

function buildDescriptionStructuredText(title: string, description: string): StDocument {
  const children: StNode[] = [
    {
      type: 'heading',
      level: 3,
      children: [{ type: 'span', value: title }],
    },
  ];

  if (description.trim()) {
    children.push({
      type: 'paragraph',
      children: [{ type: 'span', value: description }],
    });
  }

  return {
    schema: 'dast',
    document: { type: 'root', children },
  };
}

function linkStyle(style: string | null | undefined): 'primary' | 'secondary' {
  return style === 'secondary' ? 'secondary' : 'primary';
}

function buildPageHeader(
  locale: Locale,
  header: RefBlock,
): ReturnType<typeof buildBlockRecord> {
  const data = attrs(header);
  const illustration = normalizeFile(data.illustration as FileValue | null, 'Illustration');

  return buildBlockRecord({
    id: HEADER_BLOCK_IDS[locale],
    item_type: ref(BLOCK.pageHeader),
    layout: String(data.layout ?? 'compact'),
    style: String(data.style ?? 'static'),
    title: String(data.title ?? ''),
    subtitle: String(data.subtitle ?? ''),
    illustration,
    body: '',
  });
}

function buildStructuredTextBlock(section: RefBlock): ReturnType<typeof buildBlockRecord> {
  const data = attrs(section);
  const body = data.body as StDocument;

  return buildBlockRecord({
    item_type: ref(BLOCK.textBlock),
    text: convertStructuredTextBody(body),
  });
}

function buildBcorpBlock(imageText: RefBlock): ReturnType<typeof buildBlockRecord> {
  const data = attrs(imageText);
  const title = String(data.title ?? '');
  const body = data.body as StDocument;
  const image = normalizeFile(data.image as FileValue | null, title || 'Image');
  const imagePosition = String(data.image_position ?? 'right');
  const layout = imagePosition === 'left' ? 'image-text' : 'text-image';

  if (!image) {
    throw new Error('B Corp section is missing required image');
  }

  return buildBlockRecord({
    item_type: ref(BLOCK.textImageBlock),
    text: buildTextImageStructuredText(title, body),
    image,
    layout,
  });
}

function buildImpactfulWorkBlock(imageGrid: RefBlock): ReturnType<typeof buildBlockRecord> {
  const data = attrs(imageGrid);
  const items = (data.items as RefBlock[] | undefined) ?? [];
  const sections: ReturnType<typeof buildBlockRecord>[] = [];

  for (const item of items) {
    const itemData = attrs(item);
    const title = String(itemData.title ?? '').trim();
    const description = String(itemData.description ?? '').trim();
    const image = normalizeFile(itemData.image as FileValue | null, title || 'Image');
    const isFullWidth = Boolean(itemData.is_full_width);

    if (!title && image) {
      sections.push(
        buildBlockRecord({
          item_type: ref(BLOCK.imageBlock),
          image,
          caption: '',
          full_width: isFullWidth,
          caption_position: 'bottom',
        }),
      );
      continue;
    }

    if (title && image) {
      sections.push(
        buildBlockRecord({
          item_type: ref(BLOCK.textImageBlock),
          text: buildDescriptionStructuredText(title, description),
          image,
          layout: 'text-image',
        }),
      );
      continue;
    }

    if (title) {
      sections.push(
        buildBlockRecord({
          item_type: ref(BLOCK.textBlock),
          text: buildDescriptionStructuredText(title, description),
        }),
      );
    }
  }

  return buildBlockRecord({
    item_type: ref(BLOCK.groupingBlock),
    theme: 'none',
    accent_position: 'none',
    items: [
      buildBlockRecord({
        item_type: ref(BLOCK.groupingItem),
        title: String(data.title ?? ''),
        sections,
      }),
    ],
  });
}

function buildInternalLink(link: RefBlock): ReturnType<typeof buildBlockRecord> {
  const linkData = attrs(link);
  const pageId = String(linkData.link ?? '');

  if (!pageId) {
    throw new Error('Internal link is missing link target');
  }

  return buildBlockRecord({
    item_type: ref(BLOCK.internalLink),
    title: String(linkData.title ?? ''),
    link: pageId,
    style: linkStyle(String(linkData.style ?? '')),
  });
}

function buildImageGridBlock(section: RefBlock): ReturnType<typeof buildBlockRecord> {
  const data = attrs(section);
  const items = (data.items as RefBlock[] | undefined) ?? [];

  const gridItems = items.map((item) => {
    const itemData = attrs(item);
    const title = String(itemData.title ?? '');
    const image = normalizeFile(itemData.image as FileValue | null, title || 'Image');
    const body = itemData.body as StDocument | null | undefined;
    const links = (itemData.links as RefBlock[] | undefined) ?? [];

    if (!image) {
      throw new Error(`Image grid item "${title}" is missing required image`);
    }

    return buildBlockRecord({
      item_type: ref(BLOCK.imageGridItem),
      title,
      image,
      body: body ?? { schema: 'dast', document: { type: 'root', children: [] } },
      links: links.map(buildInternalLink),
      is_full_width: false,
      is_highlighted: false,
    });
  });

  return buildBlockRecord({
    item_type: ref(BLOCK.imageGridBlock),
    title: String(data.title ?? ''),
    layout: 'cards',
    card_orientation: String(data.card_orientation ?? 'vertical'),
    items: gridItems,
  });
}

function collectCardLinkTargets(refDump: {
  sections: Record<string, RefBlock[]>;
}): string[] {
  const targets = new Set<string>();

  for (const locale of ['en', 'nl'] as const) {
    const cardGrid = (refDump.sections?.[locale] ?? []).find(
      (section) => section.__itemTypeId === REF_SECTION.imageCardGrid,
    );

    if (!cardGrid) {
      throw new Error(`Missing image card grid section for locale ${locale}`);
    }

    const items = (attrs(cardGrid).items as RefBlock[] | undefined) ?? [];

    for (const item of items) {
      const links = (attrs(item).links as RefBlock[] | undefined) ?? [];

      for (const link of links) {
        const pageId = String(attrs(link).link ?? '');
        if (pageId) {
          targets.add(pageId);
        }
      }
    }
  }

  return [...targets];
}

async function preflightCardLinkTargets(
  client: Client,
  refDump: { sections: Record<string, RefBlock[]> },
): Promise<void> {
  const targets = collectCardLinkTargets(refDump);

  for (const pageId of targets) {
    try {
      await client.items.find(pageId);
    } catch {
      throw new Error(`Card link target page not found in TAR: ${pageId}`);
    }
  }
}

function buildReachOutBlock(dialogue: RefBlock): ReturnType<typeof buildBlockRecord> {
  const data = attrs(dialogue);
  const ctas = (data.ctas as RefBlock[] | undefined) ?? [];

  const ctaBlocks = ctas.map((cta) => {
    const ctaData = attrs(cta);
    const typeId = cta.__itemTypeId ?? '';

    if (typeId === BLOCK.internalLink || ctaData.link) {
      return buildBlockRecord({
        item_type: ref(BLOCK.internalLink),
        title: String(ctaData.title ?? ''),
        link: CONTACT_PAGE_ID,
        style: linkStyle(String(ctaData.style ?? '')),
      });
    }

    return buildBlockRecord({
      item_type: ref(BLOCK.externalLink),
      title: String(ctaData.title ?? ''),
      url: String(ctaData.url ?? ''),
      style: linkStyle(String(ctaData.style ?? '')),
      open_in_new_tab: false,
    });
  });

  return buildBlockRecord({
    item_type: ref(BLOCK.reachOutBlock),
    title: String(data.title ?? ''),
    body: String(data.body ?? ''),
    form_type: 'none',
    contact_person: PERSON_ID,
    cta: ctaBlocks,
  });
}

function mapSection(section: RefBlock, locale: Locale): ReturnType<typeof buildBlockRecord> | null {
  const typeId = section.__itemTypeId ?? '';

  switch (typeId) {
    case REF_SECTION.header:
      return buildPageHeader(locale, section);
    case REF_SECTION.structuredText:
      return buildStructuredTextBlock(section);
    case REF_SECTION.imageCardGrid:
      return buildImageGridBlock(section);
    case REF_SECTION.imageText:
      return buildBcorpBlock(section);
    case REF_SECTION.imageGrid:
      return buildImpactfulWorkBlock(section);
    case REF_SECTION.dialogueCta:
      return buildReachOutBlock(section);
    default:
      throw new Error(`Unsupported REF section type: ${typeId}`);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updatePageWithRetry(
  client: Client,
  pageId: string,
  bodyBlocks: Record<Locale, ReturnType<typeof buildBlockRecord>[]>,
  maxAttempts = 8,
) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await client.items.update(pageId, { body_blocks: bodyBlocks });
      return;
    } catch (error) {
      const message = String(error);
      const isLocked = message.includes('ITEM_LOCKED');

      if (!isLocked || attempt === maxAttempts) {
        throw error;
      }

      const delayMs = attempt * 3000;
      console.log(
        `Page locked (attempt ${attempt}/${maxAttempts}), retrying in ${delayMs}ms...`,
      );
      await sleep(delayMs);
    }
  }
}

export default async function (client: Client): Promise<void> {
  const refDump = JSON.parse(
    readFileSync('/tmp/ref-impact-sections.json', 'utf8'),
  ) as { sections: Record<string, RefBlock[]> };

  await preflightCardLinkTargets(client, refDump);

  const bodyBlocks: Record<Locale, ReturnType<typeof buildBlockRecord>[]> = {
    en: [],
    nl: [],
  };

  for (const locale of ['en', 'nl'] as const) {
    const sections = (refDump.sections?.[locale] ?? []) as RefBlock[];

    for (const section of sections) {
      const mapped = mapSection(section, locale);
      if (mapped) {
        bodyBlocks[locale].push(mapped);
      }
    }

    if (bodyBlocks[locale].length === 0) {
      throw new Error(`No body blocks mapped for locale ${locale}`);
    }
  }

  const tarPage = await client.items.find(PAGE_ID, { version: 'current' });
  const wasPublished = tarPage.meta.status === 'published';

  await updatePageWithRetry(client, PAGE_ID, bodyBlocks);

  if (wasPublished) {
    await client.items.publish(PAGE_ID);
  }

  console.log(
    JSON.stringify(
      {
        pageId: PAGE_ID,
        refEnvironment: 'slugs-and-blocks',
        updatedLocales: ['en', 'nl'],
        blockCount: { en: bodyBlocks.en.length, nl: bodyBlocks.nl.length },
        cardGridBlockIndex: 2,
        cardGridBlockType: 'image_grid_block',
        published: wasPublished,
        meetingLinkTarget: CONTACT_PAGE_ID,
      },
      null,
      2,
    ),
  );
}
