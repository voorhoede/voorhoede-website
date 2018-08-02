<template>
  <section class="page-cases">
    <div>
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>
  </section>
</template>

<script>
import getPageData from '../../../lib/get-page-data'

export default {
  async asyncData({ params }) {
    const { locale, jobs, slug } = params
    const data = await getPageData({ uri: `${jobs}/${slug}`, locale })
    return data
  },
  validate ({ params }) {
    return /^(jobs|vacatures)$/.test(params.jobs)
  },
}
</script>
