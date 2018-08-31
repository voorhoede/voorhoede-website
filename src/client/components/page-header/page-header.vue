<template>
  <header class="page-header grid" :class="{ 'page-header--brick' : brick }">
    <div class="page-header__container">
      <div class="page-header__text">
        <h1 class="page-header__title" :class="brick ? 'hero' : 'h1'">{{ detailPage ? title : subTitle }}</h1>
        <h2 class="page-header__subtitle sub-title">{{ detailPage ? subTitle : title }}</h2>
      </div>

      <div v-if="hasImage" class="page-header__image">
        <slot name="image"/>
      </div>
    </div>
    <div class="page-header__scroll-container">
      <scroll-to v-if="brick" class="page-header__scroll-to"/>
    </div>
  </header>
</template>

<script>
  import { ScrollTo } from '~/components'

  export default {
    components: {
      ScrollTo,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
        required: true,
      },
      detailPage: {
        type: Boolean,
        required: true,
        default: false,
      },
      seoTitle: {
        type: String,
        default: null,
      },
      brick: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      hasImage() {
        return 'image' in this.$slots
      },
    },
  }
</script>

<style scoped>
  .page-header {
    grid-column: page;
    background-color: var(--bg-pastel);
  }

  .page-header__container {
    grid-column: content;
    display: flex;
    position: relative;
    justify-content: space-between;
    padding-top: calc(var(--app-header-height) + var(--spacing-medium));
  }

  .page-header__text {
    display: flex;
    flex-direction: column;
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
    display: none;
  }

  .page-header__image img {
    max-width: 100%;
  }

  .page-header--brick {
    grid-column: page;
    background-image: linear-gradient(
      to bottom,
      var(--bg-pastel),
      var(--bg-pastel) 50vh,
      var(--brand-yellow) 50vh
    );
    height: 90vh;
  }

  .page-header--brick .page-header__container {
    flex-direction: column;
    padding-bottom: 0;
  }

  .page-header--brick .page-header__image {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: var(--spacing-medium);
    max-width: 100%;
    height: 40vh;
  }

  .page-header__scroll-to.scroll-to {
    position: absolute;
    top: 89vh;
  }

  @media screen and (min-width: 420px) {
    .page-header--brick .page-header__image img {
      height: 100%;
    }
  }

  @media screen and (min-width: 520px) {
    .page-header__image {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: var(--spacing-large);
      width: 50%;
    }

    .page-header--brick .page-header__image {
      justify-content: center;
      width: 100%;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header__container {
      flex-direction: row;
    }

    .page-header__text {
      width: 45%;
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

    .page-header--brick .page-header__image {
      align-self: flex-end;
      justify-content: flex-end;
      margin-top: auto;
      padding-bottom: var(--spacing-large);
    }

    .page-header--brick .page-header__title {
      padding-bottom: 0;
    }

    .page-header__image {
      width: 30%;
    }

    .page-header--brick .page-header__image img {
      max-height: 100%;
    }

    .page-header__image img {
      max-height: 200px;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header--brick .page-header__container {
      flex-direction: row;
    }

    .page-header__container {
      grid-column-start: 4;
      padding-top: calc(var(--app-header-height) + var(--spacing-larger));
    }

    .page-header__scroll-container {
      grid-column-start: 2;
    }

    .page-header__image img {
      max-height: 260px;
    }
  }

  @media screen and (min-width: 1400px) {
    .page-header--brick .page-header__image {
      height: auto;
    }
  }
</style>
