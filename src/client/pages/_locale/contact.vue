<template>
  <section class="page-contact">
    <div>
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
    </div>
  </section>
</template>

<script>
import getPageData from '../../lib/get-page-data'

export default {
  async asyncData({ params }) {
    const { locale } = params
    const data = await getPageData({ uri: 'contact', locale })
    return data
  },
}
</script>
