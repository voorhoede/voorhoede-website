/// <reference lib="webworker" />

// Injected at build time by vite-plugin-pwa (`strategies: "injectManifest"`).
// We don't precache the whole manifest — it's only used to derive a cache name
// that changes whenever the build output changes, so a new deploy replaces the
// offline cache instead of serving stale chunks.
const WB_MANIFEST = self.__WB_MANIFEST || [];

function buildRevision(entries) {
  const fingerprint = entries
    .map((entry) => entry.revision || entry.url)
    .sort()
    .join('|');

  // Cheap deterministic hash (djb2); we only need a short, stable id.
  let hash = 5381;
  for (let i = 0; i < fingerprint.length; i += 1) {
    hash = ((hash << 5) + hash + fingerprint.charCodeAt(i)) | 0;
  }

  return (hash >>> 0).toString(36);
}

const CACHE_VERSION = `v4-${buildRevision(WB_MANIFEST)}`;
const OFFLINE_CACHE = `offline-${CACHE_VERSION}`;
const OFFLINE_URLS = ['/en?offline=true', '/nl?offline=true'];

// Extra same-origin assets that aren't linked from the HTML but are needed
// to render the offline page (icon sprite is fetched by <use xlink:href>).
const EXTRA_ASSET_URLS = ['/icon-sprite.svg'];

const ASSET_EXTENSIONS =
  /\.(?:js|mjs|css|svg|png|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf|json)$/i;

/**
 * Strip the `redirected` flag off a response by rebuilding it. Chrome refuses
 * respondWith() with a redirected Response for navigation requests.
 */
