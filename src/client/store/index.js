import * as types from './mutation-types'

export const state = () => {
  return {
    allowedCookies: [],
    doNotTrack: true,
    i18nSlugs: undefined,
    previousServiceSeriesNavigation: undefined,
    previousServiceTitle: undefined,
    showGrid: false,
    showCookieBar: true,
    showCookieSettings: false,
  }
}

export const actions = {
  setAllowedCookies({ commit }, { allowed }) {
    commit(types.SET_ALLOWED_COOKIES, { allowed })
  },
  setDoNotTrack({ commit }, { doNotTrack }) {
    commit(types.SET_DO_NOT_TRACK, { doNotTrack })
  },
  setShowCookieBar({ commit }, { show }) {
    commit(types.SET_SHOW_COOKIE_BAR, { show })
  },
  setShowCookieSettings({ commit }, { show }) {
    commit(types.SET_SHOW_COOKIE_BAR, { show })
    commit(types.SET_SHOW_COOKIE_SETTINGS, { show })
  },
}

export const mutations = {
  [types.SHOW_GRID](state) {
    state.showGrid = true
  },
  [types.HIDE_GRID](state) {
    state.showGrid = false
  },
  [types.SET_ALLOWED_COOKIES](state, { allowed }) {
    state.allowedCookies = [...allowed]
  },
  [types.SET_DO_NOT_TRACK](state, { doNotTrack }) {
    state.doNotTrack = doNotTrack
  },
  [types.SET_I18N_SLUGS](state, i18nSlugs) {
    state.i18nSlugs = i18nSlugs
  },
  [types.SET_PREVIOUS_SERVICE_TITLE](state, previousServiceTitle) {
    state.previousServiceTitle = previousServiceTitle
  },
  [types.SET_PREVIOUS_SERVICE_SERIES_NAVIGATION](state, previousServiceSeriesNavigation) {
    state.previousServiceSeriesNavigation = previousServiceSeriesNavigation
  },
  [types.SET_SHOW_COOKIE_BAR](state, { show }) {
    state.showCookieBar = show
  },
  [types.SET_SHOW_COOKIE_SETTINGS](state, { show }) {
    state.showCookieSettings = show
  },
}
