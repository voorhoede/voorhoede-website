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
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :body="item.body"
            :image="item.image"
          />
          <responsive-image
            v-if="item.__typename === 'ImageRecord'"
            :key="item.id"
            :id="item.id"
            :image="item.image"
            :caption="item.caption"
            :has-fixed-ratio="true"
          />
          <blockquote-block
            v-if="item.__typename === 'CallToActionRecord'"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :body="item.body"
            :link-label="item.linkLabel"
            :link-url="item.linkUrl"
          />
        </template>
      </article>
    </main>
    <pivot-list
      class="page-service__pivots"
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
    />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import GenericTextBlock from '~/components/generic-text-block'
  import PageHeader from '~/components/page-header'
  import PivotList from '~/components/pivot-list'
  import BlockquoteBlock from '~/components/blockquote-block'
  import ResponsiveImage from '~/components/responsive-image'

  export default {
    components: {
      GenericTextBlock,
      PageHeader,
      PivotList,
      BlockquoteBlock,
      ResponsiveImage,
    },
    asyncData,
    head,
  }
</script>

<style>
  .page-service .page-header {
    margin-bottom: var(--spacing-large);
  }

  .page-service__pivots .newsletter-form,
  .page-service__pivots .contact-form {
    background-color: var(--bg-pastel);
  }

  .page-service__overview {
    display: flex;
    grid-row: 2;
    flex-direction: column;
  }

  .page-service__overview .responsive-image,
  .page-service__overview .generic-text-block,
  .page-service__overview .blockquote-block {
    grid-row: 3;
    margin: 0 0 var(--spacing-large) 0;
  }

  .page-service__overview .blockquote-block__title {
    font-size: 1.3rem;
    line-height: 1.2;
  }

  .page-service__overview .blockquote-block__body {
    font-size: 1.1rem;
    line-height: 1.5;
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

    .page-service__overview {
      grid-column: var(--grid-content);
    }

    .page-service__overview .generic-text-block {
      grid-template-columns: 70% 1fr;
    }

    .page-service__overview .blockquote-block__title {
      font-size: 1.4rem;
      line-height: 1.2;
    }

    .page-service__overview .blockquote-block__body {
      font-size: 1.2rem;
      line-height: 1.5;
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

    .page-service__overview .blockquote-block__body,
    .page-service__overview .generic-text-block__body {
      font-size: 1.375rem;
      line-height: 1.8181818182;
    }

    .page-service__overview .blockquote-block__title,
    .page-service__overview .generic-text-block__title {
      font-size: 2.0625rem;
      line-height: 1.3636363636;
    }
  }
</style>
