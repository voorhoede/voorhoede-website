<template>
  <footer class="app-footer grid" role="contentinfo">
    <div class="app-footer__layout">
      <div class="app-footer__header">
        <nuxt-link :to="localeUrl('index')" :aria-label="$t('home')" :title="$t('home')">
          <img class="app-footer__header-logo" src="/images/logo-with-text.svg" alt="">
        </nuxt-link>
      </div>
      <div class="app-footer__column">
        <h2 class="app-footer__title body-petite font-bold font-html-blue">
          Explore
        </h2>
        <ul class="app-footer__list">
          <li
            v-for="link in links"
            :key="link.slug"
            class="app-footer__list-item body-detail"
          >
            <nuxt-link class="app-footer__link" :to="createHref(link)">{{ link.title }}</nuxt-link>
          </li>
          <li class="app-footer__list-item body-detail">
            <nuxt-link class="app-footer__link" :to="createHref({ page: { slug: 'faq' } })">FAQ</nuxt-link>
          </li>
        </ul>
      </div>
      <div
        class="app-footer__column app-footer__column--right"
        ref="contact"
      >
        <h2 class="app-footer__title body-petite font-bold font-html-blue">
          Contact
        </h2>
        <ul class="body-detail app-footer__list app-footer__list--contact">
          <li
            v-for="address in content.addresses"
            :key="address.address"
            class="app-footer__list-item app-footer__list-item--address"
          >
            <a
              :href="address.googleMapsLink"
              class="app-footer__link app-footer__link--right"
              target="_blank"
              rel="noreferrer noopener">
              <span>{{ address.address }}</span>
              <span>{{ address.postalCode }} {{ address.city }}</span>
            </a>
          </li>
          <li class="app-footer__list-item">
            <a
              @click="trackLink('phone')"
              :href="`tel:${ cleanedPhoneNumber }`"
              class="app-footer__link">{{ content.phoneNumber }}</a>
          </li>
          <li class="app-footer__list-item">
            <a
              @click="trackLink('email')"
              :href="`mailto:${ content.emailAddress }`"
              class="app-footer__link">{{ content.emailAddress }}</a>
          </li>
        </ul>
      </div>
      <div class="app-footer__column app-footer__column--bottom">
        <ul class="app-footer__list--icon">
          <li
            v-for="socialLink in socialLinks"
            :key="socialLink.url"
            class="app-footer__list-item--icon"
          >
            <a :href="socialLink.url" target="_blank" rel="noreferrer noopener">
              <app-icon :alt="socialLink.platform" :name="socialLink.icon" :is-large="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <div class="app-footer__definition-list">
          <dl v-for="{ title, value } in content.legal" :key="title" class="app-footer__definition-item">
            <dt>{{ title }}:</dt> <dd class="app-footer__definition-value">{{ value }}</dd>
          </dl>
        </div>
      </div>
      <div class="body-detail app-footer__legal">
        <a
          :href="content.copyrightLink"
          class="app-footer__copyright"
          :aria-label="content.copyrightTitle"
          target="_blank"
          rel="noreferrer noopener">{{ content.copyrightLabel }}</a>
        <span> - </span>
        <a
          :href="content.privacyLink"
          class="app-footer__privacy"
          :aria-label="content.privacyTitle"
          target="_blank"
          rel="noreferrer noopener">{{ content.privacyLabel }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
import { createHref } from '../../lib/links'
import AppIcon from '../../components/app-icon'

export default {
  components: {
    AppIcon
  },
  data () {
    const { menu, footer } = require(`../../static/data/${this.$i18n.locale}/layouts/default`)
    return {
      links: [].concat(menu.links, menu.callToAction),
      content: footer,
      observer: null
    }
  },
  computed: {
    socialLinks() {
      return [
        { url: this.content.twitterUrl,  platform: 'twitter',  icon: 'twitter--blue' },
        { url: this.content.githubUrl,   platform: 'github',   icon: 'git-hub--blue' },
        { url: this.content.youtubeUrl,  platform: 'youtube',  icon: 'youtube--blue' },
        { url: this.content.linkedinUrl, platform: 'linked',   icon: 'linkedin--blue' },
      ]
    },
    cleanedPhoneNumber() {
      return this.content.phoneNumber.replace(/[^0-9]/g, '')
    }
  },
  mounted () {
    if ('IntersectionObserver' in window) {
      this.observeContact()
    }
  },
  beforeDestroy() {
    if (this.observer !== null) {
      this.unobserveContact()
    }
  },
  methods: {
    createHref,
    observeContact () {
      const contactElement = this.$refs.contact
      const ga = this.$ga
      const event = {
        eventCategory: 'Contact',
        eventAction: 'footer view',
        eventLabel: this.$route.fullPath,
        eventValue: 0
      }
      this.observer = new IntersectionObserver(function(entries) {
        if (entries.some(entry => entry.isIntersecting)) {
          ga.event(event)
          this.unobserve(contactElement)
        }
      })
      this.observer.observe(contactElement)
    },
    trackLink (linkType) {
      this.$ga.event('Contact', `click ${linkType}`, this.$route.fullpath, 0)
    },
    unobserveContact () {
      this.observer.unobserve(this.$refs.contact)
    }
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
    grid-row: 1;
    display: flex;
    flex-direction: column;
  }

  .app-footer__bottom {
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-row: 2;
    margin-bottom: var(--spacing-medium);
  }

  .app-footer__bottom-text {
    margin-bottom: var(--spacing-medium);
    max-width: var(--footer-list-max-width);
    font-size: 12px;
  }

  .app-footer__definition-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .app-footer__definition-item {
    display: flex;
    margin: var(--spacing-smaller);
  }

  .app-footer__definition-value {
    padding-left: var(--spacing-tiny);
  }

  .app-footer__legal {
    text-align: center;
    font-size: 12px;
  }

  .app-footer__copyright,
  .app-footer__privacy {
    text-decoration: none;
    border-bottom: 1px solid var(--black);
  }

  .app-footer__copyright:hover,
  .app-footer__copyright:focus,
  .app-footer__privacy:hover,
  .app-footer__privacy:focus {
    color: var(--active-blue);
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
    margin-bottom: var(--spacing-small);
  }

  .app-footer__list-item {
    text-decoration: none;
    margin: var(--spacing-smaller);
  }

  .app-footer__list--contact {
    text-align: left;
  }

  .app-footer__list--contact .app-footer__list-item {
    width: calc(50% - 2 * var(--spacing-smaller));
  }

  .app-footer__list--contact .app-footer__list-item:nth-child(2n - 1) {
    text-align: right;
  }

  .app-footer__list-item--icon {
    margin: 0 var(--spacing-tiny);
  }

  .app-footer__link {
    position: relative;
    z-index: var(--z-index-low);
    text-decoration: none;
  }

  .app-footer__link:hover {
    color: var(--active-blue);
  }

  .app-footer__link:focus {
    border-bottom: 1px solid var(--html-blue);
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

  .app-footer__newsletter-title {
    width: 100%;
  }

  .app-footer__newsletter-form {
    width: 80%;
    text-align: left;
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

  @media (min-width: 800px) {
    .app-footer {
      position: relative;
      flex-direction: row;
    }

    .app-footer__layout {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .app-footer__title {
      width: 100%;
      border-bottom: 1px solid;
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
      width: calc(50% - var(--spacing-big) / 2);
    }

    .app-footer__column--right {
      margin-left: var(--spacing-big);
      text-align: left;
      border-bottom: 0;
    }

    .app-footer__column--bottom {
      flex: 1 0 100%;
    }

    .app-footer__legal {
      margin-left: var(--spacing-medium);
      text-align: left;
    }

    .app-footer__bottom {
      display: flex;
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
      margin-bottom: 0;
      justify-content: flex-end;
    }

    .app-footer__definition-list {
      flex-wrap: nowrap;
    }

    .app-footer__definition-item {
      margin-left: var(--spacing-smaller);
    }

    .app-footer__list {
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-start;
      max-height: var(--footer-list-height);
      border-bottom: 0;
      padding-bottom: 0;
    }

    .app-footer__list--icon {
      margin-bottom: 0;
      justify-content: center;
    }

    .app-footer__list--contact {
      flex-direction: row;
      text-align: inherit;
    }

    .app-footer__list-item {
      margin: 0;
      line-height: 2;
    }

    .app-footer__list--contact .app-footer__list-item:nth-child(2n - 1) {
      text-align: inherit;
    }

    .app-footer__list--contact .app-footer__list-item {
      width: 50%;
    }

    .app-footer__list-item--address {
      margin-bottom: 2em; /* one line, font-size * line-height */
    }
  }

  @media (min-width: 1400px) {
    .app-footer__layout {
      flex-wrap: nowrap;
    }

    .app-footer__header {
      display: flex;
      width: 22%;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .app-footer__bottom {
      display: flex;
      grid-column: 4 / 48;
    }

    .app-footer__column {
      width: 28%;
    }

    .app-footer__column--bottom {
      display: flex;
      align-items: flex-end;
      flex: 1 1 22%;
    }
  }
</style>
