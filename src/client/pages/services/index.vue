<template>
  <div>
    <main class="page-services grid">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle"
        :image="page.headerIllustration" />
      <introduction-block
        v-if="page.introductionBlock"
        :title="page.introductionBlock.title"
        :body="page.introductionBlock.body"
        class="page-services__introduction"
      />
      <services-list
        :services="page.services"
        class="page-services__services-list"
      />
      <rich-text-block
        class="page-services__text"
        :text="page.smallServices" />
    </main>
    <pivot-list
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
    />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import PageHeader from '~/components/page-header'
  import IntroductionBlock from '~/components/introduction-block'
  import PivotList from '~/components/pivot-list'
  import ServicesList from '~/components/services-list'
  import RichTextBlock from '~/components/rich-text-block'

  export default {
    components: {
      PageHeader,
      IntroductionBlock,
      PivotList,
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

  .page-services__introduction {
    grid-row: 2;
  }

  @media (min-width: 720px) {
    .page-services__introduction {
      grid-column-start: 8;
      grid-column-end: 44;
      text-align: center;
    }
  }

  .page-services__services-list {
    grid-row: 3;
    margin-bottom: var(--spacing-larger);
  }

  .page-services__text {
    grid-row: 4;
  }

  @media (min-width: 720px) {
    .page-services__text {
      grid-column-start: 8;
      grid-column-end: 44;
      text-align: center;
      max-width: var(--small-services-width);
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-services__services-list {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>
