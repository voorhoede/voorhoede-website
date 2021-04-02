<template>
  <div>
    <app-banner
      v-if="layout.banner.isVisible && isHome"
      :text="layout.banner.text"
      :link="layout.banner.link"
      :link-title="layout.banner.linkTitle"
    />
    <div class="layout-default">
      <grid-demo :show="showGrid" />
      <!--
        Set focus on this element on route change, so that the user can
        tab to the next focusable element. Giving a negative tabindex
        makes the element only focusable using .focus() but prevents the
        element from being focusable using the keyboard.
      -->
      <a
        id="top"
        ref="id"
        class="sr-only"
        tabindex="-1"
      >
        {{ $t('top_of_page') }}
      </a>
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
  computed: {
    ...mapState(['showGrid']),
    layout () {
      return require(`../static/data/layouts/${this.$i18n.locale}/default`)
    },
    isHome() {
      return this.$route.name && this.$route.name.includes('index')
    },
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
