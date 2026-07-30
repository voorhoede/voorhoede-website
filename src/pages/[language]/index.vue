<template>
  <main>
    <h1 class="sr-only">{{ data?.homePage?.title }}</h1>
    <Blocks
      v-if="data?.homePage?.bodyBlocks"
      :blocks="data.homePage.bodyBlocks as BlockRecord[]"
      :host-page-id="data.homePage.id"
    />
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

import { EventsListBlockFragment } from "~/components/Blocks/EventsListBlock/EventsListBlock.query";
import {
  CodeBlockFragment,
  EmbedBlockFragment,
  GroupingBlockFragment,
  TestimonialBlockFragment,
} from "~/components/Blocks/GroupingBlock/GroupingBlock.query";
import { ImageGridBlockFragment } from "~/components/Blocks/ImageGridBlock/ImageGridBlock.query";
import { LogoGridBlockFragment } from "~/components/Blocks/LogoGridBlock/LogoGridBlock.query";
import { PageHeaderBlockFragment } from "~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query";
import { PageListBlockFragment } from "~/components/Blocks/PageListBlock/PageListBlock.query";
import { PagePartialBlockFragment } from "~/components/Blocks/PagePartialBlock/PagePartialBlock.query";
import { ReachOutBlockFragment } from "~/components/Blocks/ReachOutBlock/ReachOutBlock.query";
import { TeamGalleryBlockFragment } from "~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query";
import { TextBlockFragment } from "~/components/Blocks/TextBlock/TextBlock.query";
import { TextImageBlockFragment } from "~/components/Blocks/TextImageBlock/TextImageBlock.query";
import { ActionBlockFragment } from "~/components/Blocks/ActionBlock/ActionBlock.query";
import { BlogsSectionBlockFragment } from "~/components/Blocks/BlogsSectionBlock/BlogsSectionBlock.query";
import {
  ImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
} from "~/components/Blocks/shared/structuredText.query";
import type { BlockRecord } from "~/components/Blocks/types";

const route = useRoute();
const query = graphql(
  `
    query HomePage($locale: SiteLocale!) {
      homePage(locale: $locale) {
        id
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
        bodyBlocks {
          __typename
          ...ActionBlockRecordFragment
          ...BlogsSectionBlockFragment
          ...CodeBlockFragment
          ...EmbedBlockFragment
          ...EventsListBlockFragment
          ...GroupingBlockFragment
          ...ImageBlockFragment
          ...ImageGridBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PageListBlockFragment
          ...PagePartialBlockFragment
          ...ReachOutBlockFragment
          ...TeamGalleryBlockFragment
          ...TestimonialBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
          ...VideoBlockFragment
          ...VideoEmbedBlockFragment
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
    ActionBlockFragment,
    BlogsSectionBlockFragment,
    CodeBlockFragment,
    EmbedBlockFragment,
    EventsListBlockFragment,
    GroupingBlockFragment,
    ImageBlockFragment,
    ImageGridBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PageListBlockFragment,
    PagePartialBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TestimonialBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
    VideoBlockFragment,
    VideoEmbedBlockFragment,
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
