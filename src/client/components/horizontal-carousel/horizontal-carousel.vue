<template>
  <div class="grid">
    <div class="horizontal-carousel">
      <slot name="slides"/>
    </div>
  </div>
</template>

<style>
  .horizontal-carousel {
    display: flex;
    flex-direction: column;
  }

  .horizontal-carousel > .case-excerpt {
    width: 100%;
    margin-bottom: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .horizontal-carousel {
      flex-direction: row;
    }

    .horizontal-carousel > .case-excerpt {
      width: calc(100% / 3);
    }

    .horizontal-carousel > .case-excerpt:not(:first-child):not(:last-child) {
      margin-left: var(--spacing-medium);
      margin-right: var(--spacing-medium);
    }
  }
</style>
