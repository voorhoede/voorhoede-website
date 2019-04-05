<template>
  <main class="page-index">
    <div class="page-index__header">
      <page-header
        fill-screen
        curly-bracket
        heading="byline"
        :byline="page.headerTitle"
        :headline="page.subtitle"
        :image="page.headerIllustration"
      />
      <div class="grid">
        <p class="scroll-highlighted-text">
          <scroll-highlighted-text
            v-for="(line, index) in page.usps"
            :key="index"
            :line="line"
            :index="index"
            :is-first="isFirst(index)"
            :is-last="isLast(index, page.usps)"
          />
        </p>
      </div>
    </div>
    <section class="page-index__services grid">
      <h2 class="page-index__section-title h1">{{ page.servicesHeader }}</h2>
      <services-list
        :services="page.services"
      />
    </section>
    <section class="page-index__cases grid">
      <h2 class="page-index__section-title page-index__section-title--cases h1">{{ page.casesTitle }}</h2>
      <horizontal-carousel>
        <template slot="slides">
          <case-excerpt
            v-for="caseExcerpt in page.cases"
            :key="caseExcerpt.slug"
            :slug="caseExcerpt.slug"
            :image="caseExcerpt.heroIllustration"
            :title="caseExcerpt.title"
            :body="caseExcerpt.subtitle"
          />
        </template>
      </horizontal-carousel>
      <div class="page-index__blog-posts-button">
        <app-button
          secondary
          :label="$t('all_cases')"
          :to="localeUrl('cases')"
        />
      </div>
    </section>
    <section class="page-index__clients grid">
      <h2 class="page-index__section-title page-index__section-title--clients h3 font-normal">{{ page.clientsTitle }}</h2>
      <highlighted-clients :cta-label="page.clientsButtonLabel"/>
    </section>
    <div class="page-index__academy grid" v-if="upcomingEvents[0]">
      <academy-excerpt
        :date="upcomingEvents[0].date"
        :title="upcomingEvents[0].title"
        :description="upcomingEvents[0].description"
        :illustration="page.academyIllustration"
        :link="upcomingEvents[0].url"
      />
      <curly-bracket />
    </div>
    <section class="page-index__blog-posts grid">
      <h2 class="page-index__section-title page-index__section-title--blog-posts h3">{{ $t('latest_blog_posts') }}</h2>
      <ul class="page-index__blog-posts-list grid">
        <li v-for="blogPost in latestBlogposts" :key="blogPost.slug" class="page-index__blog-posts-list-item">
          <blog-list-item :item="blogPost" />
        </li>
      </ul>
      <div class="page-index__blog-posts-button">
        <app-button
          :to="localeUrl('blog')"
          :label="$t('latest_blog_posts')"
          secondary
        />
      </div>
      <curly-bracket side="right" />
    </section>
    <div class="page-index__pivot-section grid">
      <pivot-section
        v-if="pivots && pivots.length"
        :pivot="pivots[0]"
      />
      <scroll-to direction="up" />
    </div>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import AcademyExcerpt from '~/components/academy-excerpt'
  import AppButton from '~/components/app-button'
  import BlogListItem from '~/components/blog-list-item'
  import CaseExcerpt from '~/components/case-excerpt'
  import PivotSection from '~/components/pivot-section'
  import CurlyBracket from '~/components/curly-bracket'
  import HighlightedClients from '~/components/highlighted-clients'
  import HorizontalCarousel from '~/components/horizontal-carousel'
  import PageHeader from '~/components/page-header'
  import ScrollHighlightedText from '~/components/scroll-highlighted-text'
  import ScrollTo from '~/components/scroll-to'
  import ServicesList from '~/components/services-list'

  export default {
    components: {
      AcademyExcerpt,
      AppButton,
      BlogListItem,
      CaseExcerpt,
      PivotSection,
      CurlyBracket,
      HighlightedClients,
      HorizontalCarousel,
      PageHeader,
      ScrollHighlightedText,
      ScrollTo,
      ServicesList,
    },
    asyncData,
    methods: {
      isLast(index, usps) {
        return index === Object.keys(usps).length - 1 ? { isSet: true, number: index } : { isSet: false }
      },
      isFirst(index) {
        return index === 0 ? { isSet: true, number: 0 } : { isSet: false }
      }
    },
    head,
  }
</script>

