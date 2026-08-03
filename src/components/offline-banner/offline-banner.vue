<template>
  <!--
    Client-side only: prerendered HTML is identical either way, only the
    browser knows whether this page was served as an offline fallback.
  -->
  <client-only>
    <page-banner v-if="isOfflineFallback" :content="bannerContent" />
  </client-only>
</template>

<script setup>
const { $t, $i18n } = useNuxtApp();

// Set by the script the service worker injects into its fallback page
// (see src/lib/sw.js).
const isOfflineFallback =
  import.meta.client && window.__OFFLINE_FALLBACK__ === true;

const bannerContent = $t('page_offline', {
  mirrorUrl: `https://voorhoe.de/${$i18n.locale()}`,
});
</script>
