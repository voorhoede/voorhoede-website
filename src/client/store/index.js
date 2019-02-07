import Vuex from 'vuex'
import * as types from './mutation-types'

const createStore = () => {
  return new Vuex.Store({
    state: {
      showGrid: false,
      i18nSlugs: undefined,
    },
    mutations: {
      [types.SHOW_GRID](state) {
        state.showGrid = true
      },
      [types.HIDE_GRID](state) {
        state.showGrid = true
      },
      [types.SET_I18N_SLUGS] (state, i18nSlugs) {
        state.i18nSlugs = i18nSlugs
      }
    }
  })
}

export default createStore
