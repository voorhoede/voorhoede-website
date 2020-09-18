const googleAnalytics = require('./modules/google-analytics')
const nuxtI18n = require('./modules/nuxt-i18n')
const nuxtPwa = require('./modules/nuxt-pwa')
const sitemap = require('./modules/sitemap')

/**
 * @see https://nuxtjs.org/api/configuration-modules
 */
module.exports = [
  googleAnalytics,
  nuxtI18n,
  nuxtPwa,
  sitemap
]
