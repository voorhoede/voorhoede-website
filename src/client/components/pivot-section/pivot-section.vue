<template>
  <section class="pivot-section grid">
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
      <pivot
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
  import Pivot from '../pivot'

  export default {
    components: {
      ContactForm,
      NewsletterForm,
      Pivot,
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
  .pivot-section {
    position: relative;
    grid-column-start: 1;
    grid-column-end: 51;
  }

  .pivot-section .contact-form {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
  }

  @media (min-width: 1100px) {
    .pivot-section .contact-form {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
