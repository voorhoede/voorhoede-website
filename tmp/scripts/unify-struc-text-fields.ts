/**
 * Convert reach_out_block.body, page_header.body, blog_list_block.description
 * from text/markdown → structured_text matching text_block.text (STRUC).
 * Target: new-data-models.
 * Run: npx datocms cma:script tmp/scripts/unify-struc-text-fields.ts --environment=new-data-models
 */
import type { Client } from '@datocms/cma-client-node';
import {
  buildBlockRecord,
  isBlockOfType,
  type BlockInNestedResponse,
  type FieldValueInRequest,
} from '@datocms/cma-client';
import * as Schema from './datocms-schema-new-data-models';

type Mark = 'strong' | 'emphasis' | 'underline' | 'strikethrough' | 'code' | 'highlight';
type SpanNode = { type: 'span'; value: string; marks?: Mark[] };
type LinkNode = { type: 'link'; url: string; children: SpanNode[] };
type InlineNode = SpanNode | LinkNode;
type ParagraphNode = { type: 'paragraph'; children: InlineNode[] };
type HeadingNode = {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
};
type ListItemNode = { type: 'listItem'; children: ParagraphNode[] };
type ListNode = {
  type: 'list';
  style: 'bulleted' | 'numbered';
  children: ListItemNode[];
};
type BlockquoteNode = { type: 'blockquote'; children: ParagraphNode[] };
type RootChild = ParagraphNode | HeadingNode | ListNode | BlockquoteNode;
type DastDoc = {
  schema: 'dast';
  document: { type: 'root'; children: RootChild[] };
};

function parseInlines(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const re =
    /(\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push({ type: 'span', value: text.slice(last, match.index) });
    }
    const token = match[0];
    if (token.startsWith('[')) {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        nodes.push({
          type: 'link',
          url: m[2],
          children: [{ type: 'span', value: m[1] }],
        });
      } else {
        nodes.push({ type: 'span', value: token });
      }
    } else if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push({
        type: 'span',
        value: token.slice(2, -2),
        marks: ['strong'],
      });
    } else if (token.startsWith('*') || token.startsWith('_')) {
      nodes.push({
        type: 'span',
        value: token.slice(1, -1),
        marks: ['emphasis'],
      });
    } else if (token.startsWith('`')) {
      nodes.push({
        type: 'span',
        value: token.slice(1, -1),
        marks: ['code'],
      });
    }
    last = match.index + token.length;
  }
  if (last < text.length) {
    nodes.push({ type: 'span', value: text.slice(last) });
  }
  if (nodes.length === 0) nodes.push({ type: 'span', value: '' });
  return nodes;
}

function textToStructured(raw: string | null | undefined): DastDoc {
  if (raw == null || raw.trim() === '') {
    return { schema: 'dast', document: { type: 'root', children: [] } };
  }

  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const children: RootChild[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      i++;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      children.push({
        type: 'heading',
        level: heading[1].length as 1 | 2 | 3 | 4 | 5 | 6,
        children: parseInlines(heading[2]),
      });
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      children.push({
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: parseInlines(quoteLines.join('\n')),
          },
        ],
      });
      continue;
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const numbered = /^\s*\d+\.\s+/.test(line);
      const items: ListItemNode[] = [];
      while (
        i < lines.length &&
        (numbered
          ? /^\s*\d+\.\s+/.test(lines[i])
          : /^\s*[-*]\s+/.test(lines[i]))
      ) {
        const itemText = lines[i].replace(
          numbered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/,
          '',
        );
        items.push({
          type: 'listItem',
          children: [{ type: 'paragraph', children: parseInlines(itemText) }],
        });
        i++;
      }
      children.push({
        type: 'list',
        style: numbered ? 'numbered' : 'bulleted',
        children: items,
      });
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '') {
      if (
        /^(#{1,6})\s+/.test(lines[i]) ||
        /^>\s?/.test(lines[i]) ||
        /^\s*[-*]\s+/.test(lines[i]) ||
        /^\s*\d+\.\s+/.test(lines[i])
      ) {
        break;
      }
      paraLines.push(lines[i]);
      i++;
    }
    children.push({
      type: 'paragraph',
      children: parseInlines(paraLines.join('\n')),
    });
  }

  return { schema: 'dast', document: { type: 'root', children } };
}

