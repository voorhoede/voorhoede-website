<template>
  <main class="page-about-us grid">
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
    <image-grid
      :title="page.teamGridTitle"
      :items="page.teamGrid"
      class="page-about-us__image-grid"
    />
    <section class="page-about-us__text-blocks">
      <h2 class="h3 page-about-us__text-blocks-title">{{ page.textBlocksTitle }}</h2>
      <p class="body-big page-about-us__text-blocks-description">{{ page.textBlocksDescription }}</p>
      <h3 v-if="page.textBlocksSubtitle" class="h4 page-about-us__text-blocks-subtitle">{{ page.textBlocksSubtitle }}</h3>
      <div class="page-about-us__text-blocks-items">
        <div v-for="item in page.textBlocksItems" :key="item.id" class="page-about-us__text-blocks-item">
          <h4 class="h4 page-about-us__text-blocks-item-heading">{{ item.title }}</h4>
          <p class="body-big rich-text" v-html="item.description" />
        </div>
      </div>
    </section>
    <image-with-text-block
      :title="page.middleTitle"
      :body="page.middleBody"
      :image="page.middleImage"
      :inverse="true"
      class="page-about-us__middle"
    />
    <template v-if="page.jobs.length > 0">
      <div class="page-about-us__jobs-text">
        <h2 class="page-about-us__jobs-title h2">{{ page.jobsTitle }}</h2>
        <p class="body-big font-html-blue">{{ page.jobsBody }}</p>
      </div>
      <ul class="page-about-us__jobs">
        <li class="page-about-us__jobs-list" v-for="item in page.jobs" :key="item.slug">
          <jobs-excerpt
            class="page-about-us__jobs-list-item"
            :is-nested="true"
            :title="item.title"
            :image="item.jobImage"
            :slug="item.slug"
          />
        </li>
      </ul>
    </template>
    <newsletter-form class="page-about-us__newsletter" />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  export default {
    asyncData,
    head,
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
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
    grid-row: 5;
    margin-bottom: var(--spacing-large);
  }

  .page-about-us__jobs-text {
    grid-row: 6;
  }

  .page-about-us__jobs {
    grid-row: 7;
  }

  .page-about-us__newsletter {
    grid-row: 8;
  }

  .page-about-us__text-blocks {
    grid-row: 4;
    grid-column: var(--grid-content);
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 110px;
  }

  .page-about-us__text-blocks-title {
    text-align: center;
  }

  .page-about-us__text-blocks-description {
    text-align: center;
    color: var(--html-blue);
  }

  .page-about-us__text-blocks-subtitle {
    margin-top: var(--spacing-medium);
    text-align: center;
  }

  .page-about-us__text-blocks-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .page-about-us__text-blocks-item {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
    padding: var(--spacing-medium);
    background-color: var(--white);
  }

  .page-about-us__text-blocks-item:first-child {
    margin-top: 20px;
  }

  .page-about-us__text-blocks-item:last-child {
    margin-bottom: 20px;
  }

  .page-about-us__text-blocks-item-heading {
    margin-top: var(--spacing-small);
    margin-bottom: var(--spacing-small);
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
    background-color: var(--white);
    padding: 0 var(--spacing-large);
    transition: background var(--job-excerpt-easing);
  }

  .page-about-us__jobs-list:not(:first-child) {
    border-top: 2px solid var(--html-blue);
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
  }

  @media (min-width: 1200px) {
    .page-about-us__text-blocks-item {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
