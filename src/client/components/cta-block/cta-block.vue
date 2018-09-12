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
    <app-button
      v-if="secondLink"
      class="cta-block__second-link"
      secondary
      :external="secondLinkExternal"
      :label="secondLinkLabel"
      :to="secondLinkTo"
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
      secondLink: {
        type: Boolean,
        default: false,
      },
      secondLinkLabel: {
        type: String,
        required: true,
      },
      secondLinkTo: {
        type: [String, Object],
        required: true,
      },
      secondLinkExternal: {
        type: Boolean,
        default: false,
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

  .cta-block__second-link {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .cta-block {
      border-top: 1px solid var(--very-dim);
    }

    .cta-block__second-link.app-button {
      margin: 0 0 0 var(--spacing-medium);
      padding-left: var(--spacing-medium);
      border-left: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .cta-block {
      padding-bottom: var(--spacing-big);
    }
  }
</style>