const STRUC_BLOCKS = [
  '41672',
  Schema.ActionBlock.ID,
  'SZkO6JPMR5a1TLgwpOLVkw',
  'Y2qM8sXMR0-lwk-NZ0YZNg',
] as const;

const STRUC_INLINE = [
  'B5m5y2NfSASVJ6CIBm3F5A',
  'UlmN1uACR0KcQEmO_TP3oA',
] as const;

const STRUC_LINKS = [
  '2035421',
  'IsaADh7aRxGueq_pxmIIQg',
  'NDtfKQsmTP6B48gv9tf8dg',
  'W_zSJuzrSSuzn0SnVT_JMQ',
] as const;

const STRUC_VALIDATORS = {
  structured_text_blocks: { item_types: [...STRUC_BLOCKS] },
  structured_text_inline_blocks: { item_types: [...STRUC_INLINE] },
  structured_text_links: {
    on_publish_with_unpublished_references_strategy: 'fail' as const,
    on_reference_unpublish_strategy: 'delete_references' as const,
    on_reference_delete_strategy: 'delete_references' as const,
    item_types: [...STRUC_LINKS],
  },
};

const STRUC_APPEARANCE = {
  addons: [] as [],
  editor: 'structured_text' as const,
  parameters: {
    marks: [
      'strong',
      'code',
      'emphasis',
      'underline',
      'strikethrough',
      'highlight',
    ],
    nodes: [
      'blockquote',
      'code',
      'heading',
      'inlineItem',
      'itemLink',
      'link',
      'list',
      'thematicBreak',
    ],
    heading_levels: [1, 2, 3, 4, 5, 6],
    blocks_start_collapsed: false,
    show_links_meta_editor: false,
    show_links_target_blank: true,
  },
};

type BodyBlockRequest = NonNullable<
  FieldValueInRequest<Schema.Page, 'body_blocks'>
>[number];

type Locale = 'en' | 'nl';

type ReachOutNested = BlockInNestedResponse<Schema.ReachOutBlock>;
type PageHeaderNested = BlockInNestedResponse<Schema.PageHeader>;
type BlogListNested = BlockInNestedResponse<Schema.BlogListBlock>;
type GroupingNested = BlockInNestedResponse<Schema.GroupingBlock>;
type GroupingItemNested = BlockInNestedResponse<Schema.GroupingItem>;

function patchReachOut(block: ReachOutNested): BodyBlockRequest {
  const attrs = block.attributes as ReachOutNested['attributes'] & {
    body_legacy?: string | null;
    body?: DastDoc | string | null;
  };
  const legacy = attrs.body_legacy;
  if (legacy === undefined) return block.id;
  // Already migrated structured body and legacy still present — still safe to rewrite from legacy
  return buildBlockRecord({
    id: block.id,
    title: attrs.title,
    form_type: attrs.form_type,
    cta: attrs.cta ? attrs.cta.id : null,
    contact_person: attrs.contact_person,
    body: textToStructured(legacy),
  }) as BodyBlockRequest;
}

function patchPageHeader(block: PageHeaderNested): BodyBlockRequest {
  const attrs = block.attributes as PageHeaderNested['attributes'] & {
    body_legacy?: string | null;
  };
  const legacy = attrs.body_legacy;
  if (legacy === undefined) return block.id;
  return buildBlockRecord({
    id: block.id,
    layout: attrs.layout,
    style: attrs.style,
    title: attrs.title,
    subtitle: attrs.subtitle,
    illustration: attrs.illustration,
    body: textToStructured(legacy),
  }) as BodyBlockRequest;
}

function patchBlogList(block: BlogListNested): BodyBlockRequest {
  const attrs = block.attributes as BlogListNested['attributes'] & {
    description_legacy?: string | null;
  };
  const legacy = attrs.description_legacy;
  if (legacy === undefined) return block.id;
  return buildBlockRecord({
    id: block.id,
    title: attrs.title,
    items: attrs.items,
    pinned_items: attrs.pinned_items,
    item_size: attrs.item_size,
    tag_filter: attrs.tag_filter,
    description: textToStructured(legacy),
  }) as BodyBlockRequest;
}

