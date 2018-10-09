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
    </div>
    <div class="grid">
      <cta-block
        :cta-label="page.callToActionLabel"
        :cta-to="{ name: 'locale-about-us', params: { locale: currentLocale } }">
        <template slot="heading">
          <h3 class="h4">{{ page.callToActionTitle }}</h3>
        </template>
      </cta-block>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import { BlogListItem, CtaBlock, PageHeader, TextBlock } from '~/components'

  export default {
    components: { BlogListItem, CtaBlock, PageHeader, TextBlock },
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
