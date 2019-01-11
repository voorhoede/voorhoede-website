<template>
  <section class="layout-error">
    <page-header
      v-if="layoutData.error"
      :title="layoutData.error.title"
      :text="String(layoutData.error.errorCode)"
      :image="layoutData.error.headerImage"
    />
    <div class="layout-error__backdrop grid" v-if="layoutData.error">
      <div class="layout-error__content body">
        {{ layoutData.error.body }}
      </div>
    </div>
  </section>
</template>

<script>
import getData from '../lib/get-data'
import PageHeader from '../components/page-header'

export default {
  components: { PageHeader },
  props: {
    error: {
      type: [Object, Error],
      required: true,
      validator(error) {
        return typeof(error.statusCode) === 'number'
      }
    },
  },
  async asyncData() {
    return {
      layout: await getData(`${this.$i18n.locale}/layouts/error/${this.error.statusCode}`)
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>


<style>
  @import '../components/app-core/variables.css';

  .layout-error__backdrop {
    padding-bottom: var(--spacing-large);
    background-color: white;
  }

  .layout-error__content {
    padding: var(--spacing-large) 0;
    display: flex;
    flex-direction: column-reverse;
    background-color: white;
  }

  @media screen and (min-width: 720px) {
    .layout-error__backdrop {
      padding-bottom: var(--spacing-big);
      background-color: var(--bg-pastel);
    }

    .layout-error__content {
      flex-direction: row;
      background-color: var(--white);
      padding: var(--spacing-large);
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1100px) {
    .layout-error__content {
      grid-column: var(--grid-content-narrow);
      padding: var(--spacing-larger);
    }
  }
</style>
