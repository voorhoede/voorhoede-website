const pick = require('./lib/pick')

module.exports = function services(pageData, i18n, dato) {
  return pick(['title', 'subtitle'], pageData)
}
