<template>
  <article class="service-excerpt">
    <div class="service-excerpt__content">
      <h3 v-if="title" class="h3">{{ title }}</h3>
      <rich-text-block v-if="body" class="service-excerpt__body body" :text="body"/>
      <responsive-image v-if="image" class="service-excerpt__image" :image="image"/>
    </div>
    <AppButton
      :aria-label="$t('learn_more_about__title_', { title })"
      :label="$t('learn_more')"
      :to="localeUrl({ name: 'services-slug', params: { slug } })"
    />
  </article>
</template>

<script>
import AppButton from '../app-button'
import ResponsiveImage from '../responsive-image'
import RichTextBlock from '../rich-text-block'

export default {
  components: {
    AppButton,
    ResponsiveImage,
    RichTextBlock
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: null,
      validator(image) {
        return image && typeof(image.url) === 'string'
      },
    },
    slug: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
  .service-excerpt {
    position: relative;
    padding: var(--spacing-medium);
    display: flex;
    flex-direction: column;
  }

  .service-excerpt::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 50%;
    background-color: var(--bg-pastel);
  }

  .service-excerpt__content {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  .service-excerpt__content > * + * {
    margin-top: var(--spacing-small);
  }

  .service-excerpt__body {
    flex-grow: 2;
  }

  .service-excerpt__image {
    display: block;
    width: 100%;
    max-width: 400px;
    height: auto;
  }

  .service-excerpt .app-button--primary {
    width: 100%;
    margin-top: var(--spacing-medium);
  }

  @media (min-width: 720px) {
    .service-excerpt::before {
      padding-top: 100%;
    }

    .service-excerpt__image {
      max-width: none;
    }
  }
</style>
