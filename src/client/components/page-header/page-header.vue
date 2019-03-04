<template>
  <header
    class="page-header grid"
    :class="{ 'page-header--fill-screen': fillScreen }"
  >
    <curly-bracket
      v-if="false && hasCurlyBracket && fillScreen"
      side="right"
      color="paper"
    />
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
    <div class="page-header__image">
      <img v-if="image" :src="image.url" alt="">
    </div>
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
:root {
  --max-height: 1000px;
}
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
  content: '';
  display: block;
  background-color: var(--brand-yellow);
  width: 100%;
  grid-column: var(--grid-page);
  grid-row: 5 / 8;
}
.page-header__text {
  grid-row: 3 / 4;
}
.page-header__image {
  grid-column: 3 / var(--grid-page-end);
  grid-row: 6 / 7;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.page-header__image img {
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
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
    max-height: var(--max-height);
  }
  .page-header--fill-screen::before {
    grid-row: 1 / 8;
    grid-column: var(--grid-page-right);
  }
  .page-header__text {
    grid-column: var(--grid-content-left);
  }
  .page-header__image {
    grid-row: 4 / 7;
    grid-column: 20 / 48;
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
