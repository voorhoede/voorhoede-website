<template>
  <header
    class="page-header grid"
    :class="{
      'page-header--fill-screen': fillScreen,
      'page-header--curly-bracket': hasCurlyBracket
    }"
  >
    <div class="page-header__text">
      <!--
        `<h1>` is either the headline or the byline.
        If it is the headline, a `<p>` for the byline should precede it,
        otherwise a `<p>` for the headline should succeed it.
      -->
      <p
        v-if="(heading === 'headline')"
        v-html="byline"
        class="subtitle"
      />
      <h1
        v-html="(heading === 'byline') ? byline : headline"
        :class="{
          'subtitle': (heading === 'byline'),
          'sr-only': (heading === 'headline')
        }"
      />
      <p
        v-if="(heading === 'byline')"
        class="sr-only"
        v-html="headline"
      />
      <self-typing-text
        :class="(fillScreen) ? 'hero' : 'h1'"
        :text="headline"
      />
    </div>
    <scroll-to v-if="fillScreen" point-down />
    <app-image v-if="image" :image="image" :lazy-load="false" />
  </header>
</template>

<script>
import AppImage from '../app-image'
import ScrollTo from '../scroll-to'
import SelfTypingText from '../self-typing-text'

export default {
  components: {
    AppImage,
    ScrollTo,
    SelfTypingText,
  },
  props: {
    fillScreen: {
      type: Boolean,
      default: false
    },
    hasCurlyBracket: {
      type: Boolean,
      default: false
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
    },
    image: {
      type: Object,
      default: function() {
        return {}
      },
      validator(image) {
        return image && typeof(image.url) === 'string'
      },
    },
  },
}
</script>

<style>
/**
 * `page-header--fill-screen` adds a `::before`,
 * `page-header--curly-bracket` adds an `::after`
 */

/* :root {
  --max-height: 1000px;
} */

.page-header {
  background-color: var(--bg-pastel);
  overflow: hidden;
  position: relative;
  grid-column: var(--grid-page);
  grid-template-rows:
    var(--app-header-height-small)  /* 1 - 2 */
    var(--spacing-medium)           /* 2 - 3 */
    auto                            /* 3 - 4:  Text */
    var(--spacing-medium)           /* 4 - 5 */
    var(--spacing-medium)           /* 5 - 6 */
    auto                            /* 7 - 8:  Image */
    var(--spacing-larger)           /* 7 - 8 */
}

.page-header--fill-screen::before {
  /* Yellow half */
  content: '';
  display: block;
  background-color: var(--brand-yellow);
  width: 100%;
  grid-column: var(--grid-page);
  grid-row: 5 / 8;
  margin-bottom: var(--spacing-larger);
}

.page-header--curly-bracket::after {
  /* Curly bracket */
  content: '';
  display: block;
  position: relative;
  grid-row: 4 / 9;
  grid-column: 44 / 51;
  z-index: 1;
  background-image: url('/images/curly-bracket--paper.svg');
  mix-blend-mode: screen;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right center;
  transform: rotate(180deg);
  margin-bottom: calc(var(--spacing-larger) - var(--spacing-medium));
}

.page-header__text {
  grid-row: 3 / 4;
}

.page-header .app-image {
  position: relative;
  grid-column: 3 / var(--grid-page-end);
  grid-row: 6 / 7;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 2;
  margin-bottom: var(--spacing-larger);
}

.page-header .scroll-to {
  position: absolute;
  bottom: var(--spacing-large);
}

@media screen and (min-width: 720px) {
  .page-header {
    grid-template-rows:
      var(--app-header-height-small)  /* 1 - 2 */
      var(--spacing-big)              /* 2 - 3 */
      1fr                             /* 3 - 4: Text */
      var(--spacing-medium)           /* 4 - 5: Image */
      var(--spacing-medium)           /* 5 - 6 */
      1fr                             /* 7 - 8 */
      var(--spacing-larger)           /* 7 - 8 */
  }

  .page-header--fill-screen {
    height: 100vh;
    max-height: 80vw;
  }

  .page-header--fill-screen::before {
    /* Yellow half */
    grid-row: 1 / 8;
    grid-column: var(--grid-page-right);
    margin-bottom: 0;
  }

  .page-header--curly-bracket::after {
    /* curly bracket */
    grid-row: 3 / 8;
    grid-column: 39 / 48;
    background-size: contain;
    background-position: left center; /* remember, object is rotated */
  }

  .page-header__text {
    grid-column: var(--grid-content-left);
  }

  .page-header .app-image {
    grid-row: 3 / 7;
    grid-column: 20 / 49;
    margin-bottom: 0;
  }
}

@media screen and (min-width: 1100px) {
  .page-header {
    grid-template-rows:
      var(--app-header-height-large)  /* 1 - 2 */
      var(--spacing-big)             /* 2 - 3 */
      1fr                            /* 3 - 4:  Text */
      var(--spacing-medium)          /* 4 - 5 */
      var(--spacing-medium)          /* 5 - 6 */
      1fr                            /* 7 - 8 */
      var(--spacing-larger)          /* 7 - 8 */
  }

  .page-header__text {
    grid-column: 4 / var(--grid-center);
  }
}
</style>
