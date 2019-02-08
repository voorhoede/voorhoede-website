<template>
  <div class="horizontal-carousel grid">
    <div class="horizontal-carousel__scroll-container">
      <div class="horizontal-carousel__slides">
        <slot name="slides"/>
      </div>
    </div>
  </div>
</template>

<style>
  :root {
    --horizontal-carousel-slides-count: 3;
    --horizontal-carousel-slide-width-small: calc(100vw - 2 * (var(--grid-margin)));
    --horizontal-carousel-slide-width-medium: calc(100vw / (var(--horizontal-carousel-slides-count) - 1) - (var(--grid-margin) * 2));
    --horizontal-carousel-slide-width-large: calc(100vw / var(--horizontal-carousel-slides-count));
    --horizontal-carousel-width-small: calc(100vw * var(--horizontal-carousel-slides-count) - (var(--grid-margin) * (var(--horizontal-carousel-slides-count) + 1)));
    --horizontal-carousel-width-medium: calc((100vw * var(--horizontal-carousel-slides-count) - (var(--grid-margin) * (var(--horizontal-carousel-slides-count) + 1))) / 2);
  }

  .horizontal-carousel {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .horizontal-carousel::-webkit-scrollbar {
    display: none;
  }

  .horizontal-carousel__scroll-container {
    width: var(--horizontal-carousel-width-small);
  }

  .horizontal-carousel__slides {
    display: flex;
  }

  .horizontal-carousel__slides > * {
    width: var(--horizontal-carousel-slide-width-small);
  }

  .horizontal-carousel__slides > *:not(:first-child):not(:last-child) {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  @media (min-width: 400px) {
    .horizontal-carousel__scroll-container {
      width: var(--horizontal-carousel-width-medium);
    }

    .horizontal-carousel__slides > * {
      width: var(--horizontal-carousel-slide-width-medium);
    }
  }

  @media (min-width: 800px) {
    .horizontal-carousel {
      overflow-x: unset;
    }

    .horizontal-carousel__scroll-container {
      width: 100%;
    }

    .horizontal-carousel__slides {
      width: 100%;
    }

    .horizontal-carousel__slides > * {
      width: var(--horizontal-carousel-slide-width-large);
    }

    .horizontal-carousel__slides > *:not(:first-child):not(:last-child) {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
