<template>
  <header class="page-header grid" :class="{ 'page-header--home': isHomepage }">
    <div v-if="isHomepage" class="page-header__brick" />
    <curly-bracket
      v-if="isHomepage"
      class="page-header__curly-bracket"
      side="right"
      color="paper"
    />
    <div class="page-header__image" :class="{ 'page-header__image--spaced-top': !isHomepage }">
      <img v-if="image" :src="image.url" alt="">
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
import CurlyBracket from '../curly-bracket'
import SelfTypingText from '../self-typing-text'

export default {
  components: {
    CurlyBracket,
    SelfTypingText,
  },
  props: {
    image: {
      type: Object,
      required: false,
      default: function() {
        return {}
      },
      validator(image) {
        return image && typeof(image.url) === 'string'
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
  overflow: hidden;
}

.page-header__brick {
  display: block;
  background-color: var(--brand-yellow);
  grid-column: page;
  grid-row-start: 3;
  grid-row-end: 6;
}

.page-header__curly-bracket.curly-bracket {
  margin-top: 0;
  grid-row-start: 3;
  grid-row-end: 6;
}

.page-header__curly-bracket .curly-bracket__image {
  mix-blend-mode: screen;
  width: auto;
  left: 0;
  right: unset;
  height: calc(100% + 4vh);
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

  .page-header__curly-bracket.curly-bracket {
    position: relative;
    grid-column-start: -11;
    grid-column-end: -4;
    grid-row-start: 2;
    grid-row-end: 4;
    overflow: unset;
  }

  .page-header__curly-bracket .curly-bracket__image {
    height: 100%;
    width: auto;
  }

  .page-header__image {
    grid-column-start: 14;
    grid-column-end: -3;
    grid-row-start: 2;
    grid-row-end: 3;
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

  .page-header__image {
    grid-column-start: 20;
    grid-column-end: 48;
    grid-row-start: 2;
  }
}
</style>
