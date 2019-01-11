import Vuex from 'vuex'
import * as types from './mutation-types'

const createStore = () => {
  return new Vuex.Store({
    state: {
      showGrid: false,
    },
    mutations: {
      [types.SHOW_GRID](state) {
        state.showGrid = true
      },
      [types.HIDE_GRID](state) {
        state.showGrid = true
      }
    }
  })
}

export default createStore
