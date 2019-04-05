<template>
  <section class="layout-error">
    <page-header
      v-if="layout[$i18n.locale]"
      :title="layout[$i18n.locale].title"
      :text="String(layout[$i18n.locale].errorCode)"
      :image="layout[$i18n.locale].headerImage"
    />
    <div class="layout-error__backdrop grid" v-if="layout[$i18n.locale]">
      <div class="layout-error__content body">
        {{ layout[$i18n.locale].body }}
      </div>
    </div>
  </section>
</template>

<script>
  import PageHeader from '../components/page-header'
  import layoutEn from '~/static/data/en/layouts/error/404/index.json'
  import layoutNl from '~/static/data/nl/layouts/error/404/index.json'

  const DEFAULT_STATUSCODE = 404
  export default {
    components: { PageHeader },
    props: {
      error: {
        type: [Object, Error],
        required: false,
        validator(error) {
          return typeof(error.statusCode) === 'number'
        },
        default: () => ({
          statusCode: DEFAULT_STATUSCODE,
        })
      },
    },
    data() {
      return {
        layout: {
          en: layoutEn,
          nl: layoutNl,
        }
      }
    },
    head () {
      return {
        title: `${this.error ? this.error.statusCode : DEFAULT_STATUSCODE} | De Voorhoede`
      }
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
