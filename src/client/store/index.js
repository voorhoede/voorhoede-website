import { getData } from '../lib/get-data'

const SHOW_GRID = 'SHOW_GRID'
const HIDE_GRID = 'HIDE_GRID'
const ADD_MENU_ITEMS = 'ADD_MENU_ITEMS'

export const state = () => ({
  showGrid: false,
  menu: {},
})

export const mutations = {
  [SHOW_GRID]: function showGrid(state) {
    state.showGrid = true
  },
  [HIDE_GRID]: function hideGrid(state) {
    state.showGrid = true
  },
  [ADD_MENU_ITEMS]: function addMenuItems(state, payload) {
    state.menu = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const data = await getData({ uri: 'menu' })
    commit(ADD_MENU_ITEMS, data)
  },
}
