const curry = require('lodash/fp/curry')

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`

const isPublished = (item) => item.published

const downloadSingleItem = curry((dato, root, i18n, locales, page, fn) => {
  locales.forEach(locale => {
    i18n.locale = locale
    root.createDataFile(`${dataDir}/${locale}/${page}.json`, 'json', fn(dato[page], i18n))
  })
})

const downloadFilteredCollection = curry((dato, root, i18n, locales, collection, collectionSlug, filterFn, fn) => {
  locales.forEach(locale => {
    i18n.locale = locale
    dato[collection]
      .filter(filterFn)
      .forEach(item => {
        root.createDataFile(`${dataDir}/${locale}/${collectionSlug}/${item.slug}.json`, 'json', fn(item, i18n))
      })
  })
})

module.exports = (dato, root, i18n) => {
  try {
    const page = downloadSingleItem(dato, root, i18n, i18n.availableLocales)
    const filteredCollection = downloadFilteredCollection(dato, root, i18n, i18n.availableLocales)
    const saveHome = page('home')
    const saveBlog = page('blog')
    const saveContact = page('contact')
    const saveBlogPosts = filteredCollection('blogPosts', 'blog', isPublished)

    saveHome(getHomeData)
    saveBlog(getBlogData)
    saveContact(getContactData)
    saveBlogPosts(getBlogPostData)

  // Build should fail if dato dump fails
  } catch (error) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}

const getHomeData = ({ title, headerTitle }) => {
  return { title, headerTitle }
}

const getBlogData = ({ title }) => {
  return { title }
}

const getBlogPostData = ({ title }) => {
  return { title }
}

const getContactData = ({ title, subtitle }) => {
  return { title, subtitle }
}
