<template>
  <section class="pivot-section">
    <h2
      v-if="pivot.title"
      class="pivot-section__heading h3"
    >
      {{ pivot.title }}
    </h2>
    <div
      v-if="pivot.body"
      v-html="pivot.body"
      class="pivot-section__body body"
    >
    </div>
    <app-button
      :label="pivot.callToActionLabel"
      :to="createHref(pivot.link)"
    />
  </section>
</template>

<script>
  import { createHref, linkValidator } from '../../lib/links'
  import { AppButton } from '~/components'

  export default {
    components: {
      AppButton,
    },
    props: {
      pivot: {
        type: Object,
        required: true,
        validator: pivot => {
          return pivot.hasOwnProperty('callToActionLabel')
          && linkValidator(pivot.link)
        }
      },
    },
    methods: {
      createHref
    }
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
