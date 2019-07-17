<template>
  <section class="offline-page">
    <page-header
      heading="headline"
      :headline="content.subtitle"
      :byline="content.title"
    />
  </section>
</template>

<script>
  import PageHeader from '~/components/page-header'

  const content = {
    en: {
      title: 'Oops!',
      subtitle: 'Either our server is down, or you don\'t have internet connection...'
    },
    nl: {
      title: 'Oeps!',
      subtitle: 'Of onze server is down, of jij hebt geen internet verbinding...'
    },
  }

  export default {
    components: { PageHeader },
    computed: {
      content() {
        return content[this.$i18n.locale]
      }
    },
    head() {
      return {
        title: 'Offline | De Voorhoede'
      }
    }
  }
</script>
