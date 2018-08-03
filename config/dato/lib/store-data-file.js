const curry = require('lodash/fp/curry')

module.exports = curry(function storeDataFile(root, locales, locale, folder, _file, _data) {
  const { slug, ...data } = _data

  const file = typeof _file !== 'object'
      ? locales.reduce((obj, locale) => ({ ...obj, [locale]: _file }), {})
      : _file

  const location = slug ? `${file[locale]}/${slug[locale]}.json` : file[locale]
  root.createDataFile(`${folder}/${locale}/${location}`, 'json', data)
})
