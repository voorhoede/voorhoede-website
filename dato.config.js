/**
 * Only writes out redirects and translations from Dato
 */

const fs = require('fs')
const dotenv = require('dotenv-safe')
dotenv.config()

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`
let locales = []

module.exports = (dato, root, i18n) => {
  locales = i18n.availableLocales

  fs.writeFileSync(`${__dirname}/${staticDir}/_redirects`, redirectsToText(dato.redirects), 'utf8')

  locales.forEach(locale => {
    root.createDataFile(`${dataDir}/${locale}/messages.json`, 'json', translationsToJson(dato.translations))
  })
}

/**
 * Write redirects to text with 1 redirect per line
 * @see https://www.netlify.com/docs/redirects/
 */
function redirectsToText (redirects) {
  return redirects
    .map(redirect => `${redirect.from} ${redirect.to} ${redirect.statusCode}`)
    .join('\n')
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
