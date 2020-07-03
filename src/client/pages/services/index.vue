<template>
  <div>
    <main class="page-services grid">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration" />
      <services-list :services="page.services"/>
      <rich-text-block
        class="services-text"
        :text="page.smallServices" />
    </main>
    <pivot-section
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
    />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import PageHeader from '~/components/page-header'
  import PivotSection from '~/components/pivot-section'
  import ServicesList from '~/components/services-list'
  import RichTextBlock from '~/components/rich-text-block'

  export default {
    components: {
      PageHeader,
      PivotSection,
      ServicesList,
      RichTextBlock,
    },
    asyncData,
    head
  }
</script>

<style>
  .page-services > * {
    margin-bottom: var(--spacing-big);
  }

  .page-services .services-list {
    grid-row: 2;
    margin-bottom: var(--spacing-larger);
  }

  .page-services .services-text {
    grid-row: 3;
  }

  @media (min-width: 720px) {
    .page-services .services-text {
      text-align: center;
      max-width: var(--small-services-width);
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-services .services-list {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>
