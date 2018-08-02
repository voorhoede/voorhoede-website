<template>
  <div class="page-header-decoration grid">
    <div v-if="background" class="page-header-decoration__background"/>
    <div v-if="curlyBracket" class="page-header-decoration__curly-bracket-column">
      <div class="page-header-decoration__curly-bracket-wrapper">
        <img class="page-header-decoration__curly-bracket" src="/images/curly-bracket.svg">
      </div>
    </div>
    <div v-if="hasImage" class="page-header-decoration__image">
      <slot name="image"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: Boolean,
      required: false,
      default: false,
    },
    curlyBracket: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    hasImage() {
      return 'image' in this.$slots
    }
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
    grid-template-rows: var(--spacing-large) 1fr var(--spacing-larger);
    position: relative;
  }

  .page-header-decoration__background {
    background: var(--brand-yellow);
    height: 100%;
    grid-column: page;
    grid-row-start: 1;
    grid-row-end: 4;
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

  .page-header-decoration__image {
    grid-column-start: 2;
    grid-column-end: 19;
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media screen and (min-width: 520px) {
    .page-header-decoration {
      grid-template-rows: var(--spacing-large) 1fr var(--spacing-small);
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

    .page-header-decoration__image {
      grid-column: content;
      grid-column-start: 4;
      grid-column-end: 16;
      justify-content: center;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header-decoration {
      grid-template-rows: var(--spacing-big) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header-decoration__background {
      grid-column: page-right;
      grid-row-end: 6;
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

    .page-header-decoration__image {
      grid-column-start: 13;
      grid-column-end: 33;
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header-decoration {
      grid-template-rows: var(--spacing-larger) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header-decoration__image {
      grid-column-start: 14;
    }
  }

  @media screen and (min-width: 1200px) {
    .page-header-decoration__curly-bracket-column {
      grid-column-end: 48;
    }

    .page-header-decoration__image {
      grid-column-start: 22;
      grid-column-end: 49;
    }
  }
}
</style>
