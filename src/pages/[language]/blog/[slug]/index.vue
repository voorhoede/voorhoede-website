<template>
  <main class="page-blog-post grid">
    <page-header
      class="page-blog-post__header"
      heading="headline"
      :headline="data.page.title"
      :byline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />

    <aside class="page-blog-post__aside">
      <blog-author
        class="page-blog-post__aside-author"
        :item="data.page"
      />
      <open-in-llm class="page-blog-post__open-in-llm" />
      <social-share-buttons
        :base-url="runtimeConfig.public.baseUrl"
        :title="data.page.seo?.title || data.page.title"
        :authors="data.page.authors"
      />

      <div
        v-if="tags?.length"
        class="page-blog-post__tags"
      >
        <h2 class="sr-only">
          {{ $t('tags') }}
        </h2>

        <tag-list :items="tags" />
      </div>
    </aside>

    <article class="page-blog-post-list">
      <div v-if="data.page.isArchived">
        <div class="page-blog-post__archived">
          <p class="font-html-blue body-big">
            {{ $t('archived_blogpost') }}
          </p>

          <app-button
            class="page-blog-post__archived-button"
            :label="$t('all_blogposts')"
            :to="$localeUrl({ name: 'blog' })"
          />
        </div>
      </div>

      <text-block v-if="data.page.introTitle">
        <p class="font-html-blue testimonial">
          {{ data.page.introTitle }}
        </p>
      </text-block>

      <Blocks
        v-if="data.page.bodyBlocks?.length"
        :blocks="data.page.bodyBlocks"
        :host-page-id="data.page.id"
      />

      <custom-script
        v-if="data.page.onMountedScript"
        :mount-script="data.page.onMountedScript"
        :unmount-script="data.page.onUnmountedScript"
      />

      <section v-if="relatedBlogPosts.length">
        <h2 class="h3 page-blog-post__related-blog-posts-title">
          {{ $t('related_blog_posts') }}
        </h2>
        <blogs-list
          :items="relatedBlogPosts"
          item-size="small"
        />
      </section>
    </article>

    <div
      class="page-blog-post__link-container"
      ref="articleEnd"
    >
      <app-link
        class="app-button app-button--secondary body font-bold"
        :to="$localeUrl({ name: 'blog' })"
      >
        &larr; {{ $t('all_blogposts') }}
      </app-link>
    </div>

    <section class="page-blog-post__pivots grid">
      <div class="page-blog-post__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'content-page' });

import { CaseListBlockFragment } from '~/components/Blocks/CaseListBlock/CaseListBlock.query';
import { EventsListBlockFragment } from '~/components/Blocks/EventsListBlock/EventsListBlock.query';
import { GroupingBlockFragment } from '~/components/Blocks/GroupingBlock/GroupingBlock.query';
import { ImageGridBlockFragment } from '~/components/Blocks/ImageGridBlock/ImageGridBlock.query';
import { LocationsListBlockFragment } from '~/components/Blocks/LocationsListBlock/LocationsListBlock.query';
import { LogoGridBlockFragment } from '~/components/Blocks/LogoGridBlock/LogoGridBlock.query';
import { PageHeaderBlockFragment } from '~/components/Blocks/PageHeaderBlock/PageHeaderBlock.query';
import { PageListBlockFragment } from '~/components/Blocks/PageListBlock/PageListBlock.query';
import { PagePartialBlockFragment } from '~/components/Blocks/PagePartialBlock/PagePartialBlock.query';
import { ReachOutBlockFragment } from '~/components/Blocks/ReachOutBlock/ReachOutBlock.query';
import { TeamGalleryBlockFragment } from '~/components/Blocks/TeamGalleryBlock/TeamGalleryBlock.query';
import { TextBlockFragment } from '~/components/Blocks/TextBlock/TextBlock.query';
import { TextImageBlockFragment } from '~/components/Blocks/TextImageBlock/TextImageBlock.query';
import { ActionBlockFragment } from '~/components/Blocks/ActionBlock/ActionBlock.query';
import { ImageBlockFragment } from '~/components/Blocks/shared/structuredText.query';
import Blocks from '~/components/Blocks/Blocks.vue';

const { $localeUrl } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { params } = route;

