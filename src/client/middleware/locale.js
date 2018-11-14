import setLocaleFromPath from '../lib/set-locale-from-path'

export default function({ store, route }) {
  if (route.params.locale) {
    store.dispatch('setCurrentLocale', { locale: route.params.locale })
  } else {
    setLocaleFromPath({
      commit: store.commit,
      dispatch: store.dispatch,
      path: route.path,
      locales: store.state.locales
    })
  }
}
