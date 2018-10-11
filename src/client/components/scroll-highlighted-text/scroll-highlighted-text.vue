<template>
  <p class="scroll-highlighted-text">
    <span 
      class="scroll-highlighted-text__text h1"
      v-for="(item, index) in textLines"
      :key="index"
    >
      {{ item.line }}
    </span>
  </p>
</template>

<script>
  export default {
    props: {
      textLines: {
        type: Array,
        required: true,
        validator(textLines) {
          return textLines.every(item => 'line' in item)
        },
      },
    },
  }
</script>

<style>
  .scroll-highlighted-text {
    text-align: center;
  }

  .scroll-highlighted-text__text {
    display: block;
  }

  .scroll-highlighted-text__text + .scroll-highlighted-text__text {
    margin-top: var(--spacing-small);
  }

  @media (max-width: 520px) {
    .scroll-highlighted-text__text {
      font-size: 32px;
    }
  }

  @media (min-width: 720px) {
    .scroll-highlighted-text__text {
      margin-bottom: var(--spacing-large);
    }
  }

  @media (min-width: 1100px) {
    .scroll-highlighted-text__text {
      margin-bottom: var(--spacing-larger);
    }
  }
</style>
