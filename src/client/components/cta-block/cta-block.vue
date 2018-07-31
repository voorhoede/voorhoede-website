<template>
  <section class="cta-block">
    <header
      v-if="hasHeading"
      class="cta-block__heading"
    >
      <slot name="heading" />
    </header>
    <div
      v-if="hasBody"
      class="cta-block__body"
    >
      <slot name="body" />
    </div>
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
      ctaLabel: {
        type: String,
        required: true,
      },
      ctaTo: {
        type: String,
        required: true,
      },
    },
    computed: {
      hasHeading: function () {
        return !!this.$slots.heading
      },
      hasBody: function() {
        return !!this.$slots.body
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

  .cta-block__heading {
    margin-bottom: var(--spacing-medium);
  }

  .cta-block__body {
    max-width: 38.875rem;
    margin-right: auto;
    margin-bottom: var(--spacing-medium);
    margin-left: auto;
  }
</style>
