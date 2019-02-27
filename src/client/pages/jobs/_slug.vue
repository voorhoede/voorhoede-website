<template>
  <article class="page-job">
    <page-header
      :context="page.subtitle"
      :tagline="page.title"
      heading="tagline"
      :image="page.jobImage"
    />
    <div class="grid">
      <div class="page-job__content">
        <generic-text-block
          v-for="item in page.jobContent"
          :key="item.title || item.body"
          :title="item.title"
          :body="item.body"
          :image="item.image"
        />
        <footer class="page-job__footer button-group">
          <app-button
            class=""
            :label="$t('apply')"
            :to="page.url"
            external
          />
          <app-button
            :label="$t('all_jobs')"
            :to="localeUrl('jobs')"
            secondary
          />
          <scroll-to direction="up" />
        </footer>
      </div>
    </div>
  </article>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import {
    PageHeader,
    GenericTextBlock,
    ScrollTo,
    AppButton
  } from '~/components'

  export default {
    components: {
      PageHeader,
      GenericTextBlock,
      ScrollTo,
      AppButton
    },
    asyncData,
      head,
  }
</script>

<style>

  :root {
    --button-group-width: 350px;
  }

  .page-job .page-header {
    grid-column: var(--grid-page);
    margin-bottom: var(--spacing-large);
  }

  .page-job__content > * {
    margin-bottom: var(--spacing-large);
  }

  .page-job__content .scroll-to {
    display: none;
    position: absolute;
    bottom: var(--spacing-big);
    right: var(--spacing-larger);
  }

  .page-job__footer {
    margin-bottom: var(--spacing-large);
  }

  .page-job__footer .app-button {
    width: 50%;
    white-space: nowrap;
  }

  @media (min-width: 720px) {
    .page-job {
      background-color: var(--bg-pastel);
    }

    .page-job__content {
      position: relative;
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }

    .page-job__content .scroll-to {
      display: flex;
    }

    .page-job__content .button-group {
      width: var(--button-group-width);
    }
  }

  @media (min-width: 1100px) {
    .page-job__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
