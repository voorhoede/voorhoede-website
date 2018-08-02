const curry = require('lodash/fp/curry')
const pick = require('lodash/fp/pick')

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`
const pagesDir = `${dataDir}/pages`

const isPublished = (item) => item.published
const hasBody = (item) => item.body

const downloadPage = curry((dato, root, i18n, locales, page, contentFn, _file) => {
  locales.forEach(locale => {
    const file = typeof _file !== 'object'
      ? locales.reduce((obj, locale) => ({ ...obj, [locale]: _file }), {})
      : _file

    i18n.locale = locale

    const alternateUris = locales.map(locale => ({
      locale,
      uri: i18n.withLocale(locale, () => `/${locale}/${file[locale]}`.replace('.json', '/').replace('index/', '')),
    }))
    root.createDataFile(
      `${pagesDir}/${locale}/${file[locale]}`,
      'json',
      { ...contentFn(dato[page], i18n, dato), alternateUris }
    )
  })
})

const downloadCollection = curry((dato, root, i18n, locales, collection, contentFn, filterFn, _folder) => {
  locales.forEach(locale => {
    const folder = typeof _folder !== 'object'
      ? locales.reduce((obj, locale) => ({ ...obj, [locale]: _folder }), {})
      : _folder

    i18n.locale = locale
    dato[collection]
      .filter(filterFn)
      .forEach(item => {
        const alternateUris = locales.map(locale => ({
          locale,
          uri: i18n.withLocale(locale, () => `/${locale}/${folder[locale]}/${item.slug}`),
        }))
        root.createDataFile(
          `${pagesDir}/${locale}/${folder[locale]}/${item.slug}.json`,
          'json',
          { ...contentFn(item, i18n, dato), alternateUris }
        )
      })
  })
})

module.exports = (dato, root, i18n) => {
  try {
    const getPage = downloadPage(dato, root, i18n, i18n.availableLocales)
    const getPageEn = downloadPage(dato, root, i18n, ['en'])
    const getCollection = downloadCollection(dato, root, i18n, i18n.availableLocales)
    const getCollectionEn = downloadCollection(dato, root, i18n, ['en'])

    getPage('home', homeData)('index.json')
    getPage('contact', contactData)('contact.json')
    getPage('eventOverview', eventsData)('academy.json')
    getPage('team', teamData)({ en: 'about-us.json', nl: 'over-ons.json' })
    getPage('work', workData)('cases/index.json')
    getPageEn('blog', blogData)('blog/index.json')

    getCollection('services', servicesData, hasBody)('services')
    getCollection('projects', portfolioData, isPublished)('cases')
    getCollection('jobs', jobsData, isPublished)({ en:'jobs', nl:'vacatures' })
    getCollectionEn('blogPosts', blogPostsData, isPublished)('blog')

    root.createDataFile(`${dataDir}/menu.json`, 'json', {
      en: [
        { title: 'Services', slug: 'services' },
        { title: 'Cases', slug: 'cases' },
        { title: 'Academy', slug: 'academy' },
        { title: 'About Us', slug: 'about-us' },
        { title: 'Contact', slug: 'contact', button: true },
      ],
      nl: [
        { title: 'Services', slug: 'services' },
        { title: 'Cases', slug: 'cases' },
        { title: 'Academy', slug: 'academy' },
        { title: 'Over Ons', slug: 'over-ons' },
        { title: 'Contact', slug: 'contact', button: true },
      ],
    })

  // Build should fail if dato dump fails
  } catch (error) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}

function homeData(data, i18n, dato) {
  const picked = pick(
    [
      'title',
      'subtitle',
      'headerTitle',
      'usps',
      'servicesHeader',
      'servicesDescription',
      'clientsTitle',
    ],
    data
  )
  return {
    ...picked,
    canonical: (i18n.locale === 'nl') ? 'https://www.voorhoede.nl/' : false,
    privacyStatementUrl: dato.home.privacyStatement.url(),
  }
}

function contactData(data, i18n, dato) {
  const picked = pick(['title', 'subtitle'], data)
  return {
    ...picked,
    description: data.social.description,
    keywords: data.keywords.split(',').map(keyword => keyword.trim()),
    services: dato.home.services.map(pick(['slug', 'title'])),
    privacyStatementUrl: dato.home.privacyStatement.url(),
  }
}

function eventsData(data, i18n, dato) {
  return pick(['title', 'subtitle'], data)
}

function blogData(data, i18n, dato) {
  return pick(['title'], data)
}

function blogPostsData(data, i18n, dato) {
  return pick(['title'], data)
}

function jobsData(data, i18n, dato) {
  return pick(['title', 'description'], data)
}

function servicesData(data, i18n, dato) {
  return pick(['title', 'subtitle'], data)
}

function portfolioData(data, i18n, dato) {
  return pick(['title', 'subtitle'], data)
}

function teamData(data, i18n, dato) {
  return pick(['title', 'subtitle'], data)
}

function workData(data, i18n, dato) {
  return pick(['title', 'subtitle'], data)
}
