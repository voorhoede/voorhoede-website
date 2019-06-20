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
        <fixed-ratio
          :height="item.image.height"
          :width="item.image.width"
          :key="item.image.url"
          v-if="item.__typename === 'ImageRecord'">
          <app-image
            :image="item.image"
          />
        </fixed-ratio>
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
  import AppImage from '~/components/app-image'
  import FixedRatio from '~/components/fixed-ratio'

  export default {
    components: {
      PageHeader,
      GenericTextBlock,
      PivotSection,
      FixedRatio,
      AppImage
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

  .page-service__overview .fixed-ratio,
  .page-service__overview .generic-text-block {
    grid-row: 3;
    margin-bottom: var(--spacing-large);
  }

  .page-service__overview .image-container {
    width: 100%;
    height: 100%;
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

    .page-service__overview .fixed-ratio {
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
