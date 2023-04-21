<template>
  <main class="page-blog">
    <page-header
      heading="byline"
      :byline="data.page.title"
      :headline="data.page.subtitle"
      :image="data.page.headerIllustration"
    />

    <section class="page-blog-container grid">
      <h2 class="sr-only">
        {{ $t('blog_overview') }}
      </h2>

      <text-block class="page-blog__text">
        <p class="testimonial">
          {{ data.page.description }}
        </p>
      </text-block>

      <ul class="page-blog__posts">
        <li
          v-for="blogPost in data.page.pinnedPosts"
          :key="blogPost.slug"
        >
          <blog-list-item
            large
            pinned
            :item="blogPost"
          />
        </li>
        <li
          v-for="blogPost in data.items"
          :key="blogPost.slug"
        >
          <blog-list-item
            large
            :item="blogPost"
          />
        </li>
      </ul>
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

  const { params } = useRoute();
  const { data } = await useFetchContent({
    query,
    variables: {
      locale: params.language,
    },
  });

  useSeoHead(data.value.page);
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
    .page-blog__posts {
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
    .page-blog__posts {
      grid-column-start: 14;
      grid-column-end: 42;
      margin-bottom: var(--spacing-large);
    }
  }
</style>
