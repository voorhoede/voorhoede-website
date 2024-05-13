<template>
  <app-image
    class="dato-image"
    v-bind="props"
    :loader="loader"
    :srcset="checkedSrcset"
  />
</template>

<script setup lang="ts">
  import { withQuery } from 'ufo';
  import type { ImageLoader } from '../app-image/types';
  import type { ImageProps } from '../app-image/app-image.vue';
  import type { ImgixUrl } from 'typescript-imgix-url-params';

  const props = defineProps<{
    src: string,
    srcset?: string,
    modifiers?: ImgixUrl.Params,
  } & ImageProps>();

  const imgixLoader: ImageLoader = ({ src, width, quality }) => (
    withQuery(src, { w: width, q: quality, auto: 'format,compress', ...props.modifiers as Record<string, string> })
  );

  const loader = computed(() => (
    props.src.endsWith('.svg')
      ? undefined
      : imgixLoader
  ));

  const checkedSrcset = computed(() => (
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
