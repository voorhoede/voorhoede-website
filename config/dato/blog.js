/*  eslint-disable no-unused-vars */
const pick = require('./lib/pick')

module.exports = function blog(pageData, i18n, dato) {
  return pick(['title'], pageData)
}
