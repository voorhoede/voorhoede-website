<template>
  <section class="page-about-us">
    <div>
      <h1 class="title">{{ title }}</h1>
      <h1 class="subtitle">{{ subtitle }}</h1>
    </div>
  </section>
</template>

<script>
import getPageData from '../../lib/get-page-data'

export default {
  async asyncData({ params, store }) {
    const { locale, aboutUs } = params
    const data = await getPageData({ uri: aboutUs, locale })
    store.commit('alternateUris/SET_ALTERNATE_URIS', data.alternateUris)
    return data
  },
  validate ({ params }) {
    return /^(about-us|over-ons)$/.test(params.aboutUs)
  },
}
</script>
