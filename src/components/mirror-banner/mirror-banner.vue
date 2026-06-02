<template>
  <div
    v-if="originalUrl"
    class="mirror-banner"
  >
    <div class="mirror-banner__content body-small">
      <span>{{$t("mirror_notice")}}:&nbsp;</span>
      <a
        class="mirror-banner__link font-bold"
        :href="originalUrl"
      >
        {{ originalUrl }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { public: { originalUrl }} = useRuntimeConfig();
</script>

<style scoped>
  .mirror-banner {
    background-color: var(--paper-inverse);
    color: var(--paper);
  }

  .mirror-banner__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-small);
    text-align: center;
  }

  .mirror-banner__link {
    color: var(--brand-yellow);
    text-decoration: underline;
  }
</style>
