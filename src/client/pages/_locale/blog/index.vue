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
  async asyncData({ params, store }) {
    const { locale } = params
    const data = await getPageData({ uri: 'blog/index', locale })
    store.commit('alternateUris/SET_ALTERNATE_URIS', data.alternateUris)
    return data
  },
}
</script>
