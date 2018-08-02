<template>
  <div class="page-header-decoration">
    <div class="page-header-decoration__fill-grid grid">
      <div class="page-header-decoration__fill"/>
    </div>
    <div v-if="curlyBracket" class="page-header-decoration__curly-bracket-grid grid">
      <div class="page-header-decoration__curly-bracket-column">
        <div class="page-header-decoration__curly-bracket-wrapper">
          <img class="page-header-decoration__curly-bracket" src="/images/curly-bracket.svg">
        </div>
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
    display: block;
    position: relative;
  }

  .page-header-decoration__fill-grid {
    height: 100%;
  }

  .page-header-decoration__fill {
    background: var(--brand-yellow);
    height: 100%;
    grid-column: page;
  }

  .page-header-decoration__curly-bracket-grid {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .page-header-decoration__curly-bracket-column {
    grid-column: page;
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
    .page-header-decoration__curly-bracket-grid {
      display: grid;
    }

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
    .page-header-decoration__fill {
      grid-column: page-right;
    }

    .page-header-decoration__curly-bracket-grid {
      display: grid;
    }

    .page-header-decoration__curly-bracket-column {
      position: static;
      grid-column-end: 32;
    }

    .page-header-decoration__curly-bracket {
      padding-top: calc(var(--spacing-big) + var(--app-header-height));
      padding-bottom: calc(var(--spacing-larger) - var(--spacing-tiny)); /* By design, the bracket should be placed a bit under image of the hero */
      height: 100%;
    }
  }

  @media screen and (min-width: 1100px) {
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
