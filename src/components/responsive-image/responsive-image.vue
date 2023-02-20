<template>
  <div class="responsive-image">
    <dato-image
      class="responsive-image__image"
      :src="image.url"
      alt=""
      :width="image.width"
      :height="image.height"
      loading="eager"
      sizes="100vw"
    />
    <div
      v-if="caption"
      class="responsive-image__caption body-detail">
      {{ caption }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      caption: {
        type: String,
        default: '',
      },
      image: {
        type: Object,
        required: true,
      },
    }
  }
</script>

<style>
  .responsive-image__image {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .responsive-image__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
