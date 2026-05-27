import type { Element, Root, RootContent } from 'hast';
import type { Plugin } from 'unified';
import { select, selectAll } from 'hast-util-select';

interface Options {
  selector: string;
  exclude?: string[];
}

function removeNodes(node: Element | Root, toRemove: Set<Element>) {
  node.children = (node.children as RootContent[]).filter(
    (child) => !(child.type === 'element' && toRemove.has(child as Element)),
  );
  for (const child of node.children) {
    if (child.type === 'element') {
      removeNodes(child as Element, toRemove);
    }
  }
}

const rehypeExtractContent: Plugin<[Options], Root> = ({ selector, exclude = [] }) => (tree) => {
  const content = select(selector, tree);
  if (!content) {
    tree.children = [];
    return;
  }
  const toRemove = new Set<Element>();
  for (const sel of exclude) {
    for (const node of selectAll(sel, content)) {
      toRemove.add(node);
    }
  }
  if (toRemove.size > 0) {
    removeNodes(content, toRemove);
  }
  tree.children = content.children as RootContent[];
};

export default rehypeExtractContent;
