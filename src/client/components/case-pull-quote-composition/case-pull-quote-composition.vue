<template>
  <section class="pullquote-componsition">
    <div class="pullquote-componsition__header grid">
      <img :src="imageUrl" class="pullquote-componsition__image">
      <h4 class="pullquote pullquote-componsition__title">
        {{ pullquote }}
      </h4>
      <div class="pullquote-composition__body">
        <text-block>
          <p class="body">
            {{ body }}
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
  },
  props: {
    pullquote: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    }
  }
}
</script>

<style>
.pullquote-componsition {
  margin-bottom: var(--spacing-larger);
}

.pullquote-componsition__title {
  grid-row: 1;
  grid-column-start: 9;
  align-self: center;
}

.pullquote-componsition__image {
  grid-row: 1;
  grid-column: content-left;
  justify-self: flex-start;
  align-self: center;
}

.pullquote-composition__body {
  margin-top: var(--spacing-large);
}

@media (min-width: 375px) {
  .pullquote-componsition__image {
    justify-self: center;
  }
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
    grid-column-end: 17;
    grid-column-start: 7;
  }

  .pullquote-componsition__image {
    grid-column-start: 19;
  }

  .pullquote-composition__body {
    grid-column-start: 29;
    grid-column-end: 46;
  }
}
</style>
