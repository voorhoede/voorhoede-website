import { SET_CURRENT_LOCALE, SET_ALTERNATE_URL } from '../store/mutation-types'

export default function({ store, route }) {
  if (route.params.locale) {
    store.dispatch('setCurrentLocale', { locale: route.params.locale })
  } else {
    // Get locale for error pages
    const locales = store.state.locales
    const localeRegex = new RegExp(`^/(${locales.join('|')})/`)
    let localeFromPath = route.path.match(localeRegex)[0]

    if (localeFromPath) {
      localeFromPath = localeFromPath.replace(/\//g, '')
      const alternateLocale = store.state.locales.find(locale => locale !== localeFromPath)
      const alternateUrl = route.path.replace(localeFromPath, alternateLocale)
      store.commit(SET_CURRENT_LOCALE, { locale: localeFromPath })
      store.commit(SET_ALTERNATE_URL, { url: alternateUrl })
    }
  }
}
