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

    root.createDataFile(`${dataDir}/layouts/${locale}/default/index.json`, 'json', layoutToJson(dato), 'utf8')

    dato.errorPages.forEach(page => {
      const mappedPage = page.toMap()
      root.createDataFile(`${dataDir}/layouts/${locale}/error/${page.errorCode}/index.json`, 'json', errorPageToJson(mappedPage), 'utf8')
    })

    fs.writeFileSync(`${__dirname}/${staticDir}/_redirects`, redirectsToText(dato.redirects, locales, defaultLocale), 'utf8')
  })
  root.createDataFile(`${dataDir}/messages.json`, 'json', messages)
}

function appSettingsToJson(app) {
  return pick(app, [
    'googleAnalyticsId',
    'googleAnalytics4Id',
    'googleAdwordsId',
    'experimentId',
    'trackingVersion'
  ])
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
    cookieNotification: {
      body: dato.app.cookieNotification[0].body,
      cookieTypes: dato.app.cookieNotification[0].cookieTypes.map(option => {
        return {
          ...pick(option, ['body', 'id', 'key', 'title', 'required']),
          vendors: option.vendors.toMap(),
        }
      }),
      cookieTypesBody: dato.app.cookieNotification[0].cookieTypesBody,
    },
    banner: {
      isVisible: dato.app.banner[0].isVisible,
      link: { ...pick(dato.app.banner[0].link, ['slug']) },
      linkTitle: dato.app.banner[0].linkTitle,
      text: dato.app.banner[0].text,
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

const errorPageToJson = (errorPage) => ({
  ...pick(errorPage, [ 'errorCode', 'title', 'body', 'headerImage' ]),
})

/**
 * Write redirects to text with 1 redirect per line
 * @see https://www.netlify.com/docs/redirects/
 *
 */
function redirectsToText (redirects, locales, defaultLocale) {
  const redirectsToNonDefaultLocales = locales
    .filter(locale => locale !== defaultLocale)
    .map(locale => `/ /${locale}/ 302! Language=${locale}`)
  const redirectToDefaultLocale = `/ /${defaultLocale}/ 302!`

  const redirectRulesFromCms = redirects
    .map(redirect => `${redirect.from} ${redirect.to} ${redirect.httpStatusCode}`)
  const redirectRules404s = locales.map(locale => `/${locale}/* /${locale}/404/ 404`)
  const catchallRedirectRules = [ // Should be the last rules as they catch 'all'
    '/en/* /en/layouts/error/404/index.html 404',
    '/*    /nl/layouts/error/404/index.html 404',
  ]
  return [
    ...redirectsToNonDefaultLocales,
    redirectToDefaultLocale,
    ...redirectRulesFromCms,
    ...redirectRules404s,
    ...catchallRedirectRules,
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
