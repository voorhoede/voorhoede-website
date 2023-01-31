<template>
  <article :class="$style.root">
    <picture :class="$style.media">
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
        :class="$style.image"
        :src="getImageUrl(image.url, {
          w: '800'
        })"
        :width="image.width"
        :height="image.height"
        alt=""
        loading="lazy"
      >
    </picture>
    <div :class="$style.caption">
      <app-link
        v-if="internalLink"
        :class="$style.link"
        :to="internalLink"
      >
        <h3 :class="['h4', $style.title]">
          {{ title }}
        </h3>
      </app-link>
      <a
        v-else-if="externalLink"
        :class="$style.link"
        :href="externalLink"
        target="_blank"
        rel="noreferrer noopener"
      >
        <h3 :class="['h4', $style.title]">
          {{ title }}
        </h3>
      </a>
      <p :class="['body', $style.body]">{{ body }}</p>
      Medium breakpoint: {{ breakpoints.medium }}
    </div>
  </article>
</template>

<script>
  import breakpoints from '../app-core/breakpoints.module.css';
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
    },
    data: () => ({ breakpoints }),
  }
</script>

<style module>
  @value medium from "../app-core/breakpoints.module.css";

  :root {
    --link-card-image-ratio: .7043795620437956;
    --duration: .15s;
  }

  .root {
    position: relative;
    background-color: var(--fog);
  }

  .media {
    display: block;
    position: relative;
    padding-top: calc(var(--link-card-image-ratio) * 100%);
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .caption {
    padding:
      var(--spacing-medium)
      var(--spacing-medium)
      var(--spacing-medium)
      var(--spacing-large);
  }

  .link::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .title {
    position: relative;
  }

  .title::before {
    content: '\2192';
    position: absolute;
    top: 0;
    right: calc(100% + var(--spacing-tiny));
    font-size: 1.5em;
    line-height: .95em;
    font-weight: 300;
  }

  .title,
  .title::before {
    transition: transform var(--duration);
  }

  .link:hover .title,
  .link:focus .title {
    transform: translateX(var(--spacing-small));
  }

  .link:hover .title::before,
  .link:focus .title::before {
    transform: translateX(calc(var(--spacing-tiny) * -1));
  }

  .body {
    margin-top: .5em;
  }

  @media medium {
    .caption {
      padding-left: calc(var(--spacing-large) + var(--spacing-smaller));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --duration: 0s;
    }
  }
</style>
