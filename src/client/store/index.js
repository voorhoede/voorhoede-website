import dayjs from 'dayjs'
import Vuex from 'vuex'
import * as types from './mutation-types'
import { getData } from '../lib/get-data'
import setLocaleFromPath from '../lib/set-locale-from-path'

const createStore = () => {
  return new Vuex.Store({
    state: {
      showGrid: false,
      locales: ['nl', 'en'],
      currentLocale: process.env.defaultLocale || process.env.DEFAULT_LOCALE,
      currentLayout: 'default',
      errorCode: null,
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
            title: 'Vacatures',
            slug: 'jobs',
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
            title: 'Jobs',
            slug: 'jobs',
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
      async getData({ commit, dispatch, getters, state }, { route }) {
        try {
          const variables = {
            currentLocale: state.currentLocale,
            altLocale: getters.alternateLocale,
            currentDate: dayjs().format('YYYY-MM-DD')
          }
          const data = await getData(route.path, variables)

          const alternateParentSlug = data.alternateParent ? `/${data.alternateParent.slug}` : ''
          const alternateSlug = (data.alternate && !state.locales.includes(data.alternate.slug)) ? `/${data.alternate.slug}` : ''
          const url = `/${getters.alternateLocale}${alternateParentSlug}${alternateSlug}/`

          commit(types.SET_ERROR_CODE, { errorCode: null })
          commit(types.SET_ALTERNATE_URL, { url })
          return data
        } catch (e) {
          setLocaleFromPath({
            commit,
            dispatch,
            path: route.path,
            locales: state.locales
          })
          commit(types.SET_ERROR_CODE, { errorCode: 404 })
          dispatch('setCurrentLayout', { layout: 'error' })
          console.error(e) // eslint-disable-line no-console
          throw e
        }
      },
      nuxtServerInit({ commit }, { params }) {
        commit(types.SET_CURRENT_LOCALE, { locale: params.locale ? params.locale : process.env.DEFAULT_LOCALE })
      },
      setCurrentLocale({ commit, dispatch, state }, { locale }) {
        if (state.currentLocale !== locale && locale) {
          commit(types.SET_CURRENT_LOCALE, { locale })
          dispatch('getLayoutData')
        }
      },
      setCurrentLayout({ commit, dispatch, state }, { layout }) {
        if (state.currentLayout !== layout && layout) {
          commit(types.SET_CURRENT_LAYOUT, { layout })
          return dispatch('getLayoutData')
        }
      },
      async getLayoutData({ state, commit }) {
        let data

        if (state.currentLayout === 'default') {
          data = await getData(`/${state.currentLocale}/layouts/${state.currentLayout}`)
        } else {
          data = await getData(`/${state.currentLocale}/layouts/${state.currentLayout}/${state.errorCode}`)
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
      [types.SET_CURRENT_LAYOUT](state, { layout }) {
        state.currentLayout = layout
      },
      [types.SET_ERROR_CODE](state, { errorCode }) {
        state.errorCode = errorCode
      }
    }
  })
}

export default createStore
