/**
 * Wrap case_list_block.text ExternalLink/InternalLink ST blocks into ActionBlock,
 * then align field validators/appearance to text_block.text (STRUC).
 *
 * Order: expand validators → migrate content → tighten to STRUC.
 * Target: new-data-models.
 * Run: npx datocms cma:script tmp/scripts/unify-struc-case-list.ts --environment=new-data-models
 */
import type { Client } from '@datocms/cma-client-node';
import {
  buildBlockRecord,
  isBlockOfType,
  type BlockInNestedResponse,
  type FieldValueInRequest,
} from '@datocms/cma-client';
import {
  isBlockWithItemOfType,
  mapNodes,
} from 'datocms-structured-text-utils';
import * as Schema from './datocms-schema-new-data-models';

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

const CASE_LIST_TEXT_FIELD_ID = 'RkmmaYGcQ8WhFyHB0aCFSQ';

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

const STRUC_LINK_VALIDATORS = {
  on_publish_with_unpublished_references_strategy: 'fail' as const,
  on_reference_unpublish_strategy: 'delete_references' as const,
  on_reference_delete_strategy: 'delete_references' as const,
  item_types: [...STRUC_LINKS],
};

type CaseListNested = BlockInNestedResponse<Schema.CaseListBlock>;
type GroupingNested = BlockInNestedResponse<Schema.GroupingBlock>;
type GroupingItemNested = BlockInNestedResponse<Schema.GroupingItem>;
type StValue = NonNullable<CaseListNested['attributes']['text']>;
type BodyBlockRequest = NonNullable<
  FieldValueInRequest<Schema.Page, 'body_blocks'>
>[number];

function needsWrap(text: StValue | null | undefined): boolean {
  if (!text) return false;
  let found = false;
  mapNodes(text, (node) => {
    if (
      isBlockWithItemOfType(Schema.ExternalLink.ID, node) ||
      isBlockWithItemOfType(Schema.InternalLink.ID, node)
    ) {
      found = true;
    }
    return node;
  });
  return found;
}

function wrapLinkBlocks(text: StValue): StValue {
  return mapNodes(text, (node) => {
    if (isBlockWithItemOfType(Schema.ExternalLink.ID, node)) {
      const attrs = node.item.attributes;
      return {
        type: 'block' as const,
        item: buildBlockRecord<Schema.ActionBlock>({
          item_type: Schema.ActionBlock.REF,
          items: [
            buildBlockRecord<Schema.ExternalLink>({
              item_type: Schema.ExternalLink.REF,
              title: attrs.title,
              url: attrs.url,
              style: attrs.style,
              open_in_new_tab: attrs.open_in_new_tab,
            }),
          ],
        }),
      };
    }
    if (isBlockWithItemOfType(Schema.InternalLink.ID, node)) {
      const attrs = node.item.attributes;
      return {
        type: 'block' as const,
        item: buildBlockRecord<Schema.ActionBlock>({
          item_type: Schema.ActionBlock.REF,
          items: [
            buildBlockRecord<Schema.InternalLink>({
              item_type: Schema.InternalLink.REF,
              title: attrs.title,
              link: attrs.link,
              style: attrs.style,
            }),
          ],
        }),
      };
    }
    return node;
  }) as StValue;
}

function patchCaseListBlock(block: CaseListNested): BodyBlockRequest {
  const text = block.attributes.text;
  if (!needsWrap(text)) return block.id;
  return buildBlockRecord<Schema.CaseListBlock>({
    id: block.id,
    text: wrapLinkBlocks(text!),
  }) as BodyBlockRequest;
}

function patchSections(
  sections: GroupingItemNested['attributes']['sections'],
): FieldValueInRequest<GroupingItemNested, 'sections'> {
  const result: FieldValueInRequest<GroupingItemNested, 'sections'> = [];
  for (const section of sections) {
    if (isBlockOfType(Schema.CaseListBlock.ID, section)) {
      result.push(patchCaseListBlock(section) as (typeof result)[number]);
    } else {
      result.push(section.id);
    }
  }
  return result;
}

function patchGroupingItems(
  items: GroupingNested['attributes']['items'],
): FieldValueInRequest<GroupingNested, 'items'> {
  const result: FieldValueInRequest<GroupingNested, 'items'> = [];
  for (const item of items) {
    if (!isBlockOfType(Schema.GroupingItem.ID, item)) {
      result.push(typeof item === 'string' ? item : item.id);
      continue;
    }
    const newSections = patchSections(item.attributes.sections);
    const changed = newSections.some((s) => typeof s !== 'string');
    if (!changed) {
      result.push(item.id);
      continue;
    }
    result.push(
      buildBlockRecord<Schema.GroupingItem>({
        id: item.id,
        sections: newSections,
      }),
    );
  }
  return result;
}

