export default async function ({ store, route }) {
  if (route.matched.length > 0) {
    store.dispatch('setCurrentLayout', { currentLayout: 'default' })
  } else {
    store.dispatch('setCurrentLayout', { currentLayout: 'error' })
  }

  if (!store.state.layoutData) {
    store.dispatch('getLayoutData')
  }
}
