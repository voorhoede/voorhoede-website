<template>
  <article>
    <nuxt-link :to="item.slug" class="blog-list-item">
      <time datetime="item.date" class="blog-list-item__time body-petite">{{ formattedDate }}</time>

      <div class="blog-list-item__content">
        <h3 class="body blog-list-item__heading">{{ item.title }}</h3>
        <div class="blog-list-item__author">
          <img class="blog-list-item__image" alt="" v-for="author in item.authors" :src="author.image.url" :key="author.name"
               :width="author.image.width" :height="author.image.width">
          <span class="body-petite">{{ authorName }}</span>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
  import FixedRatio from '../fixed-ratio'

  export default {
    components: { FixedRatio },
    props: {
      item: {
        type: Object,
        required: true,
        validator(item) {
          return typeof(item.slug) === 'string' && typeof(item.title) === 'string' && !!Date.parse(item.date) && item.authors.length >= 1
        },
        currentLocale: {
          type: String,
          required: true
        }
      },
    },
    computed: {
      authorName() {
        return `by ${this.item.authors.map(author => author.name).join(', ')}`
      },
      formattedDate() {
        return new Date(this.item.date).toLocaleString(this.currentLocale, { day: 'numeric', year: 'numeric', month: 'short' })
      },
    },
  }
</script>

<style>
  .blog-list-item {
    display: inline-block;
    transition: transform .3s;
  }

  @media screen and (min-width: 720px) {
    .blog-list-item {
      display: flex;
      flex-direction: row;
    }
  }

  .blog-list-item:hover,
  .blog-list-item:focus {
    transform: translateX(var(--grid-fixed-column));
  }

  .blog-list-item__heading {
    color: var(--html-blue);
  }

  .blog-list-item__time {
    display: none;
  }

  @media screen and (min-width: 720px) {
    .blog-list-item__time {
      display: block;
      color: var(--dim);
      margin-right: var(--spacing-medium);
    }
  }

  .blog-list-item__content {
    padding-left: var(--spacing-medium);
    border-left: 1px solid var(--very-dim);
    margin-bottom: var(--spacing-medium);
    transition: border-left .3s;
  }

  .blog-list-item:hover .blog-list-item__content,
  .blog-list-item:focus .blog-list-item__content {
    border-left: 3px solid var(--html-blue);
  }

  .blog-list-item__image {
    margin-right: var(--spacing-smaller);
  }

  .blog-list-item__author {
    display: flex;
    align-items: center;
  }
</style>