function patchBodyBlocks(
  blocks: Array<CaseListNested | GroupingNested | { id: string }>,
): { patched: BodyBlockRequest[]; changed: boolean } {
  const result: BodyBlockRequest[] = [];
  let changed = false;
  for (const block of blocks) {
    if (isBlockOfType(Schema.CaseListBlock.ID, block)) {
      const patched = patchCaseListBlock(block);
      if (typeof patched !== 'string') changed = true;
      result.push(patched);
      continue;
    }
    if (isBlockOfType(Schema.GroupingBlock.ID, block)) {
      const newItems = patchGroupingItems(block.attributes.items);
      const itemsChanged = newItems.some((i) => typeof i !== 'string');
      if (!itemsChanged) {
        result.push(block.id);
        continue;
      }
      changed = true;
      result.push(
        buildBlockRecord<Schema.GroupingBlock>({
          id: block.id,
          items: newItems,
        }) as BodyBlockRequest,
      );
      continue;
    }
    result.push(block.id);
  }
  return { patched: result, changed };
}

type Locale = 'en' | 'nl';
type LocalizedBlocks = Partial<Record<Locale, Array<{ id: string }> | null>>;

async function processLocalizedBodyBlocksParent(
  client: Client,
  parentId: string,
  bodyBlocks: LocalizedBlocks,
): Promise<boolean> {
  const localized: Partial<Record<Locale, BodyBlockRequest[] | null>> = {};
  let changed = false;
  for (const locale of ['en', 'nl'] as const) {
    const blocks = bodyBlocks[locale];
    if (!Array.isArray(blocks)) {
      localized[locale] = null;
      continue;
    }
    const { patched, changed: c } = patchBodyBlocks(
      blocks as Array<CaseListNested | GroupingNested | { id: string }>,
    );
    localized[locale] = patched;
    if (c) changed = true;
  }
  if (!changed) return false;
  await client.items.update(parentId, { body_blocks: localized });
  return true;
}

async function processFlatBodyBlocksParent(
  client: Client,
  parentId: string,
  bodyBlocks: Array<{ id: string }>,
): Promise<boolean> {
  const { patched, changed } = patchBodyBlocks(
    bodyBlocks as Array<CaseListNested | GroupingNested | { id: string }>,
  );
  if (!changed) return false;
  await client.items.update(parentId, { body_blocks: patched });
  return true;
}

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
    let didUpdate = false;
    if (Array.isArray(bb)) {
      didUpdate = await processFlatBodyBlocksParent(client, item.id, bb);
    } else {
      didUpdate = await processLocalizedBodyBlocksParent(
        client,
        item.id,
        bb as LocalizedBlocks,
      );
    }
    if (didUpdate) {
      updated++;
      console.log(`Updated ${label} ${item.id}`);
    }
  }
  return updated;
}

export default async function (client: Client): Promise<void> {
  let needing = 0;
  let scanned = 0;
  for await (const item of client.items.listPagedIterator<Schema.CaseListBlock>({
    filter: { type: Schema.CaseListBlock.ID },
    version: 'current',
    nested: true,
  })) {
    scanned++;
    if (needsWrap(item.text)) needing++;
  }
  console.log(JSON.stringify({ caseListScanned: scanned, needingWrap: needing }));

  console.log('Phase 1: expand validators to allow ActionBlock + legacy links…');
  await client.fields.update(CASE_LIST_TEXT_FIELD_ID, {
    validators: {
      structured_text_blocks: {
        item_types: [
          Schema.ExternalLink.ID,
          Schema.InternalLink.ID,
          ...STRUC_BLOCKS,
        ],
      },
      structured_text_inline_blocks: { item_types: [...STRUC_INLINE] },
      structured_text_links: STRUC_LINK_VALIDATORS,
    },
    appearance: STRUC_APPEARANCE,
  });

  console.log('Phase 2: wrap link blocks into ActionBlock…');
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

  let stillNeeding = 0;
  for await (const item of client.items.listPagedIterator<Schema.CaseListBlock>({
    filter: { type: Schema.CaseListBlock.ID },
    version: 'current',
    nested: true,
  })) {
    if (needsWrap(item.text)) stillNeeding++;
  }
  if (stillNeeding > 0) {
    throw new Error(
      `${stillNeeding} case_list blocks still have bare link blocks — aborting tighten`,
    );
  }

  console.log('Phase 3: tighten validators to STRUC only…');
  await client.fields.update(CASE_LIST_TEXT_FIELD_ID, {
    validators: {
      structured_text_blocks: { item_types: [...STRUC_BLOCKS] },
      structured_text_inline_blocks: { item_types: [...STRUC_INLINE] },
      structured_text_links: STRUC_LINK_VALIDATORS,
    },
    appearance: STRUC_APPEARANCE,
  });

  console.log('case_list_block.text aligned to STRUC');
}
