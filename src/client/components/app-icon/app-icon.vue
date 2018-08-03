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
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
