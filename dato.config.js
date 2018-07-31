const curry = require('lodash/fp/curry')
const pick = require('lodash/fp/pick')

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`
const pagesDir = `${dataDir}/pages`

const altLocales = { en: 'nl', nl: 'en' }
const isPublished = (item) => item.published
const hasBody = (item) => item.body

const downloadPage = curry((dato, root, i18n, locales, page, contentFn, file) => {
  locales.forEach(locale => {
    i18n.locale = locale
    root.createDataFile(
      `${pagesDir}/${locale}/${file}`,
      'json',
      contentFn(dato[page], i18n, dato)
    )
  })
})

const downloadCollection = curry((dato, root, i18n, locales, collection, contentFn, filterFn, folder) => {
  locales.forEach(locale => {
    i18n.locale = locale
    dato[collection]
      .filter(filterFn)
      .forEach(item => {
        root.createDataFile(
          `${pagesDir}/${locale}/${folder}/${item.slug}.json`,
          'json',
          contentFn(item, i18n, dato)
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
    const getCollectionNl = downloadCollection(dato, root, i18n, ['nl'])

    getPage('home', homeData)('index.json')
    getPage('contact', contactData)('contact.json')
    getPage('events', eventsData)('academy.json')
    getPage('team', teamData)('about-us.json')
    getPage('work', workData)('cases/index.json')
    getPageEn('blog', blogData)('blog/index.json')

    getCollection('services', servicesData, hasBody)('services')
    getCollection('projects', portfolioData, isPublished)('cases')
    getCollectionEn('blogPosts', blogPostsData, isPublished)('blog')
    getCollectionEn('jobs', jobsData, isPublished)('jobs')
    getCollectionNl('jobs', jobsData, isPublished)('vacatures')


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
  const altLocale = altLocales[i18n.locale]
  const picked = pick(['title', 'subtitle'], data)
  return {
    ...picked,
    description: data.social.description,
    keywords: data.keywords.split(',').map(keyword => keyword.trim()),
    alternateUrls: i18n.withLocale(altLocale, () => ({
      [altLocale]: `/${altLocale}/contact/`,
    })),
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