const query = graphql(
  `
    query BlogSlug($locale: SiteLocale, $slug: String) {
      page: blogPost(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        slug
        i18nSlugs: _allSlugLocales {
          locale
          value
        }
        title
        subtitle
        isArchived
        headerIllustration {
          url
          alt
          width
          height
        }
        date: _firstPublishedAt
        authors {
          name
          lastName
          slug
          image {
            url
            alt
            width
            height
          }
        }
        introTitle
        seo {
          title
          description
          image {
            url
          }
        }
        bodyBlocks {
          __typename
          ...ActionBlockRecordFragment
          ...CaseListBlockFragment
          ...EventsListBlockFragment
          ...GroupingBlockFragment
          ...ImageBlockFragment
          ...ImageGridBlockFragment
          ...LocationsListBlockFragment
          ...LogoGridBlockFragment
          ...PageHeaderBlockFragment
          ...PageListBlockFragment
          ...PagePartialBlockFragment
          ...ReachOutBlockFragment
          ...TeamGalleryBlockFragment
          ...TextBlockFragment
          ...TextImageBlockFragment
        }
        relatedBlogPosts {
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
        tags {
          id
          title
          slug
          blogPosts: _allReferencingBlogPosts(
            first: 3
            filter: { slug: { neq: $slug } }
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
        onMountedScript
        onUnmountedScript
      }
    }
  `,
  [
    ActionBlockFragment,
    CaseListBlockFragment,
    EventsListBlockFragment,
    GroupingBlockFragment,
    ImageBlockFragment,
    ImageGridBlockFragment,
    LocationsListBlockFragment,
    LogoGridBlockFragment,
    PageHeaderBlockFragment,
    PageListBlockFragment,
    PagePartialBlockFragment,
    ReachOutBlockFragment,
    TeamGalleryBlockFragment,
    TextBlockFragment,
    TextImageBlockFragment,
  ],
);

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query,
    variables: {
      slug: params.slug as string,
      locale: params.language as 'nl' | 'en',
    },
  });

  return result.data;
});

if (!data.value?.page) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found' });
}

useSeoHead({
  title: data.value.page.title,
  i18nSlugs: data.value.page.i18nSlugs,
  social: data.value.page.seo,
});

const tags = computed(() => {
  return (data.value?.page?.tags || []).map((tag) => ({
    ...tag,
    to: $localeUrl({ name: 'blog-tag-slug', params: { slug: tag.slug } }),
  }));
});

const relatedBlogPosts = computed(() => {
  if (!data.value?.page) return [];

  let concatenatedRelatedBlogPosts = [...data.value.page.relatedBlogPosts];

  if (concatenatedRelatedBlogPosts.length < 3) {
    concatenatedRelatedBlogPosts = data.value.page.tags.reduce((out, tag) => {
      const tagBlogPosts = tag.blogPosts.filter((tagPost) => {
        const outSlugs = out.map((outPost) => outPost.slug);
        return !outSlugs.includes(tagPost.slug);
      });

      return out.concat(tagBlogPosts);
    }, concatenatedRelatedBlogPosts);
  }

  return concatenatedRelatedBlogPosts.slice(0, 3);
});
</script>

<style>
  .page-blog-post__header,
  .page-blog-post__aside-author,
  .page-blog-post__button {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post-list > * {
    margin-bottom: var(--spacing-large);
  }

  .page-blog-post__aside {
    justify-content: space-between;
    grid-row: 2;
  }

  .page-blog-post__open-in-llm {
    margin-bottom: var(--spacing-smaller);
  }

  .page-blog-post__tags {
    margin-top: var(--spacing-large);
  }

  .page-blog-post__link-container {
    grid-row: 5;
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-bigger);
  }

  .page-blog-post__pivots {
    position: relative;
    grid-column: var(--grid-page);
    grid-row: 6;
    background-color: var(--bg-pastel);
  }

  .page-blog-post__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
  }

  .page-blog-post-list {
    grid-row: 3;
    max-width: 100%;
  }

  .page-blog-post__archived {
    margin-top: var(--spacing-medium);
    background-color: var(--brand-yellow);
    padding: var(--spacing-large);
  }

  .page-blog-post__archived-button {
    margin-top: var(--spacing-medium);
  }

  .page-blog-post__related-blog-posts-title {
    margin-bottom: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .page-blog-post-list > * {
      margin-bottom: var(--spacing-larger);
      padding: 0 var(--spacing-larger);
    }

    .page-blog-post__header,
    .page-blog-post__button {
      margin-bottom: var(--spacing-larger);
    }

    .page-blog-post-list {
      grid-row: 2;
      grid-column-start: 10;
      grid-column-end: 50;
    }

    .page-blog-post__aside {
      grid-column-start: 2;
      grid-column-end: 9;
    }

    .page-blog-post__link-container {
      grid-column-start: 4;
      grid-column-end: 48;
    }

    .page-blog-post__scroll-to {
      display: block;
    }

    .page-blog-post__archived {
      margin-top: 0;
    }
  }

  @media (min-width: 1100px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-big);
    }

    .page-blog-post-list {
      grid-column-start: 12;
      grid-column-end: 46;
    }

    .page-blog-post__aside {
      grid-column-start: 4;
      grid-column-end: 11;
    }
  }

  @media (min-width: 1440px) {
    .page-blog-post-list > * {
      padding: 0 var(--spacing-bigger);
    }

    .page-blog-post-list {
      grid-column-start: 12;
      grid-column-end: 44;
    }
  }
</style>
