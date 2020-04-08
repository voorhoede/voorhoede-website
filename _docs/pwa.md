# PWA

This website is a PWA, using the [Nuxt PWA plugin](https://pwa.nuxtjs.org/). The config for this module can be found in [config/nuxt/modules/nuxt-pwa](../config/nuxt/modules/nuxt-pwa.js). A service worker is used to cache visited pages and all assets. These assets are served with a cache first strategy. Pages are served with a network first strategy, falling back to the cache. When the page is not cached, the offline page is served.

Core bundles are precached. These bundles can be found in [config/nuxt/modules/nuxt-pwa](../config/nuxt/modules/nuxt-pwa.js). The javascript bundles are hashed during the build. Post build, [a script](../_scripts/revision-sw-precache) runs to revision the hashed precache bundles, using [webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin).

## Known issues

* JavaScript doesn't work when the offline page gets served as fallback for another route. This is caused by the nuxt router. The offline page is rendered for a route that in regular conditions would resolve with another route. Therefore, the offline page bundle doesn't get loaded.
