export default function redirectToLocale({ route, redirect }) {
  const availableLocales = ['en', 'nl']
  const defaultLocale = process.env.DEFAULT_LOCALE
  const { fullPath } = route

  if (fullPath === '/') {
    redirect(301, `/${defaultLocale}/`)
    return
  }

  const matches = /(\/)([\w]+)/.exec(fullPath) || []
  const [,, locale] = matches
  if (availableLocales.indexOf(locale) === -1) {
    redirect(301, `/${defaultLocale}${fullPath}`)
  }
}
