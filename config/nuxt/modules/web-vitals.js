require('dotenv-safe').config()

const isProduction = (process.env.NODE_ENV === 'production')

/**
 * https://github.com/nuxt-community/web-vitals-module
 */
module.exports = ['@nuxtjs/web-vitals', {
  debug: !isProduction,
  disabled: false,
  provider: 'ga', // ga tracking ID is set in nuxt.config.js
}]
