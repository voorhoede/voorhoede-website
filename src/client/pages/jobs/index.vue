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
  import { PageHeader, JobsExcerpt } from '~/components'

  export default {
    components: {
      PageHeader,
      JobsExcerpt
    },
    asyncData,
    head() {
      return {
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords }
        ]
      }
    }
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

