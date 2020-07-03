<template>
  <section class="pivot">
    <h2
      v-if="pivot.title"
      class="pivot__heading h3"
    >
      {{ pivot.title }}
    </h2>
    <div
      v-if="pivot.body"
      v-html="pivot.body"
      class="pivot__body body"
    >
    </div>
    <app-button
      v-if="pivot.externalLink"
      :label="pivot.buttonLabel"
      :to="pivot.externalLink"
      external
    />
    <app-button
      v-else-if="pivot.link"
      @click.native="trackLink(pivot.link.page.slug)"
      :label="pivot.buttonLabel"
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
          return pivot.hasOwnProperty('buttonLabel') &&
            (pivot.hasOwnProperty('externalLink') || linkValidator(pivot.link))
        },
      },
    },
    methods: {
      createHref,
      trackLink (href) {
        this.$ga.event('Pivot', 'click cta', href, 0)
      },
    },
  }
</script>

<style>
  .pivot {
    position: relative;
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    text-align: center;
  }

  .pivot__heading {
    margin-bottom: var(--spacing-medium);
  }

  .pivot__body {
    margin-right: auto;
    margin-bottom: var(--spacing-large);
    margin-left: auto;
  }

  @media (min-width: 720px) {
    .pivot {
      border-top: 1px solid var(--very-dim);
    }
  }

  @media (min-width: 1100px) {
    .pivot {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
