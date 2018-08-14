<template>
  <section class="page-index">
    <div>
      <img src="/images/logo.svg">
      <pre>{{ home }}</pre>
    </div>
  </section>
</template>

<script>
  import query from './index.query.graphql'
  import { getData } from '../../lib/get-data'

  export default {
    layout: 'landing',
    async asyncData({ params }) {
      const { locale } = params
      return await getData({ query, variables: { locale, altLocale: 'nl' } })
    },
  }
</script>

<style>
.page-index {
  height: 100vh;
}
</style>
