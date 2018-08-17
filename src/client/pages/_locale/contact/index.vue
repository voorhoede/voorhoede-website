<template>
  <section class="page-contact">
    <pre>{{ contact }}</pre>
  </section>
</template>

<script>
  import query from './index.query.graphql'

  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { query, route })
    },
  }
</script>
