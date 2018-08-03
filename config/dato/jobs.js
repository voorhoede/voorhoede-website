/*  eslint-disable no-unused-vars */
const pick = require('./lib/pick')

module.exports = function jobs(pageData, i18n, dato) {
  return pick(['title', 'description'], pageData)
}
