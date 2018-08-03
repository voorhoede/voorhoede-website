<template>
  <footer class="footer grid">
    <div class="footer__column">
      <h5 class="body footer-list__title font-bold">Explore</h5>
      <ul class="footer-list">
        <li
          v-for="({ href, title }, index) in footerExploreLinks"
          :key="index"
          class="footer-list__item body-detail"
        >
          <nuxt-link :to="href" class="footer-list__link">{{ title }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="footer__header">
      <h2 class="h3 footer__header-title">{{ headerTitle }}</h2>
      <img class="footer__header-logo" src="/images/logo--blue.svg">
      <p class="body font-bold">{{ headerSubtitle }}</p>
    </div>
    <div class="footer__column footer__column--right">
      <h5 class="body footer-list__title font-bold">Contact</h5>
      <div class="body-detail footer-list footer-list--border-none footer-list--no-padding">
        <nuxt-link class="footer-list__item" target="_blank" :to="`tel:${ tel }`">{{ tel }}</nuxt-link>
        <nuxt-link class="footer-list__item" target="_blank" :to="`mailto:${ email }`">{{ email }}</nuxt-link>
        <nuxt-link
          target="_blank"
          :to="`${ googleMapsLink }`"
          class="footer-list__item footer-list__item-spaced"
        >
          <span>{{ address }}</span>
          <span>{{ postalCode }}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="body-detail footer__bottom-text">
        <dl v-for="({ key, value }, index) in legal" :key="index">
          <dt>{{ key }}</dt>: <dd>{{ value }}</dd>
        </dl>
      </div>
      <ul class="footer-icon__list">
        <li class="footer-icon__list-item"
            v-for="({ icon, slug }, index ) in social" :key="index">
          <nuxt-link :to="`${ slug }`" target="_blank">
            <app-icon :name="`${ icon }`" />
          </nuxt-link>
        </li>
      </ul>
      <nuxt-link class="body-detail footer__privacy" :to="privacyLink" target="_blank">
        {{ privacyStatement }}
      </nuxt-link>
    </div>
  </footer>
</template>

<script>
import AppIcon from '../../components/app-icon'

export default {
  components: {
    AppIcon,
  },
  props: {
    footerExploreLinks: {
      type: Array,
      default: () => [],
      validator: (links) => {
        return links.every(link => {
          return link instanceof Object &&
            typeof link.title === 'string' &&
            typeof link.href === 'string'
        })
      },
    },
    headerTitle: {
      type: String,
      default: 'Make it real',
    },
    headerSubtitle: {
      type: String,
      default: 'Discuss your next project with us',
    },
    tel:{
      type: String,
      default: '+31 (0)20 2610 954',
    },
    email: {
      type: String,
      default: 'post@voorhoede.nl',
    },
    googleMapsLink: {
      type: String,
      default: 'https://www.google.nl/maps/place/De+Voorhoede+%7C+Front-end+Development/@52.3477995,4.8485761,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5e21d502d2d59:0xbf570944a96ebf45!8m2!3d52.3477962!4d4.8507648',
    },
    address: {
      type: String,
      default: 'Rijnsburgstraat 9 - 11',
    },
    postalCode: {
      type: String,
      default: '1059 AT Amsterdam',
    },
    privacyStatement: {
      type: String,
      default: '@ De Voorhoede 2018  Privacy statement',
    },
    privacyLink: {
      type: String,
      default: 'https://www.datocms-assets.com/2850/1527667154-de-voorhoede-privacy-statement-nl.pdf',
    },
    legal: {
      type: Array,
      default: () => [],
      validator: (legal) => {
        return legal.every(item => {
          return item instanceof Object &&
            typeof item.key === 'string' &&
            typeof item.value === 'string'
        })
      },
    },
    social: {
      type: Array,
      default: () => [],
      validator: (social) => {
        return social.every(item => {
          return item instanceof Object &&
            typeof item.icon === 'string' &&
            typeof item.slug === 'string'
        })
      },
    },
  },
}
</script>

<style>
.footer {
  padding: var(--spacing-large) 0 0 0;
  background: var(--brand-yellow);
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: calc(var(--spacing-smaller) * 2);
  padding-top: calc(var(--spacing-smaller) * 2);
  border-top: 1px solid var(--black);
}

.footer__bottom-text {
  display: none;
}

.footer__privacy {
  text-align: center;
  text-decoration: none;
}

.footer-icon__list {
  display: flex;
  text-align: center;
  margin-bottom: var(--spacing-small);
}

.footer-icon__list-item {
  margin: 0 calc(var(--spacing-small) / 2);
}

.footer-list {
  display: flex;
  flex-flow: wrap;
  border-bottom: 1px solid var(--black);
  justify-content: center;
  padding-bottom: calc(var(--spacing-smaller) * 2);
}

.footer-list--border-none {
  border-bottom: 0;
}

.footer-list--no-padding {
  padding-bottom: 0;
}

.footer-list__item {
  text-decoration: none;
  margin: 0 var(--spacing-smaller);
}

.footer-list__title {
  color: var(--html-blue);
  margin-bottom: calc(var(--spacing-small) / 2);
}

.footer-list__link {
  font-family: var(--font-sans);
  text-decoration: none;
}

.footer__header {
  grid-row: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--spacing-large);
}

.footer__header .footer__header-title {
  margin-bottom: calc(var(--spacing-smaller) * 2);
}

.footer__header .body {
  color: var(--html-blue);
  width: 180px;
  text-align: center;
}

.footer__header .footer__header-logo {
  width: 3.25rem;
  height: 3.25rem;
  margin-bottom: var(--spacing-small);
}

@supports (display: grid) {
  .footer__column {
    text-align: center;
    grid-row: 2;
    margin-bottom: var(--spacing-large);
  }

  .footer__column.footer__column--right {
    grid-row: 3;
    text-align: center;
  }

  @media (min-width: 720px) {
    .footer__column {
      grid-column: content-left;
      text-align: left;
      grid-row: 1;
    }

    .footer__column.footer__column--right {
      grid-column: content-right;
      text-align: right;
      grid-row: 1;
    }
  }
}

@media (min-width: 720px) {
  .footer-icon__list {
    width: 33%;
    justify-content: center;
  }
  .footer-icon__list-item img.app-icon {
    width: 1.4em;
    height: 1.4em;
  }

  .footer__header .body {
    margin-bottom: 0;
    width: auto;
  }

  .footer__privacy {
    text-align: right;
    width: calc(100% / 3);
  }

  .footer__bottom {
    border-top: 3px solid var(--html-blue);
    flex-direction: row;
    align-items: flex-start;
  }

  .footer__bottom .footer__bottom-text {
    display: flex;
    flex-flow: row wrap;
    width: calc(100% / 3);
  }

  .footer__bottom .footer__bottom-text dl {
    display: flex;
    margin-right: 10px;
  }

  .footer__bottom .footer__bottom-text dd {
    padding-left: 5px;
  }

  .footer-contact__header {
    text-align: right;
    margin-bottom: calc(var(--spacing-smaller) * 2);
  }

  .footer-list {
    display: flex;
    flex-direction: column;
    border-bottom: 0;
    padding-bottom: 0;
  }

  .footer-list__item {
    margin: 0 0 0 0;
    line-height: 2;
  }

  .footer-list__title {
    margin-bottom: calc(var(--spacing-smaller) * 2);
  }

  .footer-list__item-spaced span {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
