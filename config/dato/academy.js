const pick = require('./lib/pick')

module.exports = function academy(pageData, i18n, dato) {
  return pick(['title', 'subtitle'], pageData)
}
