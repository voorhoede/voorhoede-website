<template>
  <section class="error-page">
    <page-header
      v-if="content"
      heading="byline"
      :byline="content.title"
      :headline="String(content.errorCode)"
      :image="content.headerImage"
    />
    <div class="error-page__backdrop grid" v-if="content">
      <div class="error-page__content body">
        {{ content.body }}
      </div>
    </div>
  </section>
</template>

<script>
  import contentEn from '~/static/data/layouts/en/error/404/index.json'
  import contentNl from '~/static/data/layouts/nl/error/404/index.json'

  export default {
    computed: {
      content() {
        const contentMap = {
          en: contentEn,
          nl: contentNl,
        }

        return contentMap[this.$i18n.locale]
      }
    }
  }
</script>

<style>
  .error-page__backdrop {
    padding-bottom: var(--spacing-large);
    background-color: var(--white);
  }

  .error-page__content {
    padding: var(--spacing-large) 0;
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--white);
  }

  @media screen and (min-width: 720px) {
    .error-page__backdrop {
      padding-bottom: var(--spacing-big);
      background-color: var(--bg-pastel);
    }

    .error-page__content {
      flex-direction: row;
      background-color: var(--white);
      padding: var(--spacing-large);
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1100px) {
    .error-page__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger);
    }
  }
</style>
