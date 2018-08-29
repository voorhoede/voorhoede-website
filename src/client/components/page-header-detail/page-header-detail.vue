<template>
  <header class="page-header grid" :class="{ 'page-header--brick' : brick }">
    <div class="container">
      <div class="page-header__text">
        <h1 class="page-header__title" :class="brick ? 'hero' : 'h1'">{{ title }}</h1>
        <h2 class="page-header__subtitle sub-title">{{ subTitle }}</h2>
      </div>

      <div v-if="hasImage" class="page-header__image">
        <slot name="image"/>
      </div>
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
        required: true
      },
      subTitle: {
        type: String,
        required: true
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

<style>
  .page-header {
    grid-column: page;
    background-color: var(--bg-pastel);
  }

  .page-header--brick {
    grid-column: page;
    background-image: linear-gradient(
      to bottom,
      var(--bg-pastel),
      var(--bg-pastel) 50%,
      var(--brand-yellow) 50%,
      var(--brand-yellow) 100%
    );
  }

  .container {
    grid-column: content;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .page-header__text {
    display: flex;
    flex-direction: column;
    padding-top: calc(var(--app-header-height) + var(--spacing-medium));
    padding-bottom: var(--spacing-large);
  }

  .page-header__title {
    order: 2;
    max-width: 70%;
  }

  .page-header__subtitle {
    order: 1;
    margin-bottom: var(--spacing-smaller);
  }

  .page-header__image {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: var(--spacing-medium);
    height: 40vh;
  }

  .page-header__image img {
    max-height: 60%;
  }

  .page-header__scroll-to.scroll-to {
    position: absolute;
    bottom: -58px;
  }

  @media screen and (min-width: 520px) {
    .page-header__image {
      justify-content: center;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header {
      height: 76.5vh;
    }

    .page-header--brick {
      background-image: linear-gradient(
        to right,
        var(--bg-pastel),
        var(--bg-pastel) 50%,
        var(--brand-yellow) 50%,
        var(--brand-yellow) 100%
      );
    }

    .container {
      flex-direction: row;
    }

    .page-header__text {
      width: 50%;
    }

    .page-header__image {
      justify-content: flex-end;
      padding-bottom: var(--spacing-large);
      width: 50%;
      height: 100%;
    }

    .page-header__scroll-to.scroll-to {
      bottom: -158px;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header__scroll-to.scroll-to {
      bottom: -163px;
    }
  }
</style>
