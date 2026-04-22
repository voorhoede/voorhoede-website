<template>
  <div class="landing-page" v-if="data?.page">
    <h1 class="sr-only">
      {{ data.page.title }}
    </h1>
    <div v-for="(section, index) in data.page.sections" class="landing-page__section" :key="index">
      <grouping-block
v-if="section.__typename === 'SectionGroupingRecord'" :items="section.items"
        :theme="section.theme" :accent-position="section.accentPosition" />
      <div class="grid landing-page__section-content">
        <image-card-grid
v-if="section.__typename === 'SectionImageCardGridRecord'" :title="section.title"
          :items="section.items" :background-color="section.backgroundColor"
          :card-orientation="section.cardOrientation" />
        <page-header
v-if="section.__typename === 'SectionHeaderRecord'" :byline="section.title"
          :headline="section.subtitle" :image="section.illustration" :fill-screen="section.layout === 'full-height'"
          :has-semantic-header="section.layout === 'full-height'" :is-animated="section.style === 'animated'"
          :curly-bracket="section.style === 'animated'" />
        <logo-grid
v-if="section.__typename === 'SectionLogoGridRecord'" :title="section.title"
          :logos="section.logos" />
        <dialogue-cta
v-if="section.__typename === 'SectionDialogueCtaRecord'" :variant="section.variant"
          :title="section.title" :body="section.body" :person="section.person" :ctas="section.ctas.map((cta) => ({
            label: cta.title,
            to: cta.url || cta.link,
            external: cta.__typename === 'ExternalLinkRecord',
            style: cta.style
          }))
            " />
        <text-image-block
v-if="section.__typename === 'SectionTextImageRecord'" :text="section.text"
          :layout="section.layout" :image="section.image" />
        <cases-list
v-if="section.__typename === 'SectionCaseListRecord'" :key="section.id" :id="section.id"
          :cases="section.cases" :max-columns="section.columns" :title="section.title" />
      </div>
    </div>
    <section class="page-index__blog-posts grid">
      <div class="grid">
        <h2 class="page-index__section-title page-index__section-title--blog-posts h3">
          {{ $t("latest_blog_posts") }}
        </h2>
      </div>
      <div class="page-index__blog-posts-list-container grid">
        <blogs-list :items="data.latestBlogposts" item-size="small" class="page-index__blog-posts-list" />
      </div>

      <div class="page-index__blog-posts-button">
        <app-button secondary :to="$localeUrl({ name: 'blog' })" :label="$t('latest_blog_posts')" />
      </div>
    </section>
    <section class="page-index__pivots grid">
      <pivot-list v-if="data.page.pivots && data.page.pivots.length" :pivots="data.page.pivots" />
      <div class="page-index__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import query from "./index.query.graphql?raw";

const route = useRoute();

const { data } = await useFetchContent({
  query,
  variables: {
    locale: route.params.language,
  },
});

useSeoHead(data.value?.page);
</script>

<style>
.landing-page__section+.landing-page__section:not(:has(.grouping-block)) {
  padding-top: var(--spacing-larger);
}

.landing-page__section--background,
.landing-page__section:last-child {
  padding-bottom: var(--spacing-big);
}

.landing-page__section--pastel-background {
  background-color: var(--bg-pastel);
}

.landing-page__section--grey-background {
  background-color: var(--fog);
}

.landing-page__section:not(.landing-page__section--background)+.landing-page__section--background {
  margin-top: var(--spacing-big);
}

/* Pivot section */
.page-index__pivots {
  position: relative;
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

@media (min-width: 720px) {
  .page-index__scroll-to {
    display: block;
  }
}

/* Blog posts section */
.page-index__blog-posts {
  position: relative;
  padding-block: var(--spacing-larger);
}

.page-index__section-title--blog-posts {
  text-align: center;
  margin-bottom: var(--spacing-large);
}

.page-index__blog-posts-button {
  text-align: center;
}

@media (min-width: 720px) {

  .landing-page__section+.landing-page__section:not(:has(.grouping-block)) {
  padding-top: var(--spacing-huge);
}

  .page-index__blog-posts {
    padding-block: var(--spacing-huge);
  }

  .page-index__section-title--blog-posts {
    grid-column: var(--grid-content-smallest);
    text-align: left;
  }
}
</style>
