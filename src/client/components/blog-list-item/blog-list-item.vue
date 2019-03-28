<template>
  <article>
    <nuxt-link
      :to="localeUrl({ name: 'blog-slug', params: { slug: item.slug } })"
      class="blog-list-item"
      :class="{'blog-list-item--large' : large}"
      :aria-label="item.title"
      lang="en"
    >
      <div class="blog-list-item__content">
        <time
          :datetime="item.date"
          class="blog-list-item__time"
          :class="large ? 'body' : 'body-petite'"
        >
          {{ formattedDate }}
        </time>
        <div class="blog-list-item__details">
          <h3 class="blog-list-item__heading" :class="large ? 'h4' : 'body'">{{ item.title }}</h3>
          <div class="blog-list-item__author">
            <lazy-load v-for="author in item.authors" :key="author.name">
              <img
                class="blog-list-item__image"
                :class="{ 'blog-list-item__image--large': large }"
                :src="`${author.image.url}?auto=compress&auto=quality&fm=jpeg&w=65&h=65&fit=crop`"
                alt=""
              >
            </lazy-load>
            <span :class="large ? 'body' : 'body-petite'">{{ $t('by__authors_', { authors }) }}</span>
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
  import { LazyLoad } from '~/components'
  import formatDate from '../../lib/format-date'

  export default {
    components: { LazyLoad },
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
      authors () {
        return `${this.item.authors.map(author => author.name).join(', ')}`
      },
      formattedDate() {
        return formatDate({
          date: this.item.date,
          format: 'D MMM YYYY',
          locale: this.$i18n.locale
        })
      },
    },
  }
</script>

<style>
  :root {
    --blog-thumbnail-small: 40px;
    --blog-thumbnail-large: 65px;
  }

  .blog-list-item {
    display: block;
  }

  .blog-list-item__content {
    transition: var(--animation-shift-transition);
  }

  .blog-list-item:hover .blog-list-item__content,
  .blog-list-item:focus .blog-list-item__content {
    transform: var(--animation-shift-transform);
  }

  @media (prefers-reduced-motion: reduce) {
    .blog-list-item:hover .blog-list-item__content,
    .blog-list-item:focus .blog-list-item__content {
      transform: none;
    }
  }

  .blog-list-item__heading {
    color: var(--html-blue);
  }

  .blog-list-item--large .blog-list-item__heading {
    margin-bottom: var(--spacing-small);
  }

  .blog-list-item__time {
    display: none;
  }

  .blog-list-item__details {
    padding-left: var(--spacing-medium);
    border-left: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-medium);
    transition: border-left var(--blog-list-item-transition);
  }

  .blog-list-item:hover .blog-list-item__details,
  .blog-list-item:focus .blog-list-item__details {
    border-left: 3px solid var(--html-blue);
  }

  @media (prefers-reduced-motion: reduce) {
    .blog-list-item:hover .blog-list-item__details,
    .blog-list-item:focus .blog-list-item__details {
      border-left: 2px solid var(--html-blue);
    }
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
    .blog-list-item__content {
      display: flex;
      flex-direction: row;
    }

    .blog-list-item__time {
      margin-right: var(--spacing-medium);
      display: block;
      color: var(--off-black);
      min-width: 6rem;
    }

    .blog-list-item--large {
      padding: var(--spacing-medium) 0;
    }

    .blog-list-item--large .blog-list-item__details {
      margin: 0;
      padding-left: var(--spacing-larger);
    }

    .blog-list-item--large .blog-list-item__time {
      margin-right: var(--spacing-larger);
      min-width: 8rem;
    }
  }

  @media (min-width: 1100px) {
    .blog-list-item--large .blog-list-item__details {
      padding-left: var(--spacing-larger);
    }

    .blog-list-item--large .blog-list-item__time {
      margin-right: var(--spacing-big);
    }
  }
</style>
