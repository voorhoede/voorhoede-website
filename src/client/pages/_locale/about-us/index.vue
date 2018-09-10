<template>
  <div class="grid page-about-us">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="page-about-us__overview">
      <div class="page-about-us__overview-item">
        <text-block class="page-about-us__overview-item-text" :title="page.introTitle">
          <p class="body">{{ page.introBody }}</p>
        </text-block>
        <responsive-image class="page-about-us__overview-item-image" :image="page.introImage" />
      </div>
      <section class="page-about-us__jobs-overview">
        <cta-block v-for="(job, index) in page.jobs" :key="job.title" :cta-label="job.title" :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }">
          <template slot="heading" v-if="index === 0">
            <h3 class="h3">{{ page.jobsTitle }}</h3>
          </template>
          <template slot="body" v-if="index === 0">
            <p class="body">{{ page.jobsBody }}</p>
          </template>
        </cta-block>
      </section>
      <section class="page-about-us__blog-posts">
        <h2 class="page-about-us__section-title page-about-us__section-title--blog-posts h3">{{ page.blogPostsTitle }}</h2>
        <ul class="page-about-us__blog-posts-list">
          <li v-for="blogPost in latestBlogposts" :key="blogPost.slug">
            <blog-list-item :item="blogPost" :current-locale="currentLocale"/>
          </li>
        </ul>
      </section>
      <cta-block :cta-label="page.callToActionLabel" :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }">
        <template slot="heading">
          <h3 class="h4">{{ page.callToActionTitle }}</h3>
        </template>
      </cta-block>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { 
  PageHeader,
  ResponsiveImage,
  GenericTextBlock,
  TextBlock, 
  BlogListItem, 
  CtaBlock 
} from '~/components'

export default {
  components: {
    PageHeader,
    ResponsiveImage,
    GenericTextBlock,
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
  .page-about-us .page-header {
    grid-column: page;
    margin-bottom: var(--spacing-large);
  }

  .page-about-us__overview-item {
    margin-bottom: var(--spacing-big);
  }

  .page-about-us__overview-item-text {
    margin-bottom: var(--spacing-medium);
    width: 100%;
  }

  .page-about-us__overview-item-image {
    width: 100%;
  }

  .page-about-us__jobs-overview {
    margin-bottom: var(--spacing-big);
  }

  .page-about-us__jobs-overview .cta-block {
    padding: 0 0 var(--spacing-small);
    border: none;
  }

   .page-about-us__blog-posts {
    margin-bottom: var(--spacing-big);
  }

  .page-about-us__blog-posts-list {
    grid-row: 2;
    grid-column-end: -3;
  }

  .page-about-us__section-title {
    text-align: center;
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .page-about-us {
      background: var(--bg-pastel);
    }

    .page-about-us__overview {
      grid-column-start: 2;
      grid-column-end: -2;
      background: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }

    .page-about-us__overview-item {
      display: flex;
      margin-bottom: var(--spacing-bigger);
    }

    .page-about-us__overview-item-text {
      margin-right: var(--spacing-medium);
    }
  }
  
  @media (min-width: 1100px) {
    .page-about-us__overview {
      grid-column-start: 6;
      grid-column-end: -6;
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
