<template>
  <div class="job-excerpt">
    <div class="job-excerpt__image">
      <img v-if="image" class="job-excerpt__image-item" :src="image.url" alt="">
    </div>
    <div class="job-excerpt__text">
      <h3 class="job-excerpt__text-title h5">{{ title }}</h3>
      <p class="job-excerpt__text-description body-detail">{{ description }}</p>
    </div>
    <app-button class="job-excerpt__button" :label="label" :to="{ name: 'locale-jobs-slug', params: { locale: currentLocale, slug } }"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
      slug: {
        type: String,
        required: true,
      },
      image: {
        type: Object,
        required: true,
        validator(image) {
          return image && typeof(image.url) === 'string'
        },
      },
      label: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(['currentLocale'])
    }
  }
</script>

<style>
  :root {
    --job-excerpt-easing: .25s cubic-bezier(.5, 0, .25, 1);
  }

  .job-excerpt {
    position: relative;
    display: grid;
    grid-template-columns: 65px 1fr;
    grid-gap: var(--spacing-smaller);
    padding: var(--spacing-small) 0;
  }

  .job-excerpt__image {
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .job-excerpt__image-item {
    display: block;
    width: 65px;
    height: 85px;
    object-fit: contain;
  }

  .job-excerpt__text,
  .job-excerpt__button {
    grid-column: 2;
  }

  .job-excerpt__text {
    align-self: flex-end;
    text-align: center;
  }

  .job-excerpt__text-description {
    display: none;
  }

  .job-excerpt__button {
    min-width: auto;
    width: auto;
    align-self: flex-end;
    margin: 0 auto;
  }

  .job-excerpt .app-button--primary:hover,
  .app-button--primary:focus,
  .app-button--primary--hover {
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
      align-items: center;
      grid-template-columns: 70px 1fr 140px;
      grid-gap: var(--spacing-large);
    }

    .job-excerpt__image {
      grid-row: 1;
      opacity: .3;
    }

    .job-excerpt__image-item {
      width: 70px;
      height: 90px;
    }

    .job-excerpt__button {
      grid-column: 3;
      align-self: center;
      margin: 0;
      opacity: .3;
    }

    .job-excerpt__text {
      grid-column: 2;
      align-self: center;
      text-align: left;
      overflow: hidden;
    }

    .job-excerpt__text-title,
    .job-excerpt__text-description {
      transform: translateY(34px);
    }

    .job-excerpt__text-title {
      transition: transform var(--job-excerpt-easing);
    }

    .job-excerpt__text-description {
      display: block;
      opacity: 0;
      transition: all var(--job-excerpt-easing);
      margin-top: var(--spacing-tiny);
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
  }

  @media (min-width: 1100px) {
    .job-excerpt {
      grid-template-columns: 70px 1fr 160px;
      grid-gap: var(--spacing-big);
    }

    .job-excerpt__text-title,
    .job-excerpt__text-description {
      transform: translateY(26px);
    }
  }

</style>
