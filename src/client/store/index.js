const SHOW_GRID = 'SHOW_GRID'
const HIDE_GRID = 'HIDE_GRID'

export const state = () => ({
  showGrid: false
})

export const mutations = {
  [SHOW_GRID]: function showGrid(state) {
    state.showGrid = true
  },
  [HIDE_GRID]: function hideGrid(state) {
    state.showGrid = true
  },
}
