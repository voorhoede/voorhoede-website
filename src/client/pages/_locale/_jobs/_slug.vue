<template>
  <section class="page-cases">
    <pre>{{ job }}</pre>
  </section>
</template>

<script>
  import query from './index.query.graphql'
  import { getData } from '../../../lib/get-data'

  export default {
    async asyncData({ params }) {
      const { locale } = params
      return await getData({ query, variables: { locale, altLocale: 'nl' } })
    },
  }
</script>
