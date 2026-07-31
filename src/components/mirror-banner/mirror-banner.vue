<template>
  <page-banner v-if="originalUrl" :content="bannerContent" />
</template>

<script setup lang="ts">
const { $t } = useNuxtApp();
const {
  public: { originalUrl },
} = useRuntimeConfig();

const bannerContent = ref(
  `${$t('mirror_notice')}: <a href=${originalUrl}>${originalUrl}</a>`,
);
</script>
