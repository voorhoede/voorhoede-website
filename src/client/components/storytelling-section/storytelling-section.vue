<template>
  <aside class="storytelling-section grid">
    <h2 class="storytelling-section__title h3">{{ title }}</h2>

  </aside>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style>
  .storytelling-section__title {
    margin-bottom: var(--spacing-medium);
  }
</style>
