<template>
  <main class="page-event">
    <page-header
      heading="byline"
      :byline="page.title"
      :headline="page.subtitle"
      :image="page.headerIllustration"
    />

    <div class="page-event__content grid" :class="{'page-event__content--upcoming-events': upcomingEvents}">
      <div class="page-event__intro">
        <rich-text-block
          v-if="page.introductionText"
          :key="page.introductionText"
          :text="page.introductionText"
          large-text />
      </div>

      <section v-if="upcomingEvents" class="page-event__upcoming-events">
        <h2 class="page-event__events-list-title h2">Upcoming events</h2>
        <ul class="page-event__upcoming-events-list">
          <li
            v-for="event in upcomingEvents"
            :key="event.social.description"
            class="page-event__upcoming-events-item">
            <event-card
              :date-string="event.date"
              :title="event.title"
              :description="event.social.description"
              :illustration="event.image"
              :slug="event.slug"
              :label="event.label.label"/>
          </li>
        </ul>
      </section>
    </div>
    <section class="page-event__past-events grid">
      <h2 class="page-event__events-list-title h2">Past events</h2>
      <ul class="page-event__past-events-list">
        <li
          v-for="(event, index) in pastEvents"
          :key="event.social.description + index"
          class="page-event__past-events-item"
        >
          <event-list-item :event="event"/>
        </li>
      </ul>
    </section>
    <newsletter-form :has-background="true" />
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'
  export default {
    asyncData,
    head,
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
    mounted() {
      this.$announcer.set(`${this.$t('page')}: ${this.page.social.title}`, 'polite')
    },
  }
</script>

<style>
  .page-event {
    position: relative;
    z-index: var(--z-index-low);
  }

  .page-event .page-header {
    position: relative;
    z-index: var(--z-index-high);
  }

  .page-event__content {
    position: relative;
    z-index: var(--z-index-low);
    padding-top: var(--spacing-larger);
    background-color: var(--bg-pastel);
  }

  .page-event__events-list-title {
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .page-event__intro {
    position: relative;
    max-width: var(--event-intro-width);
    padding-bottom: var(--spacing-larger);
    color: var(--html-blue);
  }

  .page-event__upcoming-events {
    position: relative;
    grid-column: var(--grid-page);
    padding-top: var(--spacing-larger);
    padding-right: calc(var(--grid-margin) * 2);
    padding-left: calc(var(--grid-margin) * 2);
    background-color: var(--white);
  }

  .page-event__upcoming-events-item {
    position: relative;
  }

  .page-event__past-events {
    margin-bottom: var(--spacing-large);
  }

  .page-event__past-events-item + .page-event__past-events-item {
    padding-top: var(--spacing-small);
    border-top: 1px solid var(--very-dim);
  }

  @media (min-width: 720px) {
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
    .page-event__content {
      padding-top: 0;
    }

    .page-event__content--upcoming-events {
      background-image: linear-gradient(var(--white), var(--white));
      background-size: 50% 100%;
      background-repeat: no-repeat;
      background-position: 100% 0;
    }

    .page-event__intro {
      grid-column: 4 / var(--grid-center);
      max-width: none;
    }

    .page-event__content--upcoming-events .page-event__intro {
      grid-column: 4 / 16;
    }

    .page-event__upcoming-events {
      grid-column: 18 / 50;
      padding-top: 0;
      padding-right: 0;
      padding-left: var(--spacing-larger);
    }

    .page-event__upcoming-events-item:last-child {
      margin-bottom: 0;
    }

    .page-event__upcoming-events .page-event__events-list-title {
      position: absolute;
      top: var(--spacing-larger);
      left: calc(100% + var(--spacing-larger));
      width: 100%;
      transform-origin: top left;
      transform: rotate(90deg);
      text-align: left;
    }

    .page-event__past-events {
      margin-top: var(--spacing-bigger);
    }
  }

  @media (min-width: 1000px) {
    .page-event__past-events-list {
      grid-column: var(--grid-content-smallest);
    }
  }
</style>
