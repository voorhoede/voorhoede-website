<template>
  <div class="page-header">
    <div class="page-header__fill-grid grid">
      <div class="page-header__fill"/>
    </div>
    <div v-if="curlyBracket" class="page-header__curly-bracket-grid grid">
      <div class="page-header__curly-bracket-column">
        <img class="page-header__curly-bracket" src="/images/curly-bracket.svg">
      </div>
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
.page-header {
  display: none;
}

@supports (display: grid) {
  .page-header {
    display: block;
    position: relative;
  }

  .page-header__fill {
    height: 50vh;
    background: var(--brand-yellow);
    grid-column: page;
  }

  .page-header__curly-bracket-grid {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .page-header__curly-bracket-column {
    grid-column: page;
    position: absolute;
    top: calc(-1 * var(--spacing-large));
    right: 0;
    bottom: calc(-1 * var(--spacing-large));
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .page-header__curly-bracket {
    height: 100%;
  }

  @media screen and (min-width: 720px) {
    .page-header__fill {
      height: 100vh;
      grid-column: page-right;
    }

    .page-header__curly-bracket-grid {
      display: grid;
    }

    .page-header__curly-bracket-column {
      position: static;
      grid-column-end: 32;
    }

    .page-header__curly-bracket {
      padding-top: calc(var(--spacing-big) + var(--app-header-height));
      padding-bottom: calc(var(--spacing-larger) - var(--spacing-tiny)); /* By design, the bracket should be placed a bit under image of the hero */
      display: block;
      height: 100vh;
      flex-grow: 1;
      top: 0;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header__curly-bracket {
      padding-top: calc(var(--spacing-larger) + var(--app-header-height-large));
    }
  }

  @media screen and (min-width: 1200px) {
    .page-header__curly-bracket-column {
      grid-column-end: 48;
    }
  }
}
</style>
