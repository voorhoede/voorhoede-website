<template>
  <main class="page-event">
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />

    <div class="page-event__content grid">
      <div class="page-event__content--grid-left">
        <div class="page-event__intro">
          <rich-text-block
            v-if="page.introductionText"
            :key="page.introductionText"
            :text="page.introductionText"
            large-text />
        </div>

        <section class="page-event__upcoming-events">
          <h2 class="page-event__upcoming-events-title h2">Upcoming events</h2>
          <ul class="page-event__upcoming-events-list">
            <li
              v-for="item in items"
              :key="item.description"
              class="page-event__upcoming-events-item">
              <event-card
                :date-string="item.date"
                :title="item.title"
                :description="item.description"
                :illustration="item.image"
                :url="item.url"
                :label="item.label.label"/>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
  import head from '~/lib/seo-head'
  import { mapState } from 'vuex'
  import { EventCard, PageHeader, RichTextBlock } from '~/components'

  export default {
    components: { EventCard, PageHeader, RichTextBlock },
    async asyncData({ store, route }) {
      return await store.dispatch('getData', { route })
    },
head,
    computed: {
      ...mapState(['currentLocale'])
    }
  }
</script>


<style>
  .page-event__upcoming-events-title {
    margin-bottom: var(--spacing-medium);
  }

  .page-event__intro {
    position: relative;
    margin-bottom: var(--spacing-larger);
    padding-bottom: var(--spacing-larger);
    color: var(--html-blue);
    background-color: var(--bg-pastel);
  }

  .page-event__upcoming-events {
    position: relative;
  }

  .page-event__upcoming-events-list {
    margin-top: var(--spacing-larger);
    margin-bottom: var(--spacing-large);
  }

  .page-event__upcoming-events-item {
    position: relative;
  }

  .page-event__intro::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background-color: var(--bg-pastel);
  }

  .page-event__intro::after {
    content: '';
    position: absolute;
    top: 0;
    right: -140%;
    height: 100%;
    width: 140%;
    background-color: var(--bg-pastel);
  }

  .page-event__content {
    overflow: hidden; /* hide right pseudo content from .page-event__intro */
  }

  @media (min-width: 720px) {
    .page-event__intro {
      width: 500px;
    }

    .page-event__upcoming-events-list {
      margin-left: calc(var(--spacing-medium) * -1);
    }

    .page-event__upcoming-events-item {
      display: inline-flex;
      width: 45%;
      margin-left: var(--spacing-medium);
      margin-bottom: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .page-event__content--grid-left::after {
      content: '';
      clear: both;
      display: table;
    }

    .page-event__upcoming-events-item {
      max-width: 29%;
      margin-bottom: var(--spacing-larger);
    }

    .page-event__intro {
      float: left;
      width: 29%;
      padding-right: var(--spacing-larger);
      margin-bottom: var(--spacing-small);
      color: var(--html-blue);
    }

    .page-event__upcoming-events-item:last-child {
      margin-bottom: 0;
    }

    .page-event__intro::after {
     display: none;
    }

    .page-event__content--grid-left {
      grid-column-start: 4;
    }

    .page-event__upcoming-events .page-event__upcoming-events-title {
      position: absolute;
      left: 101%;
      width: 100%;
      transform-origin: top left;
      transform: rotate(90deg);
      text-align: left;
    }
  }

  @media (min-width: 1440px) {
    .page-event__upcoming-events .page-event__upcoming-events-title {
      left: 100%;
    }
  }
</style>
