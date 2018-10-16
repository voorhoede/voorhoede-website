<template>
  <article>
    <nuxt-link
      :to="{ name: 'locale-blog-slug', params: { locale: currentLocale, slug: item.slug }}"
      class="blog-list"
    >
      <div class="blog-list-item" :class="{'blog-list-item--large' : large}" >
        <time
          datetime="item.date"
          class="blog-list-item__time"
          :class="large ? 'body' : 'body-petite'"
        >
          {{ formattedDate }}
        </time>
        <div class="blog-list-item__content">
          <h3 class="blog-list-item__heading" :class="large ? 'h4' : 'body'">{{ item.title }}</h3>
          <div class="blog-list-item__author">
            <no-script>
              <img
                v-for="author in item.authors" :key="author.name"
                class="blog-list-item__image"
                :class="{ 'blog-list-item__image--large': large }"
                :src="`${author.image.url}?auto=compress&auto=quality&fm=jpeg&w=65&h=65&fit=crop`"
                alt=""
              >
            </no-script>
            <lazy-load v-for="author in item.authors" :key="author.name">
              <img
                class="blog-list-item__image"
                :class="{ 'blog-list-item__image--large': large }"
                :src="`${author.image.url}?auto=compress&auto=quality&fm=jpeg&w=65&h=65&fit=crop`"
                alt=""
              >
            </lazy-load>
            <span :class="large ? 'body' : 'body-petite'">{{ authorName }}</span>
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
  import { mapState } from 'vuex'
  import { LazyLoad, NoScript } from '~/components'

  export default {
    components: { LazyLoad, NoScript },
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
      }
    },
    computed: {
      ...mapState([
        'currentLocale',
      ]),
      authorName() {
        const prefix = this.currentLocale === 'en' ? 'by' : 'door'
        return `${prefix} ${this.item.authors.map(author => author.name).join(', ')}`
      },
      formattedDate() {
        return new Date(this.item.date).toLocaleString(this.currentLocale, { day: 'numeric', year: 'numeric', month: 'short' })
      },
    },
  }
</script>

<style>
  :root {
    --blog-thumbnail-small: 40px;
    --blog-thumbnail-large: 65px;
    --blog-list-item-transition: .3s cubic-bezier(.47, 0, .29, .98);
  }

  .blog-list-item {
    display: block;
    transition: transform var(--blog-list-item-transition);
  }

  .blog-list:hover .blog-list-item,
  .blog-list:focus .blog-list-item {
    transform: translateX(var(--grid-fixed-column));
  }

  .blog-list-item--large .blog-list-item__heading {
    margin-bottom: var(--spacing-small);
  }

  .blog-list-item__heading {
    color: var(--html-blue);
  }

  .blog-list-item__time {
    display: none;
  }

  .blog-list-item__content {
    padding-left: var(--spacing-medium);
    border-left: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-medium);
    transition: border-left var(--blog-list-item-transition);
  }

  .blog-list:hover .blog-list-item__content,
  .blog-list:focus .blog-list-item__content {
    border-left: 3px solid var(--html-blue);
  }

  .blog-list-item__image {
    display: block;
    object-fit: contain;
    height: var(--blog-thumbnail-small);
    width: var(--blog-thumbnail-small);
    margin-right: var(--spacing-smaller);
  }

  .blog-list-item__image--large {
    height: var(--blog-thumbnail-large);
    width: var(--blog-thumbnail-large);
  }

  .blog-list-item__author {
    display: flex;
    align-items: center;
    color: var(--off-black);
  }

  @media (min-width: 720px) {
    .blog-list-item {
      display: flex;
      flex-direction: row;
    }

    .blog-list-item--large {
      padding: var(--spacing-medium) 0;
    }

    .blog-list-item--large .blog-list-item__content {
      margin: 0;
      padding-left: var(--spacing-larger);
    }

    .blog-list-item--large .blog-list-item__time {
      width: 7rem;
      margin-right: var(--spacing-larger);
    }

    .blog-list-item__time {
      display: block;
      color: var(--off-black);
      margin-right: var(--spacing-medium);
      min-width: 6rem;
    }
  }

  @media (min-width: 1100px) {
    .blog-list-item--large .blog-list-item__content {
      padding-left: var(--spacing-larger);
    }

    .blog-list-item--large .blog-list-item__time {
      margin-right: var(--spacing-big);
    }
  }
</style>
