<template>
  <nuxt-icon
    class="app-icon"
    :class="{ 'app-icon--large': isLarge }"
    :name="name"
    :title="alt"
    role="img"
  />
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
      isLarge: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style>
  .app-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }

  @media (min-width: 720px) {
    .app-icon--large {
      font-size: 1.4em;
    }
  }
</style>
