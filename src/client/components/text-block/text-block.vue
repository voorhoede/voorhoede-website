<template>
  <div class="text-block">
    <h3
      v-if="title"
      :id="title.replace(/\s+/g, '').toLowerCase()"
      class="text-block__title h3">{{ title }}</h3>
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: null
      }
    },
    mounted () {
      if (!this.$slots.default) {
        throw new Error('Text block requires content be provided in the slot.')
      }
    }
  }
</script>

<style>
  .text-block__title {
    margin-bottom: var(--spacing-smaller);
  }

  .text-block > *:not(.text-block__title):not(:first-child) {
    margin-top: 1rem;
  }
</style>
