<template>
  <p class="highlight-text-lines">
    <span
      class="highlight-text-lines__text h1"
      v-for="(text, index) in textLines"
      :key="index"
    >
      {{ text }}
    </span>
  </p>
</template>

<script>
  export default {
    props: {
      textLines: {
        type: Array,
        required: true,
        validator(value) {
          return value.every(item => typeof item === 'string')
        },
      },
    },
  }
</script>

<style>
  .highlight-text-lines {
    text-align: center;
  }

  .highlight-text-lines__text {
    display: block;
  }

  .highlight-text-lines__text + .highlight-text-lines__text {
    margin-top: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .highlight-text-lines__text {
      margin-bottom: var(--spacing-large);
    }
  }

  @media (min-width: 1100px) {
    .highlight-text-lines__text {
      margin-bottom: var(--spacing-larger);
    }
  }
</style>
