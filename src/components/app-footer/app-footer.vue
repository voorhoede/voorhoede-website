<template>
  <footer class="app-footer grid">
    <div class="app-footer__layout">
      <div class="app-footer__header">
        <app-link
          :to="$localeUrl()"
          :aria-label="$t('home')"
          :title="$t('home')"
        >
          <img
            class="app-footer__header-logo"
            src="/images/logo-with-text.svg"
            alt=""
            width="190"
            height="32"
          >
        </app-link>
      </div>
      <nav
        class="app-footer__column"
        aria-label="Explore"
      >
        <ul class="app-footer__list">
          <li
            v-for="link in links"
            :key="link.id"
            class="app-footer__list-item body-small"
          >
            <app-link
              class="app-footer__link"
              :to="getDatoNuxtRoute(link.link)"
            >
              {{ link.title }}
            </app-link>
          </li>
          <li class="app-footer__list-item body-small">
            <app-link
              class="app-footer__link"
              :to="$localeUrl({ name: 'faq' })"
            >
              FAQ
            </app-link>
          </li>
        </ul>
      </nav>


      <nav>
        <h2 class="h4 app-footer__title">
          {{ $t('say_hello') }}
        </h2>
        <ul class="body-small app-footer__list app-footer__list--contact">
          <li class="app-footer__list-item">
            <a
              :href="`tel:${ cleanedPhoneNumber }`"
              class="app-footer__link"
              @click="trackLink('phone')"
            >{{ app.phoneNumber }}</a>
          </li>
          <li class="app-footer__list-item">
            <a
              :href="`mailto:${ app.emailAddress }`"
              class="app-footer__link"
              @click="trackLink('email')"
            >{{ app.emailAddress }}</a>
          </li>
        </ul>
      </nav>

      <nav
        class="app-footer__list-address"
        ref="contact"
      >
        <h2 class="h4 app-footer__title">
          {{ $t('visit_us') }}
        </h2>
        <ul class="body-small app-footer__list">
          <li
            v-for="address in app.addresses"
            :key="address.address"
            class="app-footer__list-item"
          >
            <a
              :href="address.googleMapsLink"
              class="app-footer__link app-footer__link--right"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>{{ address.address }}</span>
              <span>{{ address.postalCode }} {{ address.city }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="app-footer__list">
        <ul class="app-footer__list--icon">
          <li
            v-for="socialLink in socialLinks"
            :key="socialLink.url"
            class="app-footer__list-item--icon"
          >
            <a
              :href="socialLink.url"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span class="sr-only">
                {{ socialLink.platform }}
              </span>
              <app-icon
                :name="socialLink.icon"
                :is-large="true"
              />
            </a>
          </li>
        </ul>

        <ul class="app-footer__certificate-list">
          <template
            v-for="certificate in certificateLinks"
            :key="certificate.url"
          >
            <li v-if="certificate.url !== ''">
              <a
                :href="certificate.url"
                target="_blank"
                rel="noreferrer noopener"
                :aria-label="certificate.platform"
              >
                <span class="sr-only">
                  {{ certificate.platform }}
                </span>

                <dato-image
                  class="app-footer__certificate-logo"
                  :src="certificate.logo.url"
                  :width="80"
                  :height="60"
                  :alt="certificate.platform"
                  loading="lazy"
                />
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <dl class="app-footer__definition-list">
          <template
            v-for="{ title, value } in app.legal"
            :key="title"
          >
            <dt
              class="app-footer__definition-list-title"
            >
              {{ title }}
            </dt>
            <dd
              class="app-footer__definition-list-value"
            >
              {{ value }}
            </dd>
          </template>
        </dl>
      </div>
      <div class="body-detail">
        <a
          :href="footer.copyrightLink"
          class="app-footer__copyright"
          :aria-label="footer.copyrightTitle"
          target="_blank"
          rel="noreferrer noopener"
        >{{ footer.copyrightLabel }}</a>
        <span> - </span>
        <a
          :href="footer.privacyLink"
          class="app-footer__privacy"
          :aria-label="footer.privacyTitle"
          target="_blank"
          rel="noreferrer noopener"
        >{{ footer.privacyLabel }}</a>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  setup() {
    const { getDatoNuxtRoute } = useDatoNuxtRoute()

    return { getDatoNuxtRoute }
  },
  props: {
    links: { type: Object, required: true },
    app: { type: Object, required: true },
    footer: { type: Object, required: true },
  },
  data () {
    return {
      observer: null
    }
  },
  computed: {
    certificateLinks() {
      return [
        { url: this.footer.bCorpLink, platform: 'B Corp', logo: this.footer.bcorpLogo },
        { url: this.footer.dutchDigitalAgenciesLink, platform: 'Dutch digital agencies', logo: this.footer.dutchDigitalAgenciesLogo }
      ]
    },
    socialLinks() {
      return [
        { url: this.app.twitterUrl,  platform: 'Twitter',  icon: 'twitter' },
        { url: this.app.githubUrl,   platform: 'GitHub',   icon: 'git-hub' },
        { url: this.app.youtubeUrl,  platform: 'YouTube',  icon: 'youtube' },
        { url: this.app.linkedinUrl, platform: 'LinkedIn', icon: 'linkedin' },
      ]
    },
    cleanedPhoneNumber() {
      return this.app.phoneNumber.replace(/[^0-9]/g, '')
    }
  },
  mounted () {
    if ('IntersectionObserver' in window) {
      this.observeContact()
    }
  },
  beforeUnmount() {
    if (this.observer !== null) {
      this.unobserveContact()
    }
  },
  methods: {
    observeContact () {
      const contactElement = this.$refs.contact
      this.observer = new IntersectionObserver(function(entries) {
        if (entries.some(entry => entry.isIntersecting)) {
          this.unobserve(contactElement)
        }
      })
      this.observer.observe(contactElement)
    },
    trackLink (linkType) {
      useTrackEvent(`Click on ${linkType}`);
    },
    unobserveContact () {
      this.observer.unobserve(this.$refs.contact)
    }
  },
}
</script>

