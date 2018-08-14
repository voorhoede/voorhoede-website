<template>
  <header class="page-header grid">
    <div class="page-header__text">
      <h1 v-if="seoTitle" class="sr-only">{{ seoTitle }}</h1>
      <div class="page-header__title sub-title">
        <slot name="title"/>
      </div>
      <div class="page-header__sub-title hero">
        <slot name="subTitle"/>
      </div>
    </div>
    <div v-if="brick" class="page-header__brick"/>
    <div v-if="curlyBracket" class="page-header__curly-bracket-column">
      <div class="page-header__curly-bracket-wrapper">
        <img class="page-header__curly-bracket" src="/images/curly-bracket.svg">
      </div>
    </div>
    <div v-if="hasImage" class="page-header__image">
      <slot name="image"/>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    seoTitle: {
      type: String,
      default: null,
    },
    brick: {
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
    },
  },
}
</script>

<style>
.page-header {
  padding-top: var(--app-header-height);
  background: var(--bg-pastel);
}

.page-header__brick {
  display: none;
}

.page-header__curly-bracket {
  display: none;
}

.page-header__image img {
  max-width: 100%;
  max-height: 100%;
}

@supports (display: grid) {
  .page-header {
    padding-top: 0;
    grid-template-rows: var(--app-header-height) 1fr var(--spacing-large) calc(50vh - var(--spacing-large) - var(--spacing-larger)) var(--spacing-larger);
    position: relative;
  }

  .page-header__text {
    margin: var(--spacing-medium) 0;
    grid-column: content;
    grid-row-start: 2;
  }

  .page-header__sub-title {
    margin-top: var(--spacing-large);
  }

  .page-header__brick {
    display: block;
    background: var(--brand-yellow);
    grid-column: page;
    grid-row-start: 3;
    grid-row-end: 6;
  }

  .page-header__curly-bracket-column {
    grid-column: page;
    grid-row: 3;
    position: absolute;
    top: calc(-1 * var(--spacing-large));
    right: 0;
    bottom: calc(-1 * var(--spacing-large));
    overflow: hidden;
  }

  /* Ugly wrapper to prevent horizontal scrolling, while making vertical overflow possible */
  .page-header__curly-bracket-wrapper {
    display: block;
    height: 100%;
    position: relative;
    right: calc(-1 * var(--spacing-large));
  }

  .page-header__curly-bracket {
    display: block;
    height: 100%;
    mix-blend-mode: screen;
  }

  .page-header__image {
    grid-column-start: 2;
    grid-column-end: 19;
    grid-row-start: 4;
    grid-row-end: 5;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media screen and (min-width: 520px) {
    .page-header__curly-bracket-column {
      grid-column: content;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow: visible;
    }

    .page-header__curly-bracket-wrapper {
      position: static;
    }

    .page-header__curly-bracket {
      display: block;
      flex-grow: 1;
      top: 0;
    }

    .page-header__image {
      grid-column: content;
      grid-column-start: 4;
      grid-column-end: 16;
      justify-content: center;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header {
      grid-template-rows: calc(var(--app-header-height) + var(--spacing-big)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      margin: var(--spacing-medium) 0;
      grid-column: content;
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: 12;
    }

    .page-header__brick {
      height: 100%;
      grid-column: page-right;
      grid-row-start: 1;
      grid-row-end: -1;
    }

    .page-header__curly-bracket-column {
      position: static;
      grid-column-end: 32;
      grid-row-start: 2;
      grid-row-end: 4;
    }

    .page-header__curly-bracket {
      height: 100%;
    }

    .page-header__image {
      grid-column-start: 13;
      grid-column-end: 33;
      grid-row-start: 2;
      grid-row-end: 3;
      justify-content: flex-end;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header {
      grid-template-rows: calc(var(--app-header-height) + var(--spacing-larger)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      grid-column-start: 4;
      grid-column-end: 21;
    }

    .page-header__curly-bracket-column {
      grid-column-end: 48;
    }

    .page-header__image {
      grid-column-start: 22;
      grid-column-end: 49;
    }
  }
}
</style>
