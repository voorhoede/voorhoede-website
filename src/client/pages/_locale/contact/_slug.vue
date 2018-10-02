<template>
  <section class="page-contact-confirmation">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="page-contact-confirmation__backdrop grid">
      <div class="page-contact-confirmation__content">
        test
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { PageHeader } from '~/components'

  export default {
    components: {
      PageHeader,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    computed: {
      ...mapState([
        'locales',
        'currentLocale',
        'alternateUrl',
      ]),
    }
  }
</script>

<style>
.page-contact-confirmation {
  background-color: var(--bg-pastel);
}

.page-contact-confirmation__backdrop {
  background-color: white;
}

.page-contact-confirmation__content {
  padding-top: var(--spacing-large);
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  grid-column-start: 2;
  grid-column-end: -2;
}

@media screen and (min-width: 720px) {
  .page-contact-confirmation__backdrop {
    background-color: var(--bg-pastel);
  }

  .page-contact-confirmation__content {
    flex-direction: row;
    grid-column-start: 2;
    grid-column-end: -2;
    background: var(--white);
    padding: var(--spacing-large) var(--spacing-large);
    justify-content: space-between;
  }
}

@media screen and (min-width: 1100px) {
  .page-contact-confirmation__content {
    grid-column-start: 6;
    grid-column-end: -6;
    padding: var(--spacing-larger) var(--spacing-larger);
  }
}
</style>