function cleanResponse(response, body) {
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/**
 * Collect same-origin asset URLs referenced from a page's HTML: stylesheets,
 * (module)preloads, scripts, images, the nuxt build chunks and payloads.
 */
function extractAssetUrlsFromHtml(html, baseUrl) {
  const urls = new Set();
  const add = (value) => {
    if (!value) return;
    const raw = value.trim();
    if (!raw || raw.startsWith('data:') || raw.startsWith('#')) return;

    try {
      const url = new URL(raw, baseUrl);
      if (url.origin !== self.location.origin) return;
      if (!ASSET_EXTENSIONS.test(url.pathname)) return;
      url.hash = '';
      urls.add(url.href);
    } catch (err) {
      // ignore unparseable URLs
    }
  };

  // href="…" / src="…" on <link>, <script>, <img>, <use>, …
  for (const [, value] of html.matchAll(
    /(?:href|src|xlink:href)\s*=\s*["']([^"']+)["']/gi,
  )) {
    add(value);
  }

  // srcset="a.webp 1x, b.webp 2x"
  for (const [, value] of html.matchAll(
    /(?:imagesrcset|srcset)\s*=\s*["']([^"']+)["']/gi,
  )) {
    for (const candidate of value.split(',')) {
      add(candidate.trim().split(/\s+/)[0]);
    }
  }

  // Nuxt build chunks and extracted payloads referenced from inline scripts.
  for (const [value] of html.matchAll(/\/_nuxt\/[^"'\s)]+/g)) {
    add(value);
  }
  for (const [value] of html.matchAll(/\/[^"'\s)]*_payload\.json[^"'\s)]*/g)) {
    add(value);
  }

  return [...urls];
}

/** Collect same-origin url(…) references (fonts, background images) from CSS. */
function extractAssetUrlsFromCss(css, baseUrl) {
  const urls = new Set();

  for (const [, value] of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const raw = value.trim();
    if (!raw || raw.startsWith('data:')) continue;

    try {
      const url = new URL(raw, baseUrl);
      if (url.origin !== self.location.origin) continue;
      url.hash = '';
      urls.add(url.href);
    } catch (err) {
      // ignore unparseable URLs
    }
  }

  return [...urls];
}

/** Fetch and cache a single asset, returning its body text for CSS/HTML. */
async function cacheAsset(cache, url) {
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    const isText = /text\/css|text\/html|image\/svg|javascript|json/.test(
      contentType,
    );
    const body = isText ? await res.clone().text() : await res.clone().blob();

    await cache.put(url, cleanResponse(res, body));

    return isText ? { url: res.url || url, contentType, body } : null;
  } catch (err) {
    return null;
  }
}

async function precacheOfflinePages() {
  const cache = await caches.open(OFFLINE_CACHE);

  const assetUrls = new Set(
    EXTRA_ASSET_URLS.map((url) => new URL(url, self.location.origin).href),
  );

  await Promise.all(
    OFFLINE_URLS.map(async (url) => {
      try {
        const res = await fetch(url, { redirect: 'follow' });
        if (!res.ok) return;

        const html = await res.clone().text();
        // Rebuild the response so it isn't flagged as redirected, while
        // keeping the same body/status/headers.
        await cache.put(url, cleanResponse(res, html));

        for (const assetUrl of extractAssetUrlsFromHtml(
          html,
          res.url || new URL(url, self.location.origin).href,
        )) {
          assetUrls.add(assetUrl);
        }
      } catch (err) {
        // ignore precache failures
      }
    }),
  );

  // First pass: the assets linked from the HTML.
  const results = await Promise.all(
    [...assetUrls].map((url) => cacheAsset(cache, url)),
  );

  // Second pass: assets referenced from within those files (fonts and images
  // in CSS, sprites in SVG).
  const nestedUrls = new Set();
  for (const result of results) {
    if (!result) continue;
    if (/text\/css/.test(result.contentType)) {
      for (const url of extractAssetUrlsFromCss(result.body, result.url)) {
        if (!assetUrls.has(url)) nestedUrls.add(url);
      }
    }
  }

  await Promise.all([...nestedUrls].map((url) => cacheAsset(cache, url)));
}

let precacheInFlight = null;

/** Run the precache, reusing the run already in progress if there is one. */
function precacheOnce() {
  if (!precacheInFlight) {
    precacheInFlight = precacheOfflinePages().finally(() => {
      precacheInFlight = null;
    });
  }

  return precacheInFlight;
}

/**
 * The install event only fires once per service worker version, so a cache
 * cleared by the user (or evicted by the browser) would never come back.
 * Check the cache is still complete and refill it if it isn't.
 */
async function ensurePrecached() {
  try {
    const cache = await caches.open(OFFLINE_CACHE);
    const cachedPages = await Promise.all(
      OFFLINE_URLS.map((url) => cache.match(url)),
    );

    if (cachedPages.every(Boolean)) return;

    await precacheOnce();
  } catch (err) {
    // ignore, the next check will retry
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      await precacheOnce();
      self.skipWaiting();
    })(),
  );
});

// Lets the app ask for a refill explicitly, e.g. after coming back online.
self.addEventListener('message', (event) => {
  if (event.data?.type === 'PRECACHE_OFFLINE') {
    event.waitUntil(ensurePrecached());
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== OFFLINE_CACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
      await ensurePrecached();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation =
    request.mode === 'navigate' || request.destination === 'document';

  if (isNavigation) {
    // Cheap self-heal: on every navigation, verify the offline pages are still
    // cached and refill in the background if they're gone.
    event.waitUntil(ensurePrecached());

    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch (err) {
          try {
            const offlineUrl = new URL(
              url.pathname.startsWith('/nl')
                ? '/nl?offline=true'
                : '/en?offline=true',
              self.location.origin,
            );
            const cache = await caches.open(OFFLINE_CACHE);
            const cachedPage = await cache.match(offlineUrl.href);

            if (cachedPage && !cachedPage.redirected) {
              // Serve the cached page under its own `?offline=true` URL so the
              // app hydrates on the route it was rendered for — that query
              // param is what makes <offline-banner> render. Serving it
              // in-place under the requested URL would hydrate the wrong route
              // and drop the banner.
              if (
                url.pathname === offlineUrl.pathname &&
                url.searchParams.get('offline') === 'true'
              ) {
                return cachedPage;
              }

              return Response.redirect(offlineUrl.href, 302);
            }
          } catch (innerErr) {
            // fall through to plain-text response
          }

          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        }
      })(),
    );
    return;
  }

  // Assets: serve precached ones from the cache (build output is hashed, so
  // it's immutable), otherwise go to the network and fall back to the cache.
  event.respondWith(
    (async () => {
      const cache = await caches.open(OFFLINE_CACHE);
      const cached = await cache.match(request, { ignoreVary: true });
      if (cached) return cached;

      try {
        return await fetch(request);
      } catch (err) {
        return new Response('', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      }
    })(),
  );
});

export {};
