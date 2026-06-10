import type { Element, Root } from 'hast';
import type { Plugin } from 'unified';

/**
 * Tags that produce Markdown without text, so they keep their ancestors alive
 * (`<a>` around an `<img>` isn't empty). `<svg>` is excluded, icons render to
 * nothing, so a link wrapping only an icon is empty.
 */
const selfMeaningfulTags = new Set(['img', 'hr', 'br']);

function hasMeaningfulContent(node: Element | Root): boolean {
  return node.children.some((child) => {
    if (child.type === 'text') return child.value.trim() !== '';
    if (child.type !== 'element') return false;
    return selfMeaningfulTags.has(child.tagName) || hasMeaningfulContent(child);
  });
}

// Bottom-up, so an element emptied by pruning its children is dropped too.
function removeEmptyElements(node: Element | Root) {
  node.children = node.children.filter((child) => {
    if (child.type !== 'element') return true;
    removeEmptyElements(child);
    return selfMeaningfulTags.has(child.tagName) || hasMeaningfulContent(child);
  });
}

export const rehypeRemoveEmptyElements: Plugin<[], Root> = () => (tree) => {
  removeEmptyElements(tree);
};
