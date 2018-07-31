<template>
  <section class="page-cases">
    <div>
      <h1 class="title">{{ title }}</h1>
      <h1 class="subtitle">{{ subtitle }}</h1>
    </div>
  </section>
</template>

<script>
import getPageData from '../../../lib/get-page-data'

export default {
  async asyncData({ params }) {
    const { locale } = params
    const data = await getPageData({ uri: 'cases/index', locale })
    return data
  },
}
</script>
