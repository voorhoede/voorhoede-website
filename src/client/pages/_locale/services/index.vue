<template>
  <main class="page-services grid">
    <services-list :services="page.services"/>
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
  import { ServicesList, GetInTouchForm } from '~/components'

  export default {
    components: {
      ServicesList,
      GetInTouchForm,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
  }
</script>

<style>
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
  }
</style>
