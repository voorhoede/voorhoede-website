<template>
  <main class="page-services grid">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />
    <services-list
      :services="page.services"
      :cta="page.serviceCtaLabel" />
    <rich-text-block
      class="services-text"
      :text="page.smallServices" />
    <get-in-touch-form
      :title="page.getInTouchTitle"
      :name-label="page.getInTouchForm.nameLabel"
      :name-placeholder="page.getInTouchForm.namePlaceholder"
      :name-error-message="page.getInTouchForm.nameErrorMessage"
      :email-label="page.getInTouchForm.emailLabel"
      :email-placeholder="page.getInTouchForm.emailPlaceholder"
      :email-error-message-empty="page.getInTouchForm.emailErrorMessageEmpty"
      :email-error-message-incorrect="page.getInTouchForm.emailErrorMessageIncorrect"
      :phone-label="page.getInTouchForm.phoneLabel"
      :phone-placeholder="page.getInTouchForm.phonePlaceholder"
      :phone-error-message="page.getInTouchForm.phoneErrorMessage"
      :summary-label="page.getInTouchForm.summaryLabel"
      :summary-placeholder="page.getInTouchForm.summaryPlaceholder"
      :summary-error-message="page.getInTouchForm.summaryErrorMessage"
      :cta-label="page.getInTouchForm.ctaButtonLabel" />
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import { PageHeader, ServicesList, GetInTouchForm, RichTextBlock } from '~/components'

  export default {
    components: { ServicesList, GetInTouchForm, PageHeader, RichTextBlock },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    head() {
      return {
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords }
        ],
      }
    }
  }
</script>

<style>
  .page-services .page-header {
    grid-column: page;
  }

  .page-services > * {
    margin-bottom: var(--spacing-big);
  }

  .page-services .services-list {
    margin-bottom: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .page-services .services-text {
      text-align: center;
      max-width: var(--small-services-width);
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-services .services-list {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>
