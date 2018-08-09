<template>
  <div class="horizontal-carousel">
    <div class="horizontal-carousel__track">
      <slot name="slides"/>
    </div>
  </div>
</template>

<style>
:root {
  --horizontal-carousel-offset: calc(var(--grid-margin) + var(--grid-fixed-column));
  --horizontal-carousel-slide-spacing: var(--grid-fixed-column);
  --horizontal-carousel-slide-width: calc(100vw - 2 * var(--horizontal-carousel-offset));
}

.horizontal-carousel {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.horizontal-carousel::-webkit-scrollbar {
  display: none;
}

.horizontal-carousel__track {
  padding: 0 var(--horizontal-carousel-offset);
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
}

.horizontal-carousel__slide {
  flex: 0 0 var(--horizontal-carousel-slide-width);
}

.horizontal-carousel__slide + .horizontal-carousel__slide {
  margin-left: var(--horizontal-carousel-slide-spacing);
}

.horizontal-carousel__slide:last-child {
  display: flex;
}

.horizontal-carousel__slide:last-child > * {
  flex-grow: 1;
}

.horizontal-carousel__slide:last-child::after {
  content: '';
  display: block;
  width: calc(var(--horizontal-carousel-offset) + var(--horizontal-carousel-slide-spacing));
}
</style>
