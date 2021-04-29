<template>
  <nav class="breadcrumbs-block">
    <ul
      class="breadcrumbs-block__nav-list"
      :class="{ 'breadcrumbs-block__nav-list--has-back-and-next-link': hasBackAndNextLink }"
    >
      <li
        v-if="hasBackLink"
        class="breadcrumbs-block__item"
      >
        <nuxt-link
          class="breadcrumbs-block__link app-button app-button--secondary body"
          :to="backLink"
          secondary
        >&larr; {{ backLinkLabel }}</nuxt-link>
      </li>
      <li
        v-if="hasNextLink"
        class="breadcrumbs-block__item breadcrumbs-block__item--next"
      >
        <nuxt-link
          class="breadcrumbs-block__link app-button app-button--secondary body"
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
    computed: {
      hasBackLink() {
        return this.backLink && this.backLinkLabel
      },
      hasNextLink() {
        return this.nextLink && this.nextLinkLabel
      },
      hasBackAndNextLink() {
        return this.hasBackLink && this.hasNextLink
      }
    }
  }
</script>

<style>
  .breadcrumbs-block__nav-list {
    display: flex;
    flex-wrap: wrap;
    border-top: 2px solid var(--very-dim);
  }

  .breadcrumbs-block__nav-list--has-back-and-next-link {
    justify-content: space-between;
  }

  .breadcrumbs-block__item {
    flex: 1 1 auto;
    margin-top: var(--spacing-small);
    text-align: left;
  }

  .breadcrumbs-block__item--next {
    margin-left: var(--spacing-medium);
    text-align: right;
  }

  .breadcrumbs-block__link {
    text-align: inherit;
  }
</style>
