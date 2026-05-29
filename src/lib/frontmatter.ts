import { stringify } from '@std/yaml';
import type { PageMeta } from './rehype/rehype-extract-meta.js';

export interface FrontmatterOptions {
  meta: PageMeta;
  url: string;
}

function deriveLanguage(url: string): string | undefined {
  try {
    const path = new URL(url, 'http://_').pathname;
    const [firstSegment] = path.split('/').filter(Boolean);
    return firstSegment
      ? new Intl.DisplayNames(['en'], { type: 'language' }).of(firstSegment)
      : undefined;
  } catch {
    return undefined;
  }
}

export function buildFrontmatter({ meta, url }: FrontmatterOptions): string {
  const fields: Record<string, string> = {};
  const title = meta['og:title'] || meta['twitter:title'] || meta['dc.title'];
  const description = meta['og:description'] || meta['twitter:description'] || meta['dc.description'];
  const language = deriveLanguage(url);
  const finalUrl = meta['og:url'] || url;

  if (title) fields.title = title;
  if (description) fields.description = description;
  if (language) fields.language = language;
  if (finalUrl) fields.url = finalUrl;

  if (Object.keys(fields).length === 0) return '';
  return `---\n${stringify(fields)}---\n\n`;
}
