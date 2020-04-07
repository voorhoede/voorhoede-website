module.exports = [
  '@nuxtjs/pwa',
  {
    workbox: {
      dev: process.env.PWA_DEV,
      offlinePage: '/en/offline',
      preCaching: [
        '/en?homescreen=true',
        '/nl?homescreen=true',
        '/images/logo-with-text.svg',
        '/images/icon_menu-passive--white.svg',
        '/images/icon_menu-exit--white.svg',
        '/icons/icon_twitter--blue.svg',
        '/icons/icon_git-hub--blue.svg',
        '/icons/icon_youtube--blue.svg',
        '/icons/icon_linkedin--blue.svg',
        '/_nuxt/pages/offline.js',
        '/_nuxt/app.js',
        '/_nuxt/commons.app.js',
        '/_nuxt/runtime.js',
        '/_nuxt/vendors.app.js',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://www.datocms-assets.com/',
          handler: 'cacheFirst',
          strategyOptions: {
            cacheName: 'dato-assets',
            cacheExpiration: {
              maxEntries: 128,
            }
          }
        }
      ]
    },
    meta: false,
    icon: false,
    manifest: false,
    onesignal: false,
  }
]
