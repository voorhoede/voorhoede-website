const googleAnalytics = require('./modules/google-analytics')
const nuxtI18n = require('./modules/nuxt-i18n')
const sitemap = require('./modules/sitemap')
const webVitals = require('./modules/web-vitals')

/**
 * @see https://nuxtjs.org/api/configuration-modules
 * check the docs of each plugin to see if it's a regular (runtime) module or a build module.
 */
module.exports = {
  buildModules: [
    webVitals,
  ],
  runtimeModules: [
    googleAnalytics,
    '@nuxtjs/svg-sprite',
    nuxtI18n,
    sitemap,
  ],
}
