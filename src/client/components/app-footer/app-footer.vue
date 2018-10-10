<template>
  <footer class="app-footer grid">
    <div class="app-footer__header">
      <img class="app-footer__header-logo" src="/images/logo--blue.svg">
    </div>
    <div class="app-footer__column">
      <ul class="app-footer__list">
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref('services')">Services</nuxt-link>
        </li>
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref('cases')">Cases</nuxt-link>
        </li>
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref('blog')">Blog</nuxt-link>
        </li>
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref('about-us')">About Us</nuxt-link>
        </li>
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref('contact')">Contact</nuxt-link>
        </li>
        <li class="app-footer__list-item body-detail">
          <nuxt-link class="app-footer__link" :to="createHref('faq')">FAQ</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="app-footer__column app-footer__column--right">
      <ul class="body-detail app-footer__list app-footer__list--border-none app-footer__list--no-padding">
        <li class="app-footer__list-item">
          <a
            href="tel:310202610954"
            class="app-footer__link"
            target="_blank">+31 (0)20 2610 954</a>
        </li>
        <li class="app-footer__list-item">
          <a
            href="mailto:post@voorhoede.nl"
            class="app-footer__link"
            target="_blank">post@voorhoede.nl</a>
        </li>
        <li class="app-footer__list-item">
          <a
            href="https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648"
            class="app-footer__link app-footer__link--right"
            target="_blank">
            <span>Rijnsburgstraat 9 - 11</span>
            <span>1059 AT Amsterdam</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <dl class="app-footer__definition-list">
          <dt>KvK</dt>: <dd class="app-footer__definition-value">56017235</dd>
        </dl>
        <dl class="app-footer__definition-list">
          <dt>VAT</dt>: <dd class="app-footer__definition-value">NL851944620B01</dd>
        </dl>
        <dl class="app-footer__definition-list">
          <dt>IBAN</dt>: <dd class="app-footer__definition-value">NL20ABNA0442829159</dd>
        </dl>
      </div>
      <ul class="app-footer__list--icon">
        <li class="app-footer__list-item--icon">
          <a href="https://www.instagram.com/devoorhoede/?hl=nl" target="_blank">
            <app-icon name="instagram--blue" :is-large="true" />
          </a>
        </li>
        <li class="app-footer__list-item--icon">
          <a href="https://twitter.com/devoorhoede" target="_blank">
            <app-icon name="twitter--blue" :is-large="true" />
          </a>
        </li>
        <li class="app-footer__list-item--icon">
          <a href="https://www.facebook.com/DeVoorhoede/" target="_blank">
            <app-icon name="facebook--blue" :is-large="true" />
          </a>
        </li>
        <li class="app-footer__list-item--icon">
          <a href="https://github.com/voorhoede/" target="_blank">
            <app-icon name="git-hub--blue" :is-large="true" />
          </a>
        </li>
      </ul>
      <div class="body-detail app-footer__legal">
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          class="app-footer__copyright"
          target="_blank"
          title="Creative Commons licence & disclaimer">CC BY 4.0</a>
        <span> - </span>
        <a
          href="https://www.datocms-assets.com/2850/1527667147-de-voorhoede-privacy-statement-en.pdf"
          class="app-footer__privacy"
          target="_blank"
          title="De Voorhoede privacy statement">Privacy statement</a>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import AppIcon from '../../components/app-icon'

export default {
  components: { AppIcon },
  computed: {
    ...mapState([
      'currentLocale',
    ]),
  },
  methods: {
    createHref(slug) {
      return `/${this.currentLocale}/${slug}/`
    },
  },
}
</script>

<style>
  :root {
    --app-footer-spacing: var(--spacing-small);
  }

  .app-footer {
    width: 100%;
    padding: var(--spacing-larger) 0 var(--app-footer-spacing) 0;
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
    border-bottom: 1px solid var(--black);
    justify-content: center;
    padding-bottom: var(--spacing-medium);
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
    margin: 0 var(--spacing-smaller);
  }

  .app-footer__list-item--icon {
    margin: 0 var(--spacing-tiny);
  }

  .app-footer__link {
    position: relative;
    z-index: 1;
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
    width: 3.25rem;
    height: 3.25rem;
    margin-bottom: var(--spacing-small);
    filter: drop-shadow(1px 2px 4px var(--dim));
  }

  .app-footer__column {
    text-align: center;
  }

  .app-footer__column--right {
    margin-bottom: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    :root {
      --app-footer-spacing: var(--spacing-medium);
    }

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
      width: calc(100% - var(--app-footer-spacing) * 2);
    }

    .app-footer__legal {
      text-align: right;
      width: 50%;
    }

    .app-footer__bottom {
      border-top: 1px solid var(--html-blue);
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0;
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
