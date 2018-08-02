<template>
  <section class="page-cases">
    <div>
      <h1 class="title">{{ title }}</h1>
      <h1 class="subtitle">{{ subtitle }}</h1>
    </div>
  </section>
</template>

<script>
import { getPageData } from '../../../lib/get-data'

export default {
  async asyncData({ params, store }) {
    const { locale } = params
    const data = await getPageData({ uri: 'cases/index', locale })
    store.commit('alternateUris/SET_ALTERNATE_URIS', data.alternateUris)
    return data
  },
}
</script>
