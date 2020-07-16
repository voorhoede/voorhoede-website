<template>
  <article class="case-excerpt">
    <fixed-ratio :width="10" :height="10">
      <nuxt-link
        class="case-excerpt__link"
        :to="localeUrl({ name: 'cases-slug', params: { slug } })"
        :title="title"
        :aria-label="title"
      >
        <responsive-image
          :has-fixed-ratio="false"
          :image="image"
          class="case-excerpt__image"
        />
        <h3 class="h3 case-excerpt__title">{{ title }}</h3>
        <div class="case-excerpt__info">
          <p class="case-excerpt__body body">{{ body }}</p>
          <div class="case-excerpt__actions">
            <span
              class="app-button body app-button--primary"
            >
              {{ $t('learn_more') }}
            </span>
          </div>
        </div>
      </nuxt-link>
    </fixed-ratio>
  </article>
</template>

<script>
  import FixedRatio from '../fixed-ratio'
  import ResponsiveImage from '../responsive-image'

  export default {
    components: {
      FixedRatio,
      ResponsiveImage,
    },
    props: {
      image: {
        type: Object,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true
      },
    },
  }
</script>

<style>
  :root {
    --case-excerpt-duration: .4s;
    --case-excerpt-ease: cubic-bezier(.18, .5, 0, 1.01);
    --case-excerpt-stagger: .03s;
    --case-excerpt-image-height: 70%;
  }

  .case-excerpt {
    border: 3px solid var(--html-blue);
  }

  .case-excerpt__link {
    display: block;
    height: 100%;
    overflow: visible;
  }

  .case-excerpt__link .lazy-load {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }

  /**
   * The responsive image requires height for the lazy load.
   * Otherwise the intersection observer doesn't get triggered in chrome android.
   */
  .case-excerpt__image {
    height: var(--case-excerpt-image-height);
    background: var(--fog);
  }

  .case-excerpt__title {
    height: calc(100% - var(--case-excerpt-image-height));
    padding: var(--spacing-small);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.1em;
    background: var(--white);
  }

  .case-excerpt__info {
    display: none;
  }

  @media (min-width: 1100px) {
    .case-excerpt__image {
      transition:
        transform
        var(--case-excerpt-duration)
        calc(var(--case-excerpt-stagger) * 2)
        var(--case-excerpt-ease);
    }

    .case-excerpt__link:hover .case-excerpt__image,
    .case-excerpt__link:focus .case-excerpt__image {
      transition:
        transform
        var(--case-excerpt-duration)
        var(--case-excerpt-ease);
      transform: translateY(-100%);
    }

    .case-excerpt__title {
      transition:
        transform
        var(--case-excerpt-duration)
        var(--case-excerpt-stagger)
        var(--case-excerpt-ease);
    }

    .case-excerpt__link:hover .case-excerpt__title,
    .case-excerpt__link:focus .case-excerpt__title {
      transform: translateY(-230%);
    }

    .case-excerpt__info {
      position: relative;
      width: 100%;
      height: var(--case-excerpt-image-height);
      padding-top: var(--spacing-small);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--white);
      transition:
        transform
        var(--case-excerpt-duration)
        var(--case-excerpt-ease);
    }

    .case-excerpt__link:hover .case-excerpt__info,
    .case-excerpt__link:focus .case-excerpt__info {
      transition:
        transform
        var(--case-excerpt-duration)
        calc(var(--case-excerpt-stagger) * 2)
        var(--case-excerpt-ease);
      transform: translateY(-100%);
    }

    .case-excerpt__body {
      text-align: center;
      padding: 0 var(--spacing-small);
    }

    .case-excerpt__actions {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: var(--spacing-small);
      background: var(--brand-yellow);
    }

    .case-excerpt__actions .app-button--secondary::after {
      background: var(--html-blue);
    }

    @media (prefers-reduced-motion: reduce) {
      :root {
        --case-excerpt-duration: 0s !important;
        --case-excerpt-stagger: 0s !important;
      }
    }
  }
</style>
