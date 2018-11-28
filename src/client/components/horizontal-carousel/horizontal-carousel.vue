<template>
  <div class="horizontal-carousel grid">
    <div class="horizontal-carousel__slides">
      <slot name="slides"/>
    </div>
  </div>
</template>

<style>

:root {
  --horizontal-carousel-slides-count: 3;
  --horizontal-carousel-offset-small: calc(var(--grid-margin) + var(--grid-column-small));
  --horizontal-carousel-offset-large: calc(var(--grid-margin) + var(--grid-column-large));
  --horizontal-carousel-slide-spacing-small: var(--grid-column-small);
  --horizontal-carousel-slide-spacing-large: var(--grid-column-large);
  --horizontal-carousel-slide-width-small: calc(100vw - 2 * (var(--grid-margin) + var(--grid-column-small)));
  --horizontal-carousel-slide-width-large: calc(
    (100% / var(--horizontal-carousel-slides-count))
    - ((var(--horizontal-carousel-slides-count) - 1) / var(--horizontal-carousel-slides-count) * var(--horizontal-carousel-slide-spacing-large))
  );
}

.horizontal-carousel {
  display: block;
}

.horizontal-carousel__slides {
  padding: 0 var(--horizontal-carousel-offset-small);
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
  flex: 0 0 auto;
  width: var(--horizontal-carousel-slide-width-small);
  white-space: initial;
}

.horizontal-carousel__slides > * + * {
  margin-left: var(--horizontal-carousel-slide-spacing-small);
}

.horizontal-carousel__slides > *:last-child {
  display: flex;
  flex-basis: calc(var(--horizontal-carousel-slide-width-small) + var(--horizontal-carousel-offset-small));
}

.horizontal-carousel__slides > *:last-child > * {
  flex-grow: 1;
}

.horizontal-carousel__slides > *:last-child::after {
  content: '';
  display: block;
  width: var(--horizontal-carousel-offset-small);
  flex-shrink: 0;
}

.horizontal-carousel__slides--height-fix {
  height: 500px;
}

@media (min-width: 720px) {
  .horizontal-carousel {
    display: grid;
  }

  .horizontal-carousel__slides {
    padding: 0;
    overflow-x: unset;
  }

  .horizontal-carousel__slides > * {
    width: var(--horizontal-carousel-slide-width-large);
  }

  .horizontal-carousel__slides > *:last-child {
    flex-basis: var(--horizontal-carousel-slide-width-large);
  }

  .horizontal-carousel__slides > *:last-child::after {
    content: none;
  }
}
</style>
