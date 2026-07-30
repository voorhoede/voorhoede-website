/**
 * Phase B: Delete case_item records + model; strip CaseItem from link validators.
 * Run against TAR (new-data-models) only after explicit user approval.
 */
import type { Client } from '@datocms/cma-client-node';

const CASE_ITEM_ID = '38240';

export default async function (client: Client) {
  const cases = [];
  for await (const item of client.items.listPagedIterator({
    filter: { type: 'case_item' },
    version: 'current',
  })) {
    cases.push(item);
  }
  console.log(`Deleting ${cases.length} case_item records…`);
  for (const c of cases) {
    await client.items.unpublish(c.id).catch(() => undefined);
    await client.items.destroy(c.id);
    console.log(`  Deleted ${c.id}`);
  }

  const itemTypes = await client.itemTypes.list();
  for (const itemType of itemTypes) {
    if (itemType.id === CASE_ITEM_ID) continue;
    const fields = await client.fields.list(itemType.id);
    for (const field of fields) {
      const validators = field.validators as
        | Record<string, { item_types?: string[] }>
        | undefined;
      if (!validators) continue;
      let changed = false;
      const next: Record<string, unknown> = { ...validators };
      for (const [key, v] of Object.entries(validators)) {
        if (!v?.item_types?.includes(CASE_ITEM_ID)) continue;
        next[key] = {
          ...v,
          item_types: v.item_types.filter((id) => id !== CASE_ITEM_ID),
        };
        changed = true;
      }
      if (!changed) continue;
      console.log(
        `Removing case_item from ${itemType.api_key}.${field.api_key}`,
      );
      await client.fields.update(field.id, { validators: next });
    }
  }

  console.log('Destroying case_item model…');
  await client.itemTypes.destroy(CASE_ITEM_ID);
  console.log('case_item deleted');
}
