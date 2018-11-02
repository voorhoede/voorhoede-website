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
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(['layoutData'])
  }
}
</script>


<style>
  .layout-error__backdrop {
    padding-bottom: var(--spacing-large);
    background-color: white;
  }

  .layout-error__content {
    padding: var(--spacing-large) 0;
    display: flex;
    flex-direction: column-reverse;
    background-color: white;
    grid-column-start: 2;
    grid-column-end: -2;
  }

  @media screen and (min-width: 720px) {
    .layout-error__backdrop {
      padding-bottom: var(--spacing-big);
      background-color: var(--bg-pastel);
    }

    .layout-error__content {
      flex-direction: row;
      grid-column-start: 2;
      grid-column-end: -2;
      background-color: var(--white);
      padding: var(--spacing-large) var(--spacing-large);
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 1100px) {
    .layout-error__content {
      grid-column-start: 6;
      grid-column-end: -6;
      padding: var(--spacing-larger) var(--spacing-larger);
    }
  }
</style>
