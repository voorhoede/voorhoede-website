<template>
  <div class="page-header grid">
    <div class="page-header__block"/>
    <div class="page-header__block"/>
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
.page-header {
  display: block;
}

.page-header__block {
  height: 50vh;
}

.page-header__block:first-child {
  background: var(--bg-pastel);
}

.page-header__block:last-child {
  background: var(--brand-yellow);
}

@media screen and (min-width: 720px) {
  .page-header {
    display: grid;
    height: 100vh;
  }

  .page-header__block {
    height: auto;
  }

  .page-header__block:first-child {
    grid-column: page-left;
  }

  .page-header__block:last-child {
    height: auto;
    grid-column: page-right;
  }
}
</style>
