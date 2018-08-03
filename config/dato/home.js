const pick = require('./lib/pick')

module.exports = function home(pageData, i18n, dato) {
  const pickedItems = pick([
      'title',
      'subtitle',
      'headerTitle',
      'usps',
      'servicesHeader',
      'servicesDescription',
      'clientsTitle',
  ])

  return {
    ...pickedItems(pageData),
    canonical: (i18n.locale === 'nl') ? 'https://www.voorhoede.nl/' : false,
    privacyStatementUrl: dato.home.privacyStatement.url(),
  }
}
