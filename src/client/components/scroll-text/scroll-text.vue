<template>
  <p class="scroll-text" v-scroll-highlight>
    <span
      v-for="item in items"
      :key="item.line"
      class="scroll-text__item h1"
      scroll-highlight-item
    >
      {{ item.line }}
    </span>
  </p>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(item => item)
      }
    }
  }
}

</script>

<style>
  .scroll-text {
    position: relative;
    padding-bottom: var(--spacing-medium);
  }

  .scroll-text.scroll-text--active {
    transform-style: preserve-3d;
    perspective: 3px;
  }

  .scroll-text__item {
    display: block;
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .scroll-text--active .scroll-text__item {
    transform: translateZ(var(--z-position));
  }

  @media (max-width: 520px) {
    .scroll-text__item {
      font-size: 32px;
    }
  }

  @media (min-width: 720px) {
    .scroll-text__item {
      margin-bottom: var(--spacing-large);
    }
  }

  @media (min-width: 1100px) {
    .scroll-text__item {
      margin-bottom: var(--spacing-larger);
    }
  }
</style>
