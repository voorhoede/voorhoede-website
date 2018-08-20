<template>
  <section class="page-index">
    <div>
      <img src="/images/logo.svg">
      <pre>{{ page }}</pre>
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
  }
</script>

<style>
.page-index {
  height: 100vh;
}
</style>
