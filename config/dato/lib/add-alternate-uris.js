const curry = require('lodash/fp/curry')

module.exports = curry(function addAlternateUris(locales, i18n, _file, data) {
  const file = typeof _file !== 'object'
      ? locales.reduce((obj, locale) => ({ ...obj, [locale]: _file }), {})
      : _file

  const alternateUris = locales.map(locale =>
    ({
      locale,
      uri: i18n.withLocale(
        locale,
        () => {
          const { slug } = data
          const uri = slug ? `${file[locale]}/${slug[locale]}` : file[locale]
          return `/${locale}/${uri}`
            .replace('.json', '/')
            .replace('index/', '')
        }
      ),
    })
  )
  return { ...data, alternateUris }
})
