<template>
  <main class="page-work-at grid">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <image-with-text-block
      :title="page.introTitle"
      :body="page.introBody"
      :image="page.introImage"
    />

    <interstitial-cta
      :cta="page.interstitialCta.title"
      :buttons="[
        { label: page.interstitialCta.callUsTitle, to: page.interstitialCta.callUsNumber, external: true },
        { label: page.interstitialCta.mailUsTitle, to: page.interstitialCta.mailUsAddress, external: true },
      ]"
    />

    <image-with-text-block
      :title="page.middleTitle"
      :body="page.middleBody"
      :image="page.middleImage"
      :inverse="true"
    />

    <div class="usps">
      <h2 class="h3 page-work-at__layout">{{ page.uspsTitle }}</h2>
      <div class="usps__items">
        <div class="usps__item" v-for="usp in page.usps" :key="usp.title">
          <responsive-image :image="usp.image" class="usps__item-image"/>
          <h3 class="h4 usps__item-heading">{{ usp.title }}</h3>
          <div v-html="usp.body" class="body"/>
        </div>
      </div>
    </div>

    <div class="body-big font-html-blue page-work-at__layout rich-text" v-html="page.uspsAfter" />

    <div class="page-work-at__layout rich-text">
      <h2 class="h2">{{ page.jobsTitle }}</h2>
      <p class="body-big font-html-blue" v-html="page.jobsBody" />
    </div>

    <div class="page-work-at__layout page-work-at__job-buttons">
      <app-button
        v-for="job in filteredJobs"
        :key="job.title"
        :label="job.title"
        :to="localeUrl({ name: 'jobs-slug', params: { slug: job.job.slug } })"
      />
    </div>

    <p class="body-big font-html-blue page-work-at__layout rich-text" v-html="page.jobsAfter" />

    <image-grid
      :title="page.teamGridTitle"
      :items="page.teamGrid"
    />
    <p class="pullquote page-work-at__layout rich-text" v-html="page.stayInTouch" />
    <newsletter-form />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    computed: {
      filteredJobs() {
        return this.page.jobs.filter(job => {
          return job.job.published
        })
      }
    },
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
    head,
  }
</script>

<style>
  .page-work-at {
    background-color: var(--bg-pastel);
  }

  .page-work-at > * {
    margin-bottom: var(--spacing-big);
  }

  .page-work-at__layout {
    text-align: center;
    grid-column: var(--grid-content);
  }

  .page-work-at__layout > * + * {
    margin-top: var(--spacing-small);
  }

  .page-work-at__job-buttons > .app-button {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .page-work-at__layout {
      grid-column-start: 6;
      grid-column-end: 44;
    }
  }

  @media (min-width: 1100px) {
    .page-work-at__layout {
      grid-column-start: 10;
      grid-column-end: 42;
    }
  }

  .usps {
    grid-column: var(--grid-page);
    margin-left: auto;
    margin-right: auto;
  }

  .usps__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .usps__item {
    flex: 0 1 300px;
    padding: var(--spacing-medium);
    margin-top: 150px;
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
    background-color: var(--white);
  }

  .usps__item-heading {
    text-align: center;
    margin-top: var(--spacing-small);
    margin-bottom: var(--spacing-small);
  }

  .usps__item-image {
    max-width: 200px;
    margin-right: auto;
    margin-left: auto;
    margin-top: -150px;
    padding: var(--spacing-small);
  }

  @media (min-width: 1200px) {
    .usps__item {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
      flex: 0 1 320px;
    }
  }
</style>
