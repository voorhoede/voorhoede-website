import type { Client } from "datocms/lib/cma-client-node";

type NestedBlock = {
  id: string;
  type?: string;
  item_type?: string | { id: string; type?: string };
  attributes?: Record<string, unknown>;
  relationships?: { item_type?: { data?: { id: string } } };
  [key: string]: unknown;
};

type Occurrence = {
  modelApiKey: string;
  recordId: string;
  title: string | null;
  slug: string | null;
  locale: string | null;
  path: string;
  keysTar: string;
  blockId: string;
  summary: string;
  conversion: string;
  notes: string[];
};

const KEYS = new Set(["list_block", "counter_block", "list_item"]);

function typeIdOf(block: NestedBlock): string | null {
  if (typeof block.item_type === "string") return block.item_type;
  if (block.item_type && typeof block.item_type === "object" && "id" in block.item_type) {
    return block.item_type.id;
  }
  if (block.relationships?.item_type?.data?.id) return block.relationships.item_type.data.id;
  if (typeof block.type === "string" && block.type !== "item") return block.type;
  const attrType = block.attributes?.item_type;
  if (typeof attrType === "string") return attrType;
  return null;
}

function asBlocks(value: unknown): NestedBlock[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as NestedBlock[];
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    // localized: { en: [...], nl: [...] }
    const locales = Object.keys(obj);
    if (locales.every((k) => Array.isArray(obj[k]) || obj[k] == null)) {
      return [];
    }
  }
  return [];
}

function localizedBlockMap(value: unknown): Record<string, NestedBlock[]> {
  if (!value) return {};
  if (Array.isArray(value)) return { _unlocalized: value as NestedBlock[] };
  if (typeof value === "object") {
    const out: Record<string, NestedBlock[]> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (Array.isArray(v)) out[k] = v as NestedBlock[];
    }
    return out;
  }
  return {};
}

