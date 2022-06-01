require('dotenv-safe').config()

const appConfig = require('../../../src/client/static/data/app.json')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * https://github.com/nuxt-community/gtm-module
 */
module.exports = appConfig.googleTagManagerId &&
  ['@nuxtjs/gtm',
  {
    enabled: true,
    debug: !isProduction,

    id: appConfig.googleTagManagerId,
    layer: 'dataLayer',

    pageTracking: false,
    pageViewEventName: 'nuxtRoute',

    autoInit: true,
    respectDoNotTrack: true,

    scriptId: 'gtm-script',
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',
    crossOrigin: false,

    noscript: true,
    noscriptId: 'gtm-noscript',
    noscriptURL: 'https://www.googletagmanager.com/ns.html'
  }
]
