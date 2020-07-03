<template>
  <section class="pivot-list grid">
    <template v-for="(pivot, index) in pivots">
      <contact-form
        v-if="isContactForm(pivot)"
        :key="index"
        class="grid"
        :contact-person="pivot.contactPerson"
        :title="$t('lets_discuss')"
      />
      <newsletter-form
        v-else-if="isNewsletterForm(pivot)"
        :key="index"
      />
      <pivot-section
        v-else
        :key="index"
        :pivot="pivot"
        :border="pivotBorder"
        :narrow="pivotNarrow"
      />
    </template>
  </section>
</template>

<script>
  import ContactForm from '../contact-form'
  import NewsletterForm from '../newsletter-form'
  import PivotSection from '../pivot-section'

  export default {
    components: {
      ContactForm,
      NewsletterForm,
      PivotSection,
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
    },
    methods: {
      isContactForm(pivot) {
        return pivot.formType && pivot.formType === 'contact'
      },
      isNewsletterForm(pivot) {
        return pivot.formType && pivot.formType === 'newsletter'
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
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
  }

  @media (min-width: 1100px) {
    .pivot-list .contact-form {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
