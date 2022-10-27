<template>
  <div class="cookie-consent-card">
    <h4 class="cookie-consent-card__title h4">
      {{ $t('permission_required_to_view', { title }) }}
    </h4>
    <p class="body-small">
      {{ $t('consent_explanation', { title }) }}
    </p>
    <div class="cookie-consent-card__actions">
      <button
        class="app-button app-button--small body font-bold"
        @click="onClick"
      >
        <span>{{ $t('manage_cookies') }}</span>
      </button>
      <a
        class="link body-small font-bold"
        :href="url"
        target="_blank"
        rel="noreferrer noopener"
      >
        {{ $t('view_on', { title }) }}
      </a>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
    methods: {
      ...mapActions(['setShowCookieBar']),
      onClick() {
        this.setShowCookieBar({ show: true })
      },
    },
  }
</script>

<style>
  .cookie-consent-card {
    background-color: var(--base2);
    padding: var(--spacing-medium);
  }

  .cookie-consent-card__title {
    margin-bottom: var(--spacing-small);
  }

  .cookie-consent-card__actions {
    display: flex;
    margin-top: var(--spacing-medium);
    gap: var(--spacing-medium);
    align-items: center;
  }
</style>
