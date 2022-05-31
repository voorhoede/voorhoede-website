const routes = require('./lib/routes')
const googleTagManager = require('./modules/gtm')
/**
 * @see https://nuxtjs.org/api/configuration-generate
 */
module.exports = {
  dir: 'dist/client/',
  googleTagManager,
  routes,
}
