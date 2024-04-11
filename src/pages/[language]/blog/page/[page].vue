<template>
  <main class="page-blog">
    <page-header
      heading="byline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
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
          {{ data.page.description }}
        </p>
      </text-block>

      <blogs-list
        :items="data.items"
        :pinned-items="currentPage === 1 ? data.page.pinnedPosts : []"
        class="page-blog__posts"
      />

      <pagination-nav
        v-if="data.itemsMeta.count > PER_PAGE"
        :total-items="data.itemsMeta.count"
        :current-page="currentPage"
        :per-page="PER_PAGE"
        :get-paginated-route="getPaginatedRoute"
        class="page-blog__pagination"
      />
    </section>

    <section class="page-blog__pivots grid">
      <pivot-list
        v-if="data.page.pivots && data.page.pivots.length"
        :pivots="data.page.pivots"
        :can-have-border-top="false"
        :pivot-narrow="true"
      />

      <div class="page-blog__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </main>
</template>

<script setup>
  import query from './index.query.graphql?raw';

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

  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
      skip: skip.value,
      first: PER_PAGE,
    },
  });

  // If the page is out of range, redirect to the first page
  if (data.value.items.length === 0) {
    await navigateTo({ params: { page: 1 }})
  }

  useSeoHead(data.value.page);

  function getPaginatedRoute(pageNumber) {
    if (pageNumber === 1) {
      return $localeUrl({ name: 'blog', hash: `#${SECTION_ID}` });
    } else {
      return $localeUrl({ name: 'blog-page-page', params: { page: pageNumber }, hash: `#${SECTION_ID}` });
    }
  }
</script>

<style>
  .page-blog-container {
    padding-top: var(--spacing-larger);
  }

  .page-blog__text {
    margin-bottom: var(--spacing-larger);
    grid-row: 1;
    color: var(--html-blue);
  }

  .page-blog__posts {
    grid-row: 2;
    margin-bottom: var(--spacing-large);
    grid-column: var(--grid-content);
  }

  .page-blog__pagination {
    grid-row: 3;
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
    .page-blog__pagination {
      grid-column-start: 5;
      grid-column-end: 47;
      margin-bottom: var(--spacing-large);
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
    .page-blog__pagination {
      grid-column-start: 14;
      grid-column-end: 42;
      margin-bottom: var(--spacing-large);
    }
  }
</style>
