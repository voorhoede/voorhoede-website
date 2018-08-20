import Vuex from 'vuex'
import * as types from './mutation-types'
import { getData } from '../lib/get-data'

const createStore = () => {
  return new Vuex.Store({

    state: {
      showGrid: false,
      locales: ['nl', 'en'],
      currentLocale: process.env.DEFAULT_LOCALE,
      menu: {
        nl: [
          {
            title: 'Services',
            slug: 'services',
          },
          {
            title: 'Cases',
            slug: 'cases',
          },
          {
            title: 'Academy',
            slug: 'academy',
          },
          {
            title: 'Over Ons',
            slug: 'over-ons',
          },
          {
            title: 'Contact',
            slug: 'contact',
            button: true,
          }
        ],
        en: [
          {
            title: 'Services',
            slug: 'services',
          },
          {
            title: 'Cases',
            slug: 'cases',
          },
          {
            title: 'Academy',
            slug: 'academy',
          },
          {
            title: 'About Us',
            slug: 'about-us',
          },
          {
            title: 'Contact',
            slug: 'contact',
            button: true,
          }
        ]
      },
    },
    getters: {
      alternateLocale: state => {
        return state.locales.find(locale => locale !== state.currentLocale)
      },
      localizedMenuItems: state => state.menu[state.currentLocale]
    },
    actions: {
      async getData({ commit, state, getters }, { query, route }) {

        try {
          const data = await getData(route.path)

          const alternateParentSlug = data.alternateParent ? `/${data.alternateParent.slug}` : ''
          const alternateSlug = data.alternate ? `/${data.alternate.slug}` : ''
          const url = `/${getters.alternateLocale}${alternateParentSlug}${alternateSlug}/`

          commit(types.SET_ALTERNATE_URL, { url })
          return data
        } catch (e) {
          console.error(e) // eslint-disable-line no-console
          throw e
        }
      },
      nuxtServerInit({ commit }, { params }) {
        commit(types.SET_CURRENT_LOCALE, { locale: params.locale })
      }
    },
    mutations: {
      [types.SHOW_GRID](state) {
        state.showGrid = true
      },
      [types.HIDE_GRID](state) {
        state.showGrid = true
      },
      [types.SET_CURRENT_LOCALE](state, { locale }) {
        state.currentLocale = locale
      },
      [types.SET_ALTERNATE_URL](state, { url }) {
        state.alternateUrl = url
      }
    }
  })
}

export default createStore
