import { accepts } from '@std/http/negotiation';
import { locales } from '~/lib/i18n.js';
import { htmlToMarkdown } from '~/scripts/html-to-markdown.js';

/**
 * Serves a localized page's Markdown source on demand, converted from the page's
 * own rendered HTML. Reachable two ways: the canonical URL with
 * `Accept: text/markdown`, and the explicit `.md` URL (used by the 'Open in LLM'
 * component and the Markdown link rewriting).
 *
 * https://specification.website/spec/agent-readiness/markdown-source-endpoints/
 */
const localeCodes = locales.map(({ code }) => code);

const FRESH_MAX_AGE_SECONDS = 60 * 60;
const STALE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const renderMarkdown = defineCachedFunction(
  async (htmlPath: string): Promise<string | null> => {
    const html = await $fetch<string>(htmlPath, {
      responseType: 'text',
      headers: { accept: 'text/html' },
    }).catch(() => null);
    if (!html) return null;

    const markdown = await htmlToMarkdown({
      html,
      url: htmlPath,
      origin: useRuntimeConfig().public.baseUrl,
    });
    return markdown || null;
  },
  {
    name: 'markdown-source',
    getKey: (htmlPath) => htmlPath,
    maxAge: FRESH_MAX_AGE_SECONDS,
    swr: true,
    // swr serves stale indefinitely; force a re-render once a month old.
    validate: (entry) =>
      entry.value !== undefined &&
      Date.now() - (entry.mtime ?? 0) < STALE_MAX_AGE_SECONDS * 1000,
  },
);

const isLocalizedPage = (htmlPath: string) => {
  const [locale] = htmlPath.split('/').filter(Boolean);
  return locale && localeCodes.includes(locale);
};

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return;

  const { pathname } = getRequestURL(event);
  let htmlPath: string;
  let negotiated = false;

  if (pathname.endsWith('.md')) {
    // `/en/about-us.md` -> `/en/about-us/`, `/en.md` -> `/en/`
    htmlPath = pathname.replace(/\.md$/, '/');
  } else if (pathname.endsWith('/')) {
    htmlPath = pathname;
    negotiated = true;
  } else {
    return;
  }

  if (!isLocalizedPage(htmlPath)) return;

  if (negotiated) {
    setResponseHeader(event, 'Vary', 'Accept');

    // `accepts()` would hand `*/*` clients (browsers, curl) Markdown, so also
    // require they named `text/markdown`; otherwise keep serving them HTML.
    const request = toWebRequest(event);
    if (!(request.headers.get('accept') ?? '').includes('text/markdown')) return;
    if (accepts(request, 'text/markdown', 'text/html') !== 'text/markdown') return;
  }

  const markdown = await renderMarkdown(htmlPath);
  if (markdown === null) return;

  setResponseHeaders(event, {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Cache-Control': `public, max-age=${FRESH_MAX_AGE_SECONDS}`,
    // Rough token estimate (~4 chars/token) for payload-size signalling.
    'X-Markdown-Tokens': String(Math.ceil(markdown.length / 4)),
  });
  if (negotiated) {
    setResponseHeader(event, 'Content-Location', `${pathname.slice(0, -1)}.md`);
  }
  return markdown;
});
