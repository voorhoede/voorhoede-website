<template>
  <section class="page-cases">
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
