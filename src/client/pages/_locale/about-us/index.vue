<template>
  <div class="grid page-about-us">
    <page-header
      class="page-about-us__header"
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
    </div>
    <div class="page-about-us__jobs-text">
      <h2 class="page-about-us__jobs-title h2">{{ page.jobsTitle }}</h2>
      <p class="body-big font-html-blue">{{ page.jobsBody }}</p>
    </div>
    <ul class="page-about-us__jobs">
      <li class="page-about-us__jobs-list" v-for="item in page.jobs" :key="item.title">
        <jobs-excerpt
          class="page-about-us__jobs-list-item"
          :title="item.title"
          :description="item.description"
          :label="item.callToActionLabel"
          :url="item.url"
          :image="item.jobImage"
        />
      </li>
    </ul>
    <section class="page-about-us__blog">
      <h2 class="page-about-us__blog-title h2">{{ page.blogPostsTitle }}</h2>
      <ul class="page-about-us__blog-list">
        <li
          v-for="blogPost in latestBlogposts"
          :key="blogPost.slug"
        >
          <blog-list-item
            large
            :item="blogPost"
            :current-locale="currentLocale"
          />
        </li>
      </ul>
      <div class="page-about-us__blog-button">
        <app-button
          :to="{ name: 'locale-blog' }"
          :label="page.allBlogPostsButtonLabel"
          secondary
        />
      </div>
    </section>
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
  JobsExcerpt,
  AppButton,
} from '../../../components'

export default {
  components: {
    PageHeader,
    ResponsiveImage,
    GenericTextBlock,
    TextBlock,
    BlogListItem,
    JobsExcerpt,
    AppButton,
  },
  async asyncData({ store, route }) {
    return await store.dispatch('getData', { route })
  },
  computed: {
    ...mapState(['currentLocale'])
  },
  head() {
    return {
      meta: [
        { 'name': 'description', 'content': this.page.social.description },
        { 'name': 'keywords', 'content': this.page.keywords }
      ]
    }
  }
}
</script>

<style>
  :root {
    --job-excerpt-easing: .25s cubic-bezier(.5, 0, .25, 1);
  }

  .page-about-us {
    background: var(--bg-pastel);
  }

  .page-about-us__header {
    grid-column: page;
  }

  .page-about-us__overview {
    margin-bottom: var(--spacing-larger);
  }

  .page-about-us__overview-item {
    display: flex;
    flex-direction: column-reverse;
  }

  .page-about-us__overview-item .text-block {
    width: 100%;
  }

  .page-about-us__overview-item .responsive-image__sizer {
    margin-bottom: var(--spacing-medium);
    width: 100%;
  }

  .page-about-us__jobs-text {
    text-align: center;
    margin-bottom: var(--spacing-larger);
  }

  .page-about-us__jobs-title {
    margin-bottom: var(--spacing-medium);
  }

  .page-about-us__jobs {
    grid-column: page;
    margin-bottom: var(--spacing-larger);
  }

  .page-about-us__jobs-list {
    border-bottom: 2px solid var(--html-blue);
    padding: 0 var(--spacing-large);
    transition: background var(--job-excerpt-easing);
  }

  .page-about-us__jobs-list:first-child {
    border-top: 2px solid var(--html-blue);
  }

  .page-about-us__jobs-list:hover {
    background: var(--white);
  }

  .page-about-us__jobs-list .job-excerpt__image,
  .page-about-us__jobs-list .job-excerpt__button {
    transition: opacity var(--job-excerpt-easing);
  }

  .page-about-us__jobs-list:hover .job-excerpt__image,
  .page-about-us__jobs-list:hover .job-excerpt__button,
  .page-about-us__jobs-list:focus-within .job-excerpt__image,
  .page-about-us__jobs-list:focus-within .job-excerpt__button {
     opacity: 1;
  }

  .page-about-us__blog {
    margin-bottom: var(--spacing-big);
  }

  .page-about-us__blog-title {
    text-align: center;
    margin-bottom: var(--spacing-large);
  }

  .page-about-us__blog-list {
    margin-bottom: var(--spacing-small);
  }

  .page-about-us__blog-button {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 720px) {
    .page-about-us__header {
      margin-bottom: var(--spacing-large);
    }

    .page-about-us__overview {
      grid-column-start: 2;
      grid-column-end: -2;
      background: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
      margin-bottom: var(--spacing-big);
    }

    .page-about-us__overview-item {
      flex-direction: row;
    }

    .page-about-us__overview-item .text-block {
      margin-right: var(--spacing-big);
    }

    .page-about-us__overview-item .responsive-image__sizer {
      margin-bottom: 0;
    }

    .page-about-us__jobs {
      margin-bottom: var(--spacing-big);
    }

    .page-about-us__jobs-text {
      grid-column-start: 6;
      grid-column-end: -6;
    }

    .page-about-us__jobs-list-item {
      width: 600px;
      margin: 0 auto;
    }

    .page-about-us__blog {
      grid-column-start: 4;
      grid-column-end: -4;
    }
  }

  @media (min-width: 1100px) {
    .page-about-us__overview {
      grid-column-start: 6;
      grid-column-end: -6;
      padding: var(--spacing-big) var(--spacing-bigger);
    }

    .page-about-us__jobs {
      margin-bottom: var(--spacing-bigger);
    }

    .page-about-us__jobs-text {
      grid-column-start: 12;
      grid-column-end: -12;
    }

    .page-about-us__jobs-list-item {
      width: 800px;
    }

    .page-about-us__blog {
      grid-column-start: 10;
      grid-column-end: -10;
    }
  }
</style>
