const pick = require('./lib/pick')

module.exports = function contact(pageData, i18n, dato) {
  const picked = pick(['title', 'subtitle'])
  return {
    ...picked(pageData),
    description: pageData.social.description,
    keywords: pageData.keywords.split(',').map(keyword => keyword.trim()),
    services: dato.home.services.map(pick(['slug', 'title'])),
    privacyStatementUrl: dato.home.privacyStatement.url(),
  }
}
