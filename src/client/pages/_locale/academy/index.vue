<template>
  <main>
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />

    <div class="grid academy-content">
      <h2 class="academy-events__title h2">Upcoming events</h2>

      <ul class="academy-events">
        <li class="academy-events__item">
          <div class="academy-intro">
            <generic-text-block
              v-if="page.introductionText"
              :key="page.introductionText"
              :body="page.introductionText" />
          </div>
        </li>
        <li
          v-for="item in 5"
          :key="item"
          class="academy-events__item">
          <div>Item {{ item }}</div>
          <div>Date</div>
          <div>Illustration</div>
          <div>Label</div>
          <h3>Title</h3>
          <p>Description</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import { PageHeader, GenericTextBlock } from '~/components'

  export default {
    components: { PageHeader, GenericTextBlock },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
    head() {
      return {
        title: this.page.social.title,
        meta: [
          { 'name': 'description', 'content': this.page.social.description },
          { 'property': 'og:description', 'content': this.page.social.description },
          { 'name': 'twitter:description', 'content': this.page.social.description },
          { 'name': 'keywords', 'content': this.page.keywords }
        ]
      }
    },
    computed: {
      ...mapState(['currentLocale'])
    }
  }
</script>


<style>
  .academy-events__title {
    margin-bottom: var(--spacing-medium);
  }

  .academy-intro {
    padding-bottom: var(--spacing-larger);
    color: var(--html-blue);
    background-color: var(--bg-pastel);
  }

  .academy-events {
    margin-bottom: var(--spacing-medium);
  }

  .academy-events__item {
    position: relative;
  }

  .academy-events__item:first-child::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background-color: var(--bg-pastel);
  }

  .academy-events__item:first-child::after {
    content: '';
    position: absolute;
    top: 0;
    right: -100%;
    height: 100%;
    width: 100%;
    background-color: var(--bg-pastel);
  }

  @media (min-width: 1100px) {
    .academy-intro {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 4;
      grid-column-end: 15;
      padding-right: var(--spacing-large);
      padding-bottom: var(--spacing-big);
      color: var(--html-blue);
    }

    .academy-events {
      grid-column-start: 4;
      grid-row-start: 1;
      grid-row-end: 3;
      display: flex;
      flex-wrap: wrap;
    }

    .academy-events__item {
      width: 30%;
    }

    .academy-events__item:first-child::after {
     display: none;
    }

    .academy-content {
      grid-template-rows: auto auto;
    }
  }
</style>
