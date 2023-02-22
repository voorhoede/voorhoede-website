<template>
  <article :class="rootClass">
    <div class="service-excerpt__image">
      <dato-image
        v-if="image"
        :src="image.url"
        alt=""
        :width="image.width"
        :height="image.height"
        loading="eager"
      />
    </div>
    <div class="service-excerpt__content">
      <h3
        v-if="title"
        class="service-excerpt__title h3"
      >
        {{ title }}
      </h3>
      <rich-text-block
        v-if="!secondary"
        class="service-excerpt__body body"
        :text="bodyLong || body"
      />
      <rich-text-block
        v-if="secondary"
        class="service-excerpt__body body"
        :text="body"
      />
      <p class="service-excerpt__actions">
        <app-button
          :secondary="secondary"
          :aria-label="$t('learn_more_about__title_', { title })"
          :label="$t('learn_more')"
          :to="$localeUrl({ name: 'services-slug', params: { slug } })"
        />
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    bodyLong: {
      type: String,
      default: null
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
    secondary: {
      type: Boolean,
      default: false
    },
    isFlipped: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rootClass() {
      return {
        'service-excerpt': true,
        'service-excerpt--primary': !this.secondary,
        'service-excerpt--secondary': this.secondary,
        'service-excerpt--is-flipped': this.isFlipped,
      }
    },
  },
}
</script>

<style>
  .service-excerpt {
    padding: var(--spacing-medium);
    background-color: var(--white);
    background-image: linear-gradient(var(--bg-pastel), var(--bg-pastel));
    background-size: 100% var(--spacing-huge);
    background-repeat: no-repeat;
    background-position: 0 0;
  }

  .service-excerpt--secondary {
    background-color: var(--bg-pastel);
    background-image: linear-gradient(var(--white), var(--white));
  }

  .service-excerpt__image {
    max-width: 230px;
    margin-right: auto;
    margin-left: auto;
    padding: var(--spacing-small);
  }

  .service-excerpt__image > * {
    display: block;
    width: 100%;
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

  @media (min-width: 720px) {
    .service-excerpt--primary {
      display: flex;
      align-items: center;
      background-size: 20% 100%;
      background-position: 0 0;
    }

    .service-excerpt--is-flipped {
      background-position: 100% 0;
    }

    .service-excerpt--is-flipped .service-excerpt__image {
      order: 2;
    }

    .service-excerpt--primary .service-excerpt__image {
      width: calc(40% - var(--spacing-big));
      max-width: none;
    }

    .service-excerpt--primary .service-excerpt__image > * {
      max-width: 330px;
    }

    .service-excerpt--primary .service-excerpt__content {
      flex-basis: 60%;
      flex-grow: 2;
      align-self: stretch;
      margin-top: 0;
      margin-left: var(--spacing-big);
    }

    .service-excerpt--is-flipped .service-excerpt__content {
      order: 1;
      margin-right: var(--spacing-big);
      margin-left: 0;
    }

    .service-excerpt--primary .service-excerpt__body {
      max-width: 600px;
    }

    .service-excerpt--primary .service-excerpt__title,
    .service-excerpt--primary .service-excerpt__actions {
      text-align: left;
    }

    .service-excerpt--primary .service-excerpt__actions {
      margin-top: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .service-excerpt--primary .service-excerpt__content {
      padding-top: var(--spacing-medium);
      padding-right: var(--spacing-medium);
      padding-bottom: var(--spacing-medium);
    }

    .service-excerpt--is-flipped .service-excerpt__content {
      padding-right: 0;
      padding-left: var(--spacing-medium);
    }

    .service-excerpt--secondary {
      display: flex;
      align-items: center;
      background-size: 25% 100%;
      background-position: 0 0;
    }

    .service-excerpt--secondary .service-excerpt__image {
      width: calc(50% - var(--spacing-large));
      max-width: none;
    }

    .service-excerpt--secondary .service-excerpt__content {
      width: 50%;
      align-self: stretch;
      margin-top: 0;
      margin-left: var(--spacing-large);
      display: flex;
      flex-direction: column;
    }

    .service-excerpt--secondary .service-excerpt__body {
      flex-grow: 2;
    }

    .service-excerpt__title,
    .service-excerpt__actions {
      text-align: left;
    }
  }
</style>
