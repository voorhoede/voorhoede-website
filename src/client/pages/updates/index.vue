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
          <blog-list-item link-name="updates-slug" :item="update" large />
        </li>
      </ul>
    </section>
    <section class="page-updates__pivots grid">
      <pivot-list
        v-if="page.pivots && page.pivots.length"
        :pivots="page.pivots"
        :pivot-border="false"
        :pivot-narrow="true"
      />
      <div class="page-updates__scroll-to">
        <scroll-to direction="up" />
      </div>
    </section>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  import BlogListItem from '~/components/blog-list-item'
  import PivotList from '~/components/pivot-list'
  import PageHeader from '~/components/page-header'
  import ScrollTo from '~/components/scroll-to'
  import TextBlock from '~/components/text-block'

  export default {
    components: {
      BlogListItem,
      PivotList,
      PageHeader,
      ScrollTo,
      TextBlock,
    },
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

  .page-updates__pivots {
    position: relative;
    grid-column: var(--grid-page);
    grid-row: 3;
    background-color: var(--bg-pastel);
  }

  .page-updates__scroll-to {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 55px;
    grid-column-start: -2;
    grid-column-end: -3;
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

    .page-updates__scroll-to {
      display: block;
    }
  }

  @media (min-width: 1100px) {
    .page-updates__text,
    .page-updates__posts {
      grid-column-end: 42;
      grid-column-start: 14;
      margin-bottom: var(--spacing-large);
    }
  }
</style>
