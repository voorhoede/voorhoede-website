<template>
  <main class="page-event">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration ? page.headerIllustration : fallbackIllustration"
    />

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
          <h2 class="page-event__events-list-title h2">Upcoming events</h2>
          <ul class="page-event__upcoming-events-list">
            <li
              v-for="event in upcomingEvents"
              :key="event.description"
              class="page-event__upcoming-events-item">
              <event-card
                :date-string="event.date"
                :title="event.title"
                :description="event.description"
                :illustration="event.image"
                :slug="event.slug"
                :label="event.label.label"/>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <section class="page-event__past-events grid">
      <h2 class="page-event__events-list-title h2">Past events</h2>
      <ul class="page-event__past-events-list">
        <li
          v-for="event in pastEvents"
          :key="event.description"
          class="page-event__past-events-item"
        >
          <event-list-item :event="event"/>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  import EventListItem from '~/components/event-list-item'
  import EventCard from '~/components/event-card'
  import PageHeader from '~/components/page-header'
  import RichTextBlock from '~/components/rich-text-block'

  export default {
    components: {
      EventListItem,
      EventCard,
      PageHeader,
      RichTextBlock
    },
    asyncData,
    data() {
      return {
        fallbackIllustration: {
          url: '/illustrations/event.svg',
          format: 'svg'
        }
      }
    },
    computed: {
      upcomingEvents() {
        const items = this.items
        return items
          .filter(event => new Date(event.date).getTime() > new Date().getTime())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 10)
      },
      pastEvents() {
        const items = this.items
        return items
          .filter(event => (
            new Date(event.date).getTime() < new Date().getTime()
            && event.slug // Some old events don't have a slug
          ))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      },
    },
    head,
  }
</script>

<style>
  .page-event__events-list-title {
    margin-bottom: var(--spacing-medium);
    text-align: center;
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

  .page-event__past-events {
    margin: var(--spacing-large) 0;
  }

  .page-event__past-events-item + .page-event__past-events-item {
    padding-top: var(--spacing-small);
    border-top: 1px solid var(--very-dim);
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

    .page-event__past-events {
      margin-bottom: var(--spacing-bigger);
    }

    .page-event__past-events-list {
      grid-column: var(--grid-content);
      grid-row: 2;
    }

    .page-event__past-events-item + .page-event__past-events-item {
      border: none;
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

    .page-event__upcoming-events .page-event__events-list-title {
      position: absolute;
      left: 101%;
      width: 100%;
      transform-origin: top left;
      transform: rotate(90deg);
      text-align: left;
    }
  }

  @media (min-width: 1000px) {
    .page-event__past-events-list {
      grid-column: var(--grid-content-smallest);
    }
  }

  @media (min-width: 1440px) {
    .page-event__upcoming-events .page-event__events-list-title {
      left: 100%;
    }
  }
</style>
