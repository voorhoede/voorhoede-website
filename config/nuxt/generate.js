const routes = require('./lib/routes')
const googleGTM = require('./modules/gtm')
/**
 * @see https://nuxtjs.org/api/configuration-generate
 */
module.exports = {
  dir: 'dist/client/',
  googleGTM,
  routes,
}
