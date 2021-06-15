<template>
  <main
    id="content"
    class="page-about-us grid"
    tabindex="-1"
  >
    <page-header
      class="page-about-us__header"
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <image-with-text-block
      :title="page.introTitle"
      :body="page.introBody"
      :image="page.introImage"
      class="page-about-us__intro"
    />
    <template v-if="jobs.length > 0">
      <div class="page-about-us__jobs-text">
        <h2 class="page-about-us__jobs-title h2">{{ page.jobsTitle }}</h2>
        <p class="body-big font-html-blue">{{ page.jobsBody }}</p>
      </div>
      <ul class="page-about-us__jobs">
        <li class="page-about-us__jobs-list" v-for="item in jobs" :key="item.slug">
          <jobs-excerpt
            class="page-about-us__jobs-list-item"
            :is-nested="true"
            :title="item.title"
            :description="item.description"
            :image="item.jobImage"
            :slug="item.slug"
          />
        </li>
      </ul>
    </template>
    <image-grid
      :title="page.teamGridTitle"
      :items="page.teamGrid"
      class="page-about-us__image-grid"
    />
    <section class="page-about-us__blog">
      <h2 class="page-about-us__blog-title h2">{{ $t('latest_blog_posts') }}</h2>
      <ul class="page-about-us__blog-list">
        <li
          v-for="blogPost in latestBlogposts"
          :key="blogPost.slug"
        >
          <blog-list-item
            large
            :item="blogPost"
          />
        </li>
      </ul>
      <div class="page-about-us__blog-button">
        <app-button
          :to="localeUrl('blog')"
          :label="$t('all_blogposts')"
          secondary
        />
      </div>
    </section>
    <newsletter-form class="page-about-us__newsletter" />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
    head,
  }
</script>
