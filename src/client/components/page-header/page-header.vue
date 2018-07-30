<template>
  <div class="page-header">
    <div class="page-header__fill-grid grid">
      <div class="page-header__fill"/>
    </div>
    <div v-if="curlyBracket" class="page-header__bracket-grid grid">
      <div class="page-header__bracket-column">
        <!-- TODO: Get curly bracket export from Joshua -->
        <img class="page-header__bracket" src="/images/temporary-curly-bracket.svg">
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
  @media screen and (min-width: 720px) {
    .page-header {
      display: block;
      position: relative;
      z-index: -1; /* Make sure page-header doens't overlap content */
    }

    .page-header__fill {
      height: 100vh;
      background: var(--brand-yellow);
      grid-column: page-right;
    }

    .page-header__bracket-grid {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }

    .page-header__bracket-column {
      grid-column-end: 32;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .page-header__bracket {
      padding-top: calc(var(--spacing-larger) + var(--app-header-height));
      padding-bottom: var(--spacing-larger);
      display: block;
      height: 100vh;
      flex-grow: 1;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header__bracket {
      padding-top: calc(var(--spacing-larger) + var(--app-header-height-large));
    }
  }

  @media screen and (min-width: 1200px) {
    .page-header__bracket-column {
      grid-column-end: 48;
    }
  }
}
</style>
