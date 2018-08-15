<template>
  <section class="page-index">
    <div>
      <img src="/images/logo.svg">

      <nuxt-link to="/en/blog/aapje/" >googogogo</nuxt-link>
      <pre>{{ home }}</pre>
    </div>
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

<style>
.page-index {
  height: 100vh;
}
</style>
