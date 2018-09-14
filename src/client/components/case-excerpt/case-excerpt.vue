<template>
  <article class="case-excerpt">
    <fixed-ratio :width="10" :height="10">
      <div class="case-excerpt__content">
        <nuxt-link
          class="case-excerpt__image-link"
          :to="{ name: 'locale-cases-slug', params: { slug, locale: currentLocale }}"
        >
          <lazy-load>
            <img :alt="title" :src="imageUrl" class="case-excerpt__image">
          </lazy-load>
          <h3 class="h3 case-excerpt__title case-excerpt__title--mobile">{{ title }}</h3>
        </nuxt-link>
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
  import { AppButton, FixedRatio, LazyLoad } from '~/components'

  export default {
    components: {
      AppButton,
      FixedRatio,
      LazyLoad,
    },
    props: {
      caseId: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        default: ''
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
    --case-excerpt-transition: transform 200ms cubic-bezier(0, 0, .1, 1);
  }

  .case-excerpt {
    border: 3px solid var(--html-blue);
  }

  .case-excerpt__content {
    height: 100%;
  }

  .case-excerpt__image-link {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .case-excerpt__image-link .lazy-load {
    display: flex;
    align-items: flex-end;
    flex-basis: 100%;
    flex-shrink: 1;
    background: var(--fog);
  }

  .case-excerpt__image {
    max-height: 100%;
    max-width: 100%;
  }

  .case-excerpt__title {
    padding: var(--spacing-small);
    text-align: center;
  }

  .case-excerpt__info {
    display: none;
  }

  @media (min-width: 1100px) {
    .case-excerpt__content {
      display: flex;
      flex-direction: column;
    }

    .case-excerpt__title {
      padding: var(--spacing-medium);
    }

    .case-excerpt__info {
      position: absolute;
      top: 100%;
      padding: var(--spacing-medium);
      display: flex;
      flex-direction: column;
    }
  }
</style>
