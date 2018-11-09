import { SET_ERROR_CODE } from '../store/mutation-types'

export default function ({ store, route }) {
  if (route.matched.length === 0) {
    store.commit(SET_ERROR_CODE, { errorCode: 404 })
    store.dispatch('setCurrentLayout', { layout: 'error' })
  }

  if (!store.state.layoutData) {
    store.dispatch('getLayoutData')
  }
}
