<template>
  <nav class="app-header grid">
    <div class="app-header__content">
      <nuxt-link class="app-header__home-link" :to="`/${currentLocale}/`">
        <img class="app-header__logo" src="/images/logo-with-text.svg">
      </nuxt-link>
      <div class="app-header__link-lists body-petite">
        <ul class="app-header__link-list">
          <li v-for="link in localizedMenuItems" :key="link.href" class="app-header__link-list-item">
            <app-button small v-if="link.button" :label="link.title" :to="createHref(link)"/>
            <nuxt-link v-else class="app-header__link" :to="createHref(link)">{{ link.title }}</nuxt-link>
          </li>
        </ul>
        <ul class="app-header__link-list app-header__link-list--languages">
          <li
            v-for="locale in locales"
            :key="locale"
            class="app-header__link-list-item"
            :class="{
              'font-bold': locale === currentLocale,
            }"
          >
            <span v-if="locale === currentLocale">{{ locale }}</span>
            <nuxt-link class="app-header__link" v-else :to="alternateUrl">{{ locale }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div 
      v-if="showMenu" 
      class="app-header__content--mobile" 
      @touchmove="prevent">
      <nuxt-link class="app-header__home-link" :to="`/${currentLocale}/`">
        <img 
          class="app-header__logo" 
          src="/images/logo--blue-and-yellow.svg" 
          @click="toggleMobileMenu">
      </nuxt-link>
      <div class="app-header__link-lists--mobile body-petite">
        <ul class="app-header__link-list--mobile">
          <li v-for="link in localizedMenuItems" :key="link.href"
              class="app-header__link-list-item--mobile"
              @click="toggleMobileMenu"
          >
            <nuxt-link 
              class="app-header__link h2"
              :to="createHref(link)" 
            >
              {{ link.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div 
      class="app-header--mobile__icon" 
      @click="toggleMobileMenu" 
      @touchmove="prevent">
      <img 
        v-if="showMenu" 
        class="app-header--mobile__icon-image" 
        src="/images/icon_menu-exit--white.svg"
      >
      <img 
        v-else 
        class="app-header--mobile__icon-image"
        src="/images/icon_menu-passive--white.svg"
      >
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { AppButton } from '../../components'

  export default {
    components: { AppButton },
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
    --header-z-index: 2;
    --mobile-icon-right: 20px;
    --mobile-icon-bottom: var(--mobile-icon-right);
    --mobile-icon-height: 52px;
    --mobile-icon-width: var(--mobile-icon-height);
    --mobile-icon-image: 25px;
    --mobile-icon-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .27);
    --mobile-spacing: 12px 20px;
  }

  .app-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--header-z-index);
    height: var(--app-header-height);
    width: 100%;
    border-bottom: 1px solid var(--fog);
  }

  .app-header--mobile__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: var(--mobile-icon-bottom);
    right: var(--mobile-icon-right);
    z-index: var(--header-z-index);
    height: var(--mobile-icon-height);
    width: var(--mobile-icon-width);
    background: var(--html-blue);
    box-shadow: var(--mobile-icon-shadow);
  }
  
  .app-header--mobile__icon-image {
    height: var(--mobile-icon-image);
    width: var(--mobile-icon-image);
  }

  .app-header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .app-header__content--mobile {
    display: flex;
    flex-direction: column;
    grid-column: page;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: var(--brand-yellow);
    padding: var(--mobile-spacing);
  }

  .app-header__logo {
    width: auto;
    height: 1.4375rem; /* 23px */
  }

  .app-header__link-lists {
    display: flex;
    align-items: center;
  }

  .app-header__link-lists--mobile {
    display: flex;
    height: 100%;
    align-items: flex-start;
    margin-top: var(--spacing-larger);
  }

  .app-header__link-list {
    display: none;
  }

  .app-header__link-list--mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .app-header__link-list--languages {
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }

  .app-header__link-list-item {
    padding: 0 calc(var(--spacing-small) / 2);
    font-family: var(--font-sans);
    color: var(--html-blue);
  }

  .app-header__link-list-item--mobile {
    margin-bottom: var(--spacing-large);
  }

  .app-header__link {
    text-decoration: none;
  }

  .app-header__link:hover {
    color: var(--active-blue);
  }

  .app-header__link-list--languages .app-header__link-list-item {
    padding-right: var(--spacing-tiny);
  }

  .app-header__link-list--languages .app-header__link-list-item + .app-header__link-list-item {
    padding-left: 0;
    padding-right: 0;
  }

  .app-header__link-list--languages .app-header__link-list-item + .app-header__link-list-item::before {
    content: '|';
    padding-right: var(--spacing-tiny);
    color: var(--html-blue);
  }

  @media screen and (min-width: 720px) {
    .app-header--mobile__icon {
      display: none;
    }
    
    .app-header__content--mobile {
      display: none;
    }
    
    .app-header__logo {
      height: 1.625rem; /* 26px */
    }

    .app-header__link-list {
      display: flex;
      align-items: center;
    }
  }

  @media screen and (min-width: 1100px) {
    .app-header__logo {
      height: 1.8125rem; /* 29px */
    }

    .app-header__link-list-item {
      padding: 0 calc(var(--spacing-large) / 2);
    }

    .app-header__link-list--languages .app-header__link-list-item {
      padding-right: var(--spacing-tiny);
    }
  }

</style>
