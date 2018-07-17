<template>
  <section class="container">
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
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
