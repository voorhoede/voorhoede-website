import * as types from './mutation-types'

export const state = () => {
  return {
    doNotTrack: true,
    showGrid: false,
    i18nSlugs: undefined,
    previousServiceTitle: undefined,
    previousServiceSeriesNavigation: undefined,
  }
}

export const actions = {
  setDoNotTrack({ commit }, { doNotTrack }) {
    commit(types.SET_DO_NOT_TRACK, { doNotTrack })
  },
}

export const mutations = {
  [types.SHOW_GRID](state) {
    state.showGrid = true
  },
  [types.HIDE_GRID](state) {
    state.showGrid = false
  },
  [types.SET_DO_NOT_TRACK] (state, { doNotTrack }) {
    state.doNotTrack = doNotTrack
  },
  [types.SET_I18N_SLUGS] (state, i18nSlugs) {
    state.i18nSlugs = i18nSlugs
  },
  [types.SET_PREVIOUS_SERVICE_TITLE](state, previousServiceTitle) {
    state.previousServiceTitle = previousServiceTitle
  },
  [types.SET_PREVIOUS_SERVICE_SERIES_NAVIGATION](state, previousServiceSeriesNavigation) {
    state.previousServiceSeriesNavigation = previousServiceSeriesNavigation
  }
}
