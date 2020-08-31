<template>
  <section class="pivot-list">
    <div
      v-for="(pivot, index) in pivots"
      :key="index"
      class="pivot-list__item grid"
      :class="{
        'pivot-list__item--has-background': pivotHasBackground(index),
        'pivot-list__item--narrow': pivotNarrow,
      }"
      :style="setGridRow(index)"
    >
      <div
        class="pivot-list__item-content"
        :class="{
          'pivot-list__item-content--full-width': itemContentIsFullWidth(pivot),
          'pivot-list__item-content--narrow': itemContentIsNarrow(pivot),
          'pivot-list__item-content--has-border': pivotHasBorder(index),
        }"
      >
        <contact-form
          v-if="isContactForm(pivot)"
          :contact-person="pivot.contactPerson"
          :title="$t('lets_discuss')"
        />
        <div v-else class="pivot-list__item-text">
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
      </div>
    </div>
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
        // The first item doens't have a border when it's already having a background
        return (this.canHaveBorderTop && pivotIndex === 0 && !this.pivotHasBackground(pivotIndex))
      },
      pivotHasBackground(pivotIndex) {
        const lastPivotIndex = this.pivots.length - 1
        
        return (
          this.lastItemHasBackground === true
          && pivotIndex === lastPivotIndex
        )
      },
      itemContentIsFullWidth(pivot) {
        return (
          this.isContactForm(pivot)
          || this.isNewsletterForm(pivot)
        )
      },
      itemContentIsNarrow(pivot) {
        return !this.itemContentIsFullWidth(pivot) && this.pivotNarrow
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
    grid-column-start: var(--grid-page-start);
    grid-column-end: var(--grid-page-end);
  }

  .pivot-list__item--has-background {
    background-color: var(--bg-pastel);
  }

  .pivot-list__item-content--full-width {
    grid-column: var(--grid-page);
  }
  
  .pivot-list .contact-form {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
  }

  @media (min-width: 1100px) {
    .pivot-list .contact-form {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }

  .pivot-list .newsletter-form {
    padding: 0;
  }

  .pivot-list__item-text {
    text-align: center;
  }

  .pivot-list__item-heading {
    margin-bottom: var(--spacing-medium);
  }

  .pivot-list__item-body {
    margin-top: 0;
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .pivot-list__item-content--has-border {
      border-top: 1px solid var(--very-dim);
    }

    .pivot-list__item-content--narrow {
      grid-column: var(--grid-content-narrow);
    }
  }

  @media (min-width: 1100px) {
    .pivot-list__item-content {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }

    .pivot-list__item-content--narrow {
      grid-column-start: 14;
      grid-column-end: 38;
    }
  }
</style>
