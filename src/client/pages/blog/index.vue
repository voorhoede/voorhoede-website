<template>
  <main class="page-blog">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="page-blog-container grid">
      <text-block class="page-blog__text">
        <p class="testimonial">{{ page.description }}</p>
      </text-block>
      <ul class="page-blog__posts">
        <li v-for="blogPost in latestBlogposts.filter(post => post.published)" :key="blogPost.slug">
          <blog-list-item large :item="blogPost" />
        </li>
      </ul>
    </div>
    <div class="page-blog__cta grid">
      <!-- TODO: Make this a section to be defined in DATO (once for all blog pages) -->
      <pivot-section
        v-if="pivots"
        class="page-blog__pivot-section"
        :pivot="pivots[0]"
      />
      <scroll-to direction="up" />
    </div>
  </main>
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

  .page-blog__cta {
    grid-row: 3;
    grid-column: var(--grid-page);
    background-color: var(--bg-pastel);
    position: relative;
  }

  .page-blog__cta .pivot-section {
    border: none;
  }

  .page-blog__cta .scroll-to {
    display: none;
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

    .page-blog__cta .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-larger);
      grid-column: 48;
    }

    .page-blog__pivot-section {
      grid-column-start: 8;
      grid-column-end: 46;
    }
  }

  @media (min-width: 1100px) {
    .page-blog__text,
    .page-blog__posts {
      grid-column-start: 14;
      grid-column-end: 42;
      margin-bottom: var(--spacing-large);
    }

    .page-blog__pivot-section {
      grid-column-start: 14;
      grid-column-end: 38;
    }

    .page-blog__cta .scroll-to {
      bottom: var(--spacing-big);
    }
  }
</style>
