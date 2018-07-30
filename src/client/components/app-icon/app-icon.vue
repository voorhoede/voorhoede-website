<template>
  <img class="app-icon"
       :src="`/icons/${name}.svg`"
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
}
</style>