function patchSection(
  section: GroupingItemNested['attributes']['sections'][number],
): FieldValueInRequest<GroupingItemNested, 'sections'>[number] {
  if (isBlockOfType(Schema.ReachOutBlock.ID, section)) {
    return patchReachOut(section) as FieldValueInRequest<
      GroupingItemNested,
      'sections'
    >[number];
  }
  if (isBlockOfType(Schema.PageHeader.ID, section)) {
    return patchPageHeader(section) as FieldValueInRequest<
      GroupingItemNested,
      'sections'
    >[number];
  }
  if (isBlockOfType(Schema.BlogListBlock.ID, section)) {
    return patchBlogList(section) as FieldValueInRequest<
      GroupingItemNested,
      'sections'
    >[number];
  }
  return section.id;
}

function patchBodyBlocks(
  blocks: Array<{ id: string }>,
): { patched: BodyBlockRequest[]; changed: boolean } {
  const result: BodyBlockRequest[] = [];
  let changed = false;

  for (const block of blocks) {
    if (isBlockOfType(Schema.ReachOutBlock.ID, block)) {
      const patched = patchReachOut(block);
      if (typeof patched !== 'string') changed = true;
      result.push(patched);
      continue;
    }
    if (isBlockOfType(Schema.PageHeader.ID, block)) {
      const patched = patchPageHeader(block);
      if (typeof patched !== 'string') changed = true;
      result.push(patched);
      continue;
    }
    if (isBlockOfType(Schema.BlogListBlock.ID, block)) {
      const patched = patchBlogList(block);
      if (typeof patched !== 'string') changed = true;
      result.push(patched);
      continue;
    }
    if (isBlockOfType(Schema.PagePartialBlock.ID, block)) {
      const pp = block as BlockInNestedResponse<Schema.PagePartialBlock>;
      const theme = pp.attributes.theme;
      if (theme === '' || theme == null) {
        changed = true;
        result.push(
          buildBlockRecord<Schema.PagePartialBlock>({
            id: pp.id,
            item: pp.attributes.item,
            layout: pp.attributes.layout || 'default',
            theme: 'none',
          }) as BodyBlockRequest,
        );
        continue;
      }
      result.push(block.id);
      continue;
    }
    if (isBlockOfType(Schema.GroupingBlock.ID, block)) {
      const grouping = block as GroupingNested;
      const newItems: FieldValueInRequest<GroupingNested, 'items'> = [];
      let itemsChanged = false;
      for (const item of grouping.attributes.items) {
        if (!isBlockOfType(Schema.GroupingItem.ID, item)) {
          newItems.push(typeof item === 'string' ? item : item.id);
          continue;
        }
        const newSections = item.attributes.sections.map(patchSection);
        if (newSections.some((s) => typeof s !== 'string')) {
          itemsChanged = true;
          newItems.push(
            buildBlockRecord<Schema.GroupingItem>({
              id: item.id,
              title: item.attributes.title,
              sections: newSections,
            }),
          );
        } else {
          newItems.push(item.id);
        }
      }
      if (!itemsChanged) {
        result.push(block.id);
        continue;
      }
      changed = true;
      result.push(
        buildBlockRecord<Schema.GroupingBlock>({
          id: block.id,
          theme: grouping.attributes.theme,
          accent_position: grouping.attributes.accent_position,
          items: newItems,
        }) as BodyBlockRequest,
      );
      continue;
    }
    result.push(block.id);
  }

  return { patched: result, changed };
}

type LocalizedBlocks = Partial<Record<Locale, Array<{ id: string }> | null>>;

