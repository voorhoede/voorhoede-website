<template>
  <img class="app-icon"
       :src="`/icons/icon_${name}.svg`"
       :alt="alt">
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style scoped>
.app-icon {
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
}
</style>
