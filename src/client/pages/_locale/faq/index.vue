<template>
  <div class="grid page-faq">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="page-faq__overview">
      <ul>
        <li class="page-faq__overview-item" v-for="item in page.items" :key="item.title">
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
import { PageHeader, GenericTextBlock } from '~/components'

export default {
  components: {
    PageHeader,
    GenericTextBlock
  },
  async asyncData({ store, route }) {
    return await store.dispatch('getData', { route })
  }
}
</script>

<style>
  .page-faq .page-header {
    grid-column: page;
    margin-bottom: var(--spacing-large);
  }

  .page-faq__overview-item {
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .page-faq {
      background: var(--bg-pastel);
    }

    .page-faq__overview {
      grid-column-start: 2;
      grid-column-end: -2;
      background: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    .page-faq__overview {
      grid-column-start: 6;
      grid-column-end: -6;
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }

</style>

