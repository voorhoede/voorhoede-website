<template>
  <Image
    class="dato-image"
    :src="props.src"
    :loader="loader"
    :srcset="checkedSrcset"
  />
</template>

<script setup lang="ts">
import { withQuery, type QueryObject } from "ufo";
import type { ImgixUrl } from "typescript-imgix-url-params";
import { Image, type ImageLoader } from "@voorhoede/image-vue";

const props = defineProps<{
  src: string;
  srcset?: string;
  modifiers?: ImgixUrl.Params;
}>();

const imgixLoader: ImageLoader = ({ src, width, quality }) =>
  withQuery(src, {
    w: width,
    q: quality,
    auto: "format,compress",
    cs: "origin",
    ...(props.modifiers as QueryObject),
  });

const loader = computed(() =>
  props.src.endsWith(".svg") ? ({ src }: { src: string }) => src : imgixLoader
);

const checkedSrcset = computed(() =>
  props.src.endsWith(".svg") ? "" : props.srcset
);
</script>

<style>
.dato-image {
  display: block;
  max-width: 100%;
}
</style>
