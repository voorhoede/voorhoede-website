const gtm = require('./modules/gtm')
const nuxtI18n = require('./modules/nuxt-i18n')
const sitemap = require('./modules/sitemap')

/**
 * @see https://nuxtjs.org/api/configuration-modules
 */
module.exports = [
  '@nuxtjs/svg-sprite',
  gtm,
  nuxtI18n,
  sitemap
]
