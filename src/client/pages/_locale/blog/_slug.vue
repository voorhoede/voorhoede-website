<template>
  <section class="page-blog-item">
    <pre>{{ page }}</pre>
  </section>
</template>

<script>
  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
  }
</script>
