<template>
  <div class="grid page-service">
    <page-header
      heading="headline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <article class="page-service__overview">
      <template v-for="item in page.items">
        <generic-text-block
          v-if="item.__typename === 'GenericTextBlockRecord'"
          :key="item.title"
          :title="item.title"
          :body="item.body"
          :image="item.image" />
        <responsive-image
          v-if="item.__typename === 'ImageRecord'"
          :key="item.image.url"
          :image="item.image"
          :has-fixed-ratio="true"
        />
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
  import PageHeader from '~/components/page-header'
  import GenericTextBlock from '~/components/generic-text-block'
  import PivotSection from '~/components/pivot-section'
  import ResponsiveImage from '~/components/responsive-image'

  export default {
    components: {
      PageHeader,
      GenericTextBlock,
      PivotSection,
      ResponsiveImage
    },
    asyncData,
    head,
  }
</script>

<style>
  .page-service .page-header {
    margin-bottom: var(--spacing-large);
  }

  .page-service__overview {
    display: flex;
    flex-direction: column;
    grid-row: 2;
  }

  .page-service__overview .responsive-image,
  .page-service__overview .generic-text-block {
    grid-row: 3;
    margin: 0 0 var(--spacing-large) 0;
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

    .page-service__overview .responsive-image {
      width: 63%;
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
