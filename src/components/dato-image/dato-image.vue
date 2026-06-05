<template>
  <img
    v-if="isSvg"
    class="dato-image"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :loading="props.loading"
    decoding="async"
  >
  <Image
    v-else
    class="dato-image"
    v-bind="props"
    :loader="imgixLoader"
    :srcset="props.srcset"
  />
</template>

<script setup lang="ts">
import { withQuery, type QueryObject } from "ufo";
import type { ImgixUrl } from "typescript-imgix-url-params";
import { Image, type ImageProps, type ImageLoader } from "@voorhoede/image-vue";

const props = defineProps<Omit<ImageProps, 'loader'> & {
  modifiers?: ImgixUrl.Params;
}>();

const isSvg = computed(() => props.src.endsWith('.svg'));

const imgixLoader: ImageLoader = ({ src, width, quality }) =>
  withQuery(src, {
    w: width,
    q: quality,
    auto: "format,compress",
    cs: "origin",
    ...(props.modifiers as QueryObject),
  });
</script>

<style>
.dato-image {
  display: block;
  max-width: 100%;
}
</style>
