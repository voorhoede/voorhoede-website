<template>
  <div class="responsive-image__sizer">
    <fixed-ratio
      v-if="enableFixedRatio"
      :width="image.width"
      :height="image.height">
      <image-component :image="image"/>
    </fixed-ratio>
    <image-component
      v-else
      :image="image"/>
  </div>
</template>

<script>
  import ImageComponent from '../image-component'
  import FixedRatio from '../fixed-ratio'

  export default {
    components: {
      FixedRatio,
      ImageComponent,
    },
    props: {
      image: {
        type: Object,
        required: true,
        validator(image) {
          return typeof(image.width) === 'number' && typeof(image.height) === 'number'
            && typeof(image.format) === 'string' && typeof(image.url) === 'string'
        },
      },
      enableFixedRatio: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style>
  @import '../app-core/variables.css';

  .responsive-image__sizer {
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 100%;
    background-color: var(--bg-pastel);
  }
</style>
