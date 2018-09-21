<template>
  <main class="page-services grid">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <services-list :services="page.services" :text="page.smallServices"/>
    <get-in-touch-form
      :title="page.getInTouchTitle"
      :name-label="page.getInTouchForm.nameLabel"
      :name-placeholder="page.getInTouchForm.namePlaceholder"
      :email-label="page.getInTouchForm.emailLabel"
      :email-placeholder="page.getInTouchForm.emailPlaceholder"
      :phone-label="page.getInTouchForm.phoneLabel"
      :phone-placeholder="page.getInTouchForm.phonePlaceholder"
      :summary-label="page.getInTouchForm.summaryLabel"
      :summary-placeholder="page.getInTouchForm.summaryPlaceholder"
      :cta-label="page.getInTouchForm.ctaButtonLabel"
    />
  </main>
</template>

<script>
  import { PageHeader, ServicesList, GetInTouchForm } from '~/components'

  export default {
    components: {
      ServicesList,
      GetInTouchForm,
      PageHeader,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
  }
</script>

<style>
  .page-services .page-header {
    grid-column: page;
  }

  .page-services > * {
    margin-bottom: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .page-services > * {
      margin-bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-services .page-header {
      margin-bottom: var(--spacing-big);
    }

    .page-services .services-list {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>
