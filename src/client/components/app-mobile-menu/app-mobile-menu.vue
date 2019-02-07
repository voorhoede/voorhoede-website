<template>
  <nav class="app-mobile-menu grid">
    <h2 class="sr-only">{{ title }}</h2>
    <button
      v-if="!showMenu"
      class="app-mobile-menu__icon"
      @click="toggleMobileMenu"
      @touchmove="prevent"
      :aria-label="$t('open_menu')"
    >
      <div class="app-mobile-menu__icon-open"></div>
    </button>
    <div
      v-if="showMenu"
      class="app-mobile-menu__content"
      @touchmove="prevent"
    >
      <nuxt-link :to="localeUrl('index')" :title="$t('home')" tabindex="-1">
        <img
          class="app-mobile-menu__logo"
          src="/images/logo--blue-and-yellow.svg"
          @click="toggleMobileMenu"
          alt="">
      </nuxt-link>
      <ul class="app-mobile-menu__list body-petite">
        <li 
          class="app-mobile-menu__list-item" 
          @click="toggleMobileMenu">
          <nuxt-link
            class="h3"
            to="/"
            :aria-label="$t('home')"
          >
            {{ $t('home') }}
          </nuxt-link>
        </li>
        <li
          v-for="link in links"
          :key="link.href"
          class="app-mobile-menu__list-item"
          @click="toggleMobileMenu"
        >
          <nuxt-link
            class="h3"
            :to="createHref(link)"
          >
            {{ link.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <button
      v-if="showMenu"
      class="app-mobile-menu__icon"
      @click="toggleMobileMenu"
      @touchmove="prevent"
      :aria-label="$t('close_menu')"
    >
      <div class="app-mobile-menu__icon-close"></div>
    </button>
  </nav>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import { createHref, linkValidator } from '../../lib/links'

  export default {
    props: {
      title: {
        type: String,
        default: 'Site menu'
      },
      links: {
        type: Array,
        validator (links) {
          return links.every(linkValidator)
        },
        default: () => [],
      }
    },
    computed: {
      ...mapState(['showMenu']),
    },
    methods: {
      ...mapActions(['toggleMobileMenu']),
      prevent(event) {
        event.preventDefault()
      },
      createHref
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
    z-index: var(--z-index-overlay);
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
    border: none;
    outline: none;
    background-color: var(--html-blue);
    box-shadow: var(--mobile-icon-shadow);
  }

  .app-mobile-menu__icon:focus,
  .app-mobile-menu__icon:active {
    background: var(--white);
  }

  .app-mobile-menu__icon:focus > .app-mobile-menu__icon-open,
  .app-mobile-menu__icon:active > .app-mobile-menu__icon-open {
    background-image: url('/images/icon_menu-passive--blue.svg');
  }

  .app-mobile-menu__icon-open {
    background-image: url('/images/icon_menu-passive--white.svg');
    height: var(--mobile-icon-image);
    width: var(--mobile-icon-image);
  }

  .app-mobile-menu__icon-close {
    background-image: url('/images/icon_menu-exit--white.svg');
    height: var(--mobile-icon-image);
    width: var(--mobile-icon-image);
  }

  .app-mobile-menu__icon:focus > .app-mobile-menu__icon-close,
  .app-mobile-menu__icon:active > .app-mobile-menu__icon-close {
    background-image: url('/images/icon_menu-exit--blue.svg');
  }

  .app-mobile-menu__content {
    display: flex;
    flex-direction: column;
    grid-column: var(--grid-page);
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: var(--brand-yellow);
    padding: var(--mobile-spacing);
  }

  .app-mobile-menu__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: var(--spacing-medium);
  }

  .app-mobile-menu__list-item {
    margin-bottom: var(--spacing-medium);
  }

  @media (min-height: 500px) {
    .app-mobile-menu__list-item {
      margin-bottom: var(--spacing-large);
    }
  }

  @media screen and (min-width: 720px) {
    .app-mobile-menu {
      display: none;
    }
  }

</style>
