<template>
  <div>
    <main class="page-service grid">
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
            :image="item.image"
          />
          <responsive-image
            v-if="item.__typename === 'ImageRecord'"
            :key="item.image.url"
            :image="item.image"
            :caption="item.caption"
            :has-fixed-ratio="true"
          />
        </template>
      </article>
      <pivot-section
        v-if="pivots && pivots.length"
        class="page-service__pivot-section"
        :pivot="pivots[0]"
      />
    </main>
    <newsletter-form />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import PageHeader from '~/components/page-header'
  import GenericTextBlock from '~/components/generic-text-block'
  import PivotSection from '~/components/pivot-section'
  import ResponsiveImage from '~/components/responsive-image'
  import NewsletterForm from '~/components/newsletter-form'

  export default {
    components: {
      PageHeader,
      GenericTextBlock,
      PivotSection,
      ResponsiveImage,
      NewsletterForm,
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
    grid-row: 2;
    flex-direction: column;
  }

  .page-service__overview .responsive-image,
  .page-service__overview .generic-text-block {
    grid-row: 3;
    margin: 0 0 var(--spacing-large) 0;
  }

  .page-service__pivot-section.pivot-section {
    grid-column: var(--grid-page);
    grid-row: 4;
    padding: var(--spacing-big) var(--spacing-small);
    border: none;
  }

  .page-service__overview .generic-text-block__title {
    font-size: 1.5rem;
    line-height: 1.2083333333;
  }

  .page-service__overview .generic-text-block__body {
    font-size: 1.125rem;
    line-height: 1.6666666667;
  }

  @media (min-width: 720px) {
    .page-service .page-header {
      margin-bottom: var(--spacing-big);
    }

    .page-service__overview,
    .page-service__pivot-section.pivot-section {
      grid-column: var(--grid-content);
    }

    .page-service__overview .generic-text-block {
      grid-template-columns: 70% 1fr;
    }

    .page-service__overview .generic-text-block__body {
      font-size: 1.25rem;
      line-height: 1.75;
    }

    .page-service__overview .generic-text-block__title {
      font-size: 1.6875rem;
      line-height: 1.3333333333;
    }

    .page-service__overview .responsive-image {
      width: 70%;
    }
  }

  @media (min-width: 1100px) {
    .page-service__overview {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-service__overview .generic-text-block__body {
      font-size: 1.375rem;
      line-height: 1.8181818182;
    }

    .page-service__overview .generic-text-block__title {
      font-size: 2.0625rem;
      line-height: 1.3636363636;
    }
  }
</style>
