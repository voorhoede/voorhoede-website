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
      v-if="pivot.externalLink"
      :label="pivot.callToActionLabel"
      :to="pivot.externalLink"
    />
    <app-button
      v-else
      @click.native="trackLink(pivot.link.page.slug)"
      :label="pivot.callToActionLabel"
      :to="createHref(pivot.link)"
    />
  </section>
</template>

<script>
  import { createHref, linkValidator } from '../../lib/links'
  import AppButton from '../app-button'

  export default {
    components: { AppButton },
    props: {
      pivot: {
        type: Object,
        required: true,
        validator: pivot => {
          return pivot.hasOwnProperty('callToActionLabel') &&
            (pivot.hasOwnProperty('externalLink') || linkValidator(pivot.link))
        }
      },
    },
    methods: {
      createHref,
      trackLink (href) {
        this.$ga.event('Pivot', 'click cta', href, 0)
      },
    }
  }
</script>

<style>
  .pivot-section {
    position: relative;
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

  @media (min-width: 720px) {
    .pivot-section {
      border-top: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .pivot-section {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
