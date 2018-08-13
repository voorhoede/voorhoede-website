<template>
  <section class="page-index">
    <div class="page-index__header">
      <page-header brick curly-bracket>
        <template slot="title">
          <h1 v-html="headerTitle"/>
        </template>
        <template slot="subTitle">
          <h2 v-html="subtitle"/>
        </template>
        <template slot="image">
          <img :src="headerImage" alt="image">
        </template>
      </page-header>
      <scroll-highlighted-text :text-lines="usps"/>
    </div>
  </section>
</template>

<script>
import {
  PageHeader,
  ScrollHighlightedText,
} from '~/components'

export default {
  components: {
    PageHeader,
    ScrollHighlightedText
  },
  layout: 'landing',
  asyncData() {
    return {
      headerTitle: 'We are <br/> De Voorhoede',
      subtitle: 'How can we help?',
      seoTitle: 'We are De Voorhoede - how can we help?',
      headerImage: 'https://www.datocms-assets.com/6068/1529572359-random-image.jpeg',
      usps: [
        'We work lean and agile.',
        'Start small and iterate fast',
        'to help you from an idea,',
        'to an amazing product.',
      ]
    }
  },
}
</script>

<style>
.page-index__header {
  background: var(--bg-pastel);
}

.page-index .scroll-highlighted-text {
  padding: var(--spacing-larger) 0;
}

@media (min-width: 720px) {
  .page-index .page-header {
    height: 100vh;
  }

  .page-index .scroll-highlighted-text {
    padding: var(--spacing-big) 0;
  }
}

@media (min-width: 1100px) {
  .page-index .scroll-highlighted-text {
    padding: var(--spacing-bigger) 0;
  }
}

</style>
