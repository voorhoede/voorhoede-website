<template>
  <div class="responsive-image">
    <fixed-ratio
      v-if="hasFixedRatio"
      :width="image.width"
      :height="image.height">
      <app-image
        :image="image"
        :caption="caption"/>
    </fixed-ratio>
    <app-image
      v-else
      :image="image"
      :caption="caption"/>
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
      hasFixedRatio: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style>
  .responsive-image {
    margin-left: auto;
    margin-right: auto;
    height: auto;
    width: 100%;
  }

  .responsive-image__caption {
    margin-top: var(--spacing-smaller);
    text-align: center;
  }
</style>
