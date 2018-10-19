<template>
  <section class="page-cases">
    <page-header
      title="Vacature"
      :text="page.title"
      :image="page.jobImage"
    />
    <pre>{{ page }}</pre>
  </section>
</template>

<script>
  import { PageHeader } from '~/components'

  export default {
    components: {
      PageHeader
    },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    head() {
      return {
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
