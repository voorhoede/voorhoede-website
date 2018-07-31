<template>
  <section class="page-blog">
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
    const data = await getPageData({ uri: `blog/${slug}`, locale })
    return data
  },
}
</script>
