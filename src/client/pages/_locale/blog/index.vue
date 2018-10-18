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
        <li v-for="blogPost in latestBlogposts" :key="blogPost.slug" v-if="blogPost.published">
          <blog-list-item large :item="blogPost" :current-locale="currentLocale"/>
        </li>
      </ul>
      <scroll-to point-up />
    </div>
    <div class="page-blog__cta grid">
      <cta-block
        class="page-blog__cta-block"
        :cta-label="page.callToActionLabel"
        :cta-to="{ name: 'locale-about-us', params: { locale: currentLocale } }">
        <template slot="heading">
          <h3 class="h3">{{ page.callToActionTitle }}</h3>
        </template>
        <template slot="body">
          <p class="body">{{ page.callToActionBody }}</p>
        </template>
      </cta-block>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import {
    BlogListItem,
    CtaBlock,
    PageHeader,
    ScrollTo,
    TextBlock,
  } from '~/components'

  export default {
    components: { BlogListItem, CtaBlock, PageHeader, ScrollTo, TextBlock },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    computed: {
      ...mapState(['currentLocale'])
    }
  }
</script>

<style>
  .page-blog__text {
    margin-bottom: var(--spacing-larger);
    color: var(--html-blue);
  }

  .page-blog-container {
    padding-top: var(--spacing-larger);
  }

  .page-blog__cta {
    grid-column: page;
    background: var(--bg-pastel);
  }

  .page-blog__cta .cta-block {
    border: none;
  }

  .page-blog-container .scroll-to {
    display: none;
  }

  @media (min-width: 720px) {
    .page-blog__text,
    .page-blog__posts {
      grid-column-start: 5;
      grid-column-end: -5;
      margin-bottom: var(--spacing-large);
    }

    .page-blog-container {
      position: relative;
    }

    .page-blog-container .scroll-to {
      display: flex;
      position: absolute;
      bottom: var(--spacing-large);
      grid-column: -3;
    }

    .page-blog__cta-block {
      grid-column-start: 8;
      grid-column-end: -8;
    }
  }

  @media (min-width: 1100px) {
    .page-blog__text,
    .page-blog__posts {
      grid-column-start: 10;
      grid-column-end: -10;
      margin-bottom: var(--spacing-large);
    }

    .page-blog__cta-block {
      grid-column-start: 14;
      grid-column-end: -14;
    }
  }
</style>
