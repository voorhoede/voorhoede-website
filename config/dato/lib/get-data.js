const curry = require('lodash/fp/curry')
const pipe = require('lodash/fp/pipe')
const map = require('lodash/fp/map')
const filter = require('lodash/fp/filter')

const addAlternateUris = require('./add-alternate-uris')
const filterPageData = require('./filter-page-data')
const getLocaleData = require('./get-locale-data')
const storeDataFile = require('./store-data-file')

module.exports = curry((dato, root, i18n, locales, destination, isCollection, filterFn, contentFn, page, file) =>
    map((locale) =>
      pipe(
        getLocaleData(dato, i18n, isCollection, locale),
        filter(filterFn),
        map(filterPageData(contentFn, i18n, dato)),
        map(addAlternateUris(locales, i18n, file)),
        map(storeDataFile(root, locales, locale, destination, file))
      )(page)
    )(locales)
  )
