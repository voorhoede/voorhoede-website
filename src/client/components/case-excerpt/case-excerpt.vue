<template>
  <article class="case-excerpt">
    <fixed-ratio :width="10" :height="10">
      <div class="case-excerpt__content">
        <nuxt-link
          class="case-excerpt__link"
          :to="localeUrl({ name: 'cases-slug', params: { slug } })"
          :title="title"
          :aria-label="title"
        >
          <responsive-image
            :has-fixed-ratio="false"
            :image="image"
          />
        </nuxt-link>
        <h3 class="h3 case-excerpt__title">{{ title }}</h3>
        <div class="case-excerpt__info">
          <p class="case-excerpt__body body">{{ body }}</p>
          <div class="case-excerpt__actions">
            <app-button
              tabindex="-1"
              :aria-label="$t('learn_more_about__title_', { title })"
              :label="$t('learn_more')"
              :to="localeUrl({ name: 'cases-slug', params: { slug } })"
            />
          </div>
        </div>
      </div>
    </fixed-ratio>
  </article>
</template>

<script>
  import AppButton from '../app-button'
  import FixedRatio from '../fixed-ratio'
  import ResponsiveImage from '../responsive-image'

  export default {
    components: {
      AppButton,
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
    --case-excerpt-transition: .5s cubic-bezier(.18, .5, 0, 1.01);
    --case-excerpt-image-height: 70%;
    --case-excerpt-actions-height: 75px;
  }

  .case-excerpt {
    border: 3px solid var(--html-blue);
  }

  .case-excerpt__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .case-excerpt__link {
    height: var(--case-excerpt-image-height);
  }

  .case-excerpt__link .lazy-load {
    display: flex;
    align-items: flex-end;
    height: 100%;
    background: var(--fog);
  }

  .case-excerpt__link::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-index-low);
  }

  .case-excerpt__image {
    max-height: 100%;
    max-width: 100%;
  }

  .case-excerpt__title {
    flex-shrink: 0;
    text-align: center;
    padding: var(--spacing-small);
    background: var(--white);
  }

  .case-excerpt__info {
    display: none;
  }

  @media (min-width: 720px) {
    .case-excerpt__link {
      padding-top: calc(100% - var(--case-excerpt-image-height));
      background: var(--fog);
    }

    .case-excerpt__title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - var(--case-excerpt-image-height));
      padding: var(--spacing-small);
    }
  }

  @media (min-width: 1100px) {
    .case-excerpt__link {
      transition: margin-top var(--case-excerpt-transition);
    }

    .case-excerpt__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0;
      transition: height var(--case-excerpt-transition);
    }

    .case-excerpt__body {
      text-align: center;
      padding: 0 var(--spacing-small);
    }

    .case-excerpt__actions {
      display: flex;
      justify-content: center;
      position: relative;
      bottom: calc(-1 * var(--case-excerpt-actions-height));
      width: 100%;
      padding: var(--spacing-small);
      background: var(--brand-yellow);
      transition: bottom var(--case-excerpt-transition);
    }

    .case-excerpt__actions .app-button--secondary::after {
      background: var(--html-blue);
    }

    .case-excerpt__link:focus,
    .case-excerpt__link:hover {
      margin-top: calc(-1 * var(--case-excerpt-image-height));
    }

    .case-excerpt__link:hover ~ .case-excerpt__info,
    .case-excerpt__link:focus ~ .case-excerpt__info {
      height: var(--case-excerpt-image-height);
    }

    .case-excerpt__link:hover ~ .case-excerpt__info .case-excerpt__actions,
    .case-excerpt__link:focus ~ .case-excerpt__info .case-excerpt__actions {
      position: absolute;
      bottom: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .case-excerpt:hover .case-excerpt__link,
      .case-excerpt:focus-within .case-excerpt__link {
        margin-top: 0;
      }

      .case-excerpt__info,
      .case-excerpt__actions {
        display: none;
      }
    }
  }
</style>
