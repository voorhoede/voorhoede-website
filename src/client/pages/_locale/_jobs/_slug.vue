<template>
  <section class="page-cases">
    <div>
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>
  </section>
</template>

<script>
import { getPageData } from '../../../lib/get-data'

export default {
  async asyncData({ params, store }) {
    const { locale, jobs, slug } = params
    const data = await getPageData({ uri: `${jobs}/${slug}`, locale })
    store.commit('alternateUris/SET_ALTERNATE_URIS', data.alternateUris)
    return data
  },
  validate ({ params }) {
    return /^(jobs|vacatures)$/.test(params.jobs)
  },
}
</script>
