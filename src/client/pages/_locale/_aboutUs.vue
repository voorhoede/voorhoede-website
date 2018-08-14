<template>
  <section class="page-about-us">
    <pre>{{ about }}</pre>
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
