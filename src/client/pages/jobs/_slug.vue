<template>
  <main class="page-job">
    <page-header
      heading="headline"
      :byline="page.subtitle"
      :headline="page.title"
      :image="page.jobImage"
    />
    <div class="grid">
      <div class="page-job__content">
        <generic-text-block
          v-for="item in page.jobContent"
          :is-nested="false"
          :key="item.title || item.body"
          :title="item.title"
          :body="item.body"
          :image="item.image"
        />
        <footer class="page-job__footer button-group">
          <h2 class="page-job__title h3">
            {{ page.callToActionTitle }}
          </h2>

          <app-button
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

<style>
  :root {
    --button-group-width: 350px;
  }

  .page-job .page-header {
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

  .page-job__title {
    margin-bottom: var(--spacing-tiny);
  }

  .page-job__footer {
    margin-bottom: var(--spacing-large);
  }

  .page-job__footer .app-button {
    white-space: nowrap;
    margin-top: var(--spacing-small);
  }

  .page-job__footer .app-button:not(:first-of-type) {
    margin-left: var(--spacing-small);
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

    .page-job__title {
      margin-bottom: var(--spacing-small);
    }

    .page-job__footer .app-button {
      margin-top: 0;
    }
  }

  @media (min-width: 1100px) {
    .page-job__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-big) var(--spacing-bigger);
    }
  }
</style>
