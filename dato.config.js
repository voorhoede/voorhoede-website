const curry = require('lodash/fp/curry')

const staticDir = 'src/client/static'
const dataDir = `${staticDir}/data`

const downloadData = curry((dato, root, i18n, locales, page, fn) => {
  locales.forEach(locale => {
    i18n.locale = locale
    root.createDataFile(`${dataDir}/${locale}/${page}.json`, 'json', fn(dato[page], i18n))
  })
})

module.exports = (dato, root, i18n) => {
  try {
    const downloadPage = downloadData(dato, root, i18n, i18n.availableLocales)
    const downloadHome = downloadPage('home')

    downloadHome(getHomeData)

  // Build should fail if dato dump fails
  } catch (error) {
    console.error(error.message) // eslint-disable-line no-console
    process.exit(1)
  }
}

const getHomeData = (page, i18n) => {
  console.log(i18n)
  return { title: page.title, headerTitle: page.headerTitle }
}
