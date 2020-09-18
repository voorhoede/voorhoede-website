module.exports = [
  '@nuxtjs/pwa',
  {
    workbox: {
      dev: process.env.PWA_DEV,
      offlinePage: '/200.html',
      preCaching: [
        '/en?homescreen=true',
        '/nl?homescreen=true',
        process.env.NODE_ENV === 'production' && '/200.html',
        '/images/logo-with-text.svg',
        '/images/icon_menu-passive--white.svg',
        '/images/icon_menu-exit--white.svg',
        '/icons/icon_twitter--blue.svg',
        '/icons/icon_git-hub--blue.svg',
        '/icons/icon_youtube--blue.svg',
        '/icons/icon_linkedin--blue.svg',
        '/_nuxt/app.js',
        '/_nuxt/commons.app.js',
        '/_nuxt/runtime.js',
        '/_nuxt/vendors.app.js',
      ].filter(Boolean),
      cacheAssets: false, // disable magic caching for _nuxt folder
      runtimeCaching: [
        // explicit caching for _nuxt folder
        {
          urlPattern: '/_nuxt/',
          handler: 'cacheFirst',
          strategyOptions: {
            cacheName: 'nuxt-assets',
            cacheExpiration: {
              maxEntries: 100
            }
          }
        },
        {
          urlPattern: 'https://www.datocms-assets.com/',
          handler: 'cacheFirst',
          strategyOptions: {
            cacheName: 'dato-assets',
            cacheExpiration: {
              maxEntries: 100,
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
