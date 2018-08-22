<template>
  <section class="pullquote-componsition">
    <div class="pullquote-componsition__header grid">
      <img src="/images/logo.svg" alt="" class="pullquote-componsition__image" >
      <h4 class="pullquote pullquote-componsition__title">
        Drop &amp; fly is installed in over 35 airports around the globe
      </h4>
      <div class="pullquote-composition__body">
        <text-block>
          <p class="body">
            Drop & Fly units are placed all around the world. The user interface must be adaptable to each specific airport. So we developed a system to customise styling, texts and available languages. Now changing or adding an airport theme, language selection or text is just a matter of simple configuration.
            This way the front-end can be easily adapted to the specific demands of Sita's current and future clients. A solution they can use for years to come!
          </p>
        </text-block>
      </div>
    </div>
  </section>
</template>

<script>
import { TextBlock } from '~/components'

export default {
  components: {
    TextBlock
  }
}
</script>

<style>
.pullquote-componsition {
  margin-bottom: var(--spacing-larger);
}

.pullquote-componsition__title {
  grid-row: 1;
  grid-column: content-right;
  align-self: center;
}

.pullquote-componsition__image {
  grid-row: 1;
  grid-column: content-left;
  align-self: center;
  justify-self: center;
}

.pullquote-composition__body {
  margin-top: var(--spacing-large);
}

@media (max-width: 480px) {
  .pullquote-componsition__image {
    max-width: 110px;
  }
}

@media (min-width: 720px) {
  .pullquote-componsition__title {
    grid-column: content-left;
    grid-column-end: 10;
  }

  .pullquote-componsition__image {
    grid-column-start: 11;
  }

  .pullquote-composition__body {
    grid-column-start: 20;
    grid-row: 1;
  }
}

@media (min-width: 1100px) {
  .pullquote-componsition__title {
    grid-column-end: 14;
  }

  .pullquote-componsition__image {
    grid-column-start: 15;
  }

  .pullquote-composition__body {
    grid-column: content-right;
  }
}
</style>
