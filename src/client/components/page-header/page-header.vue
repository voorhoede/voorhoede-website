<template>
  <div class="page-header">
    <div class="page-header__fill-container grid">
      <div class="page-header__fill"/>
    </div>
    <div v-if="curlyBracket" class="page-header__bracket-container grid">
      <span class="page-header__bracket">}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    curlyBracket: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style>
.page-header__bracket {
  display: none;
}

@media screen and (min-width: 720px) {
  .page-header {
    height: 100vh;
    position: relative;
  }

  .page-header__fill-container {
    height: 100%;
  }

  .page-header__fill {
    height: 100%;
    grid-column: page-right;
    background: var(--brand-yellow);
  }

  .page-header__bracket-container {
    padding: var(--spacing-larger) 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    text-align: right;
  }

  .page-header__bracket {
    display: block;
    grid-column-end: 32;
  }
}

@media screen and (min-width: 1100px) {
  .page-header__bracket {
    grid-column-end: 48;
  }
}
</style>
