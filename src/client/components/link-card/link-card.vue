<template>
  <article class="link-card">
    <picture class="link-card__media">
      <source
        type="image/webp"
        :srcset="getImageUrl(image.url, {
          fm: 'webp',
          w: '800'
        })">
      <source
        type="image/png"
        :srcset="getImageUrl(image.url,{
          fm: 'png',
          w: '800'
        })">
      <img
        class="link-card__image"
        :src="getImageUrl(image.url, {
          w: '800'
        })"
        :width="image.width"
        :height="image.height"
        alt=""
        loading="lazy"
      >
    </picture>
    <div class="link-card__caption">
      <nuxt-link
        v-if="internalLink"
        class="link-card__link"
        :to="internalLink"
      >
        <h3 class="h4 link-card__title">
          {{ title }}
        </h3>
      </nuxt-link>
      <a
        v-else-if="externalLink"
        class="link-card__link"
        :href="externalLink"
        target="_blank"
        rel="noreferrer noopener"
      >
        <h3 class="h4 link-card__title">
          {{ title }}
        </h3>
      </a>
      <p class="link-card__body body">{{ body }}</p>
    </div>
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
      internalLink: {
        type: [Object, String],
        default: null
      },
      externalLink: {
        type: String,
        default: null
      }
    },
    methods: {
      getImageUrl(url, options) {
        return imageUrl(url, options)
      }
    }
  }
</script>

<style>
  :root {
    --link-card-image-ratio: .7043795620437956;
    --duration: .15s;
  }

  .link-card {
    position: relative;
    background-color: var(--fog);
  }

  .link-card__media {
    display: block;
    position: relative;
    padding-top: calc(var(--link-card-image-ratio) * 100%);
  }

  .link-card__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .link-card__caption {
    padding:
      var(--spacing-medium)
      var(--spacing-medium)
      var(--spacing-medium)
      var(--spacing-large);
  }

  .link-card__link::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .link-card__title {
    position: relative;
  }

  .link-card__title::before {
    content: '\2192';
    position: absolute;
    top: 0;
    right: calc(100% + var(--spacing-tiny));
    font-size: 1.5em;
    line-height: .95em;
    font-weight: 300;
  }

  .link-card__title,
  .link-card__title::before {
    transition: transform var(--duration);
  }

  .link-card__link:hover .link-card__title,
  .link-card__link:focus .link-card__title {
    transform: translateX(var(--spacing-small));
  }

  .link-card__link:hover .link-card__title::before,
  .link-card__link:focus .link-card__title::before {
    transform: translateX(calc(var(--spacing-tiny) * -1));
  }

  .link-card__body {
    margin-top: .5em;
  }

  @media (min-width: 1100px) {
    .link-card__caption {
      padding-left: calc(var(--spacing-large) + var(--spacing-smaller));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --duration: 0s;
    }
  }
</style>
