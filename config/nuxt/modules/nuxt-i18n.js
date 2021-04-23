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
    detectBrowserLanguage: false,
    locales: locales.map(({ code, name }) => ({
      code,
      iso: code,
      name,
    })),
    strategy: 'prefix',
    vueI18n: {
      fallbackLocale: defaultLocale,
      messages
    }
  }
]
