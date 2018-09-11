<template>
  <div class="grid page-about-us">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="page-about-us__overview">
      <div class="page-about-us__overview-item">
        <text-block :title="page.introTitle">
          <p class="body">{{ page.introBody }}</p>
        </text-block>
        <responsive-image :image="page.introImage" />
      </div>
      <section class="page-about-us__jobs-overview">
        <text-block :title="page.jobsTitle">
          <p class="body">{{ page.jobsBody }}</p>
        </text-block>
        <div class="page-about-us__jobs-overview-buttons">
          <app-button 
            v-for="job in page.jobs" 
            :key="job.title" 
            :label="job.title"
            external 
            :to="job.url"
          />
        </div>
      </section>
      <section class="page-about-us__blog-posts">
        <h2 class="page-about-us__section-title h3">{{ page.blogPostsTitle }}</h2>
        <ul class="page-about-us__blog-posts-list">
          <li v-for="blogPost in latestBlogposts" :key="blogPost.slug">
            <blog-list-item :item="blogPost" :current-locale="currentLocale"/>
          </li>
        </ul>
      </section>
      <cta-block 
        :cta-label="page.callToActionLabel" 
        :cta-to="{ name: 'locale-contact', params: { locale: currentLocale } }"
      >
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
  CtaBlock,
  AppButton 
} from '~/components'

export default {
  components: {
    PageHeader,
    ResponsiveImage,
    GenericTextBlock,
    TextBlock,
    BlogListItem,
    CtaBlock,
    AppButton
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
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: var(--spacing-big);
  }

  .page-about-us__overview-item .text-block {
    width: 100%;
  }

  .page-about-us__overview-item .responsive-image {
    margin-bottom: var(--spacing-medium);
    width: 100%;
  }

  .page-about-us__jobs-overview {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: var(--spacing-big);
  }

  .page-about-us__jobs-overview .text-block {
    margin-bottom: var(--spacing-medium);
  }

  .page-about-us__jobs-overview-buttons {
    display: flex;
    flex-direction: column;
  }

  .page-about-us__jobs-overview-buttons .app-button {
    margin-bottom: var(--spacing-small);
    width: auto;
  }

   .page-about-us__blog-posts {
    margin-bottom: var(--spacing-big);
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
      padding: var(--spacing-large) var(--spacing-larger) 0;
    }

    .page-about-us__jobs-overview-buttons {
      align-items: center;
    }

    .page-about-us__overview-item {
      flex-direction: row;
      margin-bottom: var(--spacing-bigger);
    }

    .page-about-us__overview-item .text-block {
      margin-right: var(--spacing-big);
    }
  }
  
  @media (min-width: 1100px) {
    .page-about-us__overview {
      grid-column-start: 6;
      grid-column-end: -6;
      padding: var(--spacing-big) var(--spacing-bigger) 0;
    }
  }
</style>