<style>
  .page-index__header {
    margin-bottom: var(--spacing-big);
    background-color: var(--bg-pastel);
  }

  .page-index__scroll-to {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .page-index__scroll-to .scroll-to {
    grid-column: 1;
  }

  .page-index__pivot-section .scroll-to {
    display: none;
    position: absolute;
    bottom: var(--spacing-large);
    grid-column: -3;
  }

  .page-index .scroll-highlighted-text {
    padding: var(--spacing-larger) 0;
  }

  .page-index__services {
    margin-bottom: var(--spacing-larger);
    grid-template-rows: repeat(2, auto);
  }

  .page-index__section-title {
    margin-bottom: var(--spacing-large);
    grid-row-start: 1;
    grid-row-end: 2;
    text-align: center;
  }

  .page-index .services-list {
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .page-index__section-title--clients {
    color: var(--dim);
    grid-row: 1;
  }

  .page-index__section-title--blog-posts {
    margin-bottom: var(--spacing-medium);
    grid-row: 1;
  }

  .page-index__section-title--cases {
    margin-bottom: calc(var(--spacing-large) - var(--spacing-smaller));
  }

  .page-index__clients {
    margin-bottom: var(--spacing-larger);
    padding-top: var(--spacing-larger);
    padding-bottom: var(--spacing-larger);
    background-color: var(--fog);
    grid-template-rows: repeat(2, auto);
  }

  .page-index .highlighted-clients {
    grid-row: 2;
  }

  .page-index__academy {
    margin-bottom: var(--spacing-large);
    padding: var(--spacing-larger) 0;
    background-color: var(--bg-pastel);
  }

  .page-index .academy-excerpt {
    grid-column: var(--grid-page);
    grid-row: 1;
  }

  .page-index__blog-posts {
    grid-template-rows: repeat(3, auto);
    margin-bottom: var(--spacing-large);
  }

  .page-index__blog-posts-list {
    margin-bottom: var(--spacing-small);
    grid-row: 2;
    grid-column: var(--grid-content-start) / 48;
    grid-template-rows: repeat(3, auto);
  }

  .page-index__blog-posts-list-item {
    grid-row: 1;
  }

  .page-index__blog-posts-list-item:nth-child(2) {
    grid-row: 2;
  }

  .page-index__blog-posts-list-item:nth-child(3) {
    grid-row: 3;
  }

  .page-index__blog-posts-button {
    display: flex;
    justify-content: center;
    grid-row: 3;
  }

  .page-index__cases {
    margin-bottom: var(--spacing-larger);
  }

  .page-index__cases .horizontal-carousel {
    margin-bottom: var(--spacing-medium);
    grid-column: var(--grid-page);
    grid-row: 2;
  }

  @media (min-width: 720px) {
    .page-index__scroll-to {
      bottom: var(--spacing-medium);
    }

    .page-index .page-header {
      margin-bottom: var(--spacing-big);
    }

    .page-index .scroll-highlighted-text {
      padding: var(--spacing-big) 0;
    }

    .page-index__cases {
      margin-bottom: var(--spacing-bigger);
    }

    .page-index__cases .horizontal-carousel__slides {
      padding-bottom: 0;
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
      margin-bottom: var(--spacing-big);
    }

    .page-index__blog-posts-list {
      grid-column: var(--grid-page);
      overflow: hidden;
    }

    .page-index__blog-posts-list-item {
      transition: transform var(--blog-list-item-animation-timing) ease-out;
      display: inline-block;
      grid-column-start: 8;
      grid-column-end: 30;
    }

    .page-index__scroll-to .scroll-to {
      grid-column: 2;
    }

    .page-index .blog-list-item__time {
      grid-column-start: 9;
      grid-column-end: 14;
      text-align: right;
    }

    .page-index .blog-list-item__details {
      grid-column-start: 14;
      grid-column-end: 31;
      margin-right: 0;
    }

    .page-index__academy {
      padding: 0;
      position: relative;
    }

    .page-index__academy .curly-bracket {
      margin-top: 0;
    }

    .page-index .academy-excerpt {
      padding: var(--spacing-larger) 0;
    }

    .page-index__pivot-section .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-larger);
      grid-column: 48;
    }

    .page-index__pivot-section {
      position: relative;
    }

    .page-index__pivot-section .pivot-section {
      grid-column-start: 6;
      grid-column-end: 45;
    }
  }

  @media (min-width: 720px) and (max-width: 1100px) {
    .page-index__cases .case-excerpt__title {
      font-size: 1.15rem;
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
      grid-column-end: 47;
    }

    .page-index__section-title {
      margin-bottom: var(--spacing-big);
    }

    .page-index__section-title--blog-posts {
      margin-bottom: var(--spacing-medium);
      grid-column-start: 21;
    }

    .page-index__cases {
      margin-bottom: var(--spacing-huge);
    }

    .page-index__clients {
      margin-bottom: var(--spacing-huge);
      padding-top: var(--spacing-big);
    }

    .page-index .blog-list-item__time {
      grid-column-start: 16;
      grid-column-end: 21;
    }

    .page-index__blog-posts-list-item {
      grid-column-start: 16;
      grid-column-end: 45;
    }

    .page-index .blog-list-item__details {
      grid-column-start: 21;
      grid-column-end: 40;
    }

    .page-index__pivot-section .scroll-to {
      bottom: var(--spacing-big);
    }
  }

  @media (min-width: 1440px) {
    .page-index__pivot-section {
      /* tweak for the inconsistent spacing of the latest-blog-post component  */
      padding-top: var(--spacing-smaller);
    }
  }

  @media (min-width: 1920px) {
    .page-index .page-header--home {
      height: 1000px;
    }
  }
</style>
