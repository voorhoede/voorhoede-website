<template>
  <div class="page-team">
    <gallery-parallax :team="data.people" />
  </div>
</template>

<script setup>
import query from './index.team.graphql?raw';
const { data } = await useFetchContent({ query });
</script>

<style>
.page-team {
  padding-top: var(--spacing-large);
}
</style>
