<template>
  <div class="page-jobs">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="grid">
      <ul class="page-jobs__overview" v-if="items.length">
        <li
          v-for="item in items"
          :key="item.slug">
          <jobs-excerpt
            :title="item.title"
            :description="item.description"
            :label="item.callToActionLabel"
            :image="item.jobImage"
            :slug="item.slug"
          />
        </li>
      </ul>
      <generic-text-block
        v-else
        class="page-jobs__empty-message"
        :body="page.noJobsAvailableMessage"
      />
    </div>
  </div>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    head,
  }
</script>

<style>
  .page-jobs__overview {
    grid-column: var(--grid-content);
    margin: var(--spacing-large) 0;
  }

  .page-jobs__empty-message {
    margin-top: var(--spacing-large);
    margin-bottom: var(--spacing-big);
  }

  @media (min-width: 720px) {
    .page-jobs__empty-message {
      grid-column: var(--grid-content);
      margin-top: var(--spacing-big);
      margin-bottom: var(--spacing-bigger);
    }
  }

  @media (min-width: 1100px) {
    .page-jobs__overview {
      grid-column: var(--grid-content-narrow);
    }

    .page-jobs__empty-message {
      grid-column-start: 4;
      grid-column-end: 48;
    }
  }
</style>
