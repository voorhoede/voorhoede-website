<template>
  <section class="pivot-section">
    <header
      v-if="hasHeading"
      class="pivot-section__heading"
    >
      <slot name="heading" />
    </header>
    <div
      v-if="hasBody"
      class="pivot-section__body"
    >
      <slot name="body" />
    </div>
    <app-button
      :label="ctaLabel"
      :to="ctaTo"
    />
    <app-button
      v-if="alternateLink"
      class="pivot-section__alternate"
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
  .pivot-section {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    text-align: center;
  }

  .pivot-section__heading {
    margin-bottom: var(--spacing-medium);
  }

  .pivot-section__body {
    margin-right: auto;
    margin-bottom: var(--spacing-large);
    margin-left: auto;
  }

  .pivot-section__alternate {
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .pivot-section {
      border-top: 1px solid var(--very-dim);
    }

    .pivot-section__alternate.app-button {
      margin: 0 0 0 var(--spacing-medium);
      padding-left: var(--spacing-medium);
      border-left: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .pivot-section {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
