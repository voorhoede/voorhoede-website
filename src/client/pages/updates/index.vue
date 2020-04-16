<template>
  <main class="page-updates">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <section class="page-updates__container grid">
      <h2 class="sr-only">{{ $t('updates_overview') }}</h2>
      <text-block class="page-updates__text">
        <p class="testimonial">{{ page.description }}</p>
      </text-block>
      <ul class="page-updates__posts">
        <li v-for="update in publishedUpdates" :key="update.slug">
          <blog-list-item large :item="update" />
        </li>
      </ul>
    </section>
    <div class="page-updates__cta grid">
      <pivot-section
        v-if="pivots && pivots.length"
        class="page-updates__pivot-section"
        :pivot="pivots[0]"
      />
      <scroll-to direction="up" />
    </div>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import BlogListItem from '~/components/blog-list-item'
  import PivotSection from '~/components/pivot-section'
  import PageHeader from '~/components/page-header'
  import ScrollTo from '~/components/scroll-to'
  import TextBlock from '~/components/text-block'

  export default {
    components: { BlogListItem, PivotSection, PageHeader, ScrollTo, TextBlock },
    asyncData,
    computed: {
      publishedUpdates() {
        return this.items.filter(post => post.published)
      },
    },
    head,
  }
</script>

<style>
  .page-updates__container {
    padding-top: var(--spacing-larger);
  }

  .page-updates__text {
    grid-row: 1;
    margin-bottom: var(--spacing-larger);
    color: var(--html-blue);
  }

  .page-updates__posts {
    grid-row: 2;
  }

  .page-updates__cta {
    position: relative;
    grid-column: var(--grid-page);
    grid-row: 3;
    background-color: var(--bg-pastel);
  }

  .page-updates__cta .pivot-section {
    border: none;
  }

  .page-updates__cta .scroll-to {
    display: none;
  }

  @media (min-width: 720px) {
    .page-updates__text,
    .page-updates__posts {
      grid-column-end: 47;
      grid-column-start: 5;
      margin-bottom: var(--spacing-large);
    }

    .page-updates__container {
      position: relative;
    }

    .page-updates__cta .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-larger);
      grid-column: 48;
    }

    .page-updates__pivot-section {
      grid-column-end: 46;
      grid-column-start: 8;
    }
  }

  @media (min-width: 1100px) {
    .page-updates__text,
    .page-updates__posts {
      grid-column-end: 42;
      grid-column-start: 14;
      margin-bottom: var(--spacing-large);
    }

    .page-updates__pivot-section {
      grid-column-end: 38;
      grid-column-start: 14;
    }

    .page-updates__cta .scroll-to {
      bottom: var(--spacing-big);
    }
  }
</style>
