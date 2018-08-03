const pick = require('./lib/pick')

module.exports = function cases(pageData, i18n, dato) {
  return pick(['title', 'subtitle'], pageData)
}
