<template>
  <header class="page-header grid" :class="{ 'page-header--home': isHomepage }">
    <div v-if="isHomepage" class="page-header__brick" />
    <div v-if="isHomepage" class="page-header__curly-bracket-column">
      <div class="page-header__curly-bracket-wrapper">
        <img class="page-header__curly-bracket" src="/images/curly-bracket--close.svg" alt="">
      </div>
    </div>
    <div class="page-header__image" :class="{ 'page-header__image--spaced-top': !isHomepage }">
      <img :src="image.url" :alt="image.alt">
    </div>
    <div class="page-header__description">
      <div class="page-header__title sub-title">
        <h1 v-html="title" />
      </div>
      <div
        :class="{
          'hero': isHomepage,
          'h1': !isHomepage,
        }"
      >
        <h2 class="sr-only" v-html="text" />
        <self-typing-text 
          :text="text" 
          :speed-index="70" 
          :class="{
            'self-typing-text--hero': isHomepage,
            'self-typing-text--h1': !isHomepage,
          }"
        />
      </div>
    </div>
  </header>
</template>

<script>
import selfTypingText from '../self-typing-text'

export default {
  components: {
    selfTypingText
  },
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
    text: {
      type: String,
      required: true,
    },
    isHomepage: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style>
@import '../app-core/variables.css';

.page-header {
  background-color: var(--bg-pastel);
  grid-template-rows: var(--app-header-height) 1fr;
}

.page-header__brick {
  display: block;
  background-color: var(--brand-yellow);
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
  width: 100%;
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
  position: absolute;
  right: 0;
}

.page-header__image img {
  position: static;
  z-index: var(--z-index-low);
  object-fit: contain;
  object-position: bottom;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
}

.page-header--home {
  position: relative;
  grid-template-rows: var(--app-header-height) 1fr var(--spacing-large) calc(50vh - var(--spacing-large) - var(--spacing-larger)) var(--spacing-larger);
  padding-top: 0;
}

.page-header .page-header__image {
  display: none;
}

.page-header--home .page-header__image {
  display: flex;
}

.page-header__description {
  margin: var(--spacing-large) 0;
  grid-column: content;
  grid-row-start: 2;
}

.page-header__text {
  margin-top: var(--spacing-smaller);
  hyphens: auto;
  overflow-wrap: break-word;
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

@media (min-width: 420px) {
  .page-header--brick .page-header__image img {
    height: 100%;
  }
}

@media (min-width: 520px) {
  .page-header--home {
    position: relative;
    grid-template-rows: var(--app-header-height) 1fr var(--spacing-large) calc(50vh - var(--spacing-large) - var(--spacing-larger)) var(--spacing-larger);
    padding-top: 0;
  }

  .page-header__curly-bracket-column {
    grid-column: content;
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

  .page-header__image--spaced-top {
    position: relative;
    top: var(--spacing-big);
    height: 100%;
  }
}

@media (min-width: 720px) {
  .page-header {
    grid-template-rows: calc(var(--app-header-height)) 1fr var(--spacing-large);
  }

  .page-header--home {
    grid-template-rows: calc(var(--app-header-height) + var(--spacing-large)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
  }

  .page-header--home .page-header__description {
    margin-top: 0;
  }

  .page-header .page-header__image {
    display: flex;
  }

  .page-header__description {
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
    top: var(--spacing-large);
    position: relative;
    grid-column: 33;
    grid-row-start: 2;
    grid-row-end: 4;
    overflow: unset;
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

  .page-header__image img {
    max-height: 200px;
  }
}

@media (min-width: 1100px) {
  .page-header--home {
    grid-template-rows: calc(var(--app-header-height) + var(--spacing-large)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
  }

  .page-header--home .page-header__description {
    grid-column-start: 2;
  }

  .page-header__description {
    margin: var(--spacing-medium) 0;
    grid-column-start: 4;
    grid-column-end: 24;
  }

  .page-header__curly-bracket-column {
    grid-column: 47;
  }

  .page-header__image {
    grid-column: content-right;
    grid-column-end: 48;
    align-self: flex-end;
  }
}

@media (min-width: 1400px) {
  .page-header--brick .page-header__image {
    height: auto;
  }
}

@media (min-width: 1440px) {
  .page-header__description {
    margin-top: var(--spacing-medium);
  }

  .page-header--home .page-header__description {
    grid-column-start: 4;
  }

  .page-header__container {
    grid-column-start: 4;
    padding-top: calc(var(--app-header-height) + var(--spacing-larger));
  }

  .page-header__scroll-container {
    grid-column-start: 2;
  }

  .page-header__image img {
    max-height: 260px;
  }
}
</style>
