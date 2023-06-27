<template>
  <div class="app-header grid">
    <div class="app-header__content">
      <app-link
        class="app-header__home-link"
        :to="$localeUrl()"
      >
        <img
          class="app-header__logo"
          src="/images/logo-with-text.svg"
          alt="Home"
          width="190"
          height="32"
        >
      </app-link>
      <div class="app-header__link-lists body-small">
        <ul class="app-header__link-list">
          <li
            v-for="link in links"
            :key="link.title"
            class="app-header__link-list-item"
          >
            <app-link
              class="app-header__link"
              :to="useDatoNuxtRoute(link.link)"
            >
              {{ link.title }}
            </app-link>
          </li>
          <li
            v-if="callToAction"
            class="app-header__link-list-item"
          >
            <app-button
              small
              :label="callToAction.title"
              :to="useDatoNuxtRoute(callToAction.link)"
            />
          </li>
        </ul>
        <language-switcher />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      links: {
        type: Array,
        default: () => [],
      },
      callToAction: {
        type: Object,
        default: () => {},
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
  }

</style>
