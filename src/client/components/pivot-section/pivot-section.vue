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
      />
    </template>
    <div class="pivot-section__scroll-to">
      <scroll-to v-if="scrollIndicator" direction="up" />
    </div>
  </section>
</template>

<script>
  import ContactForm from '../contact-form'
  import NewsletterForm from '../newsletter-form'
  import Pivot from '../pivot'
  import ScrollTo from '../scroll-to'

  export default {
    components: {
      ContactForm,
      NewsletterForm,
      Pivot,
      ScrollTo,
    },
    props: {
      pivots: {
        type: Array,
        required: true,
      },
      scrollIndicator: {
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

  .pivot-section .pivot-section__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
  }

  @media (min-width: 720px) {
    .pivot-section .pivot-section__scroll-to {
      display: block;
    }
  }

  @media (min-width: 1100px) {
    .pivot-section .contact-form {
      padding-top: var(--spacing-large);
      padding-bottom: var(--spacing-big);
    }
  }
</style>
