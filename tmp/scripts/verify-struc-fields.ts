import type { Client } from '@datocms/cma-client-node';
import * as Schema from './datocms-schema-new-data-models';

type Dast = {
  schema?: string;
  document?: { type?: string; children?: Array<{ type: string }> };
};

function countWithBody(
  body: Dast | null | undefined,
): boolean {
  return (body?.document?.children?.length ?? 0) > 0;
}

export default async function (client: Client): Promise<void> {
  const stats = {
    reach: { total: 0, withBody: 0 },
    header: { total: 0, withBody: 0 },
    blog: { total: 0, withBody: 0 },
  };

  for await (const item of client.items.listPagedIterator({
    filter: { type: Schema.ReachOutBlock.ID },
    version: 'current',
    nested: true,
  })) {
    stats.reach.total++;
    if (countWithBody(item.body as Dast)) stats.reach.withBody++;
  }

  for await (const item of client.items.listPagedIterator({
    filter: { type: Schema.PageHeader.ID },
    version: 'current',
    nested: true,
  })) {
    stats.header.total++;
    if (countWithBody(item.body as Dast)) stats.header.withBody++;
  }

  for await (const item of client.items.listPagedIterator({
    filter: { type: Schema.BlogListBlock.ID },
    version: 'current',
    nested: true,
  })) {
    stats.blog.total++;
    if (countWithBody(item.description as Dast)) stats.blog.withBody++;
  }

  console.log(JSON.stringify(stats, null, 2));
}
