<template>
  <div
    class="pivot-section"
    :class="{
      'pivot-section--has-border': border,
      'pivot-section--narrow': narrow,
    }"
  >
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
      @click.native="trackLinkOutbound(pivot.externalLink)"
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
  </div>
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
      border: {
        type: Boolean,
        default: true,
      },
      narrow: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      createHref,
      trackLink (href) {
        this.$ga.event('Pivot', 'click cta', href, 0)
      },
      trackLinkOutbound (href) {
        this.$ga.query('send', 'event', {
          transport: 'beacon',
          eventCategory: 'Pivot',
          eventAction: 'click cta',
          eventLabel: href,
          eventValue: 0
        })
      }
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

  @media (min-width: 720px) {
    .pivot-section--has-border {
      border-top: 1px solid var(--very-dim);
    }

    .pivot-section--narrow {
      grid-column-start: 8;
      grid-column-end: 46;
    }
  }

  @media (min-width: 1100px) {
    .pivot-section {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }

    .pivot-section--narrow {
      grid-column-start: 14;
      grid-column-end: 38;
    }
  }
</style>
