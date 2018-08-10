<template>
  <section class="page-blog-item">
    <div>
      <h1 class="title">{{ title }}</h1>
    </div>
  </section>
</template>

<script>
import { getPageData } from '../../../lib/get-data'
import { SET_ALTERNATE_URIS } from '../../../store/alternateUris'

export default {
  async asyncData({ params, store }) {
    const { locale, slug } = params
    const data = await getPageData({ uri: `blog/${slug}`, locale })
    store.commit(SET_ALTERNATE_URIS, data.alternateUris)
    return data
  },
}
</script>
