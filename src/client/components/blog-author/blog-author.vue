<template>
  <div>
    <div class="blog-author__image">
      <fixed-ratio
        class="blog-author__image-ratio"
        v-for="author in item.authors"
        :key="author.name"
        :width="author.image.width"
        :height="author.image.width"
      >
        <app-image
          :image="author.image"
          :crop-and-keep-ratio="true"
          :avatar-and-face-focus="true"
          :width-step="135"
        />
      </fixed-ratio>
    </div>
    <div class="blog-author__text body">
      <span>{{ $t('by__authors_', { authors }) }}</span>
      <time
        class="blog-author__text-time"
        datetime="item.date">
        {{ formattedDate }}
      </time>
    </div>
  </div>
</template>

<script>
  import AppImage from '../app-image'
  import FixedRatio from '../fixed-ratio'
  import formatDate from '../../lib/format-date'

  export default {
    components: { AppImage, FixedRatio },
    props: {
      item: {
        type: Object,
        required: true,
        validator(item) {
          return typeof(item.slug) === 'string' &&
                 typeof(item.title) === 'string' &&
                 !!Date.parse(item.date) &&
                 item.authors.length >= 1
        },
      },
      large: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      authors () {
        return `${this.item.authors.map(author => author.name).join(', ')}`
      },
      formattedDate() {
        return formatDate({
          date: this.item.date,
          locale: this.$i18n.locale,
          format: 'D MMMM YYYY'
        })
      },
    },
  }
</script>

<style>
  :root {
    --thumbnail-size: 135px;
  }

  .blog-author__image-container {
    max-width: var(--thumbnail-size);
  }

  .blog-author__image {
    display: none;
    margin-bottom: var(--spacing-small);
  }

  .blog-author__image-ratio {
    margin-top: var(--spacing-small);
  }

  .blog-author__image-ratio:first-child {
    margin-top: 0;
  }

  .blog-author__text-time {
    display: block;
    color: var(--dim);
  }

  @media (min-width: 720px) {
    .blog-author__image {
      display: block;
      border-right: 2px solid var(--very-dim);
      filter: saturate(0);
      padding-right: var(--spacing-small);
      max-width: calc(var(--thumbnail-size) + var(--spacing-small) + 2px);
    }

    .blog-author__text {
      display: flex;
      flex-direction: column;
    }
  }

  @media (min-width: 1100px) {
    .blog-author__image {
      padding-right: var(--spacing-larger);
      max-width: calc(var(--thumbnail-size) + var(--spacing-larger) + 2px);
    }
  }
</style>
