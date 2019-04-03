<template>
  <div class="grid page-faq">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
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
      <scroll-to direction="up" />
    </div>
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import GenericTextBlock from '~/components/generic-text-block'
  import PageHeader from '~/components/page-header'
  import ScrollTo from '~/components/scroll-to'

  export default {
    components: { GenericTextBlock, PageHeader, ScrollTo },
    asyncData,
    head
  }
</script>

<style>
  .page-faq .page-header {
    margin-bottom: var(--spacing-large);
  }

  .page-faq__overview {
    grid-row: 2;
  }

  .page-faq__overview-item {
    margin-bottom: var(--spacing-large);
  }

  .page-faq__overview .scroll-to {
    display: none;
    position: absolute;
    bottom: var(--spacing-big);
    right: var(--spacing-larger);
  }

  @media (min-width: 720px) {
    .page-faq {
      background-color: var(--bg-pastel);
    }

    .page-faq__overview {
      position: relative;
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }

    .page-faq__overview .scroll-to {
      display: flex;
    }
  }

  @media (min-width: 1100px) {
    .page-faq__overview {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }

</style>
