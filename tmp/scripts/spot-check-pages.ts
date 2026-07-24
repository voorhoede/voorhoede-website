import type { Client } from '@datocms/lib/cma-client-node';
import { writeFileSync } from 'node:fs';

export default async function (client: Client): Promise<void> {
  const pageIds = ['148229180', '148389556', '147662363', 'UPvb1Ft5Q-yCUBlQ8FV5kw'] as const;
  const labels: Record<string, string> = {
    '148229180': 'about-us',
    '148389556': 'lustrum',
    '147662363': 'work-at',
    'UPvb1Ft5Q-yCUBlQ8FV5kw': 'test',
  };

  const itemTypes = await client.itemTypes.list();
  const typeById = new Map(itemTypes.map((t) => [t.id, t.api_key]));

  const out: unknown[] = [];
  for (const id of pageIds) {
    const item = await client.items.find(id, {
      nested: true,
      version: 'current',
    });
    const body = (item as Record<string, unknown>).body_blocks as
      | Record<string, unknown[]>
      | unknown[]
      | undefined;

    const enBlocks = Array.isArray(body)
      ? body
      : Array.isArray(body?.en)
        ? body.en
        : [];

    const en = enBlocks.map((block) => {
      const b = block as Record<string, unknown>;
      const typeId =
        (b.item_type as { id?: string } | string | undefined &&
        typeof b.item_type === 'object'
          ? (b.item_type as { id?: string }).id
          : typeof b.item_type === 'string'
            ? b.item_type
            : undefined) ??
        (typeof b.type === 'string' ? b.type : undefined);
      return {
        id: b.id,
        typeId: String(typeId ?? ''),
        apiKey: typeId ? typeById.get(String(typeId)) ?? null : null,
      };
    });

    const meta = (item as { meta?: Record<string, unknown> }).meta;
    out.push({
      label: labels[id],
      id,
      slug: (item as { slug?: string }).slug,
      updated_at: meta?.updated_at ?? (item as { updated_at?: string }).updated_at,
      enBodyBlocks: en,
      enCount: en.length,
    });
  }

  writeFileSync('/tmp/cma-spot-check.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
}
