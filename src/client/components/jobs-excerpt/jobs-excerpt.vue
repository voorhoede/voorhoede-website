<template>
  <div class="job-excerpt">
    <div class="job-excerpt__image">
      <img class="job-excerpt__image-item" :src="image.url" :alt="image.alt">
    </div>
    <div class="job-excerpt__text">
      <h3 class="job-excerpt__text-title body-detail">{{ title }}</h3>
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
          return typeof(image.url) === 'string' && typeof(image.alt) === 'string'
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
    --job-excerpt-transform: translateY(30px);
  }

  .job-excerpt {
    text-align: center;
    padding: var(--spacing-small) 0;
  }

  .job-excerpt__image {
    display: none;
  }

  .job-excerpt__text {
    margin-bottom: var(--spacing-small);
  }

  .job-excerpt__text-title {
    text-transform: uppercase;
    color: var(--html-blue);
    font-weight: bold;
    letter-spacing: 2.5px;
    margin-bottom: var(--spacing-tiny);
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
      max-width: 50%;
    }

    .job-excerpt__text-title {
      transform: var(--job-excerpt-transform);
      transition: transform var(--job-excerpt-animation-timing) ease-out;
    }

    .job-excerpt__text-description {
      opacity: 0;
      transform: var(--job-excerpt-transform);
      transition: all var(--job-excerpt-animation-timing) ease-out;
    }

    .job-excerpt__image {
      opacity: .3;
      display: block;
      transition: opacity var(--job-excerpt-animation-timing) ease-out;
    }

    .job-excerpt__image-item {
      width: var(--job-excerpt-image-width);
      height: var(--job-excerpt-image-height);
      object-fit: contain;
    }

    .job-excerpt__button {
      opacity: .3;
    }
  }

</style>
