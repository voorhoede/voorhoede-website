/**
 * Only writes out redirects and translations from Dato
 */

const fs = require('fs')
const dotenv = require('dotenv-safe')
var { getNativeName } = require('iso-639-1')

dotenv.config()

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`
let defaultLocale = process.env.DEFAULT_LOCALE
let locales = []

module.exports = (dato, root, i18n) => {
  locales = i18n.availableLocales

  root.createDataFile(`${dataDir}/locales.json`, 'json', localesToJson(locales))
  defaultLocale = defaultLocale || locales[0]

  fs.writeFileSync(`${__dirname}/${staticDir}/_redirects`, redirectsToText(dato.redirects, locales, defaultLocale), 'utf8')


  locales.forEach(locale => {
    i18n.withLocale(locale, () => {
      root.createDataFile(`${dataDir}/${locale}/messages.json`, 'json', translationsToJson(dato.translations))
    })
  })
}

function localesToJson (locales) {
  return locales.map(code => {
    return {
      code,
      name: getNativeName(code)
    }
  })
}

/**
 * Write redirects to text with 1 redirect per line
 * @see https://www.netlify.com/docs/redirects/
 *
 */
function redirectsToText (redirects, locales, defaultLocale) {
  const redirectToDefaultLocale = `/ /${defaultLocale}/ 301`
  const redirectRulesFromCms = redirects
    .map(redirect => `${redirect.from} ${redirect.to} ${redirect.httpStatusCode}`)
  const redirectRules404s = locales.map(locale => `/${locale}/* /${locale}/404/ 404`)
  return [redirectToDefaultLocale, ...redirectRulesFromCms, ...redirectRules404s].join('\n')
}

/**
 * Write out dictionary of translations
 * @param {*} translations
 */
function translationsToJson (translations) {
  return translations.reduce((out, item) => {
    out[item.key] = item.value
    return out
  }, {})
}
