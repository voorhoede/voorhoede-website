const pick = require('./lib/pick')

module.exports = function aboutUs(pageData, i18n, dato) {
  return pick(['title', 'subtitle'], pageData)
}
