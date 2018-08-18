<template>
  <section class="page-services">
    <pre>{{ page }}</pre>
  </section>
</template>

<script>
  import query from './_slug.query.graphql'

  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { query, route })
    },
  }
</script>
