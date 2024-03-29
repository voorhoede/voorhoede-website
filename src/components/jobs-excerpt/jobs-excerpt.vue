<template>
  <div class="job-excerpt">
    <div class="job-excerpt__image">
      <dato-image
        v-if="image"
        class="job-excerpt__image-item"
        :src="image.url"
        alt=""
        :width="image.width"
        :height="image.height"
        loading="eager"
      />
    </div>

    <div class="job-excerpt__text">
      <h3
        v-if="isNested"
        class="job-excerpt__text-title h4"
      >
        {{ title }}
      </h3>
      <h2
        v-else
        class="job-excerpt__text-title h4"
      >
        {{ title }}
      </h2>
    </div>

    <app-button
      class="job-excerpt__button"
      :aria-label="title"
      :label="$t('view_details')"
      :to="$localeUrl({ name: 'jobs-slug', params: { slug } })"
    />
  </div>
</template>

<script>
  export default {
    props: {
      isNested: {
        type: Boolean,
        default: false,
      },
      title: {
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
      }
    },
  }
</script>

<style>
  :root {
    --job-excerpt-easing: .25s cubic-bezier(.5, 0, .25, 1);
  }

  .job-excerpt {
    position: relative;
    display: grid;
    grid-template-columns: 85px 1fr;
    grid-column-gap: var(--spacing-smaller);
    padding: var(--spacing-medium) 0;
  }

  .job-excerpt__image {
    display: flex;
    align-items: center;
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
    grid-row: 1;
    align-self: flex-end;
    text-align: center;
  }

  .job-excerpt__button {
    grid-row: 2;
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
      grid-template-columns: 90px 1fr 140px;
      grid-column-gap: var(--spacing-large);
    }

    .job-excerpt > * {
      align-self: center;
    }

    .job-excerpt__image {
      grid-row: 1;
    }

    .job-excerpt__image-item {
      width: 70px;
      height: 90px;
    }

    .job-excerpt__button {
      grid-row: 1;
      grid-column: 3;
      align-self: center;
    }

    .job-excerpt__text {
      grid-column: 2;
      align-self: center;
      text-align: left;
    }
  }

  @media (min-width: 1100px) {
    .job-excerpt {
      grid-template-columns: 90px 1fr 160px;
      grid-column-gap: var(--spacing-big);
    }
  }

</style>
