export default function({ store, route }) {
  store.dispatch('setCurrentLocale', { locale: route.params.locale })
}
