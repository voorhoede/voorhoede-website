<template>
  <div v-if="showCookieBar" class="cookie-notification">
    <div v-if="!showCookieSettings" class="cookie-notification__content">
      <div v-html="body" class="cookie-notification__body rich-text body" />
    </div>

    <div v-else class="cookie-notification__settings">
      <p class="body cookie-notification__body">
        {{ typesBody }}
      </p>
      <ul class="cookie-options__list">
        <li
          v-for="(type, typeIndex) in types"
          class="cookie-options__item"
          :key="type.id"
        >
          <div class="cookie-option__text">
            <h2 class="h5">{{ type.title }}</h2>
            <p class="body-detail">{{ type.body }}</p>
          </div>
          <div class="cookie-option__toggle">
            <input
              v-if="type.required"
              type="checkbox"
              :id="`option-${type.id}`"
              class="sr-only"
              aria-checked="true"
              role="switch"
              :value="type.value"
              disabled
              checked
            />
            <input
              v-else
              type="checkbox"
              :id="`option-${type.id}`"
              class="sr-only"
              :aria-checked="types[typeIndex].title === type.title"
              role="switch"
              :value="type.key"
              v-model="checkedTypes"
              @click="checkVendors(typeIndex)"
            />
            <label :for="`option-${type.id}`">
              <span class="sr-only">{{ type.title }}</span>
            </label>
          </div>
          <div v-if="type.vendors.length" class="cookie-option__vendors">
            <details>
              <summary class="app-button body-detail font-bold">
                {{ $t('view_details') }}
                <app-icon name="caret" />
              </summary>
              <ul class="cookie-option__vendors-list">
                <li
                  v-for="(vendor, vendorIndex) in type.vendors"
                  :key="vendorIndex"
                  class="cookie-options__item"
                >
                  <div class="cookie-option__text">
                    <h3 class="body-detail font-bold">{{ vendor.title }}</h3>
                    <p class="body-detail">{{ vendor.body }}</p>
                  </div>
                  <div class="cookie-option__toggle">
                    <input
                      type="checkbox"
                      :id="`vendor-option-${vendor.id}`"
                      class="sr-only"
                      :aria-checked="types[typeIndex].vendors[vendorIndex].title === type.title"
                      role="switch"
                      :value="vendor.title"
                      v-model="checkedVendors"
                      @change="checkType(typeIndex)"
                    />
                    <label :for="`vendor-option-${vendor.id}`">
                      <span class="sr-only">{{ vendor.title }}</span>
                    </label>
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </li>
      </ul>
    </div>

    <template v-if="!showCookieSettings">
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
  import { mapActions, mapState } from 'vuex'
  import localStorageSupported from '~/lib/local-storage-supported'

  export default {
    props: {
      body: {
        type: String,
        required: true,
      },
      types: {
        type: Array,
        required: true,
      },
      typesBody: {
        type: String,
        required: false,
        default: '',
      },
    },
    data() {
      return {
        checkedTypes: [],
        checkedTypescheckedTypes: [],
        checkedVendors: [],
      }
    },
    computed: {
      ...mapState(['showCookieBar', 'showCookieSettings']),
    },
    methods: {
      ...mapActions(['setAllowedCookies', 'setShowCookieBar', 'setShowCookieSettings']),
      recordConsent() {
        const allVendors = this.types
          .filter(({ vendors }) => vendors)
          .map(({ vendors }) => vendors.map(({ title }) => title))
          .flat()

        if (localStorageSupported) {
          localStorage.setItem('vendorCookiesAccepted', JSON.stringify(allVendors))
        }

        this.setAllowedCookies({ allowed: allVendors })
        this.setShowCookieBar({ show: false })
      },
      saveSettings() {
        if (localStorageSupported) {
          localStorage.setItem('vendorCookiesAccepted', JSON.stringify(this.checkedVendors))
        }

        this.setShowCookieSettings({ show: false })

        this.updateConsentSettings()
        this.setAllowedCookies({ allowed: this.checkedVendors })
        this.setShowCookieBar({ show: false })
      },
      showSettings() {
        this.setShowCookieSettings({ show: true })
      },
      updateConsentSettings() {
        const consentSettings = this.types.map(({ key }) => ({
          [key]: this.checkedTypes.includes(key) ? 'granted' : 'denied'
        }))

        this.$gtag('consent', 'update', {
          ...consentSettings,
          'wait_for_update': 500,
        })
      },
      checkVendors(index) {
        const vendors = this.types[index].vendors.map(({ title }) => title)
        const noCheckedOptions = !this.checkedVendors.length

        noCheckedOptions
          ? this.checkedVendors.push(...vendors)
          : this.checkedVendors = []
      },
      checkType(index) {
        const key = this.types[index].key

        this.checkedVendors.length
          ? this.checkedTypes.push(key)
          : this.checkedTypes = this.checkedTypes.filter((item) => item !== key)
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
    max-height: calc(100% - 150px);
    padding: var(--spacing-small);
    overflow: auto;
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
    flex-flow: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .cookie-options__item + .cookie-options__item {
    margin-top: var(--spacing-small);
  }

  .cookie-option__vendors {
    flex: 0 0 100%;
    margin-top: var(--spacing-smaller);
  }

  .cookie-option__vendors .app-button:focus {
    border-radius: var(--border-radius);
    outline: 3px solid var(--html-blue);
  }

  .cookie-option__vendors details[open] .app-button svg {
    transform: rotate(180deg);
  }

  .cookie-option__vendors-list {
    margin-top: var(--spacing-smaller);
    padding: var(--spacing-smaller) 0;
    border-top: 1px solid var(--very-dim);
    border-bottom: 1px solid var(--very-dim);
  }

  .cookie-option__text {
    flex: 0 0 calc(100% - 50px - var(--spacing-small));
    margin-right: var(--spacing-small);
  }

  .cookie-option__text .h5 {
    margin-bottom: var(--spacing-tiny);
  }

  .cookie-option__toggle {
    flex: 0 0 50px;
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
    transition: transform .2s ease-in-out;
    border-radius: 50%;
    background-color: var(--dim);
  }

  .cookie-option__toggle input:focus + label {
    border-radius: var(--border-radius);
    outline: 3px solid var(--html-blue);
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
