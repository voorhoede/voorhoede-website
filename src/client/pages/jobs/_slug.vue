<template>
  <section class="page-job">
    <page-header
      :title="page.subtitle"
      :text="page.title"
      :image="page.jobImage"
    />
    <div class="grid">
      <div class="page-job__overview">
        <ul>
          <li
            class="page-job__overview-item"
            v-for="item in page.jobContent"
            :key="item.title">
            <generic-text-block
              :title="item.title"
              :body="item.body"
              :image="item.image"
            />
          </li>
        </ul>
        <div class="button-group">
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
        </div>
        <scroll-to point-up />
      </div>
    </div>
  </section>
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

  .page-job__overview-item {
    margin-bottom: var(--spacing-large);
  }

  .page-job__overview .scroll-to {
    display: none;
    position: absolute;
    bottom: var(--spacing-big);
    right: var(--spacing-larger);
  }

  .page-job__overview .button-group {
    margin-bottom: var(--spacing-large);
  }

  .page-job__overview .button-group .app-button {
    width: 50%;
    white-space: nowrap;
  }

  @media (min-width: 720px) {
    .page-job {
      background-color: var(--bg-pastel);
    }

    .page-job__overview {
      position: relative;
      grid-column: var(--grid-content);
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-larger);
    }

    .page-job__overview .scroll-to {
      display: flex;
    }

    .page-job__overview .button-group {
      width: var(--button-group-width);
    }
  }

  @media (min-width: 1100px) {
    .page-job__overview {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
