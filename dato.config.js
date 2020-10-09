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

  root.createDataFile(`${dataDir}/app.json`, 'json', {
    ...appSettingsToJson(dato.app),
    locales: localesToJson(locales)
  })

  defaultLocale = defaultLocale || locales[0]

  fs.writeFileSync(`${__dirname}/${staticDir}/_redirects`, redirectsToText(dato.redirects, locales, defaultLocale), 'utf8')

  let messages = locales.reduce((obj, item) => {
    obj[item] = {}
    return obj
  }, {})

  locales.forEach(locale => {
    i18n.locale = locale

    messages[locale] = translationsToJson(dato.translations)

    root.createDataFile(`${dataDir}/${locale}/layouts/default/index.json`, 'json', layoutToJson(dato), 'utf8')

    dato.errorPages.forEach(errorPage => {
      root.createDataFile(`${dataDir}/${locale}/layouts/error/${errorPage.errorCode}/index.json`, 'json', errorPageToJson(errorPage), 'utf8')
    })

    fs.writeFileSync(`${__dirname}/${staticDir}/_redirects`, redirectsToText(dato.redirects, locales, defaultLocale), 'utf8')
  })
  root.createDataFile(`${dataDir}/messages.json`, 'json', messages)
}

function appSettingsToJson(app) {
  return pick(app, ['googleAnalyticsId', 'experimentId', 'trackingVersion'])
}

function localesToJson (locales) {
  return locales.map(code => {
    return {
      code,
      name: getNativeName(code)
    }
  })
}

function layoutToJson(dato) {
  return {
    banner: {
      isVisible: dato.banner.isVisible,
      link: { ...pick(dato.banner.link, ['slug']) },
      linkTitle: dato.banner.linkTitle,
      text: dato.banner.text,
    },
    menu: {
      title: dato.menu.title,
      links: dato.menu.links.map(formatLink),
      callToAction: formatLink(dato.menu.callToAction)
    },
    footer: {
      ...pick(dato.app, [
        'emailAddress',
        'phoneNumber',
        'twitterUrl',
        'githubUrl',
        'youtubeUrl',
        'linkedinUrl',
      ]),
      addresses: dato.app.addresses.map(address => {
        return pick(address, ['address', 'postalCode', 'city', 'googleMapsLink'])
      }),
      legal: dato.app.legal.map(item => {
        return pick(item, ['title', 'value'])
      }),
      ...pick(dato.footer, [
        'privacyLabel',
        'privacyTitle',
        'privacyLink',
        'copyrightLabel',
        'copyrightTitle',
        'copyrightLink',
      ]),
    }
  }
}

function formatLink(link) {
  return {
    ...pick(link, ['title', 'url']),
    page: {
      slug: link.page.slug
    }
  }
}

function errorPageToJson(errorPage) {
  return {
    ...pick(errorPage, [
      'errorCode',
      'title',
      'body',
    ]),
    headerImage: pick(errorPage.headerImage.upload, ['url', 'alt'])
  }
}

/**
 * Write redirects to text with 1 redirect per line
 * @see https://www.netlify.com/docs/redirects/
 *
 */
function redirectsToText (redirects, locales, defaultLocale) {
  const redirectsToNonDefaultLocales = locales
    .filter(locale => locale !== defaultLocale)
    .map(locale => `/ /${locale}/ 302 Language=${locale}`)
  const redirectToDefaultLocale = `/ /${defaultLocale}/ 302`

  const redirectRulesFromCms = redirects
    .map(redirect => `${redirect.from} ${redirect.to} ${redirect.httpStatusCode}`)
  const redirectRules404s = locales.map(locale => `/${locale}/* /${locale}/layouts/error/404/ 404`)
  return [
    ...redirectsToNonDefaultLocales,
    redirectToDefaultLocale,
    ...redirectRulesFromCms,
    ...redirectRules404s
  ]
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
