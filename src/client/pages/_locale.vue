<template>
  <nuxt-child/>
</template>

<script>
  export default {
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    head() {
      return {
        meta: [
          { 'name': 'description', 'content': this.meta.description },
          { 'name': 'subject', 'content': this.meta.subject },
          { 'name': 'keywords', 'content': this.meta.keywords.map(item => item.keyword).join(', ') },
        ]
      }
    }
  }
</script>
