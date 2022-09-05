<template>
  <!-- Please do not remove these attributes, see: https://marcus.io/blog/improved-accessible-routing-vuejs -->
  <div
    id="top"
    ref="topOfPage"
    tabindex="-1"
  >
    <div class="colour-blindness">
      <app-button-vue
        small
        :label="colourBlindnessLabel"
        @click="colourBlindnessEnabled = !colourBlindnessEnabled"
      />
    </div>
    <div
      :class="{'colour-filter': colourBlindnessEnabled }"
    >
      <VueAnnouncer
        v-if="isBrowser"
        :lang="pageTitleLocale"
      />
      <cookie-notification
        :title="layout.cookieNotification.title"
        :body="layout.cookieNotification.body"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import appButtonVue from '../components/app-button/app-button.vue'

export default {
  components: {
    appButtonVue
  },
  data() {
    return {
      isBrowser: false,
      colourBlindnessEnabled: true
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
    ...mapState(['showGrid']),
    layout () {
      return require(`../static/data/layouts/${this.$i18n.locale}/default`)
    },
    isHome() {
      return this.$route.name && this.$route.name.includes('index')
    },
    pageTitleLocale() {
      return this.$route.name && this.$route.name.includes('blog-slug') ? 'en' : this.$i18n.locale
    },
    colourBlindnessLabel() {
      return `${this.colourBlindnessEnabled ? 'Disable': 'Enable'} colour blindness`
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
}
</script>

<style>
  .colour-filter {
    filter: url('/images/svg-filters.svg#achromatopsia') blur(1px);
  }

  .colour-blindness {
    position: fixed;
    bottom: 0;
    padding: var(--spacing-larger);
    z-index: 9999;
  }

  .layout-default {
    position: relative;
  }
</style>
