<template>
  <section class="pivot-list grid">
    <template v-for="(pivot, index) in pivots">
      <contact-form
        v-if="isContactForm(pivot)"
        :key="index"
        class="grid"
        :class="{
          'pivot-list__item--has-border': pivotHasBorder(index),
          'pivot-list__item--has-background': pivotHasBackground(index),
        }"
        :contact-person="pivot.contactPerson"
        :title="$t('lets_discuss')"
        :style="setGridRow(index)"
      />
      <div
        v-else
        :key="index"
        class="pivot-list__item"
        :class="{
          'pivot-list__item--has-border': pivotHasBorder(index),
          'pivot-list__item--has-background': pivotHasBackground(index),
          'pivot-list__item--narrow': pivotNarrow,
          'pivot-list__item--newsletter': isNewsletterForm(pivot),
          'pivot-list__item--leads': isLeadsForm(pivot),
        }"
        :style="setGridRow(index)"
      >
        <h2
          v-if="pivot.title && !isNewsletterForm(pivot)"
          class="pivot-list__item-heading h3"
        >
          {{ pivot.title }}
        </h2>

        <rich-text-block
          v-if="pivot.body"
          :text="pivot.body"
          :large-text="true"
          class="pivot-list__item-body"
        />

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
          v-if="isLeadsForm(pivot)"
          :has-background="false"
          :mailchimp-group="getMailchimpProperties(pivot)"
          :button-label="pivot.buttonLabel"
        />

        <newsletter-form
          v-if="isNewsletterForm(pivot)"
        />

      </div>
    </template>
  </section>
</template>

<script>
  import { createHref } from '../../lib/links'
  import AppButton from '../app-button'
  import ContactForm from '../contact-form'
  import LeadsForm from '../leads-form'
  import NewsletterForm from '../newsletter-form'
  import RichTextBlock from '../rich-text-block'

  export default {
    components: {
      AppButton,
      ContactForm,
      LeadsForm,
      NewsletterForm,
      RichTextBlock,
    },
    props: {
      pivots: {
        type: Array,
        required: true,
      },
      pivotBorder: {
        type: Boolean,
        default: true,
      },
      pivotNarrow: {
        type: Boolean,
        default: false,
      },
      canHaveBorderTop: {
        type: Boolean,
        default: true,
      },
      lastItemHasBackground: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
      createHref,
      pivotHasBorder(pivotIndex) {
        return (pivotIndex === 0 && !this.pivotHasBackground(pivotIndex))
      },
      pivotHasBackground(pivotIndex) {
        const lastPivotIndex = this.pivots.length - 1
        
        return (
          this.lastItemHasBackground === true
          && pivotIndex === lastPivotIndex
        )
      },
      isContactForm(pivot) {
        return pivot.formType && pivot.formType === 'contact'
      },
      isNewsletterForm(pivot) {
        return pivot.formType && pivot.formType === 'newsletter'
      },
      isLeadsForm(pivot) {
        return pivot.formType && pivot.formType === 'leads'
      },
      getMailchimpProperties(pivot) {
        const { mailchimpValue, mailchimpName, mailchimpId } = pivot

        return {
          id: mailchimpId,
          name: mailchimpName,
          value: mailchimpValue,
        }
      },
      setGridRow(index) {
        const rowNumber = index + 1
        return {
          '-ms-grid-row': rowNumber,
          '-ms-grid-row-span': '1',
          'grid-row': rowNumber,
          }
      },
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
      },
    },
  }
</script>

<style>
  .pivot-list {
    position: relative;
    grid-column-start: 1;
    grid-column-end: 51;
  }

  .pivot-list .contact-form {
    grid-column: 1 / 51;
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
  }

  @media (min-width: 1100px) {
    .pivot-list .contact-form {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }

  .pivot-list__item {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    text-align: center;
  }

  .pivot-list__item--has-background {
    grid-column: var(--grid-page);
    background-color: var(--bg-pastel);
  }

  .pivot-list__item--newsletter .newsletter-form {
    padding: 0;
  }

  .pivot-list__item-heading {
    margin-bottom: var(--spacing-medium);
  }

  .pivot-list__item-body {
    margin-top: 0;
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .pivot-list__item--has-border {
      border-top: 1px solid var(--very-dim);
    }

    .pivot-list__item--narrow {
      grid-column-start: 8;
      grid-column-end: 46;
    }
  }

  @media (min-width: 1100px) {
    .pivot-list__item {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }

    .pivot-list__item--narrow {
      grid-column-start: 14;
      grid-column-end: 38;
    }
  }
</style>
