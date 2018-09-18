<template>
  <div class="blog-author">
    <div class="blog-author__container">
      <app-image class="blog-author__image" v-for="author in item.authors" :key="author.name" :image="author.image"/>
    </div>
    <div class="blog-author__text body">
      <span>{{ authorName }}</span>
      <time 
        class="blog-author__text-time"
        datetime="item.date"
      >
        {{ formattedDate }}
      </time>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppImage, } from '~/components'

  export default {
    components: { AppImage, },
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

  .blog-author {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-medium);
  }

  .blog-author__text {
    margin-right: var(--spacing-small);
  }

  .blog-author__text-time {
    color: var(--dim);
  }

  .blog-author__container {
    display: none;
    margin-bottom: var(--spacing-small);
  }

  .blog-author__image {
    max-width: var(--thumbnail-size);
    margin: 0 0 var(--spacing-tiny);
  }

  @media (min-width: 720px) {
    .blog-author {
      display: block;
    }

    .blog-author__container {
      display: block;
      border-right: 1px solid var(--very-dim);
    }

    .blog-author__text {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--spacing-large);
    }
  }
</style>
