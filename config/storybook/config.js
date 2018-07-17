import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options'

import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'; // Vue plugins

setOptions({
  name: 'Voorhoede Dragonfly',
  url: '#',
  showLeftPanel: true,
  showDownPanel: true,
  downPanelInRight: true,
})

Vue.use(VueI18n)
Vue.use(Vuex)

/**
 * mock nuxt router
 * https://nuxtjs.org/guide/routing
 */
Vue.mixin({
  created() {
    this.$route = {}
  }
})

/**
 * Demo component to wrap story items in a consistent layout
 */
Vue.component('Demo', {
  props: { inset: { type: Boolean }, title: { type: String } },
  template: `
    <section>
      <h1 style="padding:16px; background-color:#F3F3F3; font-weight:700;">
        {{ title }}
      </h1>
      <div :style="inset ? 'padding:20px' : ''">
        <slot>Demo</slot>
      </div>
    </section>
  `,
})

/**
 * Mock nuxt-link
 * https://nuxtjs.org/api/components-nuxt-link/
 */
Vue.component('NuxtLink', {
  props: ['to'],
  template: '<a :href="to" v-bind="$attrs" v-on="$listeners"><slot /></a>',
})

function importAll (r) {
  r.keys().forEach(r)
}

/**
 * Load stories
 * Note: don't try to move `${__dirname}/../../src/client/` to a variable,
 * it will cause errors as then Webpack can no longer statically determine required files.
 */
function loadStories() {
  importAll(require.context(__dirname, true, /\.stories\.js$/))
  importAll(require.context(`${__dirname}/../../src/client/`, true, /\.stories\.js$/))
}

configure(loadStories, module)
