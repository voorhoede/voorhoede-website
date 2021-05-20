<template>
  <div class="app-header grid">
    <div class="app-header__content">
      <nuxt-link class="app-header__home-link" :to="localeUrl('index')">
        <img class="app-header__logo" src="/images/logo-with-text.svg" alt="Home" width="190" height="32">
      </nuxt-link>
      <div class="app-header__link-lists body-petite">
        <ul class="app-header__link-list">
          <li v-for="link in links" :key="link.title" class="app-header__link-list-item">
            <nuxt-link class="app-header__link" :to="createHref(link)">{{ link.title }}</nuxt-link>
          </li>
          <li v-if="callToAction" class="app-header__link-list-item">
            <app-button small :label="callToAction.title" :to="createHref(callToAction)"/>
          </li>
        </ul>
        <div class="app-header__link-list app-header__link-list--languages">
          <template
            v-for="({ code, name }) in $i18n.locales"
            :class="{ 'font-bold': code === $i18n.locale }"
          >
            <span
              v-if="code === $i18n.locale"
              :key="code"
              aria-hidden="true"
              class="app-header__link-list-item app-header__link-list-item--highlighted"
            >
              {{ code }}
            </span>
            <div
              v-else
              :key="code"
              class="app-header__link-list-item"
            >
              <nuxt-link
                class="app-header__link"
                :aria-label="$t('switch_to__language_', code, { language: name })"
                :lang="code"
                :to="localizedlocaleUrls[code]"
                @click.native="saveLocale(code)">{{ code }}</nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createHref, linkValidator } from '../../lib/links'

  export default {
    props: {
      links: {
        type: Array,
        validator (links) {
          return links.every(linkValidator)
        },
        default: () => [],
      },
      callToAction: {
        type: Object,
        validator: linkValidator,
        default: () => {},
      }
    },
    computed: {
      /**
       * Pages can have localized slugs, stored as an array in Vuex on asyncData.
       * When switching locale, the localized slug is needed instead of the current slug.
       */
      localizedlocaleUrls () {
        if (this.$store.state.i18nSlugs) {
          return this.$store.state.i18nSlugs.reduce((obj, { locale, value }) => {
            // Get the route name (without the language suffix).
            const name = this.$route.name.replace(/___.*$/,'')
            // Return localized url as a property keyed by lang code.
            obj[locale] = this.localeUrl({ name, params: { slug: value }, }, locale)
            return obj
          }, {})
        } else {
          return this.$i18n.locales.reduce((obj, { code }) => {
            obj[code] = this.switchLocaleUrl(code)
            return obj
          }, {})
        }
      }
    },
    methods: {
      createHref,
      saveLocale (code) {
        const cookie = document.cookie
        const langKey = 'nf_lang' // @See https://www.netlify.com/docs/redirects/#geoip-and-language-based-redirects
        if (cookie.match(new RegExp(langKey) !== null)) {
          document.cookie = cookie.replace(new RegExp(`${langKey}=[A-Za-z-]+;`), `${langKey}=${code};`)
        } else {
          document.cookie = `${langKey}=${code}; path=/; ${cookie}`
        }
      }
    },
  }
</script>

<style>
  :root {
    --header-border-opacity: .08;
  }

  .app-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--z-index-high);
    width: 100%;
  }

  .app-header::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: var(--black);
    opacity: var(--header-border-opacity);
  }

  .app-header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--app-header-height-small);
  }

  .app-header__logo {
    width: auto;
    height: 1.625rem; /* 26px */
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

  .app-header__link-list-item--highlighted {
    font-weight: bold;
  }

  .app-header__link {
    text-decoration: none;
  }

  .app-header__link:hover,
  .app-header__link:focus {
    padding-bottom: .23rem;
    background: transparent linear-gradient(to top, var(--html-blue) 2px, transparent 2px);
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

  @media screen and (min-width: 800px) {
    .app-header__logo {
      height: 1.875rem; /* 30px */
    }

    .app-header__link-list {
      display: flex;
      align-items: center;
    }
  }

  @media screen and (min-width: 1100px) {
    .app-header__content {
      height: var(--app-header-height-large);
    }

    .app-header__logo {
      height: 2.125rem; /* 34px */
    }

    .app-header__link-list-item {
      padding: 0 calc(var(--spacing-large) / 2);
    }

    .app-header__link-list--languages .app-header__link-list-item {
      padding-right: var(--spacing-tiny);
    }
  }

</style>
