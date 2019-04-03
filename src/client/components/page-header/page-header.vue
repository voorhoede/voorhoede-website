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

    <!--
      The slot is used to render additional content,
      taking up `23.5%` of the viewport.
      It is only rendered when the `fillScreen` prop is `true`.
    -->
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
      var(--app-header-height-small) /* 1 - 2 */
      var(--spacing-medium) /* 2 - 3, spacing */
      auto  /* 3 - 4, text */
      var(--spacing-medium); /* 4 - 5, spacing */
  }

  .page-header__text {
    grid-row: 3 / 4;
  }

  .page-header__image-column {
    display: none;
  }

  .page-header--fill-screen {
    grid-template-rows:
      var(--app-header-height-small) /* 1 - 2 */
      var(--spacing-medium) /* 2 - 3, spacing */
      auto /* 3 - 4, text */
      var(--spacing-medium) /* 4 - 5, spacing */
      var(--spacing-medium) /* 5 - 6, spacing */
      calc(50vh - 2 * var(--spacing-medium)) /* 6 - 7, image */
      var(--spacing-medium) /* 7 - 8, spacing */
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
    margin: calc(-1 * var(--spacing-medium)) 0;
    content: '';
    display: block;
    position: relative;
    grid-row: 5 / 8;
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
      var(--app-header-height-small) /* 1 - 2 */
      var(--spacing-medium) /* 2 - 3, spacing */
      auto /* 3 - 4, text */
      var(--spacing-medium) /* 4 - 5, spacing */
      var(--spacing-medium) /* 5 - 6, spacing */
      calc(50vh - 2 * var(--spacing-medium)) /* 6 - 7, image */
      var(--spacing-medium) /* 7 - 8, spacing */
      var(--spacing-medium) /* 8 - 9, spacing */
      auto /* 9 - 10, slot */
      var(--spacing-medium); /* 10 - 11, spacing */
  }

  .page-header__slot {
    grid-row: 9 / 10;
    grid-column: 4 / var(--grid-content-end);
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
        var(--spacing-medium) /* 7 - 8, spacing */
    }

    .page-header--fill-screen .page-header__image-column {
      grid-column: var(--grid-content-narrow);
    }

    /* Curly bracket */
    .page-header--fill-screen::after {
      grid-column: 39 / 50;
      background-size: contain;
      background-position: unset;
    }

    .page-header--has-slot {
      grid-template-rows:
        var(--app-header-height-small) /* 1 - 2 */
        var(--spacing-medium) /* 2 - 3, spacing */
        auto /* 3 - 4, text */
        var(--spacing-medium) /* 4 - 5, spacing */
        var(--spacing-medium) /* 5 - 6, spacing */
        calc(40vh - 2 * var(--spacing-medium)) /* 6 - 7, image */
        var(--spacing-medium) /* 7 - 8, spacing */
        var(--spacing-medium) /* 8 - 9, spacing */
        auto /* 9 - 10, Slot */
        var(--spacing-medium) /* 10 - 11, spacing */
    }
  }

  @media (min-width: 720px) {
    .page-header {
      grid-template-rows:
        var(--app-header-height-small) /* 1 - 2 */
        var(--spacing-medium) /* 2 - 3, spacing */
        1fr /* 3 - 4, text */
        var(--spacing-medium); /* 4 - 5, spacing */
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
        var(--spacing-larger);  /* 6 - 7, spacing */
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
    .page-header--fill-screen::before {
      grid-row: 1 / 7;
      grid-column: var(--grid-page-right);
    }

    /* Curly bracket */
    .page-header--fill-screen::after {
      margin: calc(-1 * var(--spacing-medium)) 0;
      grid-row: 3 / 6;
      grid-column: var(--grid-center) / 48;
      background-size: contain;
      background-position: left center; /* remember, object is rotated */
    }

    .page-header--fill-screen .scroll-to {
      left: 0;
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
      max-height: 100%;
    }

    /* Make sure image doesn't float upwards */
    .page-header--fill-screen .page-header__image {
      max-height: 100%;
    }

    .page-header--has-slot {
      grid-template-rows:
        var(--app-header-height-small) /* 1 - 2 */
        var(--spacing-larger) /* 2 - 3, spacing */
        auto /* 3 - 4, text */
        var(--spacing-medium) /* 4 - 5, spacing between text and image */
        1fr /* 5 - 6, image */
        var(--spacing-larger) /* 6 - 7, spacing */
        var(--spacing-medium) /* 7 - 8, spacing above slot */
        auto /* 8 - 9, slot */
        var(--spacing-medium); /* 9 - 10, spacing below slot */
    }

    .page-header__slot {
      grid-row: 8 / 9;
      min-height: calc(23.5vh - 2 * var(--spacing-medium));
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

    .page-header--fill-screen {
      grid-template-rows:
        var(--app-header-height-large) /* 1 - 2 */
        var(--spacing-big) /* 2 - 3, spacing above text */
        1fr /* 3 - 4, text */
        var(--spacing-larger); /* 4 - 5, spacing below text */
    }

    /* Yellow half */
    .page-header--fill-screen::before {
      grid-row: 1 / 5;
    }

    .page-header__text {
      grid-column: 4 / 24;
    }

    .page-header--fill-screen .page-header__image-column {
      grid-row: 3 / 4;
    }

    /* Curly bracket */
    .page-header--curly-bracket::after {
      grid-row: 3 / 4;
    }

    .page-header--has-slot {
      grid-template-rows:
        var(--app-header-height-large) /* 1 - 2 */
        var(--spacing-big) /* 2 - 3, spacing above text */
        1fr /* 3 - 4, text */
        var(--spacing-larger) /* 4 - 5, spacing below text */
        var(--spacing-medium) /* 5 - 6, spacing */
        calc(23.5vh - 2 * var(--spacing-medium)) /* 6 - 7, slot */
        var(--spacing-medium); /* 7 - 8, spacing */
    }

    .page-header__slot {
      grid-row: 6 / 7;
    }
  }
</style>
