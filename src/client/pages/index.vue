<template>
  <section class="page-index">
    <div>
      <img src="/images/logo.svg">
      <h1 class="title">
        Voorhoede Dragonfly
      </h1>
      <h2 class="subtitle">
        Website for De Voorhoede
      </h2>
    </div>
    <responsive-image
      :image="{
        'format': 'jpeg',
        'width': 360,
        'height': 360,
        'alt': 'Mountain landscape with a cloudy sky',
        'url': 'https://www.datocms-assets.com/6068/1529671983-random-image-square.jpeg',
      }"
    />
  </section>
</template>

<script>
import { ResponsiveImage } from '~/components'

export default {
  components: { ResponsiveImage },
  layout: 'landing',
}
</script>

<style>
.page-index {
  height: 100vh;
}
</style>
