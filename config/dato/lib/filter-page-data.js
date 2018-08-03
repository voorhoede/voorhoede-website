const curry = require('lodash/fp/curry')

module.exports = curry(function filterPageData(contentFn, i18n, dato, pageData) {
  const slug = pageData.slug && i18n.availableLocales.reduce((list, locale) => {
    let localeSlug = undefined
    i18n.withLocale(locale, () => localeSlug = pageData.slug)
    return { ...list, [locale]: localeSlug }
  }, {})

  return slug ? { ...contentFn(pageData, i18n, dato), slug } : contentFn(pageData, i18n, dato)
})
