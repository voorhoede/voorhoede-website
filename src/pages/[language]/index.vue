<template>
  <main>
    <h1 class="sr-only">{{ data?.homePage?.title }}</h1>
    <Blocks v-if="data?.homePage?.sections" :blocks="data.homePage.sections" />
    <section class="page-index__blog-posts grid">
      <div class="grid">
        <h2
          class="page-index__section-title page-index__section-title--blog-posts h3"
        >
          {{ $t("latest_blog_posts") }}
        </h2>
      </div>
      <div class="page-index__blog-posts-list-container grid">
        <BlogsList
          :items="data?.latestBlogposts!"
          item-size="small"
          class="page-index__blog-posts-list"
        />
      </div>

      <div class="page-index__blog-posts-button">
        <AppButton
          secondary
          :to="$localeUrl({ name: 'blog' })"
          :label="$t('latest_blog_posts')"
        />
      </div>
    </section>
    <div class="grid">
      <div class="page__scroll-to">
        <ScrollTo direction="up" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "content-page" });

import { useFetchDatocmsContent } from "~/composables/useFetchDatocmsContent";
import { graphql } from "~/utils/graphql";

import { CaseListBlockFragment } from "~/components/Blocks/CaseListBlock/CaseListBlock.query";
import { DialogueCtaBlockFragment } from "~/components/Blocks/DialogueCtaBlock/DialogueCtaBlock.query";
import { GroupingBlockFragment } from "~/components/Blocks/GroupingBlock/GroupingBlock.query";
import { ImageCardGridBlockFragment } from "~/components/Blocks/ImageCardGridBlock/ImageCardGridBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";
import { TextBlockFragment } from "~/components/Blocks/TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "~/components/Blocks/TextImageBlock/TextImageBlock.query";

const route = useRoute();
const query = graphql(
  `
    query HomePage($locale: SiteLocale!) {
      homePage(locale: $locale) {
        title
        seo {
          title
          description
          image {
            url
            alt
            width
            height
          }
        }
        sections {
          __typename
          ...CaseListBlockFragment
          ...DialogueCtaBlockFragment
          ...GroupingBlockFragment
          ...ImageCardGridBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PagePartialBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
        }
      }

      latestBlogposts: allBlogPosts(
        locale: $locale
        first: 3
        orderBy: _firstPublishedAt_DESC
        filter: { isArchived: { eq: "false" }, _locales: { allIn: [$locale] } }
      ) {
        slug
        title
        date: _firstPublishedAt
        authors {
          name
          image {
            url
            alt
            width
            height
          }
        }
      }
    }
  `,
  [
    CaseListBlockFragment,
    DialogueCtaBlockFragment,
    GroupingBlockFragment,
    ImageCardGridBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PagePartialBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: { locale: route.params.language as "nl" | "en" },
  });

  return result.data;
});

if (data.value?.homePage && data.value.homePage.seo) {
  useSeoHead({
    title: data.value.homePage.title,
    social: data.value.homePage.seo,
  });
}
</script>

<style scoped>
.page__scroll-to {
  display: none;
  grid-column-start: -2;
  grid-column-end: -3;
  margin-bottom: var(--spacing-medium);

  @media (min-width: 720px) {
    display: block;
  }
}

/* Blog posts section */
.page-index__blog-posts {
  position: relative;
  margin-block-end: var(--spacing-larger);
}

.page-index__section-title--blog-posts {
  text-align: center;
  margin-bottom: var(--spacing-large);
}

.page-index__blog-posts-button {
  text-align: center;
}

@media (min-width: 720px) {
  .page-index__section-title--blog-posts {
    grid-column: var(--grid-content-smallest);
    text-align: left;
  }
}
</style>
