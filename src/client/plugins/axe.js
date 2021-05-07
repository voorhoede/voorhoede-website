import Vue from 'vue'

if (process.env.NODE_ENV === 'development') {
  const VueAxe = require('vue-axe').default
  Vue.use(VueAxe, {
    allowConsoleClears: false,
    runOptions: {
      reporter: 'v2',
      runOnly: {
        type: 'tag',
        values: ['best-practice', 'wcag21a', 'wcag21aa'],
      },
    },
  })
}
