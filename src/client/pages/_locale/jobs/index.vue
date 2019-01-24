<template>
  <section class="page-jobs">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration"
    />
    <div class="grid">
      <ul class="page-jobs__overview">
        <li
          v-for="item in page.jobs"
          :key="item.slug">
          <jobs-excerpt
            v-if="item.published"
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
  import head from '~/lib/seo-head'
  import { PageHeader, JobsExcerpt } from '~/components'

  export default {
    components: {
      PageHeader,
      JobsExcerpt
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
head
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

