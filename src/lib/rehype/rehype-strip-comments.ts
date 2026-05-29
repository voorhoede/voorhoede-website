import type { Element, Root, RootContent } from 'hast';
import type { Plugin } from 'unified';

function stripComments(node: Element | Root) {
  node.children = (node.children as RootContent[]).filter((child) => child.type !== 'comment');
  for (const child of node.children) {
    if (child.type === 'element') {
      stripComments(child as Element);
    }
  }
}

export const rehypeStripComments: Plugin<[], Root> = () => (tree) => {
  stripComments(tree);
};
