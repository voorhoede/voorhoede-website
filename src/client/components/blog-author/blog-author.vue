<template>
  <div>
    <div class="blog-author__image">
      <app-image
        class="blog-author__image-author" 
        v-for="author in item.authors" 
        :key="author.name" 
        :image="author.image"
      />
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
  import { AppImage, } from '../../components'

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
  
  .blog-author__image {
    display: none;
  }

  .blog-author__image-author {
    background: var(--white);
    width: var(--thumbnail-size);
    height: var(--thumbnail-size);
    margin: 0 0 var(--spacing-tiny);
  }

  .blog-author__text-time {
    display: block;
    color: var(--dim);
  }

  @media (min-width: 720px) {
    .blog-author__image {
      display: block;
      margin-bottom: var(--spacing-small);
      border-right: 1px solid var(--very-dim);
    }

    .blog-author__text {
      display: flex;
      flex-direction: column;
    }
  }
</style>
