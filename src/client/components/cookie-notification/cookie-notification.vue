<template>
  <div v-if="showCookieNotification" class="cookie-notification">
    <div v-if="!showCookieSettigns" class="cookie-notification__content">
      <h1 v-if="title" class="cookie-notification__title h4">
        {{ title }}
      </h1>

      <div v-html="body" class="cookie-notification__body rich-text body" />
    </div>

    <div v-else class="cookie-notification__settings">
      <p class="body cookie-notification__body">
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at iaculis ipsum, vitae condimentum tellus. Sed dignissim laoreet orci a tempor. Nunc ullamcorper at augue et tincidunt. Sed nunc enim, dapibus vitae risus in, imperdiet ullamcorper lectus. Sed a ullamcorper risus.
      </p>
      <ul class="cookie-options__list">
        <li class="cookie-options__item">
          <div class="cookie-option__text">
            <h4 class="h4">Fuctional cookies</h4>
            <p class="body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada odio turpis, nec elementum nulla aliquam in. Nunc ultrices elementum laoreet. Donec suscipit ex congue blandit mattis.
            </p>
          </div>
          <div class="cookie-option__toggle">
            <input type="checkbox" id="option-1" aria-checked="true" role="switch" checked disabled />
            <label for="option-1">
              <span class="body-detail">Fuctional cookies</span>
            </label>
          </div>
        </li>

        <li class="cookie-options__item">
          <div class="cookie-option__text">
            <h4 class="h4">Marketing cookies</h4>
            <p class="body-small">
              Duis eget lectus sed elit facilisis aliquam et sagittis tortor. Fusce at dolor nec nulla pretium convallis sodales et ante.
            </p>
          </div>
          <div class="cookie-option__toggle">
            <input type="checkbox" id="option-2" aria-checked="true" role="switch" checked />
            <label for="option-2">
              <span class="body-detail">Marketing cookies</span>
            </label>
          </div>
        </li>

        <li class="cookie-options__item">
          <div class="cookie-option__text">
            <h4 class="h4">Targeting cookies</h4>
            <p class="body-small">
              Donec ultrices, dolor non maximus dapibus, nisl ipsum commodo nulla, eu pretium diam risus quis tellus.
            </p>
          </div>
          <div class="cookie-option__toggle">
            <input type="checkbox" id="option-3" aria-checked="true" role="switch" checked />
            <label for="option-3">
              <span class="body-detail">Targeting cookies</span>
            </label>
          </div>
        </li>
      </ul>
    </div>

    <template v-if="!showCookieSettigns">
      <button
        class="app-button app-button--small body font-bold"
        @click="recordConsent"
      >
        <span>{{ $t('cookie_consent') }}</span>
      </button>

      <button
        class="app-button body-small"
        @click="showSettings"
      >
        <span>{{ $t('cookie_settings') }}</span>
      </button>
    </template>

    <template v-else>
      <button
        class="app-button app-button--small body font-bold"
        @click="saveSettings"
      >
        <span>{{ $t('save') }}</span>
      </button>
    </template>
  </div>
</template>

<script>
  import localStorageSupported from '../../lib/local-storage-supported'

  export default {
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      body: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        showCookieNotification: false,
        showCookieSettigns: false,
      }
    },
    mounted() {
      if (localStorageSupported) {
        this.showCookieNotification = !localStorage.getItem('cookiesAccepted')
      }
    },
    methods: {
      recordConsent() {
        if (localStorageSupported) {
          localStorage.setItem('cookiesAccepted', true)
          this.showCookieNotification = false
        }
      },
      saveSettings() {
        // TODO: save cookie settings
        this.showCookieSettigns = false
      },
      showSettings() {
        this.showCookieSettigns = true
      },
    },
  }
</script>

<style>
  .cookie-notification {
    position: fixed;
    z-index: var(--z-index-overlay);
    top: var(--spacing-medium);
    right: var(--spacing-medium);
    left: var(--spacing-medium);
    padding: var(--spacing-small);
    background: var(--white);
    box-shadow: var(--box-shadow);
  }

  @media (min-width: 720px) {
    .cookie-notification {
      right: auto;
      left: 50%;
      width: 690px;
      transform: translateX(-50%);
    }
  }

  @media (min-width: 800px) {
    .cookie-notification {
      top: auto;
      bottom: var(--spacing-medium);
    }
  }

  .cookie-notification__title {
    margin-bottom: var(--spacing-tiny);
  }

  .cookie-notification__body {
    margin-bottom: var(--spacing-small);
  }

  .cookie-notification .app-button + .app-button {
    margin-left: var(--spacing-smaller);
  }

  .cookie-options__list {
    margin-bottom: var(--spacing-medium);
  }

  .cookie-options__item {
    display: flex;
    align-items: center;
  }

  .cookie-options__item + .cookie-options__item {
    margin-top: var(--spacing-small);
  }

  .cookie-option__text {
    margin-right: var(--spacing-small);
  }

  .cookie-option__toggle {
    flex: 0 0 80px;
  }

  .cookie-option__toggle input {
    margin: 0;
    width: auto;
  }
</style>
