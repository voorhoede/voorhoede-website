import type { Client } from "datocms/lib/cma-client-node";
import {
  buildBlockRecord,
  isBlockOfType,
  type ApiTypes,
} from "@datocms/cma-client-node";
import {
  mapNodes,
  isBlockWithItemOfType,
  isInlineBlockWithItemOfType,
} from "datocms-structured-text-utils";

const PAGE_IDS = ["148389556", "BOVrxplVQJupJS0FZmxk4g", "147099441"] as const;

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function convertStructuredText<T extends object>(content: T): T {
  return mapNodes(content, (node) => {
    if (isInlineBlockWithItemOfType("1994024", node)) {
      const amount = node.item.attributes.amount;
      const label = node.item.attributes.label;
      return [
        { type: "span" as const, marks: ["strong" as const], value: String(amount ?? "") },
        { type: "span" as const, value: ` ${label ?? ""}` },
      ];
    }

    if (isBlockWithItemOfType("BPorHoA0SeiqEt8ZCFcpBQ", node)) {
      const listType = String(node.item.attributes.list_type ?? "numbered");
      const style =
        listType === "bullet" || listType === "unordered" || listType === "bulleted"
          ? ("bulleted" as const)
          : ("numbered" as const);
      const items = node.item.attributes.items ?? [];
      return {
        type: "list" as const,
        style,
        children: items.map((item) => {
          const body =
            item && typeof item === "object" && "attributes" in item
              ? stripHtml(String((item as { attributes?: { body?: string | null } }).attributes?.body ?? ""))
              : "";
          return {
            type: "listItem" as const,
            children: [
              {
                type: "paragraph" as const,
                children: [{ type: "span" as const, value: body || "" }],
              },
            ],
          };
        }),
      };
    }

    return node;
  }) as T;
}

export default async function (client: Client): Promise<void> {
  // Resolve Schema IDs from live project via itemTypes (file-mode has no Schema ambient)
  const types = await client.itemTypes.list();
  const idByKey = Object.fromEntries(types.map((t) => [t.api_key, t.id]));
  const PAGE = idByKey.page!;
  const TEXT_BLOCK = idByKey.text_block!;
  const LIST_BLOCK = idByKey.list_block!;
  const COUNTER_BLOCK = idByKey.counter_block!;

  console.log(JSON.stringify({ PAGE, TEXT_BLOCK, LIST_BLOCK, COUNTER_BLOCK }));

  for (const pageId of PAGE_IDS) {
    const page = await client.items.find(pageId, { nested: true, version: "current" });
    const bodyBlocks = (page as { body_blocks?: Record<string, object[] | null> | null }).body_blocks;
    if (!bodyBlocks || Array.isArray(bodyBlocks)) {
      console.log(`SKIP ${pageId}: unexpected body_blocks shape`);
      continue;
    }

    const nextBody: Record<string, object[]> = {};

    for (const [locale, blocks] of Object.entries(bodyBlocks)) {
      if (!blocks) {
        nextBody[locale] = [];
        continue;
      }

      nextBody[locale] = blocks.map((raw) => {
        const block = raw as {
          id: string;
          __itemTypeId?: string;
          attributes?: Record<string, object | string | number | boolean | null>;
          meta?: object;
          type?: string;
          relationships?: object;
        };

        if (block.__itemTypeId !== TEXT_BLOCK) {
          // Pass through non-text blocks unchanged (nested response shape accepted by update)
          return raw;
        }

        const text = block.attributes?.text;
        if (!text || typeof text !== "object") return raw;

        const converted = convertStructuredText(text);

        return buildBlockRecord({
          id: block.id,
          item_type: { type: "item_type", id: TEXT_BLOCK },
          text: converted,
        });
      });
    }

    await client.items.update(pageId, {
      body_blocks: nextBody,
      meta: { current_version: (page as { meta: { current_version: string } }).meta.current_version },
    });
    await client.items.publish(pageId);
    console.log(`Converted + published page ${pageId}`);
  }

  // Verify no KEYS_TAR remain on these pages
  const remaining: Array<{ pageId: string; apiKey: string; path: string }> = [];
  const targets = new Set([LIST_BLOCK, COUNTER_BLOCK, idByKey.list_item!]);

  function walk(value: object | object[] | string | number | boolean | null, path: string, pageId: string, seen: Set<object>) {
    if (value == null || typeof value !== "object") return;
    if (seen.has(value as object)) return;
    seen.add(value as object);
    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v as object, `${path}[${i}]`, pageId, seen));
      return;
    }
    const obj = value as Record<string, object | string | null>;
    const typeId =
      (typeof obj.__itemTypeId === "string" && obj.__itemTypeId) ||
      (typeof obj.item_type === "string" && obj.item_type) ||
      null;
    if (typeId && targets.has(typeId)) {
      remaining.push({
        pageId,
        apiKey: typeId === LIST_BLOCK ? "list_block" : typeId === COUNTER_BLOCK ? "counter_block" : "list_item",
        path,
      });
    }
    for (const [k, v] of Object.entries(obj)) {
      if (k === "meta" || k === "creator") continue;
      walk(v as object, `${path}.${k}`, pageId, seen);
    }
  }

  for (const pageId of PAGE_IDS) {
    const nested = await client.items.find(pageId, { nested: true, version: "current" });
    walk(nested as object, "page", pageId, new Set<object>());
  }

  console.log(JSON.stringify({ remainingCount: remaining.length, remaining }, null, 2));
}
