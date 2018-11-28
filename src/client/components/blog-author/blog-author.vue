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
        />
      </fixed-ratio>
    </div>
    <div class="blog-author__text body">
      <span>{{ authorName }}</span>
      <time
        class="blog-author__text-time"
        datetime="item.date">
        {{ formattedDate }}
      </time>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppImage, FixedRatio } from '../../components'

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
      ...mapState([
        'currentLocale',
      ]),
      authorName() {
        return `by ${this.item.authors.map(author => author.name).join(', ')} -`
      },
      formattedDate() {
        return new Date(this.item.date).toLocaleString(this.currentLocale, { day: 'numeric', year: 'numeric', month: 'long' })
      },
    },
  }
</script>

<style>
   :root {
    --thumbnail-size: 135px;
  }
  
  .blog-author__image-ratio {
    height: 100%;
    width: 100%;
    max-height: var(--thumbnail-size);
    max-width: var(--thumbnail-size);
    overflow: hidden;
    margin-bottom: var(--spacing-small);
  }

  .blog-author__image {
    display: none;
  }

  .blog-author__text-time {
    display: block;
    color: var(--dim);
  }

  @media (min-width: 720px) {
    .blog-author__image {
      display: block;
      padding-right: var(--spacing-small);
      border-right: 2px solid var(--very-dim);
    }

    .blog-author__text {
      display: flex;
      flex-direction: column;
    }
  }

  @media (min-width: 1100px) {
    .blog-author__image {
      padding-right: var(--spacing-larger);
    }
  }
</style>
