import type { Client } from '@datocms/cma-client-node';
import { isBlockOfType } from '@datocms/cma-client';
import * as Schema from './datocms-schema-new-data-models';

export default async function (client: Client): Promise<void> {
  const page = await client.items.find('cUEYBywPQRO3LzgkHw7hdQ', {
    nested: true,
    version: 'current',
  });
  const bb = page.body_blocks as {
    en?: Array<{
      id: string;
      __itemTypeId?: string;
      attributes?: Record<string, string | null>;
    }>;
  };
  const en = bb.en ?? [];
  console.log(
    JSON.stringify(
      en.map((b, i) => ({
        i,
        id: b.id,
        type: b.__itemTypeId,
        theme: b.attributes?.theme ?? null,
        isGrouping: b.__itemTypeId === Schema.GroupingBlock.ID,
        isReachOut: b.__itemTypeId === Schema.ReachOutBlock.ID,
        keys: b.attributes ? Object.keys(b.attributes) : [],
      })),
      null,
      2,
    ),
  );

  const block3 = en[3];
  if (block3 && isBlockOfType(Schema.GroupingBlock.ID, block3)) {
    console.log(
      'grouping attrs',
      JSON.stringify(block3.attributes, null, 2).slice(0, 1500),
    );
  }
}
