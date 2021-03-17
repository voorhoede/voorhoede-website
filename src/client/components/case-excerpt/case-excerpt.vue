<template>
  <article class="case-excerpt">
    <nuxt-link
      class="case-excerpt__link"
      :to="localeUrl({ name: 'cases-slug', params: { slug } })"
      :title="title"
      :aria-label="title"
    >
      <div class="case-excerpt__media">
        <picture class="case-excerpt__picture">
          <source
            type="image/webp"
            :srcset="getImageUrl(image.url, {
              fm: 'webp'
            })">
          <source
            type="image/png"
            :srcset="getImageUrl(image.url,{
              fm: 'png'
            })">
          <img
            class="case-excerpt__image"
            :src="getImageUrl(image.url)"
            :width="image.width"
            :height="image.height"
            :alt="title"
            loading="lazy"
          >
        </picture>
      </div>
      <div class="case-excerpt__caption">
        <h2 class="h4 case-excerpt__title">{{ title }}</h2>
        <p class="case-excerpt__body body">{{ body }}</p>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
  import imageUrl from '../../lib/image-url'

  export default {
    props: {
      image: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
    },
    methods: {
      getImageUrl(url, options) {
        return imageUrl(url, { ...options, width: 400 })
      }
    }
  }
</script>

<style>
  :root {
    --case-excerpt-image-ratio: .7043795620437956;
    --duration: .15s;
  }

  .case-excerpt__link {
    display: block;
    min-height: 100%;
    background-color: var(--fog);
  }

  .case-excerpt__media {
    position: relative;
    padding-top: calc(var(--case-excerpt-image-ratio) * 100%);
  }

  .case-excerpt__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .case-excerpt__caption {
    padding:
      var(--spacing-medium)
      var(--spacing-medium)
      var(--spacing-medium)
      var(--spacing-large);
  }

  .case-excerpt__title {
    position: relative;
  }

  .case-excerpt__title::before {
    content: '\2192';
    position: absolute;
    top: 0;
    right: calc(100% + var(--spacing-tiny));
    font-size: 1.5em;
    line-height: .95em;
    font-weight: 300;
  }

  .case-excerpt__title,
  .case-excerpt__title::before {
    transition: transform var(--duration);
  }

  .case-excerpt__link:hover .case-excerpt__title,
  .case-excerpt__link:focus .case-excerpt__title {
    transform: translateX(var(--spacing-small));
  }

  .case-excerpt__link:hover .case-excerpt__title::before,
  .case-excerpt__link:focus .case-excerpt__title::before {
    transform: translateX(calc(var(--spacing-tiny) * -1));
  }

  .case-excerpt__body {
    margin-top: .5em;
  }

  @media (min-width: 1100px) {
    @media (prefers-reduced-motion: reduce) {
      :root {
        --duration: 0s;
      }
    }
  }
</style>
