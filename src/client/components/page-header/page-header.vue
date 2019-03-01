<template>
  <header class="page-header grid" :class="{ 'page-header--home': isHomepage }">
    <div v-if="isHomepage" class="page-header__brick" />
    <curly-bracket
      v-if="isHomepage"
      side="right"
      color="paper"
    />
    <div class="page-header__image" :class="{ 'page-header__image--spaced-top': !isHomepage }">
      <img v-if="image" :src="image.url" alt="">
    </div>
    <div class="page-header__description">
      <div class="page-header__title subtitle">
        <h1
          v-if="heading === 'byline'"
          v-html="byline"
        />
        <p
          v-else
          v-html="byline"
        />
      </div>
      <div :class="{
        'hero': isHomepage,
        'h1': !isHomepage,
      }">
        <h1
          v-if="heading === 'headline'"
          class="sr-only"
          v-html="headline"
        />
        <p
          v-else
          class="sr-only"
          v-html="headline"
        />
        <self-typing-text
          :text="headline"
          :class="{
            'self-typing-text--hero': isHomepage,
            'self-typing-text--h1': !isHomepage,
          }"
        />
      </div>
    </div>
    <scroll-to v-if="isHomepage" point-down />
  </header>
</template>

<script>
import CurlyBracket from '../curly-bracket'
import ScrollTo from '../scroll-to'
import SelfTypingText from '../self-typing-text'

export default {
  components: {
    CurlyBracket,
    ScrollTo,
    SelfTypingText,
  },
  props: {
    isHomepage: {
      type: Boolean,
      default: false
    },
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
    byline: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      default: 'headline',
      validator: value => ['byline', 'headline'].indexOf(value) !== -1,
    }
  },
}
</script>

<style>

:root {
  --max-height-image: 285px;
}

.page-header {
  background-color: var(--bg-pastel);
  grid-template-rows: var(--app-header-height-small) 1fr;
  overflow: hidden;
  position: relative;
}

.page-header__brick {
  display: block;
  background-color: var(--brand-yellow);
  grid-column: var(--grid-page);
  grid-row-start: 3;
  grid-row-end: 6;
}

.page-header .curly-bracket {
  position: relative;
  z-index: var(--z-index-low);
  margin-top: 0;
  grid-row-start: 3;
  grid-row-end: 6;
}

.page-header .curly-bracket__image {
  mix-blend-mode: screen;
  width: auto;
  left: 0;
  right: unset;
  height: calc(100% + 4vh);
}

.page-header__image {
  grid-column: var(--grid-content);
  grid-row-start: 4;
  grid-row-end: 5;
  position: relative;
  z-index: var(--z-index-high);
  align-self: flex-end;
}

.page-header__image img {
  object-fit: contain;
  object-position: bottom;
  width: 100%;
}

.page-header__image--spaced-top {
  display: none;
}

.page-header__description {
  margin: var(--spacing-large) 0;
  grid-column: var(--grid-content);
  grid-row-start: 2;
}

.page-header__text {
  margin-top: var(--spacing-smaller);
  hyphens: auto;
  overflow-wrap: break-word;
}
.page-header .scroll-to {
  height: auto;
  grid-column: 2;
  position:absolute;
  bottom: 0;
}

@media (min-width: 420px) {
  .page-header--brick .page-header__image img {
    height: 100%;
  }
}

@media (min-width: 520px) {
  .page-header .curly-bracket {
    display: block;
    flex-grow: 1;
    top: 0;
  }

  .page-header__image {
    grid-column: var(--grid-content);
    grid-row-start: 4;
    grid-row-end: 5;
  }
}

@media (min-width: 720px) {
  .page-header {
    grid-template-rows: calc(var(--app-header-height-small)) 1fr var(--spacing-large);
  }

  .page-header__description {
    grid-column: var(--grid-content-left);
    grid-row-start: 2;
  }

  .page-header__brick {
    height: 100%;
    grid-column: var(--grid-page-right);
    grid-row-start: 1;
    grid-row-end: 6;
  }

  .page-header .curly-bracket {
    position: relative;
    grid-column-start: 40;
    grid-column-end: 47;
    grid-row-start: 2;
    grid-row-end: 4;
    overflow: unset;
  }

  .page-header .curly-bracket__image {
    height: 100%;
    width: auto;
  }

  .page-header__image {
    margin-top: var(--spacing-huge);
    display: flex;
    align-items: flex-end;
    align-self: unset;
    grid-column-start: 20;
    grid-column-end: 48;
    grid-row-start: 2;
    grid-row-end: 4;
  }

  .page-header__image--spaced-top {
    display: flex;
    justify-content: flex-end;
  }

  .page-header__image--spaced-top img {
    height: 100%;
    max-height: var(--max-height-image);
    width: auto;
    flex: 0 0 auto;
  }
}

@media (min-width: 1100px) {
  .page-header {
    grid-template-rows: var(--app-header-height-large) 1fr;
  }

  .page-header__description {
    margin: var(--spacing-medium) 0;
    grid-column-start: 4;
    grid-column-end: 24;
  }
}
</style>
