<template>
  <!-- Please do not remove these attributes, see: https://marcus.io/blog/improved-accessible-routing-vuejs -->
  <div
    id="top"
    ref="topOfPage"
    tabindex="-1"
  >
    <VueAnnouncer
      v-if="isBrowser"
      :lang="pageTitleLocale"
    />
    <cookie-notification
      v-if="!doNotTrack"
      :title="layout.cookieNotification.title"
      :body="layout.cookieNotification.body"
      :types="layout.cookieNotification.cookieTypes"
      :types-body="layout.cookieNotification.cookieTypesBody"
    />
    <app-banner
      v-if="layout.banner.isVisible && isHome"
      :text="layout.banner.text"
      :link="layout.banner.link"
      :link-title="layout.banner.linkTitle"
    />
    <div class="layout-default">
      <grid-demo :show="showGrid" />
      <a
        href="#content"
        class="skip-link app-button app-button--small body font-bold"
      >
        <span>{{ $t('skip_link') }}</span>
      </a>
      <nav :aria-label="layout.menu.title">
        <app-header
          :links="layout.menu.links"
          :call-to-action="layout.menu.callToAction"
        />
        <app-mobile-menu
          :links="[].concat(layout.menu.links, layout.menu.callToAction)"
        />
      </nav>
      <nuxt />
      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import localStorageSupported from '~/lib/local-storage-supported'

export default {
  data() {
    return {
      isBrowser: false,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
  computed: {
    ...mapState(['doNotTrack', 'showGrid']),
    layout () {
      return require(`../static/data/layouts/${this.$i18n.locale}/default`)
    },
    isHome() {
      return this.$route.name && this.$route.name.includes('index')
    },
    pageTitleLocale() {
      return this.$route.name && this.$route.name.includes('blog-slug') ? 'en' : this.$i18n.locale
    },
  },
  watch: {
    // Please do not remove this watcher, see: https://marcus.io/blog/improved-accessible-routing-vuejs
    $route: function() {
      this.$nextTick(() => {
        this.$refs.topOfPage.focus()
      })
    }
  },
  mounted() {
    this.isBrowser = true

    if (localStorageSupported) {
      const vendors = JSON.parse(localStorage.getItem('vendorCookiesAccepted')) || []

      this.setShowCookieBar({ show: Boolean(!vendors.length) })
      this.setAllowedCookies({ allowed: vendors })
    }

    const doNotTrack = !!((window.doNotTrack && window.doNotTrack === '1') ||
      (navigator.doNotTrack && (navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' )) ||
      (navigator.msDoNotTrack && navigator.msDoNotTrack === '1'))

    this.setDoNotTrack({ doNotTrack })
  },
  methods: {
    ...mapActions(['setAllowedCookies', 'setDoNotTrack', 'setShowCookieBar']),
  },
}
</script>

<style>
  .layout-default {
    position: relative;
  }
</style>
