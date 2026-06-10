import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { buildFrontmatter } from '../lib/frontmatter.js';
import { rehypeExtractContent } from '../lib/rehype/rehype-extract-content.js';
import { rehypeExtractMeta, type PageMeta } from '../lib/rehype/rehype-extract-meta.js';
import { rehypeRemoveEmptyElements } from '../lib/rehype/rehype-remove-empty-elements.js';
import { rehypeRewriteLinksToMarkdown } from '../lib/rehype/rehype-rewrite-links-to-markdown.js';
import { rehypeStripComments } from '../lib/rehype/rehype-strip-comments.js';

interface HtmlToMarkdownOptions {
  html: string;
  url: string;
  origin?: string;
}

function buildProcessor(origin: string) {
  return unified()
    .use(rehypeParse)
    .use(rehypeExtractMeta)
    .use(rehypeExtractContent, {
      selector: '#content',
      exclude: [
        '.app-footer',
        '.open-in-llm',
        '[aria-hidden="true"]',
        'img:not([alt])',
        'img[alt=""]',
      ],
    })
    .use(rehypeStripComments)
    .use(rehypeRemoveEmptyElements)
    .use(rehypeRewriteLinksToMarkdown, { origin })
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify);
}

const processorCache = new Map<string, ReturnType<typeof buildProcessor>>();
function getProcessor(origin: string) {
  let processor = processorCache.get(origin);
  if (!processor) {
    processor = buildProcessor(origin);
    processorCache.set(origin, processor);
  }
  return processor;
}

export async function htmlToMarkdown({ html, url, origin = '' }: HtmlToMarkdownOptions): Promise<string> {
  const result = await getProcessor(origin).process(html);
  const body = String(result);
  if (!body.trim()) return '';
  const meta = (result.data.meta ?? {}) as PageMeta;
  return buildFrontmatter({ meta, url }) + body;
}
