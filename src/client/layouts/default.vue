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
      :title="layout.cookieNotification.title"
      :body="layout.cookieNotification.body"
      :approve-button-label="layout.cookieNotification.approveButtonLabel"
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
      <app-header
        :title="layout.menu.title"
        :links="layout.menu.links"
        :call-to-action="layout.menu.callToAction"
      />
      <app-mobile-menu
        :title="layout.menu.title"
        :links="[].concat(layout.menu.links, layout.menu.callToAction)"
      />
      <nuxt />
      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isBrowser: false,
    }
  },
  computed: {
    ...mapState(['showGrid']),
    layout () {
      return require(`../static/data/layouts/${this.$i18n.locale}/default`)
    },
    isHome() {
      return this.$route.name && this.$route.name.includes('index')
    },
    pageTitleLocale() {
      return this.$route.name && this.$route.name.includes('blog-slug') ? 'en' : this.$i18n.locale
    }
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
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
}
</script>

<style>
  .layout-default {
    position: relative;
  }
</style>
