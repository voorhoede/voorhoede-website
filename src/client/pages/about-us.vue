<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        About us
      </h1>
      <h2 class="subtitle">
        We are De Voorhoede
      </h2>
    </div>
  </section>
</template>

<script>
import { AppLogo } from '~/components'

export default {
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
