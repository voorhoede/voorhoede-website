<template>
  <section class="pullquote-composition grid"
           :class="inverse ? 'pullquote-composition--inverse' : '' ">
    <img :src="imageUrl" class="pullquote-composition__image" v-if="imageUrl">
    <h4 class="pullquote font-bold pullquote-composition__title"
        :class="imageUrl ? '' : 'pullquote-composition__title--align-left' ">
      {{ pullquote }}
    </h4>
    <div class="pullquote-composition__body">
      <rich-text-block :text="text"/>
    </div>
  </section>
</template>

<script>
import { RichTextBlock } from '~/components'

export default {
  components: {
    RichTextBlock,
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
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
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

.pullquote-composition__title--align-left {
  grid-column: content;
}

.pullquote-composition__image {
  grid-row: 1;
  grid-column: content-left;
  justify-self: flex-start;
  align-self: center;
  max-width: 155px;
}

.pullquote-composition__body {
  margin-top: var(--spacing-large);
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
    margin-top: 0;
  }

  .pullquote-composition--inverse .pullquote-composition__image {
    grid-column-start: 24;
  }

  .pullquote-composition--inverse .pullquote-composition__title {
    grid-column-start: 25;
    grid-column-end: 34;
  }

  .pullquote-composition--inverse .pullquote-composition__body {
    grid-column-end: 16;
    grid-column-start: 2;
  }
}

@media (max-width: 1100px) {
  .pullquote-composition__image {
    max-width: 120px;
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
    grid-column-end: 48;
  }

  .pullquote-composition--inverse .pullquote-composition__title {
    grid-column-start: 34;
    grid-column-end: 46;
  }

  .pullquote-composition--inverse .pullquote-composition__image {
    grid-column-start: 30;
  }

  .pullquote-composition--inverse .pullquote-composition__body {
    grid-column-end: 21;
    grid-column-start: 2;
  }
}

@media (min-width: 1440px) {
  .pullquote-composition__body {
    grid-column-start: 29;
    grid-column-end: 45;
  }

  .pullquote-composition--inverse .pullquote-composition__body {
    grid-column-start: 5;
  }
}
</style>
