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
  </header>
</template>

<script>
export default {
  props: {
    seoTitle: {
      type: String,
      default: null,
    },
    brick: {
      type: Boolean,
      default: false,
    },
    curlyBracket: {
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
  padding-top: var(--app-header-height);
  background: var(--bg-pastel);
}

.page-header__brick {
  display: none;
}

.page-header__image img {
  max-width: 100%;
  max-height: 100%;
}

@supports (display: grid) {
  .page-header {
    padding-top: 0;
    grid-template-rows: var(--app-header-height) 1fr var(--spacing-large) calc(50vh - var(--spacing-large) - var(--spacing-larger)) var(--spacing-larger);
    position: relative;
  }

  .page-header__text {
    display: flex;
    flex-direction: column;
    margin: var(--spacing-medium) 0;
    grid-column: content;
    grid-row-start: 2;
  }

  .page-header__title {
    margin-top: var(--spacing-large);
    order: 2;
  }

  .page-header__sub-title {
    order: 1;
  }

  .page-header__brick {
    display: block;
    background: var(--brand-yellow);
    grid-column: page;
    grid-row-start: 3;
    grid-row-end: 6;
  }

  .page-header__image {
    grid-column-start: 2;
    grid-column-end: 19;
    grid-row-start: 4;
    grid-row-end: 5;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media screen and (min-width: 520px) {
    .page-header__image {
      grid-column: content;
      grid-column-start: 4;
      grid-column-end: 16;
      justify-content: center;
    }
  }

  @media screen and (min-width: 720px) {
    .page-header {
      grid-template-rows: calc(var(--app-header-height) + var(--spacing-big)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      margin: var(--spacing-medium) 0;
      grid-column: content;
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: 12;
    }

    .page-header__brick {
      height: 100%;
      grid-column: page-right;
      grid-row-start: 1;
      grid-row-end: -1;
    }

    .page-header__image {
      grid-column-start: 13;
      grid-column-end: 33;
      grid-row-start: 2;
      grid-row-end: 3;
      justify-content: flex-end;
    }
  }

  @media screen and (min-width: 1100px) {
    .page-header {
      grid-template-rows: calc(var(--app-header-height) + var(--spacing-larger)) 1fr var(--spacing-tiny) calc(var(--spacing-larger) - var(--spacing-tiny));
    }

    .page-header__text {
      grid-column-start: 4;
      grid-column-end: 21;
    }
    
    .page-header__image {
      grid-column-start: 22;
      grid-column-end: 49;
    }
  }
}
</style>
