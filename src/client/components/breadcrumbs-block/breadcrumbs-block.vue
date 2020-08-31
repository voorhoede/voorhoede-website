<template>
  <nav class="breadcrumbs-block">
    <ul class="breadcrumbs-block__nav-list">
      <li
        v-if="backLink && backLinkLabel"
        class="breadcrumbs-block__item"
      >
        <nuxt-link
          class="breadcrumbs-block__link app-button app-button--secondary body font-bold"
          :to="backLink"
          secondary
        >&larr; {{ backLinkLabel }}</nuxt-link>
      </li>
      <li
        v-if="nextLink && nextLinkLabel"
        class="breadcrumbs-block__item breadcrumbs-block__item--next"
      >
        <nuxt-link
          class="breadcrumbs-block__link app-button app-button--secondary body font-bold"
          :to="nextLink"
          secondary
        >{{ nextLinkLabel }} &rarr;</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>

  export default {
    props: {
      backLink: {
        type: [Object, String],
        default: null,
      },
      backLinkLabel: {
        type: String,
        default: null,
      },
      nextLink: {
        type: [Object, String],
        default: null,
      },
      nextLinkLabel: {
        type: String,
        default: null,
      },
    },
  }
</script>

<style>
  .breadcrumbs-block__nav-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-bigger);
    padding-top: var(--spacing-small);
    border-top: 2px solid var(--very-dim);
  }

  .breadcrumbs-block__item {
    max-width: calc(50% - 20px);
    text-align: left;
  }

  .breadcrumbs-block__item--next {
    text-align: right;
  }

  .breadcrumbs-block__link {
    text-align: inherit;
  }
</style>
