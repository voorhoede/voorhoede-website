export default function redirectToLocale({ route, redirect }) {
  const availableLocales = ['en', 'nl']
  const { locale } = route.params
  const { fullPath } = route

  if (availableLocales.indexOf(locale) === -1) {
    redirect(301, `/en${fullPath}`)
  }
}
