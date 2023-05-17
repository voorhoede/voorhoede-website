<template>
  <main class="page-index">
    <div class="page-index__header">
      <page-header
        fill-screen
        curly-bracket
        :byline="data.page.headerTitle"
        :headline="data.page.subtitle"
        :image="data.page.headerIllustration"
        is-animated
        :animation-delay="pageHeaderAnimationDelay"
      />
    </div>
    <page-introduction :sections="data.page.pageIntroductionSections" />
    <section class="page-index__cta grid">
      <cta-block
        v-if="ctaSectionTop"
        :item="ctaSectionTop"
      />
    </section>
    <section class="page-index__services grid">
      <h2 class="page-index__section-title h1">
        {{ data.page.servicesHeader }}
      </h2>
      <services-list
        class="page-index__services-list"
        :services="data.page.services"
      />
      <div class="page-index__blog-posts-button">
        <app-button
          secondary
          :label="$t('all_services')"
          :to="$localeUrl({ name: 'services' })"
        />
      </div>
    </section>
    <section class="page-index__cases grid">
      <h2 class="page-index__section-title page-index__section-title--cases h1">
        {{ data.page.casesTitle }}
      </h2>
      <horizontal-carousel>
        <link-card
          v-for="caseExcerpt in data.page.cases"
          :key="caseExcerpt.slug"
          :internal-link="$localeUrl({ name: 'cases-slug', params: { slug: caseExcerpt.slug } })"
          :image="caseExcerpt.caseTeaser.image"
          :title="caseExcerpt.title"
          :body="caseExcerpt.subtitle"
        />
      </horizontal-carousel>
      <div class="page-index__blog-posts-button">
        <app-button
          :label="$t('all_cases')"
          :to="$localeUrl({ name: 'cases' })"
        />
      </div>
    </section>
    <highlighted-clients :title="data.page.clientsTitle" />
    <div
      class="page-index__academy grid"
      v-if="data.upcomingEvents[0]"
    >
      <academy-excerpt
        :date="data.upcomingEvents[0].date"
        :title="data.upcomingEvents[0].title"
        :description="data.upcomingEvents[0].social.description"
        :illustration="data.page.academyIllustration"
        :link="data.upcomingEvents[0].url"
      />
      <curly-bracket />
    </div>
    <section class="page-index__blog-posts grid">
      <h2 class="page-index__section-title page-index__section-title--blog-posts h3">
        {{ $t('latest_blog_posts') }}
      </h2>
      <div class="page-index__blog-posts-list-container grid">
        <blogs-list
          :items="data.latestBlogposts"
          item-size="small"
          class="page-index__blog-posts-list"
        />
      </div>

      <div class="page-index__blog-posts-button">
        <app-button
          secondary
          :to="$localeUrl({ name: 'blog' })"
          :label="$t('latest_blog_posts')"
        />
      </div>
      <curly-bracket side="right" />
    </section>
    <section class="page-index__pivots grid">
      <pivot-list
        v-if="data.page.pivots && data.page.pivots.length"
        :pivots="data.page.pivots"
      />
      <div class="page-index__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';
  import getSelfTypingTextInterval from '~/lib/get-self-typing-text-interval'

  const { params } = useRoute();

  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
      currentDate: new Date().toISOString(),
    }
  });

  useSeoHead(data.value.page);

  const ctaSectionTop = data.value.page.pageCtaSection[0];
  const selfTypingTextInterval = getSelfTypingTextInterval(data.value.page.subtitle) / 1000;
  const pageHeaderAnimationDelay = data.value.page.subtitle.length * selfTypingTextInterval;
</script>

<style>
  .page-index .page-introduction {
    margin-bottom: var(--spacing-larger);
  }

  .page-index__services {
    margin-bottom: var(--spacing-larger);
  }

  .page-index__section-title {
    margin-bottom: var(--spacing-large);
    grid-row-start: 1;
    grid-row-end: 2;
    text-align: center;
  }

  .page-index__cta {
    margin-bottom: var(--spacing-larger);
  }

  .page-index__section-title--blog-posts {
    margin-bottom: var(--spacing-medium);
    grid-row: 1;
  }

  .page-index__section-title--cases {
    margin-bottom: calc(var(--spacing-large) - var(--spacing-smaller));
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

  .page-index__blog-posts-list-container {
    margin-bottom: var(--spacing-small);
    grid-row: 2;
    grid-column: var(--grid-content-start) / 48;
    grid-template-rows: repeat(3, auto);
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
    grid-column: var(--grid-content);
    grid-row: 2;
  }

  .page-index__pivots {
    position: relative;
  }

  .page-index__pivots .newsletter-form {
    background-color: var(--bg-pastel);
  }

  .page-index__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
  }

  @media (min-width: 650px) {
    .page-index .page-introduction {
      margin-bottom: var(--spacing-bigger);
    }
  }

  @media (min-width: 720px) {
    .page-index .scroll-text {
      padding-top: var(--spacing-big);
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

    .page-index__services-list {
      margin-bottom: var(--spacing-large);
    }

    .page-index__cta {
      margin-bottom: var(--spacing-bigger);
    }

    .page-index__cta .pivot {
      border-top: none;
      border-bottom: 1px solid var(--very-dim);
    }

    .page-index__blog-posts {
      position: relative;
      margin-bottom: var(--spacing-big);
    }

    .page-index__blog-posts-list-container {
      grid-column: var(--grid-page);
      overflow: hidden;
    }

    .page-index__blog-posts-list {
      transition: transform var(--blog-list-item-animation-timing) ease-out;
      display: inline-block;
      grid-column-start: 8;
      grid-column-end: 30;
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

    .page-index__pivots .pivot {
      grid-column-start: 6;
      grid-column-end: 46;
    }

    .page-index__scroll-to {
      display: block;
    }
  }

  @media (min-width: 720px) and (max-width: 1100px) {
    .page-index__cases .link-card__title {
      font-size: 1.15rem;
    }
  }

  @media (min-width: 1100px) {
    .page-index .page-introduction {
      margin-bottom: var(--spacing-huge);
    }

    .page-index .scroll-text {
      padding-top: var(--spacing-bigger);
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

    .page-index .blog-list-item__time {
      grid-column-start: 16;
      grid-column-end: 21;
    }

    .page-index__blog-posts-list {
      grid-column-start: 16;
      grid-column-end: 45;
    }

    .page-index .blog-list-item__details {
      grid-column-start: 21;
      grid-column-end: 40;
    }
  }

  @media (min-width: 1440px) {
    .page-index__pivots {
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
