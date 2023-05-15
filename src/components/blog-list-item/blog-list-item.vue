<template>
  <article
    class="blog-list-item"
    :class="{'blog-list-item--large' : props.large}"
  >
    <span
      v-if="props.pinned"
      class="body-small blog-list-item__pin-badge"
    >
      <app-icon name="pin" /> {{ $t('pinned_blog') }}
    </span>
    <app-link
      :to="$localeUrl({ name: props.linkName, params: { slug: props.item.slug } })"
      :lang="language"
    >
      <h3
        class="blog-list-item__title font-html-blue"
        :class="props.large ? 'h4' : 'body'"
      >
        {{ props.item.title }}
      </h3>
    </app-link>
    <time
      :datetime="props.item.date"
      class="blog-list-item__time"
      :class="props.large ? 'body' : 'body-small'"
    >
      {{ formattedDate }}
    </time>
    <div class="blog-list-item__content">
      <div
        class="blog-list-item__image-container"
        v-for="author in props.item.authors"
        :key="author.name"
      >
        <dato-image
          class="blog-list-item__image"
          :src="author.image.url"
          alt=""
          :width="props.large ? 65 : 40"
          :height="props.large ? 65 : 40"
          loading="lazy"
          :quality="85"
          :modifiers="{ ar: '1:1', fit: 'crop', crop: 'faces', sat: -100 }"
        />
      </div>
      <span :class="props.large ? 'body' : 'body-small'">{{ $t('by__authors_', { authors }) }}</span>
    </div>
  </article>
</template>

<script setup>
  import formatDate from '../../lib/format-date'

  const { $i18n } = useNuxtApp();

  const props = defineProps({
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
    pinned: {
      type: Boolean,
      default: false,
    },
    linkName: {
      type: String,
      default: 'blog-slug',
    },
  })

  const authors = computed(() => `${props.item.authors.map(author => author.name).join(', ')}`)
  const language = computed(() => props.linkName === 'blog-slug' ? 'en' : null)
  const formattedDate = computed(()=> formatDate({
    date: props.item.date,
    format: 'D MMM YYYY',
    locale: $i18n.locale(),
  }))
</script>

<style>
  :root {
    --blog-thumbnail-small: 40px;
    --blog-thumbnail-large: 65px;
  }

  .blog-list-item {
    position: relative;
    margin-bottom: var(--spacing-medium);
    transition: var(--animation-shift-transition);
  }

  .blog-list-item::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    background: var(--very-dim);
    height: 100%;
  }

  .blog-list-item:hover,
  .blog-list-item:focus {
    transform: var(--animation-shift-transform);
  }

  .blog-list-item:hover::before,
  .blog-list-item:focus::before {
    width: 3px;
    background: var(--html-blue);
  }

  @media (prefers-reduced-motion: reduce) {
    .blog-list-item:hover,
    .blog-list-item:focus {
      transform: none;
    }

    .blog-list-item:hover::before,
    .blog-list-item:focus::before {
      width: 2px;
      background: var(--very-dim);
    }
  }

  .blog-list-item__pin-badge {
    padding-left: var(--spacing-medium);
  }

  .blog-list-item__title {
    padding-left: var(--spacing-medium);
  }

  .blog-list-item--large .blog-list-item__title {
    margin-bottom: var(--spacing-small);
  }

  .blog-list-item__title::after {
    z-index: var(--z-index-low);
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .blog-list-item__time {
    display: none;
  }

  .blog-list-item__content {
    display: flex;
    align-items: center;
    padding-left: var(--spacing-medium);
  }

  .blog-list-item__details {
    padding-left: var(--spacing-medium);
    border-left: 2px solid var(--very-dim);
    margin-bottom: var(--spacing-medium);
  }

  .blog-list-item__image {
    display: block;
    object-fit: cover;
    object-position: 0 0;
    height: var(--blog-thumbnail-small);
    width: var(--blog-thumbnail-small);
    margin-right: var(--spacing-smaller);
  }

  .blog-list-item--large .blog-list-item__image {
    height: var(--blog-thumbnail-large);
    width: var(--blog-thumbnail-large);
  }

  .blog-list-item__image-container {
    height: var(--blog-thumbnail-small);
  }

  .blog-list-item--large .blog-list-item__image-container {
    height: var(--blog-thumbnail-large);
  }

  @media (min-width: 720px) {
    .blog-list-item {
      margin-bottom: var(--spacing-larger);
      padding-left: 6.25rem;
    }

    .blog-list-item--large {
      padding-left: 13.5rem;
    }

    .blog-list-item::before {
      left: 6.25rem;
    }

    .blog-list-item--large::before {
      left: 11.5rem;
    }

    .blog-list-item__time {
      position: absolute;
      display: block;
      left: 0;
      top: 0;
    }
  }
</style>
