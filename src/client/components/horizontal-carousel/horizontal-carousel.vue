<template>
  <div class="horizontal-carousel grid">
    <div class="horizontal-carousel__slides">
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
  display: block;
}

.horizontal-carousel__slides {
  padding: 0 var(--horizontal-carousel-offset);
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.horizontal-carousel__slides::-webkit-scrollbar {
  display: none;
}

.horizontal-carousel__slides > * {
  flex: 0 0 var(--horizontal-carousel-slide-width);
  white-space: initial;
}

.horizontal-carousel__slides > * + * {
  margin-left: var(--horizontal-carousel-slide-spacing);
}

.horizontal-carousel__slides > *:last-child {
  display: flex;
  flex-basis: calc(var(--horizontal-carousel-slide-width) + var(--horizontal-carousel-offset));
}

.horizontal-carousel__slides > *:last-child > * {
  flex-grow: 1;
}

.horizontal-carousel__slides > *:last-child::after {
  content: '';
  display: block;
  width: var(--horizontal-carousel-offset);
}

@media (min-width: 720px) {
  :root {
    --horizontal-carousel-slides-count: 3;
    --horizontal-carousel-slide-width: calc(
      (100% / var(--horizontal-carousel-slides-count))
      - ((var(--horizontal-carousel-slides-count) - 1) / var(--horizontal-carousel-slides-count) * var(--horizontal-carousel-slide-spacing))
    );
  }

  .horizontal-carousel {
    display: grid;
  }

  .horizontal-carousel__slides {
    padding: 0;
  }

  .horizontal-carousel__slides > *:last-child {
    flex-basis: var(--horizontal-carousel-slide-width);
  }

  .horizontal-carousel__slides > *:last-child::after {
    content: none;
  }
}
</style>
