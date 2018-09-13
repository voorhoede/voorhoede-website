<template>
  <div class="grid page-service">
    <page-header-detail
      :title="page.subtitle"
      :sub-title="page.title"
      :image="page.headerIllustration"
    />
    <div class="page-service__overview">
      <ul>
        <li class="page-service__overview-item" v-for="item in page.items" :key="item.title">
          <generic-text-block
            :title="item.title"
            :body="item.body"
            :image="item.image"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
 <script>
import { PageHeaderDetail, GenericTextBlock } from '~/components'
 export default {
  components: {
    PageHeaderDetail,
    GenericTextBlock
  },
  async asyncData({ store, route }) {
    return await store.dispatch('getData', { route })
  }
}
</script>
 <style>
  .page-service .page-header-detail {
    grid-column: page;
    margin-bottom: var(--spacing-large);
  }

  .page-service__overview-item {
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .page-service {
      background: var(--bg-pastel);
    }

    .page-service__overview {
      grid-column-start: 2;
      grid-column-end: -2;
      background: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    .page-service__overview {
      grid-column-start: 6;
      grid-column-end: -6;
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
 </style>
