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
    async asyncData({ store, route, error }) {
      try {
        return await store.dispatch('getData', { route })
      } catch (err) {
        return error({ statusCode: 404, message: err.message })
      }
    },
    computed: {
      ...mapState([
        'locales',
        'currentLocale',
        'alternateUrl',
      ]),
    },
    head() {
      return {
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords }
        ]
      }
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
}

@media screen and (min-width: 720px) {
  .page-contact-confirmation__backdrop {
    margin-bottom: var(--spacing-big);
    background-color: var(--bg-pastel);
  }

  .page-contact-confirmation__content {
    flex-direction: row;
    background-color: var(--white);
    padding: var(--spacing-large) var(--spacing-large);
    justify-content: space-between;
  }
}

@media screen and (min-width: 1100px) {
  .page-contact-confirmation__content {
    grid-column: var(--grid-content-narrow);
    padding: var(--spacing-larger) var(--spacing-larger);
  }
}
</style>
