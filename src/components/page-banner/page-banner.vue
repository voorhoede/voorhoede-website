<template>
  <div class="page-banner">
    <div class="page-banner__content">
      <p v-html="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<style scoped>
.page-banner {
  background-color: var(--paper-inverse);
  color: var(--paper);
}

.page-banner__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-small);
  font-family: var(--font-sans);
  text-align: center;
}

.page-banner__content :deep(a) {
  color: var(--brand-yellow);
  text-decoration: underline;
  font-weight: 700;
}
</style>
