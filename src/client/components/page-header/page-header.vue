<template>
  <header
    class="page-header grid"
    :class="{
      'page-header--fill-screen': fillScreen,
      'page-header--curly-bracket': curlyBracket,
      'page-header--has-slot': displaySlot,
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
        class="sub-title"
      />
      <h1
        v-html="(heading === 'byline') ? byline : headline"
        :class="{
          'sub-title': (heading === 'byline'),
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

    <div v-if="image" class="page-header__image-column">
      <img class="page-header__image" :src="image.url" alt=""/>
    </div>

    <div class="page-header__slot" v-if="displaySlot">
      <slot/>
    </div>

    <scroll-to v-if="fillScreen" direction="down"/>
  </header>
</template>

<script>
  import SelfTypingText from '../self-typing-text'
  import ScrollTo from '../scroll-to'

  export default {
    components: {
      SelfTypingText,
      ScrollTo,
    },
    props: {
      headline: {
        type: String,
        required: true,
      },
      byline: {
        type: String,
        required: true,
      },
      heading: {
        type: String,
        default: 'headline',
        validator(heading) {
          return ['headline', 'byline'].indexOf(heading) >= 0
        }
      },
      image: {
        type: Object,
        default: null,
        validator(image) {
          return image && typeof(image.url) === 'string'
        },
      },
      fillScreen: {
        type: Boolean,
        default: false
      },
      curlyBracket: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      displaySlot() {
        return (this.$slots.default && this.fillScreen)
      }
    }
  }
</script>

<style>
  :root {
    --max-height-image: 285px;
  }

  .page-header {
    background-color: var(--bg-pastel);
    grid-column: var(--grid-page); /* Make sure page header doesn't align on grid-content lines */
    grid-template-rows:
      var(--app-header-height-small)
      var(--spacing-medium)
      auto
      var(--spacing-medium);
  }

  .page-header__text {
    grid-row: 3 / 4;
  }

  .page-header__image-column {
    display: none;
  }

  .page-header--fill-screen {
    grid-template-rows:
      var(--app-header-height-small)
      var(--spacing-medium)
      auto
      var(--spacing-medium)
      var(--spacing-medium)
      calc(50vh - 2 * var(--spacing-medium))
      var(--spacing-medium)
      calc(var(--spacing-larger) - var(--spacing-medium));
  }

  /* Yellow half */
  .page-header--fill-screen::before {
    content: '';
    display: block;
    background-color: var(--brand-yellow);
    grid-column: var(--grid-page);
    grid-row: 5 / 8;
  }

  /* Curly bracket */
  .page-header--curly-bracket::after {
    content: "";
    display: block;
    position: relative;
    grid-row: 4 / 9;
    grid-column: 44 / 51;
    background-image: url('/images/curly-bracket--paper.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100%;
    mix-blend-mode: screen;
    transform: rotate(180deg);
  }

  .page-header--fill-screen .page-header__image-column {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    grid-row: 6 / 7;
    grid-column: 3 / var(--grid-page-end);
    z-index: var(--z-index-low); /* Make sure to be on top off curly bracket */
  }

  .page-header__image {
    max-height: 100%;
    max-width: 100%;
  }

  .page-header .scroll-to {
    position: absolute;
    bottom: var(--spacing-medium);
    left: var(--grid-margin);
  }

  .page-header--has-slot {
    grid-template-rows:
      var(--app-header-height-small)
      var(--spacing-medium)
      auto
      var(--spacing-medium)
      var(--spacing-medium)
      calc(50vh - 2 * var(--spacing-medium))
      var(--spacing-medium)
      calc(var(--spacing-larger) - var(--spacing-medium))
      auto;
  }

  .page-header__slot {
    min-height: 23.5vh;
    grid-row: 9 / 10;
    grid-column: 4 / var(--grid-content-end);
  }

  @media (min-width: 520px) {
    .page-header--fill-screen {
      grid-template-rows:
        var(--app-header-height-small)
        var(--spacing-medium)
        auto
        repeat(2, var(--spacing-medium))
        calc(40vh - 2 * var(--spacing-medium))
        var(--spacing-medium)
        calc(var(--spacing-larger) - var(--spacing-medium));
    }

    .page-header--fill-screen .page-header__image-column {
      grid-column: var(--grid-content-narrow);
    }

    /* Curly bracket */
    .page-header--fill-screen::after {
      grid-column: 39 / 50;
    }
  }

  @media (min-width: 720px) {
    .page-header {
      grid-template-rows:
        var(--app-header-height-small)
        var(--spacing-medium)
        1fr
        var(--spacing-medium);
    }

    .page-header--fill-screen {
      height: 100vh;
      max-height: 80vw; /* Keep aspect ratio */
      grid-template-rows:
        var(--app-header-height-small)
        var(--spacing-larger)
        auto
        var(--spacing-medium)
        1fr
        var(--spacing-larger);
    }

    /* Yellow half */
    .page-header--fill-screen::before {
      grid-row: 1 / 7;
      grid-column: var(--grid-page-right);
    }

    /* Curly bracket */
    .page-header--fill-screen::after {
      margin: var(--spacing-medium) 0;
      grid-row: 3 / 7;
      grid-column: var(--grid-center) / 48;
      background-size: contain;
      background-position: left center; /* remember, object is rotated */
    }

    .page-header__text {
      grid-column: var(--grid-content-left);
    }

    .page-header__image-column {
      margin-bottom: calc(-1 * var(--spacing-small)); /* Make image move outside page header */
      grid-row: 3 / 5;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      grid-column: 29 / 49;
    }

    .page-header__image {
      max-height: var(--max-height-image);
    }

    .page-header--fill-screen .page-header__image-column {
      margin: 0;
      grid-row: 5 / 6;
      grid-column: 20 / 49;
      max-height: none;
    }

    /* Make sure image doesn't float upwards */
    .page-header--fill-screen .page-header__image {
      max-height: 100%;
    }
  }

  @media (min-width: 1100px) {
    .page-header {
      grid-template-rows:
        var(--app-header-height-large)
        var(--spacing-medium)
        1fr
        var(--spacing-medium);
    }

    .page-header--fill-screen {
      grid-template-rows:
        var(--app-header-height-large)
        var(--spacing-big)
        1fr
        var(--spacing-medium)
        1fr
        var(--spacing-larger);
    }

    .page-header__text {
      grid-column: 4 / 24;
    }
  }
</style>
