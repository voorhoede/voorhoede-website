const locales = require('../../../src/client/static/data/app.json').locales
const messages = require('../../../src/client/static/data/messages.json')
const defaultLocale = process.env.defaultLocale || process.env.DEFAULT_LOCALE || locales[0].code

/**
* @see https://nuxt-community.github.io/nuxt-i18n/
*/
module.exports = [
  'nuxt-i18n',
  {
    defaultLocale,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    locales: locales.map(({ code, name }) => ({
      code,
      iso: code,
      name,
    })),
    rootRedirect: defaultLocale,
    strategy: 'prefix',
    vueI18n: {
      fallbackLocale: defaultLocale,
      messages,
    },
  },
]
