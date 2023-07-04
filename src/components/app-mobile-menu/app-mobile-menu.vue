<template>
  <div class="app-mobile-menu grid">
    <button
      v-if="!isOpen"
      ref="openButton"
      class="app-mobile-menu__button app-mobile-menu__button--open"
      @click="openMenu()"
      @touchmove="prevent"
    >
      <div
        class="app-mobile-menu__button-icon app-mobile-menu__button-icon--open"
      />

      <span class="sr-only">
        {{ $t('open_menu') }}
      </span>
    </button>
    <div
      v-if="isOpen"
      class="app-mobile-menu__content"
      @touchmove="prevent"
    >
      <img
        class="app-mobile-menu__logo"
        src="/images/voorhoede-logo.svg"
        alt="Voorhoede logo"
      >

      <ul class="app-mobile-menu__list body-small">
        <li
          class="app-mobile-menu__list-item"
        >
          <app-link
            class="h3"
            :to="$localeUrl()"
          >
            {{ $t('home') }}
          </app-link>
        </li>
        <li
          v-for="link in links"
          :key="link.href"
          class="app-mobile-menu__list-item"
        >
          <app-link
            class="h3"
            :to="useDatoNuxtRoute(link.link)"
          >
            {{ link.title }}
          </app-link>
        </li>
      </ul>

      <button
        v-if="isOpen"
        ref="closeButton"
        class="app-mobile-menu__button app-mobile-menu__button--close"
        @click="closeMenu()"
        @touchmove="prevent"
      >
        <div
          class="app-mobile-menu__button-icon app-mobile-menu__button-icon--close"
        />

        <span class="sr-only">
          {{ $t('close_menu') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      links: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['open-menu', 'close-menu'],
    methods: {
      closeMenu() {
        this.$emit('close-menu')
        console.log('close')
        this.$nextTick(() => {
          this.$refs.openButton.focus()
        })
      },
      openMenu() {
        this.$emit('open-menu')
        console.log('open')
        this.$nextTick(() => {
          this.$refs.closeButton.focus()
        })
      },
      prevent(event) {
        event.preventDefault()
      },
    },
  }
</script>

<style>
  :root {
    --mobile-icon-right: 20px;
    --mobile-icon-bottom: var(--mobile-icon-right);
    --mobile-icon-height: 52px;
    --mobile-icon-width: var(--mobile-icon-height);
    --mobile-icon-image: 25px;
    --mobile-icon-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .27);
    --mobile-spacing: 12px 20px;
  }

  .app-mobile-menu {
    position: relative;
    z-index: var(--z-index-overlay);
  }

  .app-mobile-menu__logo {
    margin: 0 auto 0 0;
    width: auto;
    height: 1.4375rem; /* 23px */
  }

  .app-mobile-menu__button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: var(--mobile-icon-bottom);
    right: var(--mobile-icon-right);
    z-index: var(--z-index-high);
    height: var(--mobile-icon-height);
    width: var(--mobile-icon-width);
    border: none;
    outline: none;
    background-color: var(--html-blue);
    box-shadow: var(--mobile-icon-shadow);
    cursor: pointer;
  }

  .app-mobile-menu__button:focus,
  .app-mobile-menu__button:active {
    background: var(--white);
  }

  .app-mobile-menu__button--open:focus .app-mobile-menu__button-icon--open,
  .app-mobile-menu__button--open:active .app-mobile-menu__button-icon--open {
    background-image: url('/images/icon_menu-passive--blue.svg');
  }

  .app-mobile-menu__button--close:focus .app-mobile-menu__button-icon--close,
  .app-mobile-menu__button--close:active .app-mobile-menu__button-icon--close {
    background-image: url('/images/icon_menu-exit--blue.svg');
  }

  .app-mobile-menu__button-icon {
    height: var(--mobile-icon-image);
    width: var(--mobile-icon-image);
  }

  .app-mobile-menu__button-icon--open {
    background-image: url('/images/icon_menu-passive--white.svg');
  }

  .app-mobile-menu__button-icon--close {
    background-image: url('/images/icon_menu-exit--white.svg');
  }

  .app-mobile-menu__content {
    display: flex;
    flex-direction: column;
    grid-column: var(--grid-page);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: var(--brand-yellow);
    padding: var(--mobile-spacing);
  }

  .app-mobile-menu__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: var(--spacing-medium);
  }

  .app-mobile-menu__list-item {
    margin-bottom: var(--spacing-medium);
  }

  @media (min-height: 500px) {
    .app-mobile-menu__list-item {
      margin-bottom: var(--spacing-large);
    }
  }

  @media screen and (min-width: 800px) {
    .app-mobile-menu {
      display: none;
    }
  }

</style>
