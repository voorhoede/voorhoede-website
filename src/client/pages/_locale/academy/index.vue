<template>
  <main>
    <page-header
      :title="page.title"
      :text="page.subtitle"
      :image="page.headerIllustration" />

    <div class="academy-content grid">
      <div class="academy-content__desktop">
        <div class="academy-intro">
          <rich-text-block
            v-if="page.introductionText"
            :key="page.introductionText"
            :text="page.introductionText"
            large-text />
        </div>

        <section class="academy__upcoming-events">
          <h2 class="academy__title h2">Upcoming events</h2>
          <ul class="academy-events">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="academy-events__item">
              <academy-event
                :date-string="item.date"
                :title="item.title"
                :description="item.description"
                :illustration="item.image"
                :label="item.label.label"/>
            </li>
          </ul>
        </section>
        <section class="academy__past-events">
          <h2 class="academy__title h2">Past events</h2>

        </section>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import { AcademyEvent, PageHeader, RichTextBlock } from '~/components'

  export default {
    components: { AcademyEvent, PageHeader, RichTextBlock },
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
  .academy__title {
    margin-bottom: var(--spacing-medium);
  }

  .academy-intro {
    position: relative;
    margin-bottom: var(--spacing-larger);
    padding-bottom: var(--spacing-larger);
    color: var(--html-blue);
    background-color: var(--bg-pastel);
  }

  .academy__upcoming-events {
    position: relative;
  }

  .academy-events {
    margin-top: var(--spacing-larger);
    margin-bottom: var(--spacing-large);
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
    right: -140%;
    height: 100%;
    width: 140%;
    background-color: var(--bg-pastel);
  }

  .academy-content {
    overflow: hidden; /* hide right pseudo content from .academy-intro */
  }

  @media (min-width: 720px) {
    .academy-intro {
      width: 500px;
    }

    .academy-events {
      margin-left: calc(var(--spacing-medium) * -1);
    }

    .academy-events__item {
      display: inline-flex;
      width: 35%;
      margin-left: var(--spacing-medium);
      margin-bottom: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .academy-events__item {
      max-width: 29%;
      margin-bottom: var(--spacing-larger);
    }

    .academy-intro {
      float: left;
      width: 29%;
      padding-right: var(--spacing-larger);
      padding-bottom: var(--spacing-big);
      color: var(--html-blue);
    }

    .academy-events__item:last-child {
      margin-bottom: 0;
    }

    .academy-intro::after {
     display: none;
    }

    .academy-content__desktop {
      grid-column-start: 4;
    }

    .academy__upcoming-events .academy__title {
      position: absolute;
      width: 100%;
      text-align: left;
      transform-origin: top left;
      transform: rotate(90deg);
      left: 100%;
    }
  }
</style>
