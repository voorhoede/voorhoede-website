/**
 * Phase A: Remove case_list_block from all rich_text allowlists and delete the block.
 * Does NOT delete case_item model or records (gated on user approval).
 */
import type { Client } from '@datocms/cma-client-node';

const CASE_LIST_ID = '2486431';

export default async function (client: Client) {
  const itemTypes = await client.itemTypes.list();

  for (const itemType of itemTypes) {
    const typeFields = await client.fields.list(itemType.id);
    for (const field of typeFields) {
      const validators = field.validators as Record<string, { item_types?: string[] }> | undefined;
      if (!validators) continue;

      let changed = false;
      const nextValidators = { ...validators } as Record<
        string,
        Record<string, unknown>
      >;

      for (const key of [
        'rich_text_blocks',
        'single_block_blocks',
        'structured_text_blocks',
        'structured_text_inline_blocks',
        'structured_text_links',
        'items_item_type',
        'item_item_type',
      ] as const) {
        const v = validators[key];
        if (!v?.item_types?.includes(CASE_LIST_ID)) continue;
        nextValidators[key] = {
          ...v,
          item_types: v.item_types.filter((id) => id !== CASE_LIST_ID),
        };
        changed = true;
      }

      // links / links fields use item_types differently
      if (
        validators.item_item_type &&
        Array.isArray(
          (validators.item_item_type as { item_types?: string[] }).item_types,
        ) &&
        (
          validators.item_item_type as { item_types: string[] }
        ).item_types.includes(CASE_LIST_ID)
      ) {
        const v = validators.item_item_type as { item_types: string[] };
        nextValidators.item_item_type = {
          ...v,
          item_types: v.item_types.filter((id) => id !== CASE_LIST_ID),
        };
        changed = true;
      }
      if (
        validators.items_item_type &&
        Array.isArray(
          (validators.items_item_type as { item_types?: string[] }).item_types,
        ) &&
        (
          validators.items_item_type as { item_types: string[] }
        ).item_types.includes(CASE_LIST_ID)
      ) {
        const v = validators.items_item_type as { item_types: string[] };
        nextValidators.items_item_type = {
          ...v,
          item_types: v.item_types.filter((id) => id !== CASE_LIST_ID),
        };
        changed = true;
      }

      if (!changed) continue;
      console.log(
        `Removing case_list_block from ${itemType.api_key}.${field.api_key}`,
      );
      await client.fields.update(field.id, { validators: nextValidators });
    }
  }

  console.log('Destroying case_list_block…');
  await client.itemTypes.destroy(CASE_LIST_ID);
  console.log('case_list_block deleted');
}
