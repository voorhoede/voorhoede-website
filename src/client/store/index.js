import Vuex from 'vuex'
import * as types from './mutation-types'
import { getData } from '../lib/get-data'

const createStore = () => {
  return new Vuex.Store({

    state: {
      showGrid: false,
      locales: ['nl', 'en'],
      currentLocale: process.env.defaultLocale || process.env.DEFAULT_LOCALE,
      currentLayout: 'default',
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
            title: 'Blog',
            slug: 'blog',
          },
          {
            title: 'Over Ons',
            slug: 'about-us',
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
            title: 'Blog',
            slug: 'blog',
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
      alternateLocale: state => state.locales.find(locale => locale !== state.currentLocale),
      localizedMenuItems: state => state.menu[state.currentLocale]
    },
    actions: {
      async getData({ commit, getters, state }, { route }) {

        try {
          const data = await getData(route.path)

          const alternateParentSlug = data.alternateParent ? `/${data.alternateParent.slug}` : ''
          const alternateSlug = (data.alternate && !state.locales.includes(data.alternate.slug)) ? `/${data.alternate.slug}` : ''
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
      },
      setCurrentLocale({ commit, dispatch, state }, { locale }) {
        if (state.currentLocale !== locale && locale) {
          commit(types.SET_CURRENT_LOCALE, { locale })
          dispatch('getLayoutData')
        }
      },
      setCurrentLayout({ commit, dispatch }, { currentLayout }) {
        commit(types.SET_CURRENT_LAYOUT, { currentLayout })
        dispatch('getLayoutData')
      },
      async getLayoutData({ state, commit }) {
        const currentLocale = state.currentLocale || process.env.defaultLocale
        const currentLayout = state.currentLayout
        let data

        if (currentLayout === 'default') {
          data = await getData(`${currentLocale}/layouts/${currentLayout}`)
        } else {
          const statusCode = 404
          data = await getData(`${currentLocale}/layouts/${currentLayout}/${statusCode}`)
        }


        commit(types.SET_LAYOUT_DATA, { data })
        return data
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
      },
      [types.SET_LAYOUT_DATA](state, { data }) {
        state.layoutData = data
      },
      [types.SET_CURRENT_LAYOUT](state, { currentLayout }) {
        state.currentLayout = currentLayout
      }
    }
  })
}

export default createStore
