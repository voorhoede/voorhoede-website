const routes = require('./lib/routes')
const googleAnalytics = require('./modules/google-analytics')
/**
 * @see https://nuxtjs.org/api/configuration-generate
 */
module.exports = {
  dir: 'dist/client/',
  googleAnalytics,
  routes,
  html: {
    minify: {
      minifyJS: false,
    }
  }
}
