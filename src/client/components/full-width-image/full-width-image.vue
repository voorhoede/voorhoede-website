<template>
  <responsive-image
    :needs-max-width="false"
    :image="{
      'format': 'jpeg',
      'width': 640,
      'height': 360,
      'alt': 'Two hands forming a heart around the sun during a sunset',
      'url': 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
    }"
  />
</template>

<script>
  import { ResponsiveImage } from '~/components'

  export default {
    components: {
      ResponsiveImage
    }
  }
</script>

<style>
</style>
