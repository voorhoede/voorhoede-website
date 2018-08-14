<template>
  <section class="page-contact">
    <pre>{{ contact }}</pre>
  </section>
</template>

<script>
  import query from './contact.query.graphql'
  import { getData } from '../../lib/get-data'

  export default {
    async asyncData({ params }) {
      const { locale } = params
      return await getData({ query, variables: { locale, altLocale: 'nl' } })
    },
  }
</script>
