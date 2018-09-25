<template>
  <header class="page-header-detail grid" :class="{ 'page-header-detail--brick' : hasBrick }">
    <div class="page-header-detail__container">
      <div class="page-header-detail__description">
        <h1 class="page-header-detail__title" :class="hasBrick ? 'hero' : 'h1'">{{ title }}</h1>
        <p class="page-header-detail__subtitle sub-title">{{ subTitle }}</p>
      </div>
      <div class="page-header-detail__image">
        <img :src="image.url" :alt="image.alt">
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    props: {
      image: {
        type: Object,
        required: true,
        validator(image) {
          const isValidImageText = (image.alt === undefined) ? true : typeof image.alt === 'string'

          return typeof(image.url) === 'string' && isValidImageText
        },
      },
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
        required: true,
      },
      hasBrick: {
        type: Boolean,
        default: false,
      },
    }
  }
</script>

<style>
  .page-header-detail {
    background-color: var(--bg-pastel);
  }

  .page-header-detail__container {
    display: flex;
    flex-direction: column;
  }

  .page-header-detail__description {
    display: flex;
    flex-direction: column;
    padding-top: calc(var(--app-header-height) + var(--spacing-medium));
    padding-bottom: var(--spacing-large);
  }

  .page-header-detail__title {
    order: 2;
  }

  .page-header-detail__subtitle {
    order: 1;
    margin-bottom: var(--spacing-smaller);
  }

  .page-header-detail__image {
    display: none;
  }

  .page-header-detail__image img {
    width: 100%;
    max-height: 70%;
    object-fit: contain;
  }

  .page-header-detail--brick {
    background-image: linear-gradient(
      to bottom,
      var(--bg-pastel),
      var(--bg-pastel) 50%,
      var(--brand-yellow) 50%,
      var(--brand-yellow) 90vh
    );
  }

  .page-header-detail--brick .container {
    flex-direction: column;
  }

  .page-header-detail--brick .page-header-detail__image {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: var(--spacing-medium);
    max-width: 100%;
    height: 40vh;
  }

  .page-header-detail__scroll-container {
    position: absolute;
    bottom: 0;
  }

  @media screen and (min-width: 720px) {
    .container {
      flex-direction: row;
    }

    .page-header-detail--brick {
      height: 76.5vh;
      background-image: linear-gradient(
        to right,
        var(--bg-pastel),
        var(--bg-pastel) 50%,
        var(--brand-yellow) 50%,
        var(--brand-yellow) 100%
      );
    }

    .page-header-detail__image {
      display: flex;
      position: relative;
      top: var(--spacing-larger);
      justify-content: flex-end;
      align-items: flex-end;
      width: 50%;
      padding-bottom: var(--spacing-large);
    }

    .page-header-detail--brick .page-header-detail__image {
      margin-top: auto;
      padding-bottom: var(--spacing-large);
      top: 0;
    }

    .page-header-detail__description {
      width: 50%;
    }

    .page-header-detail__container {
      flex-direction: row;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header-detail--brick .container {
      flex-direction: row;
    }

    .page-header-detail__container {
      grid-column-start: 4;
    }

    .page-header-detail--brick .page-header-detail__image img {
      max-height: 100%;
    }
  }
</style>
