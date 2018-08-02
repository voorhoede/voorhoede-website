<template>
  <section class="page-services">
    <div>
      <h1 class="title">{{ title }}</h1>
    </div>
  </section>
</template>

<script>
import getPageData from '../../../lib/get-page-data'

export default {
  async asyncData({ params }) {
    const { locale, slug } = params
    const data = await getPageData({ uri: `services/${slug}`, locale })
    return data
  },
}
</script>
