<template>
  <section class="page-contact-confirmation">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <div class="page-contact-confirmation__backdrop grid">
      <div class="page-contact-confirmation__content body">
        {{ page.body }}
      </div>
    </div>
    <div class="grid">
      <cta-block
        :cta-label="page.callToActionLabel"
        :cta-to="{ name: 'locale-cases', params: { locale: currentLocale }}" />
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { CtaBlock, PageHeader } from '~/components'

  export default {
    components: {
      CtaBlock,
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
  margin-bottom: var(--spacing-large);
  background-color: white;
}

.page-contact-confirmation__content {
  padding: var(--spacing-large) 0;
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  grid-column-start: 2;
  grid-column-end: -2;
}

@media screen and (min-width: 720px) {
  .page-contact-confirmation__backdrop {
    margin-bottom: var(--spacing-big);
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
