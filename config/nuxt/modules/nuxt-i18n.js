const locales = require('../../../src/client/static/data/locales.json')
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
      cookieKey: 'i18n_redirected'
    },
    lazy: true,
    langDir: 'static/data/',
    locales: locales.map(({ code, name }) => ({
      code,
      file: `${code}/messages.json`,
      iso: code,
      name,
    })),
    rootRedirect: defaultLocale,
    strategy: 'prefix',
    vueI18n: {
      fallbackLocale: defaultLocale,
    }
  }
]
