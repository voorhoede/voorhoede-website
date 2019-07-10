<template>
  <div class="responsive-image">
    <fixed-ratio
      v-if="hasFixedRatio"
      :width="image.width"
      :height="image.height">
      <app-image :image="image"/>
    </fixed-ratio>
    <app-image
      v-else
      :image="image"/>
  </div>
</template>

<script>
  import AppImage from '../app-image'
  import FixedRatio from '../fixed-ratio'

  export default {
    components: {
      FixedRatio,
      AppImage,
    },
    props: {
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
</style>
