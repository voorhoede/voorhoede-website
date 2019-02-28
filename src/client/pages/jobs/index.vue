<template>
  <section class="page-jobs">
    <page-header
      :small-text="page.title"
      :large-text="page.subtitle"
      heading="small-text"
      :image="page.headerIllustration"
    />
    <div class="grid">
      <ul class="page-jobs__overview">
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
    </div>
  </section>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import { PageHeader, JobsExcerpt } from '~/components'

  export default {
    components: {
      PageHeader,
      JobsExcerpt
    },
    asyncData,
    head,
  }
</script>

<style>
.page-jobs__overview {
  grid-column: var(--grid-content);
  margin: var(--spacing-large) 0;
}

@media (min-width: 1100px) {
  .page-jobs__overview {
    grid-column: var(--grid-content-narrow);
  }
}
</style>

