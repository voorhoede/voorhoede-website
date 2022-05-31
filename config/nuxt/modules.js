const googleAnalytics = require('./modules/google-analytics')
const nuxtI18n = require('./modules/nuxt-i18n')
const sitemap = require('./modules/sitemap')

/**
 * @see https://nuxtjs.org/api/configuration-modules
 */
module.exports = [
  googleAnalytics,
  '@nuxtjs/svg-sprite',
  nuxtI18n,
  sitemap,
]
