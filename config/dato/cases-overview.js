const pick = require('./lib/pick')

module.exports = function casesOverview(pageData, i18n, dato) {
  return pick(['title', 'subtitle'], pageData)
}
