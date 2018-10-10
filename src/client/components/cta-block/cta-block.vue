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
      v-if="alternateLink"
      class="cta-block__alternate"
      secondary
      :external="alternateLinkExternal"
      :label="alternateLinkLabel"
      :to="alternateLinkTo"
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
      alternateLink: {
        type: Boolean,
        default: false,
      },
      alternateLinkLabel: {
        type: String,
        default: '',
      },
      alternateLinkTo: {
        type: [String, Object],
        default: null,
      },
      alternateLinkExternal: {
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
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-medium);
    text-align: center;
  }

  .cta-block__heading {
    margin-bottom: var(--spacing-small);
  }

  .cta-block__body {
    margin-right: auto;
    margin-bottom: var(--spacing-large);
    margin-left: auto;
  }

  .cta-block__alternate {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .cta-block {
      border-top: 1px solid var(--very-dim);
    }

    .cta-block__alternate.app-button {
      margin: 0 0 0 var(--spacing-medium);
      padding-left: var(--spacing-medium);
      border-left: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .cta-block {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-large);
    }
  }
</style>
