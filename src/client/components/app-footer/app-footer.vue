<template>
  <footer class="app-footer grid">
    <div class="app-footer__column">
      <h5 class="body app-footer__list-title font-bold">Explore</h5>
      <ul class="app-footer__list">
        <li
          v-for="({ href, title }, index) in footerExploreLinks"
          :key="index"
          class="app-footer__list-item body-detail"
        >
          <nuxt-link :to="href" class="app-footer__link">{{ title }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="app-footer__header">
      <h2 class="h4 app-footer__header-title">{{ headerTitle }}</h2>
      <img class="app-footer__header-logo" src="/images/logo--blue.svg">
      <p class="body font-bold app-footer__header-subtitle">{{ headerSubtitle }}</p>
    </div>
    <div class="app-footer__column app-footer__column--right">
      <h5 class="body app-footer__list-title font-bold">Contact</h5>
      <ul class="body-detail app-footer__list app-footer__list--border-none app-footer__list--no-padding">
        <li class="app-footer__list-item">
          <nuxt-link class="app-footer__link" target="_blank" :to="`tel:${ tel }`">{{ tel }}</nuxt-link>
        </li>
        <li class="app-footer__list-item">
          <nuxt-link class="app-footer__link" target="_blank" :to="`mailto:${ email }`">{{ email }}</nuxt-link>
        </li>
        <li class="app-footer__list-item">
          <nuxt-link
            target="_blank"
            :to="`${ googleMapsLink }`"
            class="app-footer__link app-footer__link--right"
          >
            <span>{{ address }}</span>
            <span>{{ postalCode }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="app-footer__bottom">
      <div class="body-detail app-footer__bottom-text">
        <dl class="app-footer__definition-list" v-for="({ key, value }, index) in legal" :key="index">
          <dt>{{ key }}</dt>: <dd class="app-footer__definition-value">{{ value }}</dd>
        </dl>
      </div>
      <ul class="app-footer__list--icon">
        <li class="app-footer__list-item--icon"
            v-for="({ icon, slug }, index ) in social" :key="index">
          <nuxt-link :to="`${ slug }`" target="_blank">
            <app-icon :name="`${ icon }`" :large="true" />
          </nuxt-link>
        </li>
      </ul>
      <div class="body-detail app-footer__copyright">
        {{ copyright }}
        <nuxt-link :to="privacyLink" class="app-footer__privacy" target="_blank">
          {{ privacyLinkLabel }}
        </nuxt-link>
      </div>
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
        return (
          links.every(link => {
            return link instanceof Object &&
              typeof link.title === 'string' &&
              typeof link.href === 'string'
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
    copyright: {
      type: String,
      default: '',
    },
    privacyLinkLabel: {
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
              typeof item.slug === 'string'
          })
        )
      },
    },
  },
}
</script>

<style>
.app-footer {
  padding: var(--spacing-larger) 0 0 0;
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

.app-footer__copyright {
  font-size: 12px;
}

.app-footer__privacy {
  text-decoration: none;
}

.app-footer__list--icon {
  display: flex;
  text-align: center;
  margin-bottom: var(--spacing-small);
}

.app-footer__list-item--icon {
  margin: 0 var(--spacing-smaller);
}

.app-footer__list {
  display: flex;
  flex-flow: wrap;
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

.app-footer__list-item {
  text-decoration: none;
  margin: 0 var(--spacing-smaller);
}

.app-footer__list-title {
  color: var(--html-blue);
  margin-bottom: var(--spacing-tiny);
}

.app-footer__link {
  text-decoration: none;
}

.app-footer__header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--spacing-large);
}

.app-footer__header-title {
  margin-bottom: var(--spacing-small);
}

.app-footer__header-subtitle {
  color: var(--html-blue);
  text-align: center;
}

.app-footer__header-logo {
  width: 3.25rem;
  height: 3.25rem;
  margin-bottom: var(--spacing-small);
  filter: drop-shadow(1px 2px 4px var(--dim));
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
  }

  @media (min-width: 720px) {
    .app-footer__column {
      grid-column: content-left;
      text-align: left;
      grid-row: 1;
      grid-column-start: 2;
    }

    .app-footer__column--right {
      grid-column: content-right;
      text-align: right;
      grid-row: 1;
      grid-column-end: -2;
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


@supports not (display: grid) {
  .app-footer {
    width: 100%;
    padding: var(--spacing-larger) var(--spacing-medium) 0 var(--spacing-medium);
    flex-flow: column wrap;
    display: flex;
  }

  .app-footer__column {
    order: 2;
    float: left;
    width: 100%;
    text-align: center;
  }

  .app-footer__column--right {
    padding-top: var(--spacing-medium);
    margin-bottom: var(--spacing-medium);
    order: 3;
  }

  .app-footer__header {
    width: 100%;
    order: 1;
  }
  .app-footer__bottom {
    order: 4;
  }

  @media (min-width: 720px) {
    .app-footer {
      flex-flow: row wrap;
      padding: var(--spacing-larger) var(--spacing-medium) 0 var(--spacing-medium);
    }

    .app-footer__column {
      text-align: left;
      width: calc( 100% / 3 );
      order: 1;
    }

    .app-footer__column--right {
      text-align: right;
      order: 3;
    }

    .app-footer__header {
      order: 2;
      float: left;
      width: calc(100% / 3);
    }

    .app-footer__bottom {
      width: 100%;
    }
  }
}

@media (min-width: 720px) {
  .app-footer__list--icon {
    width: calc(100% / 3);
    justify-content: flex-start;
  }

  .app-footer__header.body {
    margin-bottom: 0;
    width: auto;
  }

  .app-footer__copyright {
    text-align: right;
    width: calc(100% / 3);
  }

  .app-footer__bottom {
    border-top: 1px solid var(--html-blue);
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0;
  }

  .app-footer__bottom-text {
    display: none;
    flex-flow: row wrap;
    width: calc(100% / 3);
  }

   .app-footer__definition-list {
    display: flex;
    margin-right: var(--spacing-smaller);
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

  .app-footer__list-item {
    margin: 0;
    line-height: 2;
  }

  .app-footer__list-title {
    margin-bottom: var(--spacing-tiny);
  }

  .app-footer__link--right {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-end;
  }
}

@media (min-width: 1100px) {
  .app-footer__bottom-text {
    display: flex;
  }

  .app-footer__list--icon {
    justify-content: center;
  }
}
</style>
