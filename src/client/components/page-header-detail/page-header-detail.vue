<template>
  <header class="page-header grid">
    <div v-if="brick" class="page-header__brick"/>
    <div v-if="hasImage" class="page-header__image">
      <slot name="image"/>
    </div>
    <div class="page-header__text">
      <h1 class="page-header__title hero">{{ title }}</h1>
      <h2 class="page-header__sub-title sub-title">{{ subTitle }}</h2>
    </div>
    <scroll-to class="page-header__scroll-to"/>
  </header>
</template>

<script>
  import { ScrollTo } from '~/components'

  export default {
    components: {
      ScrollTo,
    },
    props: {
      seoTitle: {
        type: String,
        default: null,
      },
      brick: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        required: true
      },
      subTitle: {
        type: String,
        required: true
      }
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
    position: relative;
    grid-template-rows: var(--app-header-height) 1fr var(--spacing-large) 1fr var(--spacing-tiny);
    padding-top: 0;
    background: var(--bg-pastel);
  }

  .page-header__text {
    display: flex;
    flex-direction: column;
    grid-column: content;
    grid-row-start: 2;
    margin: var(--spacing-medium) 0;
  }

  .page-header__title {
    margin-top: var(--spacing-smaller);
    order: 2;
  }

  .page-header__sub-title {
    order: 1;
  }

  .page-header__brick {
    background-color: var(--brand-yellow);
    grid-column: page;
    grid-row-start: 3;
    grid-row-end: 6;
  }

  .page-header__image {
    grid-column-start: 8;
    grid-column-end: 19;
    grid-row-start: 4;
    grid-row-end: 5;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .page-header__image img {
    max-width: 100%;
    max-height: 100%;
  }

  .page-header__scroll-to.scroll-to {
    position: absolute;
    grid-row-start: 5;
  }

  @media screen and (min-width: 520px) {
    .page-header__image {
      grid-column: content;
      justify-content: center;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header {
      grid-template-rows: var(--app-header-height) 1fr .3fr .3fr 1fr calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      grid-column: page-left;
      grid-column-start: 4;
      grid-column-end: 16;
      grid-row-end: 4;
    }

    .page-header__brick {
      grid-column: page-right;
      grid-row-start: 1;
      grid-row-end: -1;
    }

    .page-header__image {
      grid-column: page-right;
      grid-column-end: 49;
      grid-row-start: 4;
      grid-row-end: 6;
      justify-content: flex-end;
    }

    .page-header__scroll-to.scroll-to {
      position: absolute;
      bottom: -160px; /* magic number to positon scroll with case-meta text */
      grid-row-start: 7;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header {
      grid-template-rows: var(--app-header-height) 1fr .6fr var(--spacing-large);
    }

    .page-header__text {
      grid-column-end: 21;
      grid-row-end: 3;
    }

    .page-header__image {
      grid-row-start: 3;
      grid-row-end: 4;
    }

    .page-header__scroll-to.scroll-to {
      bottom: -163px;
    }
  }
</style>
