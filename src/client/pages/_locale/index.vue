<template>
  <div class="page-index">
    <div class="page-index__header">
      <page-header
        is-homepage
        :title="page.headerTitle"
        :sub-title="page.subtitle"
        :image="page.headerIllustration"/>
      <div class="page-index__scroll-to grid">
        <scroll-to/>
      </div>
      <div class="grid">
        <scroll-highlighted-text :text-lines="page.usps"/>
      </div>
    </div>
    <section class="page-index__services grid">
      <h2 class="page-index__section-title h1">{{ page.servicesHeader }}</h2>
      <services-list :services="page.services"/>
    </section>
    <section class="page-index__cases">
      <div class="grid">
        <h2 class="page-index__section-title page-index__section-title--cases h1">{{ page.casesTitle }}</h2>
      </div>
      <horizontal-carousel>
        <template slot="slides">
          <div
            v-for="(caseExcerpt, index) in page.cases"
            :key="caseExcerpt.id"
          >
            <case-excerpt
              :case-id="caseExcerpt.slug"
              :primary-label="page.casePrimaryCtaLabel"
              :slug="caseExcerpt.slug"
              :secondary-label="page.caseSecondaryCtaLabel"
              :image-url="caseExcerpt.heroIllustration.url"
              :title="caseExcerpt.title"
              :body="caseExcerpt.subtitle"
              :align-tooltip="(index === 0) ? 'left' : (index === 2 ? 'right' : '')"
            />
          </div>
        </template>
      </horizontal-carousel>
    </section>
    <section class="page-index__clients grid">
      <h2 class="page-index__section-title page-index__section-title--clients h3 font-normal">{{ page.clientsTitle }}</h2>
      <highlighted-clients :cta-label="page.clientsButtonLabel"/>
    </section>
    <div class="page-index__academy grid">
      <academy-excerpt
        :date-string="upcomingEvents[0].date"
        :current-locale="currentLocale"
        :title="upcomingEvents[0].title"
        :description="upcomingEvents[0].description"
        :url="upcomingEvents[0].url"
        :illustration="page.academyIllustration"
        :cta-primary-label="page.academyPrimaryButtonLabel"
        :cta-primary-to="upcomingEvents[0].url"
        :cta-secondary-label="page.academySecondaryButtonLabel"
        :cta-secondary-to="{ name: 'locale-academy', params: { locale: currentLocale }}"
      />
      <div class="page-index__curly-bracket-column">
        <img class="page-index__curly-bracket" src="/images/curly-bracket--blue.svg" alt="">
      </div>
    </div>
    <section class="page-index__blog-posts grid">
      <h2 class="page-index__section-title page-index__section-title--blog-posts h3">{{ page.blogPostsTitle }}</h2>
      <ul class="page-index__blog-posts-list">
        <li v-for="blogPost in latestBlogposts" :key="blogPost.slug">
          <blog-list-item :item="blogPost" :current-locale="currentLocale"/>
        </li>
      </ul>
      <div class="page-index__curly-bracket-column page-index__curly-bracket-column--right">
        <img class="page-index__curly-bracket" src="/images/curly-bracket--close-blue.svg" alt="">
      </div>
    </section>
    <div class="grid">
      <cta-block :cta-label="page.callToActionLabel" :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }">
        <template slot="heading">
          <h3 class="h4">{{ page.callToActionTitle }}</h3>
        </template>
      </cta-block>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {
    AcademyExcerpt,
    BlogListItem,
    CtaBlock,
    CaseExcerpt,
    HighlightedClients,
    PageHeader,
    HorizontalCarousel,
    ScrollHighlightedText,
    ScrollTo,
    ServicesList,
  } from '~/components'

  export default {
    components: {
      AcademyExcerpt,
      BlogListItem,
      CtaBlock,
      CaseExcerpt,
      HighlightedClients,
      PageHeader,
      HorizontalCarousel,
      ScrollHighlightedText,
      ScrollTo,
      ServicesList,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    computed: {
      ...mapState(['currentLocale'])
    }
  }
</script>

<style>
  .page-index__header {
    margin-bottom: var(--spacing-larger);
    background: var(--bg-pastel);
  }

  .page-index__scroll-to {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .page-index .scroll-to {
    grid-column-start: 1;
    grid-column-end: 3;
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
    grid-row: 1;
  }

  .page-index__section-title--cases {
    margin-bottom: calc(var(--spacing-large) - var(--spacing-smaller));
  }

  .page-index__cases .horizontal-carousel__slides {
    padding-bottom: var(--spacing-huge);
  }

  .page-index__cases .case-excerpt {
    padding-top: var(--spacing-smaller);
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

  .page-index .academy-excerpt {
    grid-column: page;
    grid-row: 1;
  }

  .page-index__curly-bracket-column {
    margin-top: var(--spacing-big);
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 1;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
  }

  .page-index__curly-bracket-column--right {
    grid-column-start: -4;
    grid-column-end: -1;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .page-index__curly-bracket {
    max-height: 100%;
    position: absolute;
    right: 0;
  }

  .page-index__curly-bracket-column--right .page-index__curly-bracket {
    right: auto;
    left: 0;
  }

  .page-index__blog-posts {
    margin-bottom: var(--spacing-bigger);
  }

  .page-index__blog-posts-list {
    grid-row: 2;
    grid-column-end: -3;
  }

  @media (min-width: 540px) {
    .page-index__curly-bracket-column {
      max-height: none;
      overflow: visible;
      grid-column-start: 3;
      grid-column-end: 5;
    }

    .page-index__curly-bracket-column--right {
      grid-column-start: -4;
      grid-column-end: -1;
    }

    .page-index__curly-bracket {
      top: 0;
      height: auto;
      width: 80%;
    }
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

    .page-index__blog-posts {
      position: relative;
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

    .page-index__academy {
      padding: 0;
      position: relative;
    }

    .page-index .academy-excerpt {
      padding: var(--spacing-larger) 0;
    }

    .page-index__curly-bracket-column {
      margin-top: 0;
      position: absolute;
      top: calc(-1 * var(--spacing-medium));
      bottom: calc(-1 * var(--spacing-medium));
      grid-column-start: 2;
      grid-column-end: 6;
    }

    .page-index__curly-bracket-column--right {
      grid-row-start: 1;
      grid-column-start: -6;
      grid-column-end: -2;
    }

    .page-index__curly-bracket {
      position: static;
      height: 100%;
      width: auto;
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

  @media (min-width: 1440px) {
    .page-index .scroll-to {
      grid-column-start: 4;
      grid-column-end: 5;
    }

    .page-index .page-header__text {
      margin: var(--spacing-larger) 0;
      grid-column-end: 24;
    }
  }
</style>
