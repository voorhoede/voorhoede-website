<template>
  <section class="page-cases">
    <pre>{{ page }}</pre>
  </section>
</template>

<script>
  export default {
    async asyncData({ store, route, error }) {
      try {
        return await store.dispatch('getData', { route })
      } catch (err) {
        error({ statusCode: 404, message: err.message })
        return store.dispatch('setCurrentLayout', { layout: 'error/404' })
      }
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
