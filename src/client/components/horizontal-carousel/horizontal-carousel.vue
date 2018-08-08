<template>
  <div class="horizontal-carousel">
    <div class="horizontal-carousel__track" :style="`--horizontal-carousel-children-count: ${childrenCount}`">
      <slot name="slides"/>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    childrenCount() {
      return this.$slots.slides
        .filter(slide => slide.tag)
        .length
    }
  }
}
</script>

<style>
:root {
  --horizontal-carousel-offset: calc(var(--grid-margin) + var(--grid-fixed-column));
  --horizontal-carousel-child-width: calc(100vw - 2 * var(--horizontal-carousel-offset));
}

@supports (width: var(--horizontal-carousel-child-width)) {
  .horizontal-carousel {
    width: 100%;
    overflow-x: auto;
  }

  .horizontal-carousel__track {
    padding-left: var(--horizontal-carousel-offset);
    display: flex;
    align-items: center;
    width: calc(
      (var(--horizontal-carousel-children-count) * var(--horizontal-carousel-child-width))
      + (2 * var(--horizontal-carousel-offset))
    );
  }

  .horizontal-carousel__track > * {
    width: var(--horizontal-carousel-child-width);
    border: 2px solid var(--black); /* TODO: Remove this border */
  }
}
</style>
