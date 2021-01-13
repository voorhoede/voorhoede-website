<template>
  <div>
    <main class="page-services grid">
      <page-header
        heading="byline"
        :byline="page.title"
        :headline="page.subtitle" />
      <image-with-text-block
        :title="page.introTitle"
        :body="page.introBody"
        :image="page.introImage"
        :inverse="true"
        class="page-services__intro"
      />
      <ul class="page-services__services-list">
        <li
          v-for="(service, index) in page.services"
          :key="service.ctaLink">
          <service-excerpt
            :title="service.excerptTitle"
            :slug="service.slug"
            :image="service.cardImage"
            :body="service.cardBody"
            :is-flipped="index % 2 !== 0"
          />
          <services-shortlinks
            class="page-services__shortlinks"
            :class="{'page-services__shortlinks--indented': index % 2 == 0}"
            :services="childServices(service.slug)"
          />
        </li>
      </ul>
      <rich-text-block
        class="page-services__text"
        :text="page.smallServices" />
    </main>
    <pivot-list
      class="page-services__pivots"
      v-if="page.pivots && page.pivots.length"
      :pivots="page.pivots"
    />
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import PageHeader from '~/components/page-header'
  import ImageWithTextBlock from '~/components/image-with-text-block'
  import PivotList from '~/components/pivot-list'
  import ServiceExcerpt from '~/components/service-excerpt'
  import RichTextBlock from '~/components/rich-text-block'
  import ServicesShortlinks from '~/components/services-shortlinks'

  export default {
    components: {
      PageHeader,
      ImageWithTextBlock,
      PivotList,
      ServiceExcerpt,
      RichTextBlock,
      ServicesShortlinks
    },
    asyncData,
    methods: {
      childServices(slug) {
        const { serviceSeries } = this.page.services.find(service => service.slug === slug)
        return serviceSeries[0].childServices
      }
    },
    head
  }
</script>

<style>
  .page-services {
    background-color: var(--bg-pastel);
  }

  .page-services > * {
    margin-bottom: var(--spacing-big);
  }

  .page-services__intro {
    grid-column: var(--grid-page);
  }

  .page-services__pivots .newsletter-form {
    background-color: var(--bg-pastel);
  }

  .page-services__services-list {
    grid-column: var(--grid-content);
    margin-bottom: var(--spacing-larger);
    list-style: none;
  }

  .page-services__services-list > * + * {
    margin-top: var(--spacing-large);
  }

  .page-services__shortlinks {
    margin-top: var(--spacing-small);
    margin-left: var(--spacing-medium);
  }

  .page-services__text {
    grid-row: 4;
  }

  @media (min-width: 720px) {
    .page-services__intro {
      grid-column: var(--grid-content);
    }

    .page-services__text {
      grid-column-start: 8;
      grid-column-end: 44;
      text-align: center;
      max-width: var(--small-services-width);
    }

    .page-services__services-list > * + * {
      margin-top: var(--spacing-larger);
    }

    .page-services__shortlinks {
      margin-top: var(--spacing-medium);
    }

    .page-services__shortlinks--indented {
      margin-left: 40%;
    }
  }

  @media (min-width: 1100px) {
    .page-services > * {
      margin-bottom: var(--spacing-bigger);
    }

    .page-services__services-list > * + * {
      margin-top: var(--spacing-big);
    }

    .page-services__shortlinks:not(.page-services__shortlinks--indented) {
      margin-left: var(--spacing-larger);
    }
  }

  @media (min-width: 1200px) {
    .page-services__services-list {
      grid-column: var(--grid-content-narrow);
    }
  }
</style>
