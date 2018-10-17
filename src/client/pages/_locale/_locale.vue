<template>
  <nuxt-child/>
</template>

<script>
  import { getData } from '../../lib/get-data'

  export default {
    async asyncData({ route }) {
      const { meta } = await getData(`/${route.params.locale || process.env.defaultLocale}`)

      return { meta }
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
