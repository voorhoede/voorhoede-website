<template>
  <main>
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />

    <div class="academy-content grid">
      <div>
        <div class="academy-intro">
          <generic-text-block
            v-if="page.introductionText"
            :key="page.introductionText"
            :body="page.introductionText" />
        </div>

        <div class="events-content">
          <h2 class="academy-events__title h2">Upcoming events</h2>
          <ul class="academy-events">
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
      </div>
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
    position: relative;
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

  .academy-intro::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background-color: var(--bg-pastel);
  }

  .academy-intro::after {
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
      float: left;
      width: 33%;
      padding-bottom: var(--spacing-big);
      color: var(--html-blue);
    }

    .academy-events__item {
      display: inline-block;
      width: 30%;
      height: 400px;
      border: 1px solid;
    }

    .academy-intro::after {
     display: none;
    }
  }
</style>
