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
