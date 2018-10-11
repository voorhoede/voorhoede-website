<template>
  <footer class="app-footer grid">
    <div class="app-footer__header">
      <img class="app-footer__header-logo" src="/images/logo--blue.svg">
    </div>
    <div class="app-footer__column">
      <ul class="app-footer__list">
        <li
          v-for="link in exploreLinks"
          :key="link.slug"
          class="app-footer__list-item body-detail"
        >
          <nuxt-link class="app-footer__link" :to="createHref(link)">{{ link.title }}</nuxt-link>
        </li>
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref({ slug: 'faq'})">FAQ</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="app-footer__column app-footer__column--right">
      <ul class="body-detail app-footer__list app-footer__list--border-none app-footer__list--no-padding">
        <li class="app-footer__list-item">
          <a
            :href="`tel:${ cleanedTelephone }`"
            class="app-footer__link"
            target="_blank">{{ tel }}</a>
        </li>
        <li class="app-footer__list-item">
          <a
            :href="`mailto:${ email }`"
            class="app-footer__link"
            target="_blank" >{{ email }}</a>
        </li>
        <li class="app-footer__list-item">
          <a
            :href="googleMapsLink"
            class="app-footer__link app-footer__link--right"
            target="_blank">
            <span>{{ address }}</span>
            <span>{{ postalCode }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <dl class="app-footer__definition-list" v-for="legalItem in legal" :key="legalItem.key">
          <dt>{{ legalItem.key }}</dt>: <dd class="app-footer__definition-value">{{ legalItem.value }}</dd>
        </dl>
      </div>
      <ul class="app-footer__list--icon">
        <li class="app-footer__list-item--icon"
            v-for="socialItem in social" :key="socialItem.href">
          <a :href="socialItem.href" target="_blank">
            <app-icon :name="socialItem.icon" :is-large="true" />
          </a>
        </li>
      </ul>
      <div class="body-detail app-footer__legal">
        <a
          :href="copyrightLink"
          class="app-footer__copyright"
          :title="copyrightLinkTitle"
          target="_blank">{{ copyrightLinkLabel }}</a>
        <span> - </span>
        <a
          :href="privacyLink"
          class="app-footer__privacy"
          :title="privacyLinkTitle"
          target="_blank">{{ privacyLinkLabel }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import AppIcon from '../../components/app-icon'

export default {
  components: {
    AppIcon,
  },
  props: {
    exploreLinks: {
      type: Array,
      default: () => [],
      validator: (links) => {
        return (
          links.every(link => {
            return link instanceof Object &&
              typeof link.title === 'string' &&
              typeof link.slug === 'string'
          })
        )
      },
    },
    headerTitle: {
      type: String,
      default: '',
    },
    headerSubtitle: {
      type: String,
      default: '',
    },
    tel: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    googleMapsLink: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
    copyrightLinkLabel: {
      type: String,
      default: '',
    },
    copyrightLinkTitle: {
      type: String,
      default: '',
    },
    copyrightLink: {
      type: String,
      default: '',
    },
    privacyLinkLabel: {
      type: String,
      default: '',
    },
    privacyLinkTitle: {
      type: String,
      default: '',
    },
    privacyLink: {
      type: String,
      default: '',
    },
    legal: {
      type: Array,
      default: () => [],
      validator: (legal) => {
        return (
          legal.every(item => {
            return item instanceof Object &&
              typeof item.key === 'string' &&
              typeof item.value === 'string'
          })
        )
      },
    },
    social: {
      type: Array,
      default: () => [],
      validator: (social) => {
        return (
          social.every(item => {
            return item instanceof Object &&
              typeof item.icon === 'string' &&
              typeof item.href === 'string'
          })
        )
      },
    },
  },
  computed: {
    ...mapState([
      'currentLocale',
    ]),
    cleanedTelephone() {
      return this.tel.replace(/[^0-9]/g, '')
    }
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
  --logo-drop-shadow: drop-shadow(1px 2px 4px var(--dim));
  --logo-width: 3.25rem;
  --logo-height: var(--logo-width);
}

.app-footer {
  width: 100%;
  padding: var(--spacing-larger) 0 var(--spacing-small) 0;
  background: var(--brand-yellow);
}

.app-footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-medium);
  padding-top: var(--spacing-medium);
  border-top: 1px solid var(--black);
}

.app-footer__bottom-text {
  display: none;
  font-size: 12px;
}

.app-footer__legal {
  font-size: 12px;
}

.app-footer__copyright,
.app-footer__privacy {
  text-decoration: none;
  border-bottom: 1px solid var(--black);
}

.app-footer__list {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: var(--spacing-medium);
  border-bottom: 1px solid var(--black);
}

.app-footer__list--border-none {
  border-bottom: 0;
}

.app-footer__list--no-padding {
  padding-bottom: 0;
}

.app-footer__list--icon {
  display: flex;
  text-align: center;
  margin-bottom: var(--spacing-small);
}

.app-footer__list-item {
  text-decoration: none;
  margin: var(--spacing-smaller);
}

.app-footer__list-item--icon {
  margin: 0 var(--spacing-tiny);
}

.app-footer__link {
  position: relative;
  z-index: var(--z-index-low);
  text-decoration: none;
}

.app-footer__link--right {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  }

.app-footer__header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: var(--spacing-large);
}

