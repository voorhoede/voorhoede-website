<template>
  <section class="page-index">
    <div>
      <img src="/images/logo.svg">
      <h1 class="title">
        {{ title }}
      </h1>
      <h2 class="subtitle" v-html="subtitle" />
    </div>
  </section>
</template>

<script>
import getPageData from '../../lib/get-page-data'

export default {
  layout: 'landing',
  async asyncData({ params }) {
    const { locale } = params
    const data = await getPageData({ uri: 'index', locale })
    return data
  },
}
</script>

<style>
.page-index {
  height: 100vh;
}
</style>
