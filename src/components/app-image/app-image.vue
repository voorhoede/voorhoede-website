<template>
  <img
    :src="loader({ src: props.src, width: props.width, quality: props.quality })"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :loading="props.loading"
    :sizes="props.sizes"
    :srcset="props.srcset ?? generateSrcSet({
      loader: props.loader,
      src: props.src,
      width: props.width,
      quality: props.quality,
      sizes: props.sizes,
    })"
    :decoding="props.decoding"
  />
</template>

<script setup lang="ts">
  import { ImageLoader } from './types';
  import { generateSrcSet } from './generate-src-set';

  export type ImageProps = {
    src: string
    alt: string
    width: number;
    height: number;
    loading: 'eager' | 'lazy';
    sizes?: string
    srcset?: string
    decoding?: 'async' | 'auto' | 'sync'
    loader?: ImageLoader;
    // Quality passed to the loader
    quality?: number;
  };

  const props = withDefaults(defineProps<ImageProps>(), {
    decoding: 'async',
    loader: () => ({ src }) => src,
    quality: 45,
  });
</script>
