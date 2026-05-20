export function usePageGlossaryTerms() {
  const route = useRoute();
  return useState(`page-glossary-terms-${route.path}`, () => []);
}

export function collectGlossaryTerms(root) {
  const seen = new WeakSet();
  const byId = new Set();
  const collected = [];

  function walk(node) {
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
