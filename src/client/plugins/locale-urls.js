import Vue from 'vue'

export const enforceTrailingSlash = url => (url.endsWith('/') ? url : `${url}/`)

Vue.mixin({
  methods: {
    /**
     * Extends Nuxt I18n's localeUrl with an enforced trailing slash
     * @see https://nuxt-community.github.io/nuxt-i18n/basic-usage.html#nuxt-link
     * @param {string|object} options   name of route (string) or object for route
     * @param {string} options.name     name of route
     * @param {object} options.params   route parameters
     * @param {string} [locale]
     */
    localeUrl (options, locale) {
      const url = this.localePath(options, locale)
      return enforceTrailingSlash(url)
    },

    /**
     * Extends Nuxt I18n's switchLocaleUrl with an enforced trailing slash
     * @see https://nuxt-community.github.io/nuxt-i18n/lang-switcher.html
     * @param {string} locale
     */
    switchLocaleUrl (locale) {
      const url = this.switchLocalePath(locale)
      return enforceTrailingSlash(url)
    },
  },
})
