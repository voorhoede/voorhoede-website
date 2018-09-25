<template>
  <div class="job-excerpt">
    <div class="job-excerpt__image">
      <img class="job-excerpt__image-item" :src="image.url" :alt="image.alt">
    </div>
    <div class="job-excerpt__text">
      <h3 class="job-excerpt__text-title body-detail font-html-blue font-bold">{{ title }}</h3>
      <p class="job-excerpt__text-description body-detail">{{ description }}</p>
    </div>
    <app-button
      class="job-excerpt__button"
      external
      small
      :label="label"
      :to="link"
    />
  </div>
</template>

<script>
  import { AppImage, AppButton, } from '../../components'

  export default {
    components: { AppImage, AppButton, },
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      image: {
        type: Object,
        required: true,
        validator(image) {
          const isValidImageText = (image.alt === undefined) ? true : typeof image.alt === 'string'

          return typeof(image.url) === 'string' && isValidImageText
        },
      },
      label: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  :root {
    --job-excerpt-animation-timing: .15s;
    --job-excerpt-image-width: 65px;
    --job-excerpt-image-height: 90px;
    --job-excerpt-transform: translateY(25px);
  }

  .job-excerpt {
    position: relative;
    display: grid;
    grid-template-columns: var(--job-excerpt-image-width) var(--spacing-large) 1fr;
    grid-row-gap: var(--spacing-small);
    padding: var(--spacing-small) 0;
  }

  .job-excerpt__image {
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .job-excerpt__image-item {
    width: var(--job-excerpt-image-width);
    height: var(--job-excerpt-image-height);
    object-fit: contain;
  }

  .job-excerpt__text {
    align-self: flex-end;
    text-align: center;
    grid-column: 3;
  }

  .job-excerpt__text-description {
    display: none;
  }

  .job-excerpt__text-title {
    text-transform: uppercase;
    letter-spacing: 2.5px;
    margin-bottom: var(--spacing-tiny);
  }

  .job-excerpt__button {
    grid-column: 3;
    align-self: flex-start;
    justify-self: start;
    margin: 0 auto;
  }

  .job-excerpt .app-button--small:hover,
  .app-button--small:focus,
  .app-button--small--hover {
    transform: none;
  }

  .job-excerpt .app-button::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  @media (min-width: 720px) {
    .job-excerpt {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
    }

    .job-excerpt:hover .job-excerpt__text-title,
    .job-excerpt:hover .job-excerpt__text-description,
    .job-excerpt:focus-within .job-excerpt__text-title,
    .job-excerpt:focus-within .job-excerpt__text-description {
      opacity: 1;
      transform: translateY(0);
    }

    .job-excerpt:hover .job-excerpt__button,
    .job-excerpt:hover .job-excerpt__image,
    .job-excerpt:focus-within .job-excerpt__button,
    .job-excerpt:focus-within .job-excerpt__image {
      opacity: 1;
    }

    .job-excerpt__text {
      align-self: center;
      text-align: left;
      max-width: 50%;
    }

    .job-excerpt__text-title {
      transform: var(--job-excerpt-transform);
      transition: transform var(--job-excerpt-animation-timing) ease-out;
    }

    .job-excerpt__text-description {
      display: block;
      opacity: 0;
      transform: var(--job-excerpt-transform);
      transition: all var(--job-excerpt-animation-timing) ease-out;
    }

    .job-excerpt__image {
      opacity: .3;
      transition: opacity var(--job-excerpt-animation-timing) ease-out;
    }

    .job-excerpt__button {
      align-self: center;
      opacity: .3;
      margin: 0;
    }
  }

</style>
