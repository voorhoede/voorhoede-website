<template>
  <article class="case-excerpt">
    <nuxt-link
      class="case-excerpt__image-link"
      :to="{ name: 'locale-cases-slug', params: { slug, locale: currentLocale }}"
    >
      <lazy-load>
        <img :alt="title" :src="imageUrl" class="case-excerpt__image">
      </lazy-load>
    </nuxt-link>
    <div class="case-excerpt__content">
      <div>
        <nuxt-link class="case-excerpt__title-link" :to="{ name: 'locale-cases-slug', params: { slug, locale: currentLocale }}">
          <h3 class="h3 case-excerpt__title">{{ title }}</h3>
        </nuxt-link>
        <p class="case-excerpt__body body">{{ body }}</p>
      </div>
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
    --case-excerpt-height: 250px;
    --case-excerpt-transition: transform 200ms cubic-bezier(0, 0, .1, 1);
    --case-excerpt-title-height: 25px;
    --case-excerpt-image-height: calc(var(--case-excerpt-height) - var(--case-excerpt-title-height));
  }

  .case-excerpt {
    display: flex;
    flex-direction: column;
    height: var(--case-excerpt-height);
    position: relative;
    border: 3px solid var(--html-blue);
    overflow: hidden;
  }

  .case-excerpt__image-link,
  .case-excerpt__content {
    flex-shrink: 0;
    transition: var(--case-excerpt-transition);
  }

  .case-excerpt__image-link {
    display: block;
    width: 100%;
    background: var(--fog);
  }

  .case-excerpt__image-link .lazy-load {
    width: 100%;
    height: var(--case-excerpt-image-height);
    display: flex;
    align-items: flex-end;
  }

  .case-excerpt__image {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
  }

  .case-excerpt__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: var(--case-excerpt-height);
    text-align: center;
    position: relative;
  }

  .case-excerpt__title-link::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .case-excerpt__title {
    margin-top: var(--spacing-smaller);
    margin-bottom: var(--spacing-tiny);
  }

  .case-excerpt__body,
  .case-excerpt__actions {
    display: none;
  }

  @media (min-width: 720px) {
    :root {
      --case-excerpt-height: 285px;
      --case-excerpt-title-height: 35px;
    }
  }

  @media (min-width: 1100px) {
    :root {
      --case-excerpt-height: 385px;
      --case-excerpt-title-height: 55px;
    }

    .case-excerpt:hover .case-excerpt__image-link,
    .case-excerpt:focus .case-excerpt__image-link,
    .case-excerpt:hover .case-excerpt__content,
    .case-excerpt:focus .case-excerpt__content {
      transform: translateY(calc(-1 * var(--case-excerpt-image-height)));
    }

    .case-excerpt__body {
      display: block;
      padding: 0 var(--spacing-medium);
      color: var(--html-blue);
      margin-bottom: var(--spacing-small);
    }

    .case-excerpt__actions {
      display: block;
      padding: var(--spacing-medium);
      background: var(--brand-yellow);
      text-align: left;
    }
  }
</style>
