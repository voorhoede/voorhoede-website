<template>
  <section class="page-index">
    <div>
      <app-logo/>
      <h1 class="title">
        Voorhoede Dragonfly
      </h1>
      <h2 class="subtitle">
        Website for De Voorhoede
      </h2>
    </div>
  </section>
</template>

<script>
import { AppLogo } from '~/components'

export default {
  layout: 'landing',
  components: { AppLogo }
}
</script>

<style>
.page-index {
  height: 100vh;
}
</style>
