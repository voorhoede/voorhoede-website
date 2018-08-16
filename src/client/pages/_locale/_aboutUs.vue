<template>
  <section class="page-cases">
    <pre>{{ about }}</pre>
  </section>
</template>

<script>
  import query from './_aboutUs.query.graphql'

  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { query, route })
    },
  }
</script>
