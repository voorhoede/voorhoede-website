<template>
  <div>
    <app-header />
    <nuxt/>
  </div>
</template>

<script>
import { AppHeader } from "~/components";

export default {
  components: { AppHeader }
}
</script>

<style>
@import '../components/app-core/index.css';
</style>
