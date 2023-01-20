const routes = require('./lib/routes')
/**
 * @see https://nuxtjs.org/api/configuration-generate
 */
module.exports = {
  dir: 'dist/client/',
  concurrency: 40,
  interval: 1000,
  routes,
}
