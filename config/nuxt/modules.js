const googleAnalytics = require('./modules/google-analytics')
const nuxtI18n = require('./modules/nuxt-i18n')

/**
 * @see https://nuxtjs.org/api/configuration-modules
 */
module.exports = [
  googleAnalytics,
  nuxtI18n,
  ['@nuxtjs/pwa', {
    workbox: {
      dev: process.env.PWA_DEV,
      offlinePage: '/en/offline',
      preCaching: [
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
              maxAgeSeconds: 6 * 31 * 24 * 60 * 60 // 6 months
            }
          }
        }
      ]
    },
    meta: false,
    icon: false,
    manifest: false,
    onesignal: false,
  }],
]