function plainFromDast(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const root = value as { document?: { children?: unknown[] }; value?: unknown };
  const doc = root.document ?? (root as { children?: unknown[] });
  const parts: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const n = node as { type?: string; value?: string; children?: unknown[] };
    if (typeof n.value === "string") parts.push(n.value);
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  walk(doc);
  return parts.join("").replace(/\s+/g, " ").trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function (client: Client): Promise<void> {
  const types = await client.itemTypes.list();
  const byId = Object.fromEntries(types.map((t) => [t.id, t.api_key]));
  const keyIds = Object.fromEntries(
    ["list_block", "counter_block", "list_item"].map((k) => [
      k,
      types.find((t) => t.api_key === k)!.id,
    ]),
  ) as Record<string, string>;
  const idToKey = Object.fromEntries(
    Object.entries(keyIds).map(([k, id]) => [id, k]),
  );

  const pageOccurrences: Occurrence[] = [];
  const otherOccurrences: Occurrence[] = [];

  function summarizeBlock(apiKey: string, block: NestedBlock): { summary: string; notes: string[] } {
    const notes: string[] = [];
    const attrs = (block.attributes ?? block) as Record<string, unknown>;

    if (apiKey === "counter_block") {
      const amount = attrs.amount;
      const label = attrs.label;
      return { summary: `${amount} ${label}`, notes };
    }

    if (apiKey === "list_item") {
      const body = typeof attrs.body === "string" ? stripHtml(attrs.body) : "";
      const text = plainFromDast(attrs.text);
      const summary = text || body || "(empty)";
      if (body && text) notes.push("has both body and text fields");
      if (/<a\s/i.test(String(attrs.body ?? ""))) notes.push("body has HTML links");
      return { summary: summary.slice(0, 200), notes };
    }

    if (apiKey === "list_block") {
      const listType = String(attrs.list_type ?? "");
      const start = attrs.start_number;
      if (start != null && Number(start) !== 1) {
        notes.push(`start_number=${start} (will not preserve)`);
      }
      const items = asBlocks(attrs.items);
      const itemSummaries = items.map((item) => {
        const itemAttrs = (item.attributes ?? item) as Record<string, unknown>;
        const body = typeof itemAttrs.body === "string" ? stripHtml(itemAttrs.body) : "";
        const text = plainFromDast(itemAttrs.text);
        return (text || body || "?").slice(0, 80);
      });
      return {
        summary: `${listType} [${itemSummaries.join(" | ")}]`.slice(0, 300),
        notes,
      };
    }

    return { summary: "", notes };
  }

  function conversionFor(apiKey: string, topLevel: boolean): string {
    if (apiKey === "list_item") return "(nested under list_block — converted with parent)";
    if (apiKey === "list_block") {
      return topLevel ? "wrap in text_block + native list" : "native list";
    }
    if (apiKey === "counter_block") {
      return topLevel ? "wrap in text_block + plain text" : "plain text";
    }
    return "?";
  }

  function visitBlocks(
    blocks: NestedBlock[],
    ctx: {
      modelApiKey: string;
      recordId: string;
      title: string | null;
      slug: string | null;
      locale: string | null;
      pathPrefix: string;
      topLevel: boolean;
    },
  ) {
    blocks.forEach((block, i) => {
      const typeId = typeIdOf(block);
      const apiKey = typeId ? byId[typeId] : undefined;
      const path = `${ctx.pathPrefix}[${i}](${apiKey ?? typeId ?? "?"})`;
      const attrs = (block.attributes ?? block) as Record<string, unknown>;

      if (apiKey && KEYS.has(apiKey)) {
        const { summary, notes } = summarizeBlock(apiKey, block);
        const occ: Occurrence = {
          modelApiKey: ctx.modelApiKey,
          recordId: ctx.recordId,
          title: ctx.title,
          slug: ctx.slug,
          locale: ctx.locale,
          path,
          keysTar: apiKey,
          blockId: block.id,
          summary,
          conversion: conversionFor(apiKey, ctx.topLevel),
          notes,
        };
        if (ctx.modelApiKey === "page") pageOccurrences.push(occ);
        else otherOccurrences.push(occ);

        // Also record nested list_items under list_block for completeness
        if (apiKey === "list_block") {
          const items = asBlocks(attrs.items);
          items.forEach((item, j) => {
            const itemTypeId = typeIdOf(item);
            const itemKey = itemTypeId ? byId[itemTypeId] : undefined;
            if (itemKey === "list_item") {
              const s = summarizeBlock("list_item", item);
              const itemOcc: Occurrence = {
                ...occ,
                path: `${path}.items[${j}]`,
                keysTar: "list_item",
                blockId: item.id,
                summary: s.summary,
                conversion: conversionFor("list_item", false),
                notes: s.notes,
              };
              if (ctx.modelApiKey === "page") pageOccurrences.push(itemOcc);
              else otherOccurrences.push(itemOcc);
            }
          });
        }
      }

      // Walk structured text fields for embedded blocks
      for (const [fieldKey, fieldVal] of Object.entries(attrs)) {
        if (!fieldVal || typeof fieldVal !== "object") continue;

        // Localized structured text or blocks
        if (!Array.isArray(fieldVal) && typeof fieldVal === "object") {
          const maybeLocales = fieldVal as Record<string, unknown>;
          const localeKeys = Object.keys(maybeLocales);
          const looksLocalized = localeKeys.every(
            (lk) => lk === "en" || lk === "nl" || lk.length <= 5,
          );
          if (looksLocalized && localeKeys.some((lk) => maybeLocales[lk] != null)) {
            for (const [loc, locVal] of Object.entries(maybeLocales)) {
              walkStructuredOrBlocks(locVal, {
                ...ctx,
                locale: ctx.locale ?? loc,
                pathPrefix: `${path}.${fieldKey}.${loc}`,
                topLevel: false,
              });
            }
            continue;
          }
        }

        walkStructuredOrBlocks(fieldVal, {
          ...ctx,
          pathPrefix: `${path}.${fieldKey}`,
          topLevel: false,
        });
      }
    });
  }

  function walkStructuredOrBlocks(
    value: unknown,
    ctx: {
      modelApiKey: string;
      recordId: string;
      title: string | null;
      slug: string | null;
      locale: string | null;
      pathPrefix: string;
      topLevel: boolean;
    },
  ) {
    if (!value) return;

    if (Array.isArray(value)) {
      visitBlocks(value as NestedBlock[], ctx);
      return;
    }

    if (typeof value !== "object") return;
    const obj = value as Record<string, unknown>;

    // DAST structured text with embedded blocks map
    if (obj.schema === "dast" || obj.document) {
      // blocks may be sibling array on the field value in CMA nested form
      return;
    }

    // CMA nested structured text shape often: { en: { value, blocks, links, ... } } already handled
    // Or: { value: dast, blocks: NestedBlock[], links: ... }
    if (Array.isArray(obj.blocks)) {
      visitBlocks(obj.blocks as NestedBlock[], {
        ...ctx,
        pathPrefix: `${ctx.pathPrefix}.blocks`,
        topLevel: false,
      });
    }
    if (Array.isArray(obj.inline_blocks)) {
      visitBlocks(obj.inline_blocks as NestedBlock[], {
        ...ctx,
        pathPrefix: `${ctx.pathPrefix}.inline_blocks`,
        topLevel: false,
      });
    }

    // rich_text nested items
    if (Array.isArray(obj.items)) {
      visitBlocks(obj.items as NestedBlock[], {
        ...ctx,
        pathPrefix: `${ctx.pathPrefix}.items`,
        topLevel: false,
      });
    }
    if (Array.isArray(obj.sections)) {
      visitBlocks(obj.sections as NestedBlock[], {
        ...ctx,
        pathPrefix: `${ctx.pathPrefix}.sections`,
        topLevel: false,
      });
    }
  }

  async function scanModel(modelApiKey: string) {
    const model = types.find((t) => t.api_key === modelApiKey);
    if (!model) {
      console.log(`SKIP model ${modelApiKey}`);
      return;
    }

    let offset = 0;
    const limit = 30;
    while (true) {
      const page = await client.items.list({
        filter: { type: model.id },
        page: { limit, offset },
        version: "current",
      });
      if (page.length === 0) break;

      for (const item of page) {
        const nested = await client.items.find(item.id, {
          nested: true,
          version: "current",
        });
        const rec = nested as Record<string, unknown> & { id: string };
        const titleVal = rec.title;
        const slugVal = rec.slug;
        const title =
          typeof titleVal === "string"
            ? titleVal
            : titleVal && typeof titleVal === "object"
              ? String((titleVal as Record<string, string>).en ?? (titleVal as Record<string, string>).nl ?? "")
              : null;
        const slug =
          typeof slugVal === "string"
            ? slugVal
            : slugVal && typeof slugVal === "object"
              ? String((slugVal as Record<string, string>).en ?? (slugVal as Record<string, string>).nl ?? "")
              : null;

        // body_blocks / blocks / sections — possibly localized
        for (const field of ["body_blocks", "blocks", "sections", "body"]) {
          if (!(field in rec)) continue;
          const fieldVal = rec[field];

          // structured text field at top level
          if (field === "body" && fieldVal && typeof fieldVal === "object" && !Array.isArray(fieldVal)) {
            const locMap = fieldVal as Record<string, unknown>;
            for (const [loc, locVal] of Object.entries(locMap)) {
              if (locVal && typeof locVal === "object") {
                walkStructuredOrBlocks(locVal, {
                  modelApiKey,
                  recordId: rec.id,
                  title,
                  slug,
                  locale: loc,
                  pathPrefix: `${field}.${loc}`,
                  topLevel: false,
                });
              }
            }
            continue;
          }

          const byLocale = localizedBlockMap(fieldVal);
          for (const [loc, blocks] of Object.entries(byLocale)) {
            visitBlocks(blocks, {
              modelApiKey,
              recordId: rec.id,
              title,
              slug,
              locale: loc === "_unlocalized" ? null : loc,
              pathPrefix: `${field}${loc === "_unlocalized" ? "" : `.${loc}`}`,
              topLevel: field === "body_blocks" || field === "blocks" || field === "sections",
            });
          }
        }
      }

      if (page.length < limit) break;
      offset += limit;
    }
  }

  // Convert page only, but scan others for leftovers
  const modelsToScan = [
    "page",
    "home_page",
    "blog_post",
    "case_item",
    "event",
    "page_partial",
    "not_found_page",
  ];

  for (const m of modelsToScan) {
    await scanModel(m);
  }

  // Also deep-scan: find any item whose nested payload stringifies to key ids
  // (already covered via models)

  console.log(
    JSON.stringify(
      {
        keyIds,
        pageCount: pageOccurrences.filter((o) => o.keysTar !== "list_item").length,
        pageListItemCount: pageOccurrences.filter((o) => o.keysTar === "list_item").length,
        otherCount: otherOccurrences.filter((o) => o.keysTar !== "list_item").length,
        pageOccurrences: pageOccurrences.filter((o) => o.keysTar !== "list_item"),
        pageListItems: pageOccurrences.filter((o) => o.keysTar === "list_item"),
        otherOccurrences: otherOccurrences.filter((o) => o.keysTar !== "list_item"),
        otherListItems: otherOccurrences.filter((o) => o.keysTar === "list_item"),
      },
      null,
      2,
    ),
  );
}
