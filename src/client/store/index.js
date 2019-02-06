import Vuex from 'vuex'
import * as types from './mutation-types'

const createStore = () => {
  return new Vuex.Store({
    state: {
      showGrid: false,
      showMenu: false,
      i18nSlugs: undefined,
    },
    actions: {
      toggleMobileMenu({ state, commit }) {
        commit(types.SHOW_MENU, !state.showMenu)
      },
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
      },
      [types.SHOW_MENU](state, showMenu) {
        state.showMenu = showMenu
      },
    }
  })
}

export default createStore
