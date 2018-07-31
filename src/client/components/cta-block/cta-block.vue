<template>
  <section class="cta-block">
    <h2
      :class="headingClass"
      class="cta-block__title"
    >
      {{ title }}
    </h2>
    <p v-if="body !== ''" class="cta-block__body body">{{ body }}</p>
    <app-button
      :label="ctaLabel"
      :to="ctaTo"
    />
  </section>
</template>

<script>
  import { AppButton } from '~/components'

  export default {
    components: {
      AppButton,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      headingClass: {
        type: String,
        default: 'h4',
      },
      body: {
        type: String,
        default: '',
      },
      ctaLabel: {
        type: String,
        required: true,
      },
      ctaTo: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  .cta-block {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    border-top: 1px solid var(--very-dim);
    text-align: center;
  }

  .cta-block__title {
    margin-bottom: var(--spacing-medium);
  }

  .cta-block__body {
    margin-bottom: var(--spacing-medium);
  }
</style>
