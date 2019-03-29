<template>
  <header
    class="page-header grid"
    :class="{
      'page-header--fill-screen': fillScreen,
      'page-header--curly-bracket': curlyBracket,
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
    <app-image v-if="image" :image="image" :lazy-load="false"/>
    <scroll-to v-if="fillScreen" direction="down"/>
  </header>
</template>

<script>
  import AppImage from '../app-image'
  import SelfTypingText from '../self-typing-text'
  import ScrollTo from '../scroll-to'

  export default {
    components: {
      AppImage,
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
  }
</script>

<style>
  .page-header {
    background-color: var(--bg-pastel);
    overflow: hidden;
    grid-template-rows:
      var(--app-header-height-small)
      var(--spacing-medium)
      auto
      var(--spacing-medium);
  }

  .page-header__text {
    grid-row: 3 / 4;
  }

  .page-header .app-image {
    display: none;
  }

  .page-header--fill-screen {
    grid-template-rows:
      var(--app-header-height-small)
      var(--spacing-medium)
      auto
      repeat(2, var(--spacing-medium))
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

  .page-header--fill-screen .app-image {
    display: block;
    grid-row: 6 / 7;
    grid-column: 3 / var(--grid-page-end);
    z-index: var(--z-index-low); /* Make sure to be on top off  */
  }

  .page-header .scroll-to {
    position: absolute;
    bottom: var(--spacing-medium);
    left: var(--grid-margin);
  }

  @media (min-width: 520px) {
    .page-header--home {
      position: relative;
      grid-template-rows: var(--app-header-height-small) 1fr var(--spacing-large) calc(50vh - var(--spacing-large) - var(--spacing-larger)) var(--spacing-larger);
      padding-top: 0;
    }

    .page-header__curly-bracket-column {
      grid-column: var(--grid-content);
    }

    .page-header__curly-bracket {
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

    .page-header--home {
      grid-template-rows: calc(var(--app-header-height-small) + var(--spacing-large)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header--home .page-header__text {
      margin-top: 0;
    }

    .page-header__text {
      grid-column: var(--grid-content-left);
      grid-row-start: 2;
    }

    .page-header__brick {
      height: 100%;
      grid-column: var(--grid-page-right);
      grid-row-start: 1;
      grid-row-end: 6;
    }

    .page-header__curly-bracket.curly-bracket {
      position: relative;
      grid-column-start: 40;
      grid-column-end: 47;
      grid-row-start: 2;
      grid-row-end: 4;
      overflow: unset;
    }

    .page-header__curly-bracket .curly-bracket__image {
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

    .page-header--home .page-header__image {
      margin-top: 0;
      grid-row-end: 3;
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

    .page-header--home {
      grid-template-rows: calc(var(--app-header-height-large) + var(--spacing-large)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header--home .page-header__text {
      grid-column-start: 2;
    }

    .page-header__text {
      margin: var(--spacing-medium) 0;
      grid-column-start: 4;
      grid-column-end: 24;
    }
  }
</style>