.app-footer__header-logo {
  width: var(--logo-width);
  height: var(--logo-height);
  margin-bottom: var(--spacing-small);
  filter: var(--logo-drop-shadow);
}

.app-footer__column {
  text-align: center;
}

.app-footer__column--right {
  margin-bottom: var(--spacing-medium);
}

@media (min-width: 720px) {
  .app-footer {
    position: relative;
  }

  .app-footer__column {
    float: left;
    padding-top: 0;
    margin-bottom: var(--spacing-medium);
    text-align: left;
  }

  .app-footer__column--right {
    float: right;
    text-align: right;
  }

  .app-footer__header {
    position: absolute;
    width: calc(100% - var(--spacing-medium) * 2);
  }

  .app-footer__legal {
    text-align: right;
    width: 50%;
  }

  .app-footer__bottom {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0;
    border-top: 1px solid var(--html-blue);
  }

  .app-footer__bottom-text {
    display: none;
  }

   .app-footer__definition-list {
    display: flex;
    margin-right: var(--spacing-tiny);
  }

  .app-footer__definition-value {
    padding-left: var(--spacing-tiny);
  }

  .app-footer__list {
    display: flex;
    flex-direction: column;
    border-bottom: 0;
    padding-bottom: 0;
  }

  .app-footer__list--icon {
    margin-bottom: 0;
    width: 50%;
    justify-content: flex-start;
  }

  .app-footer__list-item {
    margin: 0;
    line-height: 2;
  }
}

@media (min-width: 1100px) {
  .app-footer__bottom-text {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% / 3);
  }

  .app-footer__list--icon {
    width: calc(100% / 3);
    justify-content: center;
  }

  .app-footer__legal {
    width: calc(100% / 3);
  }
}

@media (min-width: 1200px) {
  .app-footer__bottom-text {
    flex-wrap: nowrap;
  }
}

@supports (display: grid) {
  .app-footer__column {
    text-align: center;
    grid-row: 2;
    margin-bottom: var(--spacing-large);
  }

  .app-footer__column--right {
    grid-row: 3;
    text-align: center;
  }

  .app-footer__header {
    grid-row: 1;
    width: 100%;
  }

  @media (min-width: 720px) {
    .app-footer__column {
      grid-column: content-left;
      text-align: left;
      grid-row: 1;
    }

    .app-footer__column--right {
      grid-column: content-right;
      text-align: right;
      grid-row: 1;
    }
  }

  @media (min-width: 1100px) {
    .app-footer__column {
      grid-column-start: 4;
    }

    .app-footer__bottom {
      grid-column-start: 4;
      grid-column-end: -4;
    }

    .app-footer__column--right {
      grid-column-end: -4;
    }
  }
}
</style>
