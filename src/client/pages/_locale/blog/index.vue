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
        <li v-for="blogPost in latestBlogposts" :key="blogPost.slug">
          <blog-list-item large :item="blogPost" :current-locale="currentLocale"/>
        </li>
      </ul>
      <cta-block 
        second-link 
        :cta-label="page.callToActionLabel" 
        :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }"
        :second-link-label="page.rssLabel"
        :second-link-to="page.rssLink"
        :second-link-external="page.externalRssLink"
      />
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import {
    PageHeader,
    TextBlock,
    BlogListItem,
    CtaBlock
  } from '~/components'

  export default {
    components: {
      PageHeader,
      TextBlock,
      BlogListItem,
      CtaBlock
    },
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

  @media (min-width: 720px) {
    .page-blog__text,
    .page-blog__posts {
        grid-column-start: 5;
        grid-column-end: -5;
        margin-bottom: var(--spacing-large);
      }
  }

  @media (min-width: 1100px) {
    .page-blog__text,
    .page-blog__posts {
        grid-column-start: 10;
        grid-column-end: -10;
        margin-bottom: var(--spacing-large);
      }
  }
</style>
