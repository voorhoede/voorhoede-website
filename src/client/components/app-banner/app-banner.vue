<template>
  <div class="app-banner grid">
    <div class="app-banner__content">
      <div class="body-petite" v-html="text"></div>
      <AppButton
        small
        :label="linkTitle"
        :to="localeUrl({ name: 'updates-slug', params: { ...link } })"
      />
    </div>
  </div>
</template>

<script>
  import AppButton from '../app-button/app-button'

  export default {
    components: { AppButton },
    props: {
      link: {
        type: Object,
        required: true,
      },
      linkTitle: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  .app-banner {
    padding: var(--spacing-small) 0;
    background-color: orangered;
    color: var(--white);
  }

  .app-banner__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
  }

  .app-banner__content .body-petite a {
    text-decoration: underline;
  }

  .app-banner .app-button--small {
    margin-top: var(--spacing-tiny);
    background: var(--white);
    color: orangered;
    white-space: nowrap;
  }

  @media screen and (min-width: 720px) {
    .app-banner__content {
      flex-direction: row;
      align-items: center;
    }

    .app-banner .app-button--small {
      margin-top: 0;
      margin-left: var(--spacing-small);
    }
  }
</style>
