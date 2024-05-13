<template>
  <div key="page-blog">
    <main class="page-blog">
      <page-header
        heading="byline"
        :byline="pageData.page.title"
        :headline="pageData?.tag?.name || pageData.page.subtitle"
        :image="pageData.page.headerIllustration"
      />

      <section
        :id="SECTION_ID"
        class="page-blog-container grid"
      >
        <h2 class="sr-only">
          {{ $t('blog_overview') }}
        </h2>

        <text-block class="page-blog__text">
          <p class="testimonial">
            {{ pageData.page.description }}
          </p>
        </text-block>

        <nav class="page-blog__tags">
          <tag-list :items="tags" />
        </nav>

        <blogs-list
          :items="pageData.items"
          :pinned-items="shouldShowPinnedPosts ? pageData.page.pinnedPosts : []"
          class="page-blog__posts"
        />

        <pagination-nav
          v-if="pageData.itemsMeta.count > PER_PAGE"
          :total-items="pageData.itemsMeta.count"
          :current-page="currentPage"
          :per-page="PER_PAGE"
          :get-paginated-route="getPaginatedRoute"
          class="page-blog__pagination"
        />
      </section>

      <section class="page-blog__pivots grid">
        <pivot-list
          v-if="pageData.page.pivots && pageData.page.pivots.length"
          :pivots="pageData.page.pivots"
          :can-have-border-top="false"
          :pivot-narrow="true"
        />

        <div class="page-blog__scroll-to">
          <scroll-to direction="up" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
  import tagIdQuery from './tagId.query.graphql?raw';
  import pageQuery from './index.query.graphql?raw';

  const app = useNuxtApp();
  const route = useRoute();

  const { $localeUrl } = useNuxtApp();

  definePageMeta({
    layout: 'content-page',
    middleware: [
      function (to) {
        if (to.params.page === '1') {
          return navigateTo({ name: 'language-blog' })
        }
      },
    ],
  });

  // If you change this, also change it in fetch-routes.ts
  const PER_PAGE = 20;

  const SECTION_ID = 'blog-container';

  const { params } = useRoute();

  const currentPage = computed(() => {
    if (params.page) {
      return parseInt(params.page, 10);
    }

    return 1;
  });
  const skip = computed(() => {
    return (currentPage.value - 1) * PER_PAGE;
  });

  let tagId = undefined

  if (params.slug) {
    const { data: tagData } = await useFetchContent({
      key: [route.name, params.slug, params.page].join('-'),
      query: tagIdQuery,
      variables: {
        tagSlug: params.slug,
        locale: params.language,
      }
    });

    tagId = tagData.value?.tag?.id;
  }

  const tagFilter = tagId ? {
    anyIn: [tagId]
  } : null

  const { data: pageData } = await useFetchContent({
    query: pageQuery,
    variables: {
      locale: params.language,
      skip: skip.value,
      first: PER_PAGE,
      tagId,
      tagFilter
    },
  });

  const tags = computed(() => {
    const hash = `#${SECTION_ID}`

    return [
      {
        id: null,
        title: app.$t('all_blogposts'),
        to: $localeUrl({ name: 'blog', hash }),
        isActive: !params.slug
      },
      ...(pageData.value?.tags.map(tag => {
        return {
          ...tag,
          to: $localeUrl({ name: 'blog-tag-slug', params: { slug: tag.slug }, hash }),
          isActive: tag.slug === params.slug
        }
      }) || {})
    ]
  });

  // Only show pinned posts on the first page and if no tag is selected
  const shouldShowPinnedPosts = currentPage.value === 1 && !tagId;

  useSeoHead(pageData.value.page);

  function getPaginatedRoute(pageNumber) {
    if (pageNumber === 1) {
      if (params.slug) {
        return $localeUrl({ name: 'blog-tag-slug', params: { slug: params.slug }, hash: `#${SECTION_ID}` });
      } else {
        return $localeUrl({ name: 'blog', hash: `#${SECTION_ID}` });
      }
    } else {
      if (params.slug) {
        return $localeUrl({ name: 'blog-tag-slug-page-page', params: { slug: params.slug, page: pageNumber }, hash: `#${SECTION_ID}` });
      } else {
        return $localeUrl({ name: 'blog-page-page', params: { page: pageNumber }, hash: `#${SECTION_ID}` });
      }
    }
  }
</script>

<style>
  .page-blog-container {
    padding-top: var(--spacing-larger);
  }

  .page-blog__text,
  .page-blog__tags {
    margin-bottom: var(--spacing-large);
    padding-bottom: var(--spacing-medium);
  }

  .page-blog__text {
    grid-row: 1;
    color: var(--html-blue);
  }

  .page-blog__tags {
    grid-row: 2;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small);
  }

  .page-blog__posts {
    grid-row: 3;
    margin-bottom: var(--spacing-large);
    grid-column: var(--grid-content);
  }

  .page-blog__pagination {
    grid-row: 4;
    margin: auto;
  }

  .page-blog__pivots {
    position: relative;
  }

  .page-blog__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
  }

  @media (min-width: 720px) {
    .page-blog__text,
    .page-blog__posts,
    .page-blog__tags,
    .page-blog__pagination {
      grid-column-start: 5;
      grid-column-end: 47;
      margin-bottom: var(--spacing-large);
      padding-bottom: var(--spacing-medium);
    }

    .page-blog-container {
      position: relative;
    }

    .page-blog__scroll-to {
      display: block;
    }
  }

  @media (min-width: 1100px) {
    .page-blog__text,
    .page-blog__posts,
    .page-blog__tags,
    .page-blog__pagination {
      grid-column-start: 14;
      grid-column-end: 42;
      margin-bottom: var(--spacing-large);
    }
  }
</style>
