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
        {{ optionsBody }}
      </p>
      <ul class="cookie-options__list">
        <li
          v-for="option in options"
          class="cookie-options__item"
          :key="option.id"
        >
          <div class="cookie-option__text">
            <h4 class="h5">{{ option.title }}</h4>
            <p class="body-detail">{{ option.body }}</p>
          </div>
          <div class="cookie-option__toggle">
            <input
              v-if="option.required"
              type="checkbox"
              :id="option.id"
              class="sr-only"
              aria-checked="true"
              role="switch"
              :value="option.value"
              disabled
              checked
            />
            <input
              v-else
              type="checkbox"
              :id="`option-${option.id}`"
              class="sr-only"
              :aria-checked="option.required"
              role="switch"
              :value="option.key"
              v-model="checkedOptions"
            />
            <label :for="`option-${option.id}`">
              <span class="sr-only">{{ option.title }}</span>
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
      optionsBody: {
        type: String,
        required: false,
        default: '',
      },
      options: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        showCookieNotification: false,
        showCookieSettigns: false,
        checkedOptions: [],
      }
    },
    mounted() {
      if (localStorageSupported) {
        this.showCookieNotification = !localStorage.getItem('cookiesAccepted')
        this.checkedOptions = this.options.map(({ key }) => key)
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
        this.updateConsentSettings()
        this.showCookieSettigns = false
      },
      showSettings() {
        this.showCookieSettigns = true
      },
      updateConsentSettings() {
        const consentSettings = this.options.map(({ key }) => ({
          [key]: this.checkedOptions.includes(key) ? 'granted' : 'denied'
        }))

        this.$gtag('consent', 'update', {
          ...consentSettings,
          'wait_for_update': 500,
        })
      },
    },
  }
</script>

<style>
  :root {
    --toggle-height: 26px;
    --toggle-radius: calc(var(--toggle-height) / 2);
    --toggle-width: 50px;
    --knob-size: calc(var(--toggle-height) - 10px);
  }

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

  .cookie-option__text .h5 {
    margin-bottom: var(--spacing-tiny);
  }

  .cookie-option__toggle {
    flex: 0 0 80px;
  }

  .cookie-option__toggle input {
    width: auto;
    margin: 0;
  }

  .cookie-option__toggle label {
    display: block;
    position: relative;
    width: var(--toggle-width);
    height: var(--toggle-height);
    cursor: pointer;
  }

  .cookie-option__toggle label::before,
  .cookie-option__toggle label::after {
    content: '';
    position: absolute;
    left: 0;
  }

  .cookie-option__toggle label::before {
    width: 100%;
    height: 100%;
    border: 2px solid var(--dim);
    border-radius: var(--toggle-radius);
  }

  .cookie-option__toggle label::after {
    top: 50%;
    width: var(--knob-size);
    height: var(--knob-size);
    transform: translate(5px, -50%);
    transition: transform 0.2s ease-in-out;
    border-radius: 50%;
    background-color: var(--dim);
  }

  .cookie-option__toggle input:checked + label::after {
    transform: translate(calc(var(--toggle-width) - var(--knob-size) - 5px), -50%);
    background-color: var(--html-blue);
  }

  .cookie-option__toggle input:disabled + label {
    cursor: not-allowed;
  }

  .cookie-option__toggle input:disabled + label::before,
  .cookie-option__toggle input:disabled + label::after {
    opacity: .5;
  }

  .cookie-option__toggle input:disabled + label::before {
    background-color: var(--fog);
  }

  .cookie-option__toggle input:disabled + label::after {
    background-color: var(--dim);
  }
</style>
