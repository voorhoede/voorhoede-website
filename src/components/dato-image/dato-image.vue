<template>
  <app-image
    class="dato-image"
    :src="props.src"
    :loader="loader"
    :srcset="srcset"
  />
</template>

<script setup lang="ts">
  import { ImageLoader } from '../app-image/types';

  const props = defineProps(['src', 'srcset']);

  const imgixLoader: ImageLoader = ({ src, width, quality }) => (
    `${src}?w=${width}&q=${quality}&auto=format,compress`
  );

  const loader = computed(() => (
    props.src.endsWith('.svg')
      ? undefined
      : imgixLoader
  ));

  const srcset = computed(() => (
    props.src.endsWith('.svg')
      ? ''
      : props.srcset
  ));
</script>

<style>
  .dato-image {
    display: block;
    max-width: 100%;
  }
</style>