async function walkType(
  client: Client,
  typeId: string,
  label: string,
): Promise<number> {
  let updated = 0;
  for await (const item of client.items.listPagedIterator({
    filter: { type: typeId },
    version: 'current',
    nested: true,
  })) {
    if (!('body_blocks' in item) || item.body_blocks == null) continue;
    const bb = item.body_blocks;

    try {
      if (Array.isArray(bb)) {
        const { patched, changed } = patchBodyBlocks(bb);
        if (!changed) continue;
        await client.items.update(item.id, { body_blocks: patched });
        updated++;
        console.log(`Updated ${label} ${item.id}`);
        continue;
      }

      const localized = bb as LocalizedBlocks;
      const next: Partial<Record<Locale, BodyBlockRequest[] | null>> = {};
      let changed = false;
      for (const locale of ['en', 'nl'] as const) {
        const blocks = localized[locale];
        if (!Array.isArray(blocks)) {
          next[locale] = null;
          continue;
        }
        const { patched, changed: c } = patchBodyBlocks(blocks);
        next[locale] = patched;
        if (c) changed = true;
      }
      if (!changed) continue;
      await client.items.update(item.id, { body_blocks: next });
      updated++;
      console.log(`Updated ${label} ${item.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`FAILED ${label} ${item.id}: ${message}`);
      throw err;
    }
  }
  return updated;
}

async function convertField(opts: {
  client: Client;
  itemTypeId: string;
  fieldId: string;
  oldApiKey: string;
  legacyApiKey: string;
  label: string;
}): Promise<void> {
  const { client, itemTypeId, fieldId, oldApiKey, legacyApiKey, label } = opts;

  // Idempotent: if legacy already exists, skip rename
  const existing = await client.fields.list(itemTypeId);
  const alreadyLegacy = existing.find((f) => f.api_key === legacyApiKey);
  const alreadyNew = existing.find(
    (f) => f.api_key === oldApiKey && f.field_type === 'structured_text',
  );

  if (alreadyNew) {
    console.log(`=== ${label}: STRUC ${oldApiKey} already exists, skip create ===`);
    return;
  }

  if (!alreadyLegacy) {
    console.log(
      `=== ${label}: rename ${oldApiKey} → ${legacyApiKey} (label → ${label} legacy) ===`,
    );
    await client.fields.update(fieldId, {
      api_key: legacyApiKey,
      label: `${label} legacy`,
    });
  } else {
    console.log(`=== ${label}: legacy ${legacyApiKey} already present ===`);
  }

  console.log(`=== ${label}: create STRUC ${oldApiKey} ===`);
  await client.fields.create(itemTypeId, {
    label,
    field_type: 'structured_text',
    api_key: oldApiKey,
    localized: false,
    validators: STRUC_VALIDATORS,
    appearance: STRUC_APPEARANCE,
  });
}

export default async function (client: Client): Promise<void> {
  // Field IDs from sandbox inspection
  await convertField({
    client,
    itemTypeId: Schema.ReachOutBlock.ID,
    fieldId: 'Y6t6FaY5Rja6wCh_U7EvIA',
    oldApiKey: 'body',
    legacyApiKey: 'body_legacy',
    label: 'Body',
  });

  await convertField({
    client,
    itemTypeId: Schema.PageHeader.ID,
    fieldId: 'QN31BC6RSlSFE4ys-Fq2ww',
    oldApiKey: 'body',
    legacyApiKey: 'body_legacy',
    label: 'Body',
  });

  await convertField({
    client,
    itemTypeId: Schema.BlogListBlock.ID,
    fieldId: 'N0H3PgJnRJmjTzhITNHNxg',
    oldApiKey: 'description',
    legacyApiKey: 'description_legacy',
    label: 'Description',
  });

  console.log('\n=== Migrating content via parents ===');
  const totals = {
    page: await walkType(client, Schema.Page.ID, 'Page'),
    caseItem: await walkType(client, Schema.CaseItem.ID, 'CaseItem'),
    blogPost: await walkType(client, Schema.BlogPost.ID, 'BlogPost'),
    event: await walkType(client, Schema.Event.ID, 'Event'),
    pagePartial: await walkType(client, Schema.PagePartial.ID, 'PagePartial'),
    homePage: await walkType(client, Schema.HomePage.ID, 'HomePage'),
    notFound: await walkType(client, Schema.NotFoundPage.ID, 'NotFoundPage'),
  };
  console.log(JSON.stringify({ totals }, null, 2));

  console.log('\n=== Destroying legacy fields ===');
  // Re-fetch fields by api_key after rename
  const reachFields = await client.fields.list(Schema.ReachOutBlock.ID);
  const headerFields = await client.fields.list(Schema.PageHeader.ID);
  const blogFields = await client.fields.list(Schema.BlogListBlock.ID);

  const reachLegacy = reachFields.find((f) => f.api_key === 'body_legacy');
  const headerLegacy = headerFields.find((f) => f.api_key === 'body_legacy');
  const blogLegacy = blogFields.find((f) => f.api_key === 'description_legacy');

  if (reachLegacy) {
    await client.fields.destroy(reachLegacy.id);
    console.log('Destroyed reach_out body_legacy');
  }
  if (headerLegacy) {
    await client.fields.destroy(headerLegacy.id);
    console.log('Destroyed page_header body_legacy');
  }
  if (blogLegacy) {
    await client.fields.destroy(blogLegacy.id);
    console.log('Destroyed blog_list description_legacy');
  }

  console.log('Done converting text fields to STRUC');
}
