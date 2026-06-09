import { accepts } from "@std/http/negotiation";
import { locales } from "~/lib/i18n.js";

/**
 * Markdown content negotiation for every localized page.
 *
 * Each prerendered page also ships a `.md` alternate (built by the
 * `prerender:generate` hook in `nuxt.config.ts`). On the canonical URL we honour
 * `Accept: text/markdown` by returning that `.md` source at the same URL, per
 * https://specification.website/spec/agent-readiness/markdown-source-endpoints/
 *
 * Only trailing-slash page URLs reach Nitro; `.md` and `/_nuxt/*` paths are
 * served straight from the Cloudflare `ASSETS` binding and skip this middleware.
 */
const localeCodes = locales.map(({ code }) => code);

export default defineEventHandler(async (event) => {
  if (event.method !== "GET" && event.method !== "HEAD") return;

  const url = getRequestURL(event);
  const [locale] = url.pathname.split("/").filter(Boolean);
  if (!url.pathname.endsWith("/") || !locale || !localeCodes.includes(locale))
    return;

  // The canonical URL has two representations; let caches key on Accept.
  setResponseHeader(event, "Vary", "Accept");

  if (
    accepts(toWebRequest(event), "text/html", "text/markdown") !==
    "text/markdown"
  )
    return;

  // `/en/` -> `/en.md`, `/en/about-us/` -> `/en/about-us.md`
  const markdownUrl = new URL(`${url.pathname.slice(0, -1)}.md`, url);
  const assets = event.context.cloudflare?.env?.ASSETS;
  if (!assets) return; // No asset binding (e.g. `nuxt dev`) — fall back to HTML.

  const response = await assets.fetch(markdownUrl);
  if (!response.ok) return; // No Markdown alternate — fall back to HTML.

  const body = await response.text();
  setResponseHeaders(event, {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Location": markdownUrl.pathname,
    "Cache-Control": "public, max-age=3600",
    // Rough token estimate (~4 chars/token) for payload-size signalling.
    "X-Markdown-Tokens": String(Math.ceil(body.length / 4)),
  });
  return body;
});
