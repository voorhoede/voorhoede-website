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
          { 'name': 'description', 'content': this.app.description },
          { 'name': 'subject', 'content': this.app.subject },
          { 'name': 'keywords', 'content': this.app.keywords.map(item => item.keyword).join(', ') },
        ]
      }
    }
  }
</script>
