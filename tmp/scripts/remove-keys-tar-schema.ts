import type { Client } from "datocms/lib/cma-client-node";

export default async function (client: Client): Promise<void> {
  const types = await client.itemTypes.list();
  const byKey = Object.fromEntries(types.map((t) => [t.api_key, t]));

  const removeKeys = ["list_block", "counter_block", "list_item"] as const;
  const removeIds = new Set(
    removeKeys.map((k) => byKey[k]?.id).filter((id): id is string => Boolean(id)),
  );

  console.log("Removing IDs:", [...removeIds]);

  // Final leftover content scan before schema delete
  const hits: Array<{ model: string; recordId: string; path: string }> = [];
  function walk(
    value: object | object[] | string | number | boolean | null,
    path: string,
    meta: { model: string; recordId: string },
    seen: Set<object>,
  ) {
    if (value == null || typeof value !== "object") return;
    if (seen.has(value as object)) return;
    seen.add(value as object);
    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v as object, `${path}[${i}]`, meta, seen));
      return;
    }
    const obj = value as Record<string, object | string | null>;
    const typeId =
      (typeof obj.__itemTypeId === "string" && obj.__itemTypeId) ||
      (typeof obj.item_type === "string" && obj.item_type) ||
      null;
    if (typeId && removeIds.has(typeId)) {
      hits.push({ model: meta.model, recordId: meta.recordId, path });
    }
    for (const [k, v] of Object.entries(obj)) {
      if (k === "meta" || k === "creator") continue;
      walk(v as object, `${path}.${k}`, meta, seen);
    }
  }

  const modelsToScan = [
    "page",
    "home_page",
    "blog_post",
    "case_item",
    "event",
    "page_partial",
    "not_found_page",
  ];
  for (const model of modelsToScan) {
    const t = byKey[model];
    if (!t) continue;
    let offset = 0;
    while (true) {
      const batch = await client.items.list({
        filter: { type: t.id },
        page: { limit: 30, offset },
        version: "current",
      });
      if (batch.length === 0) break;
      for (const item of batch) {
        const nested = await client.items.find(item.id, { nested: true, version: "current" });
        walk(nested as object, model, { model, recordId: item.id }, new Set<object>());
      }
      if (batch.length < 30) break;
      offset += 30;
    }
  }

  if (hits.length > 0) {
    console.log(JSON.stringify({ error: "leftover content — aborting schema delete", hits }, null, 2));
    return;
  }
  console.log("Leftover content scan: clean");

  type ValidatorBag = Record<string, { item_types?: string[] } | object>;
  const validatorKeys = [
    "rich_text_blocks",
    "structured_text_blocks",
    "structured_text_inline_blocks",
    "single_block_blocks",
  ] as const;

  let fieldsUpdated = 0;

  for (const itemType of types) {
    const fields = await client.fields.list(itemType.id);
    for (const field of fields) {
      const validators = field.validators as ValidatorBag | undefined;
      if (!validators) continue;

      let changed = false;
      const nextValidators: ValidatorBag = { ...validators };

      for (const vk of validatorKeys) {
        const v = validators[vk];
        if (!v || typeof v !== "object" || !("item_types" in v) || !Array.isArray(v.item_types)) {
          continue;
        }
        const before = v.item_types as string[];
        const after = before.filter((id) => !removeIds.has(id));
        if (after.length !== before.length) {
          nextValidators[vk] = { ...v, item_types: after };
          changed = true;
          console.log(
            `  strip ${itemType.api_key}.${field.api_key}.${vk}: ${before.length} → ${after.length}`,
          );
        }
      }

      if (changed) {
        await client.fields.update(field.id, { validators: nextValidators });
        fieldsUpdated++;
      }
    }
  }

  console.log(`Updated ${fieldsUpdated} fields`);

  // Delete in dependency order: list_item first (referenced by list_block), then list_block, then counter_block
  for (const key of ["list_item", "list_block", "counter_block"] as const) {
    const t = byKey[key];
    if (!t) {
      console.log(`SKIP destroy ${key}: not found`);
      continue;
    }
    try {
      await client.itemTypes.destroy(t.id);
      console.log(`Deleted item type: ${key} (${t.id})`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`FAIL destroy ${key}: ${msg}`);
    }
  }

  // Verify gone
  const afterTypes = await client.itemTypes.list();
  const stillThere = ["list_item", "list_block", "counter_block"].filter((k) =>
    afterTypes.some((t) => t.api_key === k),
  );
  console.log(JSON.stringify({ stillThere }, null, 2));
}
