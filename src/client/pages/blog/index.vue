<template>
  <main class="page-blog">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <section class="page-blog-container grid">
      <h2 class="sr-only">{{ $t('blog_overview') }}</h2>
      <text-block class="page-blog__text">
        <p class="testimonial">{{ page.description }}</p>
      </text-block>
      <ul class="page-blog__posts">
        <li v-for="blogPost in items.filter(post => post.published)" :key="blogPost.slug">
          <blog-list-item large :item="blogPost" />
        </li>
      </ul>
    </section>
    <section
      v-if="page.pivots && page.pivots.length"
      class="page-blog__pivots">
      <pivot-section
        :pivots="page.pivots"
        :scroll-indicator="true"
      />
    </section>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import BlogListItem from '~/components/blog-list-item'
  import PivotSection from '~/components/pivot-section'
  import PageHeader from '~/components/page-header'
  import TextBlock from '~/components/text-block'

  export default {
    components: {
      BlogListItem,
      PivotSection,
      PageHeader,
      TextBlock,
    },
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

  .page-blog__pivots {
    background-color: var(--bg-pastel);
    position: relative;
  }

  .page-blog__pivots .pivot {
    border: none;
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

    .page-blog__pivots .pivot {
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

    .page-blog__pivots .pivot {
      grid-column-start: 14;
      grid-column-end: 38;
    }
  }
</style>
