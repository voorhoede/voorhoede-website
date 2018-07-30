<template>
  <section class="page-contact">
    <div>
      <app-logo/>
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
    </div>
  </section>
</template>

<script>
import getPageData from '../../lib/get-page-data'
import { AppLogo } from '~/components'

export default {
  async asyncData({ params }) {
    const { locale } = params
    const data = await getPageData({ uri: 'contact', locale })
    return data
  },
  components: { AppLogo },
}
</script>

<style>
.page-contact {
  height: 100vh;
}
</style>
