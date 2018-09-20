<template>
  <article class="case-excerpt">
    <fixed-ratio :width="10" :height="10">
      <div class="case-excerpt__content">
        <nuxt-link
          class="case-excerpt__image-link"
          :to="{ name: 'locale-cases-slug', params: { slug, locale: currentLocale }}"
        >
          <responsive-image
            :has-fixed-ratio="false"
            :image="image"
          />
        </nuxt-link>
        <h3 class="h3 case-excerpt__title">{{ title }}</h3>
        <div class="case-excerpt__info">
          <p class="case-excerpt__body body">{{ body }}</p>
          <div class="case-excerpt__actions button-group">
            <app-button
              :label="primaryLabel"
              :to="{ name: 'locale-cases-slug', params: { slug, locale: currentLocale }}"
            />
            <app-button
              secondary
              v-if="secondaryLabel"
              :label="secondaryLabel"
              :to="{ name: 'locale-cases', params: { locale: 'en' }}"
            />
          </div>
        </div>
      </div>
    </fixed-ratio>
  </article>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppButton, FixedRatio, ResponsiveImage } from '~/components'

  export default {
    components: {
      AppButton,
      FixedRatio,
      ResponsiveImage,
    },
    props: {
      caseId: {
        type: String,
        required: true,
      },
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
      primaryLabel: {
        type: String,
        default: '',
      },
      slug: {
        type: String,
        required: true
      },
      secondaryLabel: {
        type: String,
        default: '',
      },
    },
    computed: {
      ...mapState(['currentLocale']),
    },
  }
</script>

<style>
  :root {
    --case-excerpt-transition: 200ms cubic-bezier(0, 0, .1, 1);
    --case-excerpt-image-height: 70%;
  }

  .case-excerpt {
    border: 3px solid var(--html-blue);
  }

  .case-excerpt__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .case-excerpt__image-link {
    height: var(--case-excerpt-image-height);
  }

  .case-excerpt__image-link .lazy-load {
    display: flex;
    align-items: flex-end;
    height: 100%;
    background: var(--fog);
  }

  .case-excerpt__image {
    max-height: 100%;
    max-width: 100%;
  }

  .case-excerpt__title {
    padding: var(--spacing-small);
    flex-shrink: 0;
    text-align: center;
  }

  .case-excerpt__info {
    display: none;
  }

  @media (min-width: 1100px) {
    .case-excerpt__image-link {
      will-change: margin-top;
      transition: margin-top var(--case-excerpt-transition);
      height: var(--case-excerpt-image-height);
    }

    .case-excerpt__title {
      padding: var(--spacing-small);
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - var(--case-excerpt-image-height));
    }

    .case-excerpt__info {
      height: var(--case-excerpt-image-height);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .case-excerpt__body {
      padding: 0 var(--spacing-small);
      text-align: center;
    }

    .case-excerpt__actions {
      padding: var(--spacing-small);
      background: var(--brand-yellow);
      justify-content: center;
    }

    .case-excerpt__actions .app-button--secondary::after {
      background: var(--html-blue);
    }

    .case-excerpt:hover .case-excerpt__image-link {
      margin-top: calc(-1 * var(--case-excerpt-image-height));
    }

    .case-excerpt:hover .case-excerpt__body {
      height: var(--case-excerpt-image-height);
    }
  }
</style>
