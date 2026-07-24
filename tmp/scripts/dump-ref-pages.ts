import { writeFileSync } from 'node:fs';
import type { Client } from '@datocms/lib/cma-client-node';

const OUT = '/tmp/ref-all-pages.json';
const SKIP_SLUGS = new Set(['test']);

export default async function (client: Client): Promise<void> {
  const types = await client.itemTypes.list();
  const pageType = types.find((t) => t.api_key === 'page');
  if (!pageType) throw new Error('page model not found');

  const pages: Array<{
    id: string;
    slug: string;
    status: string | null;
    sections: Record<string, unknown[]>;
  }> = [];

  for await (const page of client.items.listPagedIterator({
    filter: { type: pageType.id },
    version: 'current',
    nested: true,
    page: { limit: 30 },
  })) {
    const slug = String(
      (page.slug as { en?: string; nl?: string } | string)?.en ??
        (page.slug as { en?: string; nl?: string } | string)?.nl ??
        page.slug ??
        '',
    );

    if (SKIP_SLUGS.has(slug)) {
      console.log(`Skipping dump for slug=${slug}`);
      continue;
    }

    const sections = (page.sections ?? {}) as Record<string, unknown[]>;
    pages.push({
      id: page.id,
      slug,
      status: page.meta.status,
      sections: {
        en: sections.en ?? [],
        nl: sections.nl ?? [],
      },
    });
  }

  writeFileSync(OUT, JSON.stringify({ pages }, null, 2));
  console.log(
    JSON.stringify(
      {
        out: OUT,
        pageCount: pages.length,
        slugs: pages.map((p) => p.slug).sort(),
      },
      null,
      2,
    ),
  );
}
