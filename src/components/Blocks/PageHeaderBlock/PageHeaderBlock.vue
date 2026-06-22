<template>
  <header
    class="page-header grid"
    :class="{
      'page-header--curly-bracket': props.curlyBracket,
      'page-header--fill-screen': data.layout === 'full-height',
      'page-header--has-image': data.illustration,
      'page-header--has-breakout-image': props.breakOutImage,
      'is-animated': data.style === 'animated',
    }"
    :style="{ '--animation-delay': props.animationDelay + 's' }"
  >
    <span
      v-if="data.layout === 'full-height'"
      class="page-header__background scale-up-background"
    />
    <div class="page-header__text">
      <!--
       `<h1>` is either the headline or the byline.
       If it is the headline, a `<p>` for the byline should precede it,
       otherwise a `<p>` for the headline should succeed it.
      -->
      <p
        v-if="props.heading === 'headline'"
        class="sub-title animation__uncover"
        v-html="data.title"
      />
      <component
        :is="data.layout === 'full-height' ? 'h1' : 'p'"
        class="animation__uncover"
        :class="{
          'sub-title': props.heading === 'byline',
          'sr-only': props.heading === 'headline',
        }"
      >
        <span
          v-html="props.heading === 'byline' ? data.title : data.subtitle"
        />
      </component>
      <p
        v-if="props.heading === 'byline'"
        class="sr-only"
        v-html="data.subtitle"
      />
      <!-- Always visible, but has aria-hidden -->
      <self-typing-text class="h1" :text="data.subtitle" />
    </div>

    <div
      v-if="data.illustration"
      class="page-header__image-column animation__reveal"
    >
      <div class="page-header__image-column-content animation__reveal-content">
        <DatoImage
          class="page-header__image"
          :src="data.illustration.url"
          alt=""
          :width="data.illustration.width!"
          :height="data.illustration.height!"
          loading="eager"
        />
      </div>
    </div>

    <ScrollTo
      v-if="data.layout === 'full-height'"
      direction="down"
      class="animation__fade-in"
    />
  </header>
</template>

<script setup lang="ts">
import type { PageHeaderBlockFragment } from "./PageHeaderBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = withDefaults(
  defineProps<{
    data: FragmentOf<typeof PageHeaderBlockFragment>;
    curlyBracket?: boolean;
    breakOutImage?: boolean;
    animationDelay?: number;
    heading?: "headline" | "byline";
  }>(),
  {
    curlyBracket: true,
    breakOutImage: false,
    animationDelay: 0,
    heading: "headline",
  },
);

const data = readFragment<typeof PageHeaderBlockFragment>(props.data);
</script>

<style scoped>
.page-header {
  background-color: var(--bg-pastel);
  grid-column: var(
    --grid-page
  ); /* Make sure page header doesn't align on grid-content lines */
  grid-template-rows:
    var(--app-header-height-small) /* 1 - 2 */
    var(--spacing-medium) /* 2 - 3, spacing */
    auto /* 3 - 4, text */
    var(--spacing-medium); /* 4 - 5, spacing */
  position: relative;
}

.page-header--has-breakout-image {
  margin-bottom: calc(2 * var(--spacing-large));
}

.page-header__text {
  grid-row: 3 / 4;
}

.page-header__image-column {
  grid-row: 5 / 6;
}

.page-header--has-breakout-image .page-header__image-column {
  margin-bottom: calc(-1 * var(--spacing-large));
}

.page-header--fill-screen {
  grid-template-rows:
    var(--app-header-height-small) /* 1 - 2 */
    var(--spacing-medium) /* 2 - 3, spacing */
    auto /* 3 - 4, text */
    var(--spacing-medium) /* 4 - 5, spacing */
    var(--spacing-medium) /* 5 - 6, spacing */
    calc(50vh - 2 * var(--spacing-medium)) /* 6 - 7, image */
    var(--spacing-medium); /* 7 - 8, spacing */
}

/* Yellow half */
.page-header__background {
  content: "";
  display: block;
  grid-column: var(--grid-page);
  grid-row: 5 / 8;
  background-color: var(--brand-yellow);
}

/* Curly bracket */
.page-header--curly-bracket::after {
  content: "";
  display: block;
  position: relative;
  grid-column: 44 / 51;
  grid-row: 5 / 8;
  margin: calc(-1 * var(--spacing-medium)) 0;
  background-image: url("/images/curly-bracket--paper-rotated.svg");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  mix-blend-mode: screen;
}

.is-animated.page-header--curly-bracket::after {
  opacity: 0;
  transform: translateX(-100px);
  animation:
    animation__slide-in var(--animation-duration) var(--animation-delay)
      forwards,
    animation__fade-in var(--animation-duration) var(--animation-delay) forwards;
}

