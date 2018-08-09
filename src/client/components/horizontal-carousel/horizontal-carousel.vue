<template>
  <div class="horizontal-carousel">
    <slot name="slides"/>
  </div>
</template>

<style>
:root {
  --horizontal-carousel-offset: calc(var(--grid-margin) + var(--grid-fixed-column));
  --horizontal-carousel-slide-spacing: var(--grid-fixed-column);
  --horizontal-carousel-slide-width: calc(100vw - 2 * var(--horizontal-carousel-offset));
}

.horizontal-carousel {
  padding: 0 var(--horizontal-carousel-offset);
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.horizontal-carousel::-webkit-scrollbar {
  display: none;
}

.horizontal-carousel > * {
  flex: 0 0 var(--horizontal-carousel-slide-width);
}

.horizontal-carousel > * + * {
  margin-left: var(--horizontal-carousel-slide-spacing);
}

.horizontal-carousel > *:last-child {
  display: flex;
  flex-basis: calc(var(--horizontal-carousel-slide-width) + var(--horizontal-carousel-offset));
}

.horizontal-carousel > *:last-child > * {
  flex-grow: 1;
}

.horizontal-carousel > *:last-child::after {
  content: '';
  display: block;
  width: var(--horizontal-carousel-offset);
}
</style>
