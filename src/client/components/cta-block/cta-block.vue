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
        type: [String, Object],
        required: true,
      },
    },
    computed: {
      hasHeading() {
        return 'heading' in this.$slots
      },
      hasBody() {
        return 'body' in this.$slots
      },
    },
  }
</script>

<style>
  .cta-block {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    text-align: center;
  }

  .cta-block__heading {
    margin-bottom: var(--spacing-medium);
  }

  .cta-block__body {
    margin-right: auto;
    margin-bottom: var(--spacing-medium);
    margin-left: auto;
  }

  @media (min-width: 720px) {
    .cta-block {
      border-top: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .cta-block {
      padding-bottom: var(--spacing-big);
    }
  }
</style>