<style>
  :root {
    --footer-list-height: 140px;
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
    border-bottom: 1px solid var(--black);
    padding-bottom: var(--spacing-small);
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 768px) {
    .app-footer__layout {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-larger);
      flex-wrap: wrap;
    }
  }

  @media (min-width: 1400px) {
    .app-footer__layout {
      flex-wrap: nowrap;
    }
  }

  .app-footer__header {
    flex-basis: 100%;
  }

  @media (min-width: 1400px) {
    .app-footer__header {
      flex-basis: auto;
    }
  }

  .app-footer__bottom {
    margin-bottom: var(--spacing-medium);
  }

  @media (min-width: 520px) {
    .app-footer__bottom  {
      text-align: center;
    }
  }

  .app-footer__definition-list {
    display: grid;
    grid-template-columns: 30px 1fr;
    margin-bottom: var(--spacing-small);
  }

  @media (min-width: 520px) {
    .app-footer__definition-list {
      display: flex;
      justify-content: center;
    }
  }

  @media (min-width: 520px) {
    .app-footer__definition-list-value {
      padding-left: var(--spacing-tiny);
    }

   .app-footer__definition-list-value::after{
      content: '|';
      padding: 0 var(--spacing-small);
    }

    .app-footer__definition-list-value:last-child::after {
      display: none;
    }
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
    color: var(--html-blue);
    border-bottom: none;
  }

  .app-footer__title {
    color: var(--black);
    margin-bottom: var(--spacing-smaller);
  }

  .app-footer__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--spacing-small);
  }


  @media (min-width: 768px) {
    .app-footer__column {
      flex-basis: 20%;
    }

    .app-footer__list {
      display: block;
    }
  }

  @media (min-width: 768px) {
    .app-footer__list {
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-start;
      max-height: var(--footer-list-height);
      gap: var(--spacing-small);
      padding-bottom: 0;
    }
  }

  .app-footer__list--contact {
   grid-template-columns: auto;
  }

  .app-footer__certificate-list {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
  }

  @media (min-width: 768px) {
    .app-footer__certificate-list {
      justify-content: space-between;
    }
  }

  .app-footer__certificate-logo {
    width: 100%;
    object-fit: contain;
  }

  .app-footer__list-address {
    margin-bottom: var(--spacing-small);
  }

  .app-footer__list--icon {
    display: flex;
    margin-bottom: var(--spacing-small);
  }

  @media (min-width: 768px) {
    .app-footer__list--icon {
      margin-bottom: 0;
    }
  }

  .app-footer__list-item {
    text-decoration: none;
  }

  .app-footer__list-item--icon {
    font-size: 1.2rem;
    margin: 0 var(--spacing-tiny);
  }

  .app-footer__list-item--icon a {
    position: relative;
    display: block;
    color: var(--html-blue);
  }

  .app-footer__list-item--icon a:hover::before,
  .app-footer__list-item--icon a:focus::before {
    transform: scale(1.5);
    opacity: 1;
  }

  .app-footer__list-item--icon a::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--white);
    transform: scale(0);
    opacity: 0;
    transition: transform .1s, opacity .1s linear;
  }

  .app-footer__list-item--icon .app-icon {
    position: relative;
    z-index: 2;
  }

  .app-footer__link {
    position: relative;
    z-index: var(--z-index-low);
    text-decoration: none;
  }

  .app-footer__link:hover,
  .app-footer__link:focus {
    color: var(--html-blue);
    background: transparent linear-gradient(to top, var(--html-blue) 1px, transparent 1px);
  }

  .app-footer__link--right {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .app-footer__link--right:hover,
  .app-footer__link--right:focus {
    background: none;
  }

  .app-footer__link--right:hover > span,
  .app-footer__link--right:focus > span {
    background-image: linear-gradient(to right, var(--html-blue), var(--html-blue));
    background-repeat: no-repeat;
    background-position: 0 80%;
    background-size: 100% 1px;
  }

  .app-footer__header-logo {
    width: var(--logo-width);
    margin-bottom: var(--spacing-small);
  }
</style>
