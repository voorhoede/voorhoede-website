const curry = require('lodash/fp/curry')

module.exports = curry(function filterPageData(filterFn, i18n, dato, data) {
  const slug = data.slug && i18n.availableLocales.reduce((list, locale) => {
    let localeSlug = undefined
    i18n.withLocale(locale, () => localeSlug = data.slug)
    return { ...list, [locale]: localeSlug }
  }, {})

  return slug ? { ...filterFn(data, i18n, dato), slug } : filterFn(data, i18n, dato)
})
