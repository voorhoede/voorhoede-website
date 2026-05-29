import type { Root } from 'hast';
import type { Plugin } from 'unified';
import { selectAll } from 'hast-util-select';

interface Options {
  origin?: string;
}

const SKIP_EXTENSIONS = /\.(svg|png|jpe?g|gif|webp|avif|ico|json|xml|pdf|webmanifest|md|txt|css|js|mjs|map|woff2?|ttf|otf|mp4|webm|mp3|wav|zip)$/i;

function htmlToMarkdownPath(pathname: string): string {
  if (pathname.endsWith('.html')) return pathname.replace(/\.html$/, '.md');
  return pathname.replace(/\/$/, '') + '.md';
}

export const rehypeRewriteLinksToMarkdown: Plugin<[Options?], Root> = ({ origin = '' } = {}) => {
  const normalizedOrigin = origin ? new URL(origin).origin : '';

  return (tree) => {
    for (const node of selectAll('a[href]', tree)) {
      const href = node.properties?.href;
      if (typeof href !== 'string' || !href) continue;

      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('//')
      ) continue;

      let pathname: string;
      let suffix = '';
      let prefix = '';

      if (href.startsWith('/')) {
        const hashIndex = href.indexOf('#');
        const queryIndex = href.indexOf('?');
        const splitAt = [hashIndex, queryIndex].filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? href.length;
        pathname = href.slice(0, splitAt);
        suffix = href.slice(splitAt);
      } else if (normalizedOrigin && href.startsWith(normalizedOrigin)) {
        try {
          const url = new URL(href);
          pathname = url.pathname;
          suffix = url.search + url.hash;
          prefix = normalizedOrigin;
        } catch {
          continue;
        }
      } else {
        continue;
      }

      if (pathname === '/' || pathname === '') continue;
      if (pathname.startsWith('/api/')) continue;
      if (pathname.endsWith('.md')) continue;
      if (SKIP_EXTENSIONS.test(pathname)) continue;

      node.properties!.href = `${prefix}${htmlToMarkdownPath(pathname)}${suffix}`;
    }
  };
};
