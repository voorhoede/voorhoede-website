<template>
  <section class="pullquote-composition grid"
           :class="inverse ? 'pullquote-composition--inverse' : '' ">
    <img :src="imageUrl" class="pullquote-composition__image">
    <h4 class="pullquote font-bold pullquote-composition__title">
      {{ pullquote }}
    </h4>
    <div class="pullquote-composition__body">
      <text-block>
        <p class="body">
          {{ body }}
        </p>
      </text-block>
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
    inverse: {
      type: Boolean,
      default: false
    },
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
.pullquote-composition {
  margin-bottom: var(--spacing-larger);
}

.pullquote-composition__title {
  grid-row: 1;
  grid-column-start: 9;
  align-self: center;
}

.pullquote-composition__image {
  grid-row: 1;
  grid-column: content-left;
  justify-self: flex-start;
  align-self: center;
  max-width: 155px;
}

.pullquote-composition__body {
  margin-top: var(--spacing-larger);
}

@media (min-width: 375px) {
  .pullquote-composition__image {
    justify-self: center;
  }
}

@media (min-width: 480px) {
  .pullquote-composition__title {
    grid-column-end: 15;
  }
}

@media (max-width: 479px) {
  .pullquote-composition__image {
    max-width: 110px;
  }
}

@media (min-width: 720px) {
  .pullquote-composition__title {
    grid-column: content-left;
    grid-column-end: 10;
  }

  .pullquote-composition__image {
    grid-column-start: 11;
  }

  .pullquote-composition__body {
    grid-column-start: 20;
    grid-row: 1;
  }

  .pullquote-composition--inverse .pullquote-composition__image {
    grid-column-start: 20;
  }

  .pullquote-composition--inverse .pullquote-composition__title {
    grid-column-start: 24;
    grid-column-end: 33;
  }

  .pullquote-composition--inverse .pullquote-composition__body {
    grid-column-end: 13;
    grid-column-start: 2;
  }
}

@media (min-width: 1100px) {
  .pullquote-composition__title {
    grid-column-end: 17;
    grid-column-start: 7;
  }

  .pullquote-composition__image {
    grid-column-start: 19;
  }

  .pullquote-composition__body {
    grid-column-start: 29;
    grid-column-end: 46;
  }

  .pullquote-composition--inverse .pullquote-composition__image {
    grid-column-start: 30;
  }

  .pullquote-composition--inverse .pullquote-composition__title {
    grid-column-start: 34;
    grid-column-end: 48;
  }

  .pullquote-composition--inverse .pullquote-composition__body {
    grid-column-end: 19;
    grid-column-start: 2;
  }
}
</style>
