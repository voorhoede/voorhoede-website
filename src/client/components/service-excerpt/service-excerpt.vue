<template>
  <article class="service-excerpt">
    <responsive-image v-if="image" class="service-excerpt__image" :image="image"/>
    <div class="service-excerpt__content">
      <h3 v-if="title" class="service-excerpt__title h3">{{ title }}</h3>
      <rich-text-block v-if="body" class="service-excerpt__body body" :text="body"/>
      <p class="service-excerpt__actions">
        <AppButton
          secondary
          :aria-label="$t('learn_more_about__title_', { title })"
          :label="$t('learn_more')"
          :to="localeUrl({ name: 'services-slug', params: { slug } })"
        />
      </p>
    </div>
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
    padding: var(--spacing-medium);
    background-color: var(--bg-pastel);
    background-image: linear-gradient(var(--white), var(--white));
    background-size: 100% var(--spacing-huge);
    background-repeat: no-repeat;
    background-position: 0 0;
  }

  .service-excerpt__image {
    display: block;
    width: 100%;
    max-width: 230px;
    height: auto;
    margin-right: auto;
    margin-left: auto;
  }

  .service-excerpt__content {
    margin-top: var(--spacing-large);
  }

  .service-excerpt__title {
    text-align: center;
  }

  .service-excerpt__body {
    margin-top: var(--spacing-small);
  }

  .service-excerpt__actions {
    margin-top: var(--spacing-small);
    text-align: center;
  }

  @media (min-width: 1100px) {
    .service-excerpt {
      display: flex;
      align-items: center;
      background-size: 25% 100%;
      background-position: 0 0;
    }

    .service-excerpt__image {
      width: calc(50% - var(--spacing-large));
      max-width: none;
    }

    .service-excerpt__content {
      width: 50%;
      align-self: stretch;
      margin-top: 0;
      margin-left: var(--spacing-large);
      display: flex;
      flex-direction: column;
    }

    .service-excerpt__body {
      flex-grow: 2;
    }

    .service-excerpt__title,
    .service-excerpt__actions {
      text-align: left;
    }
  }
</style>
