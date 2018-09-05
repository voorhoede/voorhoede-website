<template>
  <header class="page-header grid" :class="{ 'page-header--brick' : hasBrick }">
    <div class="page-header__description">
      <h1 class="page-header__title" :class="hasBrick ? 'hero' : 'h1'">{{ title }}</h1>
      <span class="page-header__subtitle sub-title">{{ subTitle }}</span>
    </div>
    <div class="page-header__image">
      <img :src="image.url" :alt="image.alt">
    </div>
  </header>
</template>

<script>
  import { ScrollTo } from '../../components'

  export default {
    components: {
      ScrollTo,
    },
    props: {
      image: {
        type: Object,
        required: true,
        validator(image) {
          return typeof(image.url) === 'string' && typeof(image.alt) === 'string'
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
  .page-header {
    grid-column: page;
    background-color: var(--bg-pastel);
  }

  .page-header__description {
    display: flex;
    flex-direction: column;
    grid-column: content;
    padding-top: calc(var(--app-header-height) + var(--spacing-medium));
    padding-bottom: var(--spacing-large);
  }

  .page-header__title {
    order: 2;
  }

  .page-header__subtitle {
    order: 1;
    margin-bottom: var(--spacing-smaller);
  }

  .page-header__image {
    position: relative;
    display: none;
  }

  .page-header__image img {
    width: 100%;
    max-height: 70%;
    object-fit: contain;
  }

  .page-header--brick {
    grid-column: page;
    background-image: linear-gradient(
      to bottom,
      var(--bg-pastel),
      var(--bg-pastel) 25vh,
      var(--brand-yellow) 25vh,
      var(--brand-yellow) 90vh
    );
  }

  .page-header--brick .container {
    flex-direction: column;
  }

  .page-header--brick .page-header__image {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: var(--spacing-medium);
    max-width: 100%;
    height: 40vh;
  }

  @media screen and (min-width: 520px) {
    .page-header__image {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: var(--spacing-large);
    }
  }

  @media screen and (min-width: 720px) {
    .container {
      flex-direction: row;
    }

    .page-header--brick {
      height: 76.5vh;
      background-image: linear-gradient(
        to right,
        var(--bg-pastel),
        var(--bg-pastel) 50%,
        var(--brand-yellow) 50%,
        var(--brand-yellow) 100%
      );
    }

    .page-header__image {
      grid-column: content-right;
      top: var(--spacing-larger);
    }

    .page-header--brick .page-header__image {
      align-self: flex-end;
      justify-content: flex-end;
      margin-top: auto;
      padding-bottom: var(--spacing-large);
      top: 0;
    }

    .page-header__description {
      grid-column: content-left;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header--brick .container {
      flex-direction: row;
    }

    .page-header--brick .page-header__image img {
      max-height: 100%;
    }
  }
</style>
