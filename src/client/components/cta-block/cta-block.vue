<template>
  <section class="cta-block">
    <h2 class="h4 cta-block__title">{{ title }}</h2>
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
    padding-bottom: var(--spacing-large);
    border-top: 1px solid var(--very-dim);
    text-align: center;
  }

  .cta-block__title {
    margin-bottom: 25px;
  }

</style>
