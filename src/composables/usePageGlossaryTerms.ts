export type GlossaryTerm = {
  id: string;
  term: string;
  slug: string;
  question: string;
  definition: string;
  definitionHtml: string;
};

export function usePageGlossaryTerms() {
  const route = useRoute();
  return useState<GlossaryTerm[]>(
    `page-glossary-terms-${route.path}`,
    () => [],
  );
}

export function collectGlossaryTerms(root: any): GlossaryTerm[] {
  const seen = new WeakSet<object>();
  const byId = new Set<string>();
  const collected: GlossaryTerm[] = [];

  function walk(node: any) {
    if (node === null || typeof node !== "object") return;
    if (seen.has(node)) return;
    seen.add(node);

    if (
      node.__typename === "GlossaryTermRecord" &&
      node.id &&
      !byId.has(node.id)
    ) {
      byId.add(node.id);
      collected.push(node);
    }

    if (Array.isArray(node)) {
      for (const item of node) walk(item);
    } else {
      for (const key of Object.keys(node)) walk(node[key]);
    }
  }

  walk(root);
  return collected;
}
