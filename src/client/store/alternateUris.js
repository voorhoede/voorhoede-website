const SET_ALTERNATE_URIS = 'SET_ALTERNATE_URIS'

const baseState = {
  en: '/en/',
  nl: '/nl/',
}

export const state = () => baseState

export const mutations = {
  [SET_ALTERNATE_URIS]: function setAlternateUris(state, payload) {
    payload.forEach(item => {
      state[item.locale] = item.uri
    })
  },
}
