<template>
  <nav class="app-header grid">
    <div class="app-header__content">
      <div class="app-header__home-link">
        <nuxt-link to="/">
          <app-logo showText/>
        </nuxt-link>
      </div>
      <div class="app-header__link-lists body-petite">
        <ul class="app-header__link-list">
          <li v-for="link in links" class="app-header__link"><nuxt-link :to="link.slug">{{ link.title }}</nuxt-link></li>
        </ul>
        <ul class="app-header__languages-list">
          <li v-for="locale in locales" :class="`app-header__link ${locale.url === currentUrl ? 'font-bold' : '' }`">
            <span v-if="locale.url === currentUrl">{{ locale.title }}</span>
            <nuxt-link v-else :to="locale.url">{{ locale.title }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { AppLogo } from '~/components'

export default {
  components: { AppLogo },
  props: {
    currentUrl: String,
    locales: Array,
    links: Array,
  },
}
</script>

<style>
:root {
  --app-header-height: 3.125rem; /* 50px */
  --app-header-height-large: 4.0625rem; /* 75px */
}

.app-header {
  border-bottom: 1px solid var(--fog);
  height: var(--app-header-height);
}

@media screen and (min-width: 1100px) {
  .app-header {
    height: var(--app-header-height-large);
  }
}

.app-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header__home-link svg {
  width: auto;
  height: 1.4375rem; /* 23px */
}

@media screen and (min-width: 720px) {
  .app-header__home-link svg {
    height: 1.625rem; /* 26px */
  }
}

@media screen and (min-width: 1100px) {
  .app-header__home-link svg {
    height: 1.8125rem; /* 29px */
  }
}

.app-header__link-lists {
  display: flex;
  align-items: center;
}

.app-header__link-list {
  display: none;
}

@media screen and (min-width: 720px) {
  .app-header__link-list {
    display: flex;
    align-items: center;
  }
}

.app-header__link {
  padding: 0 calc(.9375rem / 2); /* 15px / 2 */
  font-family: var(--font-sans);
  color: var(--html-blue);
}

@media screen and (min-width: 1100px) {
  .app-header__link {
    padding: 0 calc(2.1875rem / 2); /* 35px / 2 */
  }
}

.app-header__link a {
  text-decoration: none;
}

.app-header__link a:hover {
  color: var(--active-blue);
}

.app-header__languages-list {
  display: flex;
  align-items: center;
  text-transform: uppercase;
}

.app-header__languages-list .app-header__link:first-child {
  padding-right: .3125rem; /* 5px */
}

.app-header__languages-list .app-header__link + .app-header__link {
  padding-left: 0;
  padding-right: 0;
}

.app-header__languages-list .app-header__link + .app-header__link:before {
  content: '|';
  padding-right: .3125rem; /* 5px */
  color: var(--html-blue);
}
</style>
