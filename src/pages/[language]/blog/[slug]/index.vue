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

      <toc-section
        v-if="tocItems.length"
        :items="tocItems"
        class="page-blog-post__toc"
      />
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

      <div
        v-for="(block, index) in bodyBlocks"
        :key="index"
        class="page-blog-post__body-block"
      >
        <BlockItem
          :block="block"
          :host-page-id="data.page.id"
        />
      </div>

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

    <ReachOutBlock
      v-if="data.page.reachOut"
      class="page-blog-post__reach-out"
      :data="data.page.reachOut"
    />
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'content-page' });

import BlockItem from '~/components/Blocks/BlockItem.vue';
import ReachOutBlock from '~/components/Blocks/ReachOutBlock/ReachOutBlock.vue';
import type { BlockRecord } from '~/components/Blocks/types';
import { readFragment } from '~/utils/graphql';
import type { TextBlockFragment } from '~/components/Blocks/TextBlock/TextBlock.query';
import slugify from '~/lib/slugify';
import { blogSlugQuery } from './index.query';

const { $localeUrl } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { params } = route;

const { data } = await useAsyncData(route.path, async () => {
  const result = await useFetchDatocmsContent({
    query: blogSlugQuery,
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

const bodyBlocks = computed(
  () => (data.value?.page?.bodyBlocks ?? []) as BlockRecord[],
);

const tags = computed(() => {
  return (data.value?.page?.tags || []).map((tag) => ({
    ...tag,
    to: $localeUrl({ name: 'blog-tag-slug', params: { slug: tag.slug } }),
  }));
});

type TocItem = { titleId: string; title: string };

type DastNode = {
  type?: string;
  level?: number;
  value?: string;
  children?: DastNode[];
};

function collectHeadingText(node: DastNode): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(collectHeadingText).join('');
}

function walkHeadings(node: DastNode | undefined, out: TocItem[]) {
  if (!node) return;
  if (node.type === 'heading' && node.level === 2) {
    const title = collectHeadingText(node).trim();
    if (title) {
      out.push({ titleId: slugify(title), title });
    }
  }
  for (const child of node.children ?? []) {
    walkHeadings(child, out);
  }
}

const tocItems = computed(() => {
  const items: TocItem[] = [];
  for (const block of bodyBlocks.value) {
    if (block.__typename !== 'TextBlockRecord') continue;
    const textBlock = readFragment<typeof TextBlockFragment>(block);
    const document = (
      textBlock.text?.value as { document?: DastNode } | null | undefined
    )?.document;
    walkHeadings(document, items);
  }
  return items;
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

  .page-blog-post__reach-out {
    grid-row: 6;
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
