// const curry = require('lodash/fp/curry')

// const downloadPage = curry(function downloadPage(dato, root, i18n, locales, page, contentFn, _file) {
//   locales.forEach(locale => {
//     const file = typeof _file !== 'object'
//       ? locales.reduce((obj, locale) => ({ ...obj, [locale]: _file }), {})
//       : _file

//     i18n.locale = locale

//     const alternateUris = locales.map(locale => ({
//       locale,
//       uri: i18n.withLocale(locale, () => `/${locale}/${file[locale]}`.replace('.json', '/').replace('index/', '')),
//     }))
//     root.createDataFile(
//       `${pagesDir}/${locale}/${file[locale]}`,
//       'json',
//       { ...contentFn(dato[page], i18n, dato), alternateUris }
//     )
//   })
// })

// function selectPageContent(dato, page) {
//   return
// }
