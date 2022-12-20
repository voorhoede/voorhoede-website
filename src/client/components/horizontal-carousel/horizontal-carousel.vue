<template>
  <div class="horizontal-carousel">
    <div class="horizontal-carousel__slides">
      <slot />
    </div>
  </div>
</template>

<style>
  :root {
    --carousel-items: 3;
  }

  .horizontal-carousel {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .horizontal-carousel::-webkit-scrollbar {
    display: none;
  }

  .horizontal-carousel__slides {
    display: flex;
  }

  .horizontal-carousel__slides > * {
    flex: 0 0 90%;
  }

  .horizontal-carousel__slides > *:not(:first-child):not(:last-child) {
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
  }

  @media (min-width: 400px) {
    .horizontal-carousel__slides > * {
      flex: 0 0 60%;
    }
  }

  @media (min-width: 800px) {
    .horizontal-carousel {
      overflow-x: unset;
    }

    .horizontal-carousel__slides > * {
      flex: 0 0 calc(100% / var(--carousel-items) - calc(var(--spacing-medium) * 2 / var(--carousel-items)));
    }

    .horizontal-carousel__slides > *:not(:first-child):not(:last-child) {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
