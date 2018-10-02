<template>
  <div>test</div>
</template>

<script>
  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    }
  }
</script>
