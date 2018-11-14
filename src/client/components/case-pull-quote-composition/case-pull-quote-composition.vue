<template>
  <section class="pullquote-composition"
           :class="{
             'pullquote-composition--inverse' : inverse === true,
             'pullquote-composition--no-grid' : image === ''
           }"
  >
    <img v-if="image" :src="image.url" class="pullquote-composition__image" :alt="image.alt">
    <h4 class="pullquote font-bold pullquote-composition__title"
        :class="image ? '' : 'pullquote-composition__title--align-left' ">
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
    image: {
      type: Object,
      default: null,
      validator(image) {
        if (!image) {
          return true
        } else {
          const isValidImageText = (image.alt === undefined) ? true : typeof image.alt === 'string'

          return (
            typeof isValidImageText &&
            typeof image.url === 'string' &&
            typeof image.format === 'string'
          )
        }
      }
    }
  }
}
</script>

<style>
@import '../app-core/variables.css';

.pullquote-composition {
  display: grid;
  margin-bottom: var(--spacing-larger);
}

.pullquote-composition--no-grid {
  display: block;
}

.pullquote-composition__title {
  grid-row: 1;
  grid-column: content-right;
  grid-column-start: 8;
  align-self: center;
}

.pullquote-composition__title--align-left {
  grid-column: content;
  grid-column-start: 1;
  grid-column-end: 8;
}

.pullquote-composition__image {
  grid-row: 1;
  grid-column: 1;
  justify-self: flex-start;
  align-self: center;
}

.pullquote-composition__body {
  margin-top: var(--spacing-large);
  grid-column-start: 1;
  grid-column-end: 8;
  grid-row: 2;
}

@media (min-width: 375px) {
  .pullquote-composition__image {
    justify-self: center;
  }
}

@media (max-width: 479px) {
  .pullquote-composition__image {
    max-width: 110px;
  }
}

@media (min-width: 720px) {
  .pullquote-composition {
    display: grid;
    grid-template-columns: 0 10fr 2fr 6fr 2fr 15fr 0;
  }

  .pullquote-composition--inverse {
    grid-template-columns: 0 15fr 2fr 6fr 2fr 10fr 0;
  }

  .pullquote-composition__title {
    grid-column: 2;
  }

  .pullquote-composition__image {
    grid-column: 4;
  }

  .pullquote-composition__body {
    margin-top: 0;
    grid-column: 6;
    grid-row: 1;
  }

  .pullquote-composition--inverse .pullquote-composition__title {
    grid-column: 6;
  }

  .pullquote-composition--inverse .pullquote-composition__image {
    grid-column: 4;
  }

  .pullquote-composition--inverse .pullquote-composition__body {
    grid-column: 2;
  }
}

@media (max-width: 1099px) {
  .pullquote-composition__image {
    max-width: 120px;
  }
}

@media (min-width: 1440px) {
  .pullquote-composition {
    grid-template-columns: 6fr 8fr 2fr 6fr 2fr 15fr 5fr;
  }

  .pullquote-composition--inverse {
    grid-template-columns: 5fr 15fr 2fr 6fr 2fr 8fr 6fr;
  }
}
</style>
