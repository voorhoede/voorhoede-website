<template>
<div class="horizontal-carousel-container">
  <div class="horizontal-carousel grid">
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
  }

  .horizontal-carousel-container {
    overflow-x: scroll;
  }

  .horizontal-carousel {
    width: calc(100vw * var(--horizontal-carousel-slides-count) - (var(--spacing-small) * 4));
  }

  .horizontal-carousel-container::-webkit-scrollbar {
    display: none;
  }

  .horizontal-carousel__slides {
    display: flex;
    flex-direction: row;
  }

  .horizontal-carousel__slides > * {
    width: var(--horizontal-carousel-slide-width-small);
    margin-bottom: var(--spacing-medium);
  }

  .horizontal-carousel__slides > *:not(:first-child):not(:last-child) {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  @media (min-width: 720px) {
    .horizontal-carousel-container {
      overflow-x: unset;
    }

    .horizontal-carousel {
      width: 100%;
    }

    .horizontal-carousel__slides {
      flex-direction: row;
      width: 100%;
    }

    .horizontal-carousel__slides > * {
      width: calc(100% / var(--horizontal-carousel-slides-count));
    }

    .horizontal-carousel__slides > *:not(:first-child):not(:last-child) {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
