import type { Client } from '@datocms/cma-client-node';
import {
  isBlockWithItemOfType,
  mapNodes,
} from 'datocms-structured-text-utils';
import * as Schema from './datocms-schema-new-data-models';

export default async function (client: Client): Promise<void> {
  const remaining: string[] = [];
  for await (const item of client.items.listPagedIterator<Schema.CaseListBlock>({
    filter: { type: Schema.CaseListBlock.ID },
    version: 'current',
    nested: true,
  })) {
    const text = item.text;
    if (!text) continue;
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
    if (found) remaining.push(item.id);
  }
  console.log(JSON.stringify({ remaining }));

  // Search parents for these IDs by dumping case_list block ids per parent
  for (const typeId of [
    Schema.Page.ID,
    Schema.CaseItem.ID,
    Schema.BlogPost.ID,
    Schema.Event.ID,
    Schema.PagePartial.ID,
    Schema.HomePage.ID,
    Schema.NotFoundPage.ID,
  ]) {
    for await (const item of client.items.listPagedIterator({
      filter: { type: typeId },
      version: 'current',
      nested: true,
    })) {
      if (!('body_blocks' in item) || !item.body_blocks) continue;
      const raw = JSON.stringify(item.body_blocks);
      for (const id of remaining) {
        if (raw.includes(id)) {
          console.log(`Found ${id} in type=${typeId} parent=${item.id}`);
        }
      }
    }
  }
}
