<template>
  <h1>
    {{ page.social.title }}
  </h1>
</template>

<script>
  import head from '~/lib/seo-head'
  import translations from '~/components/easter-egg/game-translations'

  export default {
    data() {
      return {
        page: {
          social: {
            title: translations.title[this.$i18n.locale],
            description: translations.description[this.$i18n.locale],
            image: {
              url: translations.images[this.$i18n.locale],
            },
          },
        },
      }
    },
    head,
  }
</script>

<style></style>
