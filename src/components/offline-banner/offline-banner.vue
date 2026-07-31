<template>
  <!--
    Client-side only: /en and /nl are prerendered, so their HTML is identical
    regardless of query params — the banner can only be decided in the browser,
    once the service worker has served the cached page at `?offline=true`.
  -->
  <client-only>
    <page-banner v-if="hasOfflineParam" :content="bannerContent" />
  </client-only>
</template>

<script setup>
const { $t, $i18n } = useNuxtApp();
const route = useRoute();

const hasOfflineParam = computed(() => route.query.offline === 'true');

const alternativeUrl = ref('https://voorhoe.de/' + $i18n.locale());

const bannerContent = $t('page_offline', {
  mirrorUrl: alternativeUrl.value,
});
</script>
