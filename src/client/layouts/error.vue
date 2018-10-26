<template>
  <section>
    <page-header
      :title="layoutData.error.title"
      :text="String(layoutData.error.errorCode)"
      :image="layoutData.error.headerImage"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'

import PageHeader from '../components/page-header'

export default {
  components: { PageHeader },
  props: {
    error: {
      type: [Object, Error],
      required: true,
    },
  },
  computed: {
    ...mapState(['layoutData'])
  }
}
</script>
