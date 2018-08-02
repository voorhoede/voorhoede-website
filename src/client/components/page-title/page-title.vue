<template>
  <div class="page-title">
    <h1 v-if="seoTitle" class="sr-only">{{ seoTitle }}</h1>
    <div class="page-title__title sub-title">
      <slot name="title"/>
    </div>
    <div class="page-title__sub-title hero">
      <slot name="subTitle"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seoTitle: {
      type: String,
    },
  },
}
</script>

<style>
.page-title__sub-title {
  margin-top: var(--spacing-large);
}
</style>
