<template>
  <section v-if="title" class="text-block">
    <h3 class="text-block__title h3">{{ title }}</h3>
    <slot />
  </section>
  <div v-else class="text-block">
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

  .text-block__item + .text-block__item {
    margin-top: 1rem;
  }
</style>
