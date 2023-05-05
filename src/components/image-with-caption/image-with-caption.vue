<template>
  <div class="image-with-caption">
    <dato-image
      class="image-with-caption__image"
      :src="image.url"
      alt=""
      :width="image.width"
      :height="image.height"
      loading="eager"
      sizes="100vw"
    />
    <div
      v-if="caption"
      class="image-with-caption__caption body-detail"
    >
      {{ caption }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      caption: {
        type: String,
        default: null
      },
      image: {
        type: Object,
        required: true,
      },
    }
  }
</script>

<style>
  .image-with-caption__image {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
  }

  .image-with-caption__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
