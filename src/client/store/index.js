const SHOW_GRID = 'SHOW_GRID'
const HIDE_GRID = 'HIDE_GRID'

export const state = () => ({
  showGrid: false,
  menu: {
    nl: [
      {
        title: 'Services',
        slug: 'service',
      },
      {
        title: 'Cases',
        slug: 'case',
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
    ],
    en: [
      {
        title: 'Services',
        slug: 'service',
      },
      {
        title: 'Cases',
        slug: 'case',
      },
      {
        title: 'Academy',
        slug: 'academy',
      },
      {
        title: 'Over Ons',
        slug: 'over-on',
      },
      {
        title: 'Contact',
        slug: 'contact',
        button: true,
      }
    ]
  },
})

export const mutations = {
  [SHOW_GRID]: function showGrid(state) {
    state.showGrid = true
  },
  [HIDE_GRID]: function hideGrid(state) {
    state.showGrid = true
  },
}
