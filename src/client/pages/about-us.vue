<template>
  <section class="page-about-us">
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
.page-about-us {
  height: 100vh;
}
</style>
