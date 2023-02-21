<template>
  <div>
    <app-link
      v-for="author in item.authors"
      :key="author.name"
      class="blog-author__image-wrapper"
      :to="$localeUrl({ name: 'team-slug', params: { slug: author.slug } })"
    >
      <dato-image
        class="blog-author__image"
        :src="author.image.url"
        alt=""
        :width="135"
        :height="135"
        loading="eager"
        :modifiers="{ ar: '1:1', fit: 'crop', crop: 'faces' }"
      />
    </app-link>
    <div class="blog-author__text body">
      <div class="blog-author__links">
        <span>
          {{ $t('by__authors_') }}
        </span>
        <app-link
          v-for="author in authorLinks" :key="author.slug"
          :to="$localeUrl({ name: 'team-slug', params: { slug: author.slug } })">
          <span class="blog-author__author-link">
            {{ author.name }}
          </span>
        </app-link>
      </div>
      <time
        class="blog-author__text-time"
        :datetime="item.date">
        {{ formattedDate }}
      </time>
    </div>
  </div>
</template>

<script>
  import formatDate from '../../lib/format-date'

  export default {
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
      authorLinks() {
        return this.item.authors.map(author => {
          return {
            name: author.name,
            slug: author.slug,
          }
        })
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
    --author-image-border-width: 2px;
  }

  .blog-author__image {
    display: none;
  }

  .blog-author__author-link {
    display: block;
    color: var(--html-blue);
  }

  .blog-author__author-link:hover,
  .blog-author__author-link:focus {
    font-weight: bolder;
  }

  .blog-author__links {
    display: inline-flex;
    gap: 5px;
    position: relative;
  }

  .blog-author__links a span::after {
    content: ',';
  }

  .blog-author__links a:last-child span::after {
    content: '';
  }

  .blog-author__text-time {
    display: block;
    color: var(--dim);
  }

  @media (min-width: 720px) {
    .blog-author__text {
      display: flex;
      flex-direction: column;
    }
  }

  @media (min-width: 1100px) {
    .blog-author__image-wrapper {
      display: block;
      border-right: 2px solid var(--very-dim);
    }

    .blog-author__image {
      display: block;
      margin-bottom: var(--spacing-small);
      transform: translateX(0);
      transition: transform 0.2s ease-in-out;
    }

    .blog-author__image:hover, .blog-author__image:focus {
      transform: translateX(10px);
    }
  }
</style>
