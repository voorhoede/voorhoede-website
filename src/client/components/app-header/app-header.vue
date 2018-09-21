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
    <div class="app-header__content--mobile" v-if="showMenu">
      <nuxt-link class="app-header__home-link" :to="`/${currentLocale}/`">
        <img class="app-header__logo" src="/images/logo--blue.svg" @click="showMenu = !showMenu">
      </nuxt-link>
      <div class="app-header__link-lists app-header__link-lists--mobile body-petite">
        <ul class="app-header__link-list app-header__link-list--mobile">
          <li v-for="link in localizedMenuItems" :key="link.href" @click="showMenu = !showMenu" 
              class="app-header__link-list-item app-header__link-list-item--mobile">
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
    <div class="app-header--mobile__icon" @click="showMenu = !showMenu">
      <img v-if="!showMenu" src="/images/icon_menu-passive--white.svg" >
      <img v-else src="/images/icon_menu-exit--white.svg" >
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { AppButton } from '~/components'

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
      createHref(link) {
        const locale = this.currentLocale
        return `/${locale}/${link.slug}/`
      },
    },
  }
</script>

<style>
  :root {
    --mobile-icon-height: 52px;
    --mobile-icon-width: 52px;
  }

  .app-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: var(--app-header-height);
    width: 100%;
    border-bottom: 1px solid var(--fog);
  }

  .app-header--mobile__icon {
    display: flex;
    position: fixed;
    z-index: 2;
    justify-content: center;
    height: var(--mobile-icon-height);
    width: var(--mobile-icon-width);
    padding: var(--spacing-tiny);
    bottom: 20px;
    right: 20px;
    background: var(--html-blue);
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
    padding: var(--spacing-medium);
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
