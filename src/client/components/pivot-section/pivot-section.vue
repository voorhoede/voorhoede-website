<template>
  <div
    class="pivot-section"
    :class="{
      'pivot-section--has-border': border && !isNewsletterForm,
      'pivot-section--narrow': narrow,
      'pivot-section--newsletter': isNewsletterForm,
      'pivot-section--leads': isLeadsForm,
    }"
  >
    <h2
      v-if="pivot.title && !isNewsletterForm"
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

    <leads-form
      v-if="isLeadsForm"
      :no-background="true"
      :file="pivot.file"
      :mailchimp-group="mailchimpGroup"
      :button-label="pivot.buttonLabel"
    />

    <newsletter-form
      v-if="isNewsletterForm"
      :no-background="true"
    />
  </div>
</template>

<script>
  import { createHref, linkValidator } from '../../lib/links'
  import AppButton from '../app-button'
  import LeadsForm from '../leads-form'
  import NewsletterForm from '../newsletter-form'

  export default {
    components: {
      AppButton,
      LeadsForm,
      NewsletterForm,
    },
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
    computed: {
      isNewsletterForm() {
        return this.pivot.formType && this.pivot.formType === 'newsletter'
      },
      isLeadsForm() {
        return this.pivot.formType && this.pivot.formType === 'leads'
      },
      mailchimpGroup() {
        const { mailchimpValue, mailchimpName, mailchimpId } = this.pivot

        return {
          id: mailchimpId,
          name: mailchimpName,
          value: mailchimpValue,
        }
      }
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

  .pivot-section--newsletter {
    grid-column: var(--grid-page);
    background-color: var(--bg-pastel);
  }

  .pivot-section__heading {
    margin-bottom: var(--spacing-medium);
  }

  .pivot-section__body {
    margin: 0 auto var(--spacing-large) auto;
  }

  .pivot-section .newsletter-form {
    padding: 0;
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
