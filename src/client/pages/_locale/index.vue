<template>
  <div class="page-index">
    <div class="page-index__header">
      <page-header brick curly-bracket>
        <template slot="title">
          <h1 v-html="home.headerTitle"/>
        </template>
        <template slot="subTitle">
          <h2 v-html="home.subtitle"/>
        </template>
        <template v-if="home.headerImage" slot="image">
          <img :src="home.headerImage.url" alt="image">
        </template>
      </page-header>
      <scroll-highlighted-text :text-lines="home.usps"/>
    </div>
    <section class="page-index__services grid">
      <h2 class="page-index__section-title h1">{{ home.servicesHeader }}</h2>
      <services-list :services="home.services"/>
    </section>
    <section class="page-index__cases">
      <div class="grid">
        <h2 class="page-index__section-title page-index__section-title--cases h1">{{ home.casesTitle }}</h2>
      </div>
      <horizontal-carousel>
        <template slot="slides">
          <div
            v-for="item in 3"
            :key="item"
          >
            <span class="body-big">Let's wait for Jesse's component</span>
          </div>
        </template>
      </horizontal-carousel>
    </section>
    <section class="page-index__clients grid">
      <h2 class="page-index__section-title page-index__section-title--clients h3 font-normal">{{ home.clientsTitle }}</h2>
      <highlighted-clients :cta-label="home.clientsButtonLabel"/>
    </section>
    <div class="page-index__academy">
      <academy-excerpt
        :date-string="upcomingEvents[0].date"
        :current-locale="currentLocale"
        :title="upcomingEvents[0].title"
        :description="upcomingEvents[0].description"
        :url="upcomingEvents[0].url"
        :illustration="home.academyIllustration"
        :cta-primary-label="home.academyPrimaryButtonLabel"
        :cta-primary-to="upcomingEvents[0].url"
        :cta-secondary-label="home.academySecondaryButtonLabel"
        :cta-secondary-to="{ name: 'locale-academy', params: { locale: currentLocale }}"
      />
    </div>
    <section class="page-index__blog-posts grid">
      <h2 class="page-index__section-title page-index__section-title--blog-posts h3">{{ home.blogPostsTitle }}</h2>
      <ul class="page-index__blog-posts-list">
        <li v-for="blogPost in latestBlogposts" :key="blogPost.slug">
          <blog-list-item :item="blogPost" :current-locale="currentLocale"/>
        </li>
      </ul>
    </section>
    <div class="grid">
      <cta-block :cta-label="home.callToActionLabel" :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }">
        <template slot="heading">
          <h3 class="h4">{{ home.callToActionTitle }}</h3>
        </template>
      </cta-block>
    </div>
  </div>
</template>

<script>
  import query from './index.query.graphql'
  import { getData } from '../../lib/get-data'
  import {
    AcademyExcerpt,
    BlogListItem,
    CtaBlock,
    HighlightedClients,
    PageHeader,
    HorizontalCarousel,
    ScrollHighlightedText,
    ServicesList,
  } from '~/components'

  export default {
    components: {
      AcademyExcerpt,
      BlogListItem,
      CtaBlock,
      HighlightedClients,
      PageHeader,
      HorizontalCarousel,
      ScrollHighlightedText,
      ServicesList,
    },
    layout: 'landing',
    data() {
      return {
        currentLocale: 'en'
      }
    },
    async asyncData({ params }) {
      const { locale } = params
      return await getData({ query, variables: { locale, altLocale: 'nl' } })
    },
  }
</script>

<style>
  .page-index__header {
    margin-bottom: var(--spacing-larger);
    background: var(--bg-pastel);
  }

  .page-index .scroll-highlighted-text {
    padding: var(--spacing-larger) 0;
  }

  .page-index__section-title {
    margin-bottom: var(--spacing-large);
    text-align: center;
  }

  .page-index__section-title--clients {
    color: var(--dim);
  }

  .page-index__section-title--blog-posts {
    margin-bottom: var(--spacing-medium);
  }

  .page-index__cases {
    margin-bottom: var(--spacing-bigger);
    text-align: center;
  }

  .page-index__clients {
    margin-bottom: var(--spacing-larger);
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    background: var(--fog);
  }

  .page-index__academy {
    margin-bottom: var(--spacing-large);
    padding: var(--spacing-larger) 0;
    background: var(--bg-pastel);
  }

  .page-index__blog-posts {
    margin-bottom: var(--spacing-bigger);
  }

  @media (min-width: 720px) {
    .page-index .page-header {
      margin-bottom: var(--spacing-big);
      height: 100vh;
    }

    .page-index .scroll-highlighted-text {
      padding: var(--spacing-big) 0;
    }

    .page-index__section-title {
      margin-bottom: var(--spacing-larger);
    }

    .page-index__section-title--blog-posts {
      margin-bottom: var(--spacing-medium);
      grid-column-start: 14;
      text-align: left;
    }

    .page-index__services {
      margin-bottom: var(--spacing-bigger);
    }

    .page-index__clients {
      margin-bottom: var(--spacing-bigger);
      padding-top: var(--spacing-larger);
    }

    .page-index__blog-posts-list {
      grid-column: page;
      overflow: hidden;
    }

    .page-index .blog-list-item {
      display: grid;
      grid-template-columns: var(--grid-columns);
    }

    .page-index .blog-list-item__time {
      grid-column-start: 9;
      grid-column-end: 14;
      text-align: right;
    }

    .page-index .blog-list-item__content {
      grid-column-start: 14;
      grid-column-end: 31;
      margin-right: 0;
    }
  }

  @media (min-width: 1100px) {
    .page-index__header {
      margin-bottom: var(--spacing-bigger);
    }

    .page-index .scroll-highlighted-text {
      padding: var(--spacing-bigger) 0;
    }

    .page-index__services > *,
    .page-index__clients > * {
      grid-column-start: 4;
      grid-column-end: -4;
    }

    .page-index__section-title {
      margin-bottom: var(--spacing-big);
    }

    .page-index__section-title--blog-posts {
      margin-bottom: var(--spacing-medium);
      grid-column-start: 21;
    }

    .page-index__clients {
      margin-bottom: var(--spacing-huge);
    }

    .page-index .blog-list-item__time {
      grid-column-start: 16;
      grid-column-end: 21;
    }

    .page-index .blog-list-item__content {
      grid-column-start: 21;
      grid-column-end: 40;
    }
  }
</style>
