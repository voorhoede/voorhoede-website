<template>
  <nav class="app-mobile-menu grid">
    <h3 class="sr-only">Navigation</h3>
    <div
      v-if="showMenu"
      class="app-mobile-menu__content"
      @touchmove="prevent"
    >
      <nuxt-link :to="`/${currentLocale}/`">
        <img
          class="app-mobile-menu__logo"
          src="/images/logo--blue-and-yellow.svg"
          @click="toggleMobileMenu"
          alt="">
      </nuxt-link>
      <ul class="app-mobile-menu__list body-petite">
        <li v-for="link in localizedMenuItems" :key="link.href"
            class="app-mobile-menu__list-item"
            @click="toggleMobileMenu"
        >
          <nuxt-link
            class="h2"
            :to="createHref(link)"
          >
            {{ link.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div
      class="app-mobile-menu__icon"
      @click="toggleMobileMenu"
      @touchmove="prevent"
    >
      <img
        v-if="showMenu"
        class="app-mobile-menu__icon-image"
        src="/images/icon_menu-exit--white.svg"
        alt=""
      >
      <img
        v-else
        class="app-mobile-menu__icon-image"
        src="/images/icon_menu-passive--white.svg"
        alt=""
      >
    </div>
  </nav>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    data: () => ({
      showMenu: false
    }),
    computed: {
      ...mapState([
        'locales',
        'currentLocale',
        'alternateUrl',
      ]),
      ...mapGetters([
        'localizedMenuItems',
      ]),
    },
    methods: {
      prevent(event) {
        event.preventDefault()
      },
      toggleMobileMenu() {
        return this.showMenu = !this.showMenu
      },
      createHref(link) {
        const locale = this.currentLocale
        return `/${locale}/${link.slug}/`
      },
    },
  }
</script>

<style>
  :root {
      --mobile-icon-right: 20px;
      --mobile-icon-bottom: var(--mobile-icon-right);
      --mobile-icon-height: 52px;
      --mobile-icon-width: var(--mobile-icon-height);
      --mobile-icon-image: 25px;
      --mobile-icon-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .27);
      --mobile-spacing: 12px 20px;
  }

  .app-mobile-menu {
    position: relative;
    z-index: var(--z-index-high);
  }

  .app-mobile-menu__logo {
    width: auto;
    height: 1.4375rem; /* 23px */
  }

  .app-mobile-menu__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: var(--mobile-icon-bottom);
    right: var(--mobile-icon-right);
    z-index: var(--z-index-high);
    height: var(--mobile-icon-height);
    width: var(--mobile-icon-width);
    background: var(--html-blue);
    box-shadow: var(--mobile-icon-shadow);
  }

  .app-mobile-menu__icon-image {
    height: var(--mobile-icon-image);
    width: var(--mobile-icon-image);
  }

  .app-mobile-menu__content {
    display: flex;
    flex-direction: column;
    grid-column: page;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: var(--brand-yellow);
    padding: var(--mobile-spacing);
  }

  .app-mobile-menu__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: var(--spacing-larger);
  }

  .app-mobile-menu__list-item {
    margin-bottom: var(--spacing-large);
  }

  @media screen and (min-width: 720px) {
    .app-mobile-menu {
      display: none;
    }
  }
</style>
