<template>
  <div class="grid page-about-us">
    <page-header
      class="page-about-us__header"
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <image-with-text-block
      :title="page.introTitle"
      :body="page.introBody"
      :image="page.introImage"
      class="page-about-us__intro"
    />
    <image-grid
      :title="page.teamGridTitle"
      :items="page.teamGrid"
      class="page-about-us__image-grid"
    />
    <image-with-text-block
      :title="page.middleTitle"
      :body="page.middleBody"
      :image="page.middleImage"
      :inverse="true"
      class="page-about-us__middle"
    />
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
          :image="item.jobImage"
          :slug="item.slug"
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
    AppButton,
    BlogListItem,
    ImageGrid,
    ImageWithTextBlock,
    JobsExcerpt,
    PageHeader,
  } from '~/components'

  export default {
    components: {
      AppButton,
      BlogListItem,
      ImageGrid,
      ImageWithTextBlock,
      JobsExcerpt,
      PageHeader,
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    computed: {
      ...mapState(['currentLocale'])
    },
    head() {
      return {
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'twitter:description', 'content': this.page.social.description },
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
    background-color: var(--bg-pastel);
  }

  .page-about-us__jobs,
  .page-about-us__header,
  .page-about-us__intro,
  .page-about-us__image-grid,
  .page-about-us__middle {
    grid-column: var(--grid-page);
  }

  .page-about-us__header {
    grid-row: 1;
  }

  .page-about-us__intro {
    grid-row: 2;
    margin-bottom: var(--spacing-large);
  }

  .page-about-us__image-grid {
    grid-row: 3;
    margin-bottom: var(--spacing-larger);
  }

  .page-about-us__middle {
    grid-row: 4;
    margin-bottom: var(--spacing-large);
  }

  .page-about-us__jobs-text {
    grid-row: 5;
  }

  .page-about-us__jobs {
    grid-row: 6;
  }

  .page-about-us__blog {
    grid-row: 7;
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

  .page-about-us__jobs,
  .page-about-us__image-grid,
  .page-about-us__jobs-text {
    text-align: center;
    margin-bottom: var(--spacing-larger);
  }

  .page-about-us__jobs-title {
    margin-bottom: var(--spacing-medium);
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
    background-color: var(--white);
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

  @media (min-width: 720px) {
    .page-about-us__header {
      margin-bottom: var(--spacing-large);
    }

    .page-about-us__intro,
    .page-about-us__middle {
      grid-column: var(--grid-content);
      margin-bottom: var(--spacing-larger);
    }

    .page-about-us__image-grid,
    .page-about-us__jobs {
      margin-bottom: var(--spacing-big);
    }

    .page-about-us__jobs-text {
      grid-column-start: 6;
      grid-column-end: 44;
    }

    .page-about-us__jobs-list-item {
      width: 600px;
      margin: 0 auto;
    }

    .page-about-us__blog {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }

  @media (min-width: 1100px) {
    .page-about-us__image-grid,
    .page-about-us__jobs {
      margin-bottom: var(--spacing-bigger);
    }

    .page-about-us__jobs-text {
      grid-column-start: 12;
      grid-column-end: 38;
    }

    .page-about-us__jobs-list-item {
      width: 800px;
    }

    .page-about-us__blog {
      grid-column-start: 10;
      grid-column-end: 42;
    }
  }
</style>
