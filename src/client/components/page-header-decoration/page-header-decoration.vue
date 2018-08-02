<template>
  <div class="page-header-decoration grid">
    <div class="page-header-decoration__fill"/>
    <div v-if="curlyBracket" class="page-header-decoration__curly-bracket-column">
      <div class="page-header-decoration__curly-bracket-wrapper">
        <img class="page-header-decoration__curly-bracket" src="/images/curly-bracket.svg">
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
.page-header-decoration {
  display: none;
}

@supports (display: grid) {
  .page-header-decoration {
    display: grid;
    position: relative;
  }

  .page-header-decoration__fill {
    background: var(--brand-yellow);
    height: 100%;
    grid-column: page;
    grid-row: 1;
  }

  .page-header-decoration__curly-bracket-column {
    grid-column: page;
    grid-row: 1;
    position: absolute;
    top: calc(-1 * var(--spacing-large));
    right: 0;
    bottom: calc(-1 * var(--spacing-large));
    overflow: hidden;
  }

  /* Ugly wrapper to prevent horizontal scrolling, while making vertical overflow possible */
  .page-header-decoration__curly-bracket-wrapper {
    height: 100%;
    position: relative;
    right: calc(-1 * var(--spacing-large));
  }

  .page-header-decoration__curly-bracket {
    height: 100%;
    mix-blend-mode: screen;
  }

  @media screen and (min-width: 520px) {
    .page-header-decoration__curly-bracket-column {
      grid-column: content;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .page-header-decoration__curly-bracket-wrapper {
      position: static;
    }

    .page-header-decoration__curly-bracket {
      display: block;
      flex-grow: 1;
      top: 0;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header-decoration {
      grid-template-rows: var(--spacing-big) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header-decoration__fill {
      grid-column: page-right;
      grid-row-start: 1;
      grid-row-end: 5;
    }

    .page-header-decoration__curly-bracket-column {
      position: static;
      grid-column-end: 32;
      grid-row-start: 2;
      grid-row-end: 4;
    }

    .page-header-decoration__curly-bracket {
      height: 100%;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header-decoration {
      grid-template-rows: var(--spacing-larger) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header-decoration__curly-bracket {
      padding-top: calc(var(--spacing-larger) + var(--app-header-height-large));
    }
  }

  @media screen and (min-width: 1200px) {
    .page-header-decoration__curly-bracket-column {
      grid-column-end: 48;
    }
  }
}
</style>
