<template>
  <header class="page-header grid">
    <div v-if="isHomepage" class="page-header__brick" />
    <div v-if="isHomepage" class="page-header__curly-bracket-column">
      <div class="page-header__curly-bracket-wrapper">
        <img class="page-header__curly-bracket" src="/images/curly-bracket--close.svg">
      </div>
    </div>
    <div class="page-header__image" :class="{ 'page-header__image--spaced-top': !isHomepage }">
      <img :src="image.url" :alt="image.alt">
    </div>
    <div class="page-header__text">
      <div class="page-header__title sub-title">
        <span v-html="title" />
      </div>
      <div class="page-header__sub-title" :class="isHomepage ? 'hero' : 'h1'">
        <span v-html="subTitle" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
      validator(image) {
        return typeof(image.url) === 'string' && typeof(image.alt) === 'string'
      },
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    isHomepage: {
      type: Boolean,
      default: false
    },
  }
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
  z-index: 0;
}

.page-header__image img {
  width: 100%;
  height: 100%;
  position: static;
  z-index: 1;
  object-fit: contain;
  object-position: bottom;
  justify-content: flex-end;
}

@supports (display: grid) {
  .page-header {
    padding-top: 0;
    grid-template-rows: var(--app-header-height) 1fr var(--spacing-medium) calc(30vh - var(--spacing-large) - var(--spacing-larger)) var(--spacing-larger);
    position: relative;
  }

  .page-header__text {
    grid-column: content;
    grid-row-start: 2;
  }

  .page-header__sub-title {
    margin-top: var(--spacing-smaller);
    hyphens: auto;
    overflow-wrap: break-word;
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
    right: calc(-1 * var(--spacing-medium));
  }

  .page-header__curly-bracket {
    display: block;
    height: 100%;
    mix-blend-mode: screen;
  }

  .page-header__image {
    grid-column-start: 2;
    grid-column-end: 18;
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
      grid-column-start: 2;
      grid-column-end: 18;
      justify-content: center;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header {
      grid-template-rows: calc(var(--app-header-height) + var(--spacing-medium)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      grid-column: content;
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: 18;
    }

    .page-header__brick {
      height: 100%;
      grid-column: page-right;
      grid-row-start: 1;
      grid-row-end: -1;
    }

    .page-header__curly-bracket-column {
      position: static;
      grid-column-end: 34;
      grid-row-start: 2;
      grid-row-end: 4;
    }

    .page-header__curly-bracket {
      height: 100%;
    }

    .page-header__image {
      grid-column: content-right;
      grid-row-start: 2;
      grid-row-end: 3;
      justify-content: flex-end;
      align-self: flex-end;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header {
      grid-template-rows: calc(var(--app-header-height) + var(--spacing-medium)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      grid-column-start: 4;
      grid-column-end: 23;
    }

    .page-header__curly-bracket-column {
      grid-column-end: 48;
    }

    .page-header__image {
      grid-column: content-right;
      grid-column-end: 48;
      align-self: flex-end;
    }

    .page-header__image--spaced-top {
      position: relative;
      top: var(--spacing-big);
      height: 100%;
    }
  }
}
</style>
