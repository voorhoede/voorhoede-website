<template>
  <section class="page-academy">
    <pre>{{ academy }}</pre>
  </section>
</template>

<script>
  import query from './_aboutUs.query.graphql'
  import { getData } from '../../lib/get-data'

  export default {
    async asyncData({ params }) {
      const { locale } = params
      return await getData({ query, variables: { locale, altLocale: 'nl' } })
    },
  }
</script>
