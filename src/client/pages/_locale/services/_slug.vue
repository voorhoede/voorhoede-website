<template>
  <div class="grid page-service">
    <page-header-detail
      :title="page.subtitle"
      :sub-title="page.title"
      :image="page.headerIllustration"
    />
    <article class="page-service__overview">
      <template v-for="item in page.items">
        <generic-text-block
          :key="item.title"
          :title="item.title"
          :body="item.body"
          :image="item.image" />
      </template>
    </article>
  </div>
</template>

<script>
  import { PageHeaderDetail, GenericTextBlock } from '~/components'
  export default {
    components: {
      PageHeaderDetail,
      GenericTextBlock
    },
    async asyncData({ store, route, error }) {
      try {
        return await store.dispatch('getData', { route })
      } catch (err) {
        return error({ statusCode: 404, message: err.message })
      }
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

  .page-service .page-header-detail {
    grid-column: var(--grid-page);
    margin-bottom: var(--spacing-large);
  }

  .page-service__overview {
    grid-row: 2;
  }

  .page-service__overview .generic-text-block {
    grid-row: 3;
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .page-service {
      background-color: var(--bg-pastel);
    }

    .page-service__overview {
      grid-column-start: 2;
      grid-column-end: 50;
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    .page-service__overview {
      grid-column-start: 6;
      grid-column-end: 46;
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
