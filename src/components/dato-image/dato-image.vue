<template>
  <app-image
    class="dato-image"
    :src="props.src"
    :loader="loader"
    :srcset="srcset"
  />
</template>

<script setup lang="ts">
  import { withQuery } from 'ufo';
  import { ImageLoader } from '../app-image/types';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    'srcset': {
      type: String,
      default: undefined,
    },
    'modifiers': {
      type: Object,
      default: undefined,
    },
  });

  const imgixLoader: ImageLoader = ({ src, width, quality }) => (
    withQuery(src, { w: width, q: quality, auto: 'format,compress', ...props.modifiers })
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
