<template>
  <nav class="app-header grid">
    <div class="app-header__content">
      <nuxt-link class="app-header__home-link" :to="`/${currentLocale}/`">
        <img class="app-header__logo" src="/images/logo-with-text.svg">
      </nuxt-link>
      <div class="app-header__link-lists body-petite">
        <ul class="app-header__link-list">
          <li v-for="link in links" :key="link.href" class="app-header__link-list-item">
            <app-button small v-if="link.button" :label="link.title" :to="createHref(link)"/>
            <nuxt-link v-else class="app-header__link" :to="createHref(link)">{{ link.title }}</nuxt-link>
          </li>
        </ul>
        <ul class="app-header__link-list app-header__link-list--languages">
          <li
            v-for="language in languages"
            :key="language.locale"
            :class="{
              'app-header__link-list-item': true,
              'font-bold': language.locale === currentLocale,
            }"
          >
            <span v-if="language.locale === currentLocale">{{ language.locale }}</span>
            <nuxt-link class="app-header__link" v-else :to="language.href">{{ language.locale }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { AppButton } from '~/components'

export default {
  components: { AppButton },
  props: {
    currentUrl: {
      type: String,
      default: '/',
    },
    languages: {
      type: Array,
      default: () => [
        { locale: 'en', href: '/en/' },
        { locale: 'nl', href: '/nl/' },
      ],
    },
    links: {
      type: Array,
      default: () => [],
    },
    currentLocale: {
      type: String,
      default: '',
    },
  },
  computed: {
    activeLanguage() {
      const trailingSlashRegex = /\/$/
      const currentUrl = this.currentUrl.replace(trailingSlashRegex, '')
      return this.languages.find(language => {
        return language.href.replace(trailingSlashRegex, '') === currentUrl
      })
    },
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
.app-header {
  border-bottom: 1px solid var(--fog);
  height: var(--app-header-height);
}

.app-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header__logo {
  width: auto;
  height: 1.4375rem; /* 23px */
}

.app-header__link-lists {
  display: flex;
  align-items: center;
}

.app-header__link-list {
  display: none;
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
  .app-header__logo {
    height: 1.625rem; /* 26px */
  }

  .app-header__link-list {
    display: flex;
    align-items: center;
  }
}

@media screen and (min-width: 1100px) {
  .app-header {
    height: var(--app-header-height-large);
  }

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
