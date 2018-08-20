<template>
  <section class="page-services">
    <div>
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
