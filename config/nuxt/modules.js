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
      dev: process.env.PWA_DEV
      dev: process.env.PWA_DEV,
      runtimeCaching: [
        {
          urlPattern: 'https://www.datocms-assets.com/*',
          handler: 'cacheFirst'
        }
      ]
    },
    meta: false,
    icon: false,
    manifest: false,
    onesignal: false,
  }],
]
