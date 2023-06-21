<template>
  <div class="two-column-block">
    <slot name="left" />
    <slot name="right" />
  </div>
</template>

<style scoped>
.two-column-block {
    display: grid;
    grid-row-gap: var(--spacing-small);
}

@media (min-width: 720px) {
  .two-column-block {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: var(--spacing-large);
  }
}
</style>
