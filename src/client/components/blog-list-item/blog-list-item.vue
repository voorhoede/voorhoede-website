<template>
  <article>
    <nuxt-link :to="{ name: 'locale-blog-slug', params: { locale: currentLocale, slug: item.slug }}" class="blog-list-item">
      <time datetime="item.date" class="blog-list-item__time body-petite">{{ formattedDate }}</time>
      <div class="blog-list-item__content">
        <h3 class="body blog-list-item__heading">{{ item.title }}</h3>
        <div class="blog-list-item__author">
          <lazy-load v-for="author in item.authors" :key="author.name">
            <img
              :width="thumbnailSize"
              :height="thumbnailSize"
              class="blog-list-item__image"
              :src="`${author.image.url}?auto=compress&auto=quality&fm=webp&w=40&h=40&fit=crop`"
              alt=""
            >
          </lazy-load>
          <span class="body-petite">{{ authorName }}</span>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
  import { LazyLoad } from '~/components'

  export default {
    components: { LazyLoad },
    props: {
      item: {
        type: Object,
        required: true,
        validator(item) {
          return typeof(item.slug) === 'string' && typeof(item.title) === 'string' && !!Date.parse(item.date) && item.authors.length >= 1
        },
      },
      currentLocale: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        thumbnailSize: 40
      }
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
  :root {
    --blog-list-item-animation-timing: .15s;
  }

  .blog-list-item {
    display: inline-block;
    transition: transform var(--blog-list-item-animation-timing) ease-out;
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
      flex-shrink: 0;
    }
  }

  .blog-list-item__content {
    padding-left: var(--spacing-medium);
    border-left: 1px solid var(--very-dim);
    margin-bottom: var(--spacing-medium);
    transition: border-left var(--blog-list-item-animation-timing) ease-out;
  }

  .blog-list-item:hover .blog-list-item__content,
  .blog-list-item:focus .blog-list-item__content {
    border-left: 3px solid var(--html-blue);
  }

  .blog-list-item__image {
    display: block;
    margin-right: var(--spacing-smaller);
  }

  .blog-list-item__author {
    display: flex;
    align-items: center;
  }
</style>
