<template>
  <div class="grid page-service">
    <page-header
      :byline="page.title"
      :headline="page.subtitle"
      heading="byline"
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
    <pivot-section
      v-if="pivots && pivots.length"
      class="page-service__pivot-section"
      :pivot="pivots[0]"
    />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import { PageHeader, GenericTextBlock, PivotSection } from '~/components'

  export default {
    components: {
      PageHeader,
      GenericTextBlock,
      PivotSection,
    },
    asyncData,
    head,
  }
</script>

<style>

  .page-service .page-header {
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

  .page-service__pivot-section.pivot-section {
    grid-row: 4;
    grid-column: var(--grid-page);
    background-color: var(--white);
    padding: var(--spacing-big) var(--spacing-small);
    border: none;
  }

  @media (min-width: 720px) {
    .page-service {
      background-color: var(--bg-pastel);
    }

    .page-service__overview,
    .page-service__pivot-section.pivot-section {
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }

  @media (min-width: 1100px) {
    .page-service__overview,
    .page-service__pivot-section.pivot-section {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
