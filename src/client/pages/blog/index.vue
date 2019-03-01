<template>
  <section class="page-blog">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <main class="page-blog__content">
      <h2 class="sr-only">{{ $t('blog_overview') }}</h2>
      <text-block class="page-blog__text">
        <p class="testimonial">{{ page.description }}</p>
      </text-block>
      <ul class="page-blog__posts">
        <li v-for="blogPost in items.filter(post => post.published)" :key="blogPost.slug">
          <blog-list-item large :item="blogPost" />
        </li>
      </ul>
    </main>
    <footer class="page-blog__footer grid">
      <!-- TODO: Make this a section to be defined in DATO (once for all blog pages) -->
      <pivot-section
        v-if="pivots && pivots.length"
        class="page-blog__pivot-section"
        :pivot="pivots[0]"
      />
      <scroll-to direction="up" />
    </footer>
  </section>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import {
    BlogListItem,
    PivotSection,
    PageHeader,
    ScrollTo,
    TextBlock,
  } from '~/components'

  export default {
    components: { BlogListItem, PivotSection, PageHeader, ScrollTo, TextBlock },
    asyncData,
    head
  }
</script>

<style>
  .page-blog__content {
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

  .page-blog__footer {
    grid-row: 3;
    grid-column: var(--grid-page);
    background-color: var(--bg-pastel);
    position: relative;
  }

  .page-blog .pivot-section {
    border: none;
  }

  .page-blog .scroll-to {
    display: none;
  }

  @media (min-width: 720px) {
    .page-blog__content {
      position: relative;
      grid-column-start: 5;
      grid-column-end: 47;
    }

    .page-blog__text,
    .page-blog__posts {
      margin-bottom: var(--spacing-large);
    }

    .page-blog .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-larger);
      grid-column: 48;
    }

    .page-blog .pivot-section {
      grid-column-start: 8;
      grid-column-end: 46;
    }
  }

  @media (min-width: 1100px) {
    .page-blog__content {
      grid-column-start: 14;
      grid-column-end: 42;
    }

    .page-blog__text,
    .page-blog__posts {
      margin-bottom: var(--spacing-large);
    }

    .page-blog .pivot-section {
      grid-column-start: 14;
      grid-column-end: 38;
    }

    .page-blog .scroll-to {
      bottom: var(--spacing-big);
    }
  }
</style>
