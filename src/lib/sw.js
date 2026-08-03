/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import {
  cleanupOutdatedCaches,
  matchPrecache,
  precache,
  precacheAndRoute,
} from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import { defaultLanguage, locales } from './i18n.js';

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

// Injected at build time; see `pwa.injectManifest` in nuxt.config.ts.
const manifest = self.__WB_MANIFEST;

// Navigations go network-only, falling through to the catch handler when
// offline. Registered first so the precache route can't answer them.
registerRoute(({ request }) => request.mode === 'navigate', new NetworkOnly());

// Fallback pages are precached only; the catch handler serves them.
precache(manifest.filter((entry) => entry.url.endsWith('.html')));

// Assets are cache-first; a new deploy installs a fresh precache.
precacheAndRoute(
  manifest.filter((entry) => !entry.url.endsWith('.html')),
  {
    // Nuxt requests payloads as `_payload.json?<build-id>`; match regardless.
    ignoreURLParametersMatching: [/.*/],
    // Match verbatim only, or workbox's URL variations (`/x/` ->
    // `/x/index.html`) would serve the fallback pages on navigations.
    directoryIndex: false,
    cleanURLs: false,
  },
);

setCatchHandler(async ({ request, url }) => {
  if (request.destination !== 'document') return Response.error();

  const locale =
    locales.find(({ code }) => url.pathname.startsWith(`/${code}`))?.code ??
    defaultLanguage;

  console.log(url.pathname, url.search, locale);

  const page = await matchPrecache(`/${locale}/index.html`);
  if (!page) return Response.error();

  // The fallback is the locale home page whatever URL was requested: fix
  // the URL before nuxt boots so hydration matches, and flag the document
  // so <offline-banner> renders.
  const html = await page.text();
  const body = html.replace(
    /<head([^>]*)>/,
    `<head$1><script>window.__OFFLINE_FALLBACK__=true;history.replaceState(null,"","/${locale}/")</script>`,
  );

  // Fresh headers: the precached response describes the original body, and
  // its length (and possibly encoding) no longer match after the injection.
  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
});
