export default function ({ store, route }) {
  if (route.matched.length > 0) {
    store.dispatch('setCurrentLayout', { layout: 'default' })
  } else {
    store.dispatch('setCurrentLayout', { layout: 'error/404' })
  }

  if (!store.state.layoutData) {
    store.dispatch('getLayoutData')
  }
}
