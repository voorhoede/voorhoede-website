<template>
  <footer class="app-footer grid">
    <div class="app-footer__layout">
      <div class="app-footer__header">
        <nuxt-link :to="{name: 'locale', params: {currentLocale } }">
          <img class="app-footer__header-logo" src="/images/logo-with-text.svg">
        </nuxt-link>
      </div>
      <div class="app-footer__column">
        <h3 class="app-footer__title body-petite font-bold font-html-blue">
          <a href="#">
            Explore
          </a>
        </h3>
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
        <h3 class="app-footer__title body-petite font-bold font-html-blue">
          <nuxt-link
            :to="{ name: 'locale-contact', params: { locale: currentLocale }}"
          >
            Contact
          </nuxt-link>
        </h3>
        <ul class="body-detail app-footer__list">
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
      <div class="app-footer__column app-footer__column--bottom">
        <ul class="app-footer__list--icon">
          <li class="app-footer__list-item--icon"
              v-for="socialItem in social" :key="socialItem.href">
            <a :href="socialItem.href" target="_blank">
              <app-icon :name="socialItem.icon" :is-large="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <dl class="app-footer__definition-list" v-for="legalItem in legal" :key="legalItem.key">
          <dt>{{ legalItem.key }}</dt>: <dd class="app-footer__definition-value">{{ legalItem.value }}</dd>
        </dl>
      </div>
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
              typeof item.label === 'string' &&
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
  --footer-list-max-width: 370px;
  --footer-list-height: 115px;
  --logo-drop-shadow: drop-shadow(1px 2px 4px var(--dim));
  --logo-width: 180px;
}

.app-footer {
  width: 100%;
  padding: var(--spacing-larger) 0 var(--spacing-small) 0;
  background-color: var(--brand-yellow);
}

.app-footer__layout {
  display: flex;
  flex-direction: column;
}

.app-footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-medium);
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
  width: 100%;
  max-width: var(--footer-list-max-width);
  padding-bottom: var(--spacing-medium);
  border-bottom: 1px solid var(--black);
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

.app-footer__header-logo {
  display: none;
  width: var(--logo-width);
  margin-bottom: var(--spacing-small);
}

.app-footer__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: var(--spacing-medium);
}

.app-footer__column--right {
  margin-bottom: var(--spacing-medium);
}

.app-footer__title {
  margin-bottom: var(--spacing-smaller);
}

@media (min-width: 720px) {
  .app-footer {
    position: relative;
    flex-direction: row;
  }

  .app-footer__layout {
    display: flex;
    flex-direction: row;
  }

  .app-footer__title {
    border-bottom: 2px solid;
  }

  .app-footer__header {
    display: none;
  }

  .app-footer__header-logo {
    display: block;
    width: var(--logo-width);
    margin-bottom: var(--spacing-small);
  }

  .app-footer__column {
    padding-top: 0;
    margin-bottom: var(--spacing-medium);
    text-align: left;
    align-items: unset;
    width: 50%;
  }

  .app-footer__column--right {
    margin-left: var(--spacing-huge);
    text-align: left;
    border-bottom: 0;
  }
  
  .app-footer__column--bottom {
    display: none;
  }
  
  .app-footer__legal {
    text-align: left;
    margin-left: var(--spacing-medium);
    width: 40%;
  }

  .app-footer__bottom {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: var(--spacing-small);
    margin-bottom: var(--spacing-small);
    border-top: 1px solid var(--dim);
  }

  .app-footer__bottom-text {
    display: flex;
    width: 60%;
    justify-content: flex-end;
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
    flex-flow: column wrap;
    max-height: var(--footer-list-height);
    border-bottom: 0;
    padding-bottom: 0;
  }

  .app-footer__list--icon {
    margin-bottom: 0;
    justify-content: flex-start;
  }

  .app-footer__list-item {
    margin: 0;
    line-height: 2;
  }
}

@media (min-width: 820px) {
  .app-footer__bottom-text {
    width: 50%;
  }

  .app-footer__legal {
    width: 50%;
  }
}

@media (min-width: 1100px) {
  .app-footer__header {
    display: flex;
    width: 25%;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .app-footer__bottom {
    display: flex;
    grid-column: 4 / -4;
  }

  .app-footer__bottom-text {
    display: flex;
    margin-left: auto;
  }

  .app-footer__column {
    width: 25%;
  }
  
  .app-footer__column--bottom {
    display: flex;
    align-items: flex-end;
  }
  
  .app-footer__list--icon {
    justify-content: center;
  }
}
</style>
