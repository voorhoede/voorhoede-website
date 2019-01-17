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
      const baseUrl = process.env.baseUrl
      const defaultShareImg = `${baseUrl}/images/social/logo-wide.jpg`

      return {
        htmlAttrs: {
          lang: this.currentLocale
        },
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords },
          { 'name': 'twitter:title', 'content': this.page.social.title },
          { 'name': 'twitter:description', 'content': this.page.social.description },
          { 'name': 'twitter:image', 'content': this.page.social.image ? this.page.social.image.url : defaultShareImg },
        ],
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
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    .page-service__overview {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
