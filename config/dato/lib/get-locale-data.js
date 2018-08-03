const curry = require('lodash/fp/curry')

module.exports = curry(function getLocaleData(dato, i18n, isCollection, locale, content) {
  i18n.locale = locale
  return isCollection ? dato[content] : [ dato[content] ]
})
