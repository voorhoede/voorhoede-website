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
          v-if="page.jobTagline"
          :is-nested="false"
          :key="page.jobTagline.title || page.jobTagline.body"
          :title="page.jobTagline.title"
          :body="page.jobTagline.body"
          :image="page.jobTagline.image"
        />
        <generic-text-block
          v-if="page.jobIntro"
          :is-nested="false"
          :key="page.jobIntro.title || page.jobIntro.body"
          :title="page.jobIntro.title"
          :body="page.jobIntro.body"
          :image="page.jobIntro.image"
        />
        <template v-for="item in page.jobContent">
          <generic-text-block
            v-if="item._modelApiKey === 'generic_text_block'"
            :key="item.id"
            :is-nested="false"
            :title="item.title"
            :body="item.body"
            :image="item.image"
          />
          <gallery-block
            v-if="item._modelApiKey === 'gallery_block'"
            :key="item.id"
            :images="item.gallery.images"
            class="page-job__gallery"
          />
        </template>
        <generic-text-block
          v-if="page.jobOutro"
          :is-nested="false"
          :key="page.jobOutro.title || page.jobOutro.body"
          :title="page.jobOutro.title"
          :body="page.jobOutro.body | replaceSalary(page.salary)"
          :image="page.jobOutro.image"
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
    filters: {
      replaceSalary: function (value, arg) {
        return arg ? value.replace('[SALARY]', arg) : value
      }
    },
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

  .page-job__gallery {
    margin-top: var(--spacing-larger);
    margin-bottom: var(--spacing-big);
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