.page-header--fill-screen .page-header__image-column {
  position: relative;
  z-index: var(--z-index-low); /* Make sure to be on top off curly bracket */
  grid-column: 3 / var(--grid-page-end);
  grid-row: 6 / 7;
  display: flex;
  align-items: flex-end;
}

.page-header__image {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 200px;
  margin-left: auto;
}

.page-header .scroll-to {
  display: none;
}

@media (min-width: 520px) {
  .page-header--fill-screen {
    grid-template-rows:
      var(--app-header-height-small) /* 1 - 2 */
      var(--spacing-medium) /* 2 - 3, spacing */
      auto /* 3 - 4, text */
      var(--spacing-medium) /* 4 - 5, spacing */
      var(--spacing-medium) /* 5 - 6, spacing */
      calc(40vh - 2 * var(--spacing-medium)) /* 6 - 7, image */
      var(--spacing-medium); /* 7 - 8, spacing */
  }

  .page-header--fill-screen .page-header__image-column {
    grid-column: var(--grid-content-narrow);
  }

  /* Curly bracket */
  .page-header--fill-screen::after {
    grid-column: 39 / 50;
    background-position: unset;
    background-size: contain;
  }
}

@media (min-width: 720px) {
  .page-header .scroll-to {
    display: block;
    position: absolute;
    bottom: var(--spacing-medium);
    left: 0;
  }

  .page-header--fill-screen {
    position: relative;
    overflow: hidden;
    grid-template-rows:
      var(--app-header-height-small) /* 1 - 2 */
      var(--spacing-larger) /* 2 - 3, spacing */
      auto /* 3 - 4, text */
      var(--spacing-medium) /* 4 - 5, spacing between text and image */
      1fr /* 5 - 6, image */
      var(--spacing-larger); /* 6 - 7, spacing */
  }

  /*
     * IE11 has a nasty bug:
     * not moving elements below down, while making te page header taking up 100vh.
     * @supports is not supported by IE11, so this prevents settings a min-height in IE11.
     */
  @supports (min-height: 100vh) {
    .page-header--fill-screen {
      min-height: 100vh;
    }
  }

  /* Yellow half */
  .page-header__background {
    grid-column: var(--grid-page-right);
    grid-row: 1 / 7;
  }

  /* Curly bracket */
  .page-header--fill-screen::after {
    grid-column: var(--grid-center) / 48;
    grid-row: 3 / 6;
    margin: calc(-1 * var(--spacing-medium)) 0;
    background-position: right center;
    background-size: contain;
  }

  .page-header__text {
    grid-column: 2 / 40;
  }

  .page-header--has-image .page-header__text {
    grid-column: var(--grid-content-left);
  }

  .page-header__image-column {
    grid-column: 29 / 49;
    grid-row: 3 / 5;
    margin-bottom: var(--spacing-medium);
  }

  .page-header--fill-screen .page-header__image-column {
    grid-column: 20 / 49;
    grid-row: 5 / 6;
    max-height: 100%;
    margin: 0;
  }

  .page-header__image-column-content {
    display: flex;
    height: 100%;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .page-header__image {
    margin-left: 0;
    object-fit: contain;
    max-height: 285px;
  }

  .page-header--fill-screen .page-header__image {
    height: auto;
    max-height: 100%;
  }
}

/* Keep aspect ratio */
@media (max-aspect-ratio: 10/8) and (min-width: 720px) {
  /* Prevent nasty bug described above in IE11 */
  @supports (min-height: 80vh) {
    .page-header--fill-screen {
      min-height: 80vw;
    }
  }
}

@media (min-width: 1100px) {
  .page-header {
    grid-template-rows:
      var(--app-header-height-large) /* 1 - 2 */
      var(--spacing-medium) /* 2 - 3, spacing */
      1fr /* 3 - 4, text */
      var(--spacing-medium); /* 4 - 5, spacing */
  }

  .page-header--has-breakout-image {
    margin-bottom: calc(2 * var(--spacing-larger));
  }

  .page-header--fill-screen {
    grid-template-rows:
      var(--app-header-height-large) /* 1 - 2 */
      var(--spacing-big) /* 2 - 3, spacing above text */
      1fr /* 3 - 4, text */
      var(--spacing-larger); /* 4 - 5, spacing below text */
  }

  /* Yellow half */
  .page-header__background {
    grid-row: 1 / 5;
  }

  .page-header__text {
    grid-column: 4 / 40;
  }

  .page-header--has-image .page-header__text {
    grid-column: 4 / 24;
  }

  .page-header--fill-screen .page-header__image-column {
    grid-row: 3 / 4;
  }

  .page-header--has-breakout-image .page-header__image-column {
    margin-bottom: calc(-1 * var(--spacing-larger));
  }

  /* Curly bracket */
  .page-header--curly-bracket::after {
    grid-row: 3 / 4;
  }

  .page-header__slot {
    grid-row: 6 / 7;
  }
}
</style>
