<template>
  <div class="horizontal-carousel grid">
    <div class="horizontal-carousel__item">
      <div class="horizontal-carousel__item-slides">
        <slot name="slides"/>
      </div>
    </div>
  </div>
</template>

<style>
  :root {
    --horizontal-carousel-slides-count: 3;
    --horizontal-carousel-slide-width-small: calc(100vw - 2 * (var(--grid-margin)));
    --horizontal-carousel-slide-width-large: calc(100vw / var(--horizontal-carousel-slides-count));
    --horizontal-carousel-width-small: calc(100vw * var(--horizontal-carousel-slides-count) - (var(--grid-margin) * var(--horizontal-carousel-slides-count)));
  }

  .horizontal-carousel {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .horizontal-carousel::-webkit-scrollbar {
    display: none;
  }

  .horizontal-carousel__item {
    width: var(--horizontal-carousel-width-small);
  }

  .horizontal-carousel__item-slides {
    display: flex;
  }

  .horizontal-carousel__item-slides > * {
    width: var(--horizontal-carousel-slide-width-small);
  }

  .horizontal-carousel__item-slides > *:not(:first-child):not(:last-child) {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .horizontal-carousel {
      overflow-x: unset;
    }

    .horizontal-carousel__item {
      width: 100%;
    }

    .horizontal-carousel__item-slides {
      flex-direction: row;
      width: 100%;
    }

    .horizontal-carousel__item-slides > * {
      width: var(--horizontal-carousel-slide-width-large);
    }

    .horizontal-carousel__item-slides > *:not(:first-child):not(:last-child) {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
