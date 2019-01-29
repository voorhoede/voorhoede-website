/**
 * Only writes out redirects and translations from Dato
 */

const fs = require('fs')
const dotenv = require('dotenv-safe')
const { getNativeName } = require('iso-639-1')
const { pick } = require('lodash')

dotenv.config()

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`
let defaultLocale = process.env.DEFAULT_LOCALE
let locales = []

module.exports = (dato, root, i18n) => {
  locales = i18n.availableLocales

  root.createDataFile(`${dataDir}/app.json`, 'json', appSettingsToJson(dato.app))

  root.createDataFile(`${dataDir}/locales.json`, 'json', localesToJson(locales))
  defaultLocale = defaultLocale || locales[0]

  fs.writeFileSync(`${__dirname}/${staticDir}/_redirects`, redirectsToText(dato.redirects, locales, defaultLocale), 'utf8')

  let messages = locales.reduce((obj, item) => {
    obj[item] = {}
    return obj
  }, {})

  locales.forEach(locale => {
    i18n.withLocale(locale, () => {
      messages[locale] = translationsToJson(dato.translations)
    })
  })
  root.createDataFile(`${dataDir}/messages.json`, 'json', messages)
}

function appSettingsToJson(app) {
  return { ...pick(app, ['googleAnalyticsId', 'experimentId']) }
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
  const redirectRules404s = locales.map(locale => `/${locale}/* /${locale}/layouts/error/404/ 404`)
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
