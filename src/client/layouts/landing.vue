<template>
  <div class="layout-landing">
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

.layout-landing {
  background-color: var(--white);
}
</style>
