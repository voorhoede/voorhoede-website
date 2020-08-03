<template>
  <section class="pivot-list grid">
    <template v-for="(pivot, index) in pivots">
      <contact-form
        v-if="pivot.formType && pivot.formType === 'contact'"
        :key="index"
        class="grid"
        :class="{ 'pivot-list-item--background': pivot.showBackgroundColor }"
        :contact-person="pivot.contactPerson"
        :title="$t('lets_discuss')"
        :style="setGridRow(index)"
      />
      <pivot-section
        v-else
        :key="index"
        :pivot="pivot"
        :border="pivotBorder"
        :narrow="pivotNarrow"
        :class="{ 'pivot-list-item--background': pivot.showBackgroundColor }"
        :style="setGridRow(index)"
      />
    </template>
  </section>
</template>

<script>
  import ContactForm from '../contact-form'
  import PivotSection from '../pivot-section'

  export default {
    components: {
      ContactForm,
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
      setGridRow(index) {
        const rowNumber = index + 1
        return {
          '-ms-grid-row': rowNumber,
          '-ms-grid-row-span': '1',
          'grid-row': rowNumber,
          }
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

  .pivot-list-item--background {
    background-color: var(--bg-pastel);
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
</style>
