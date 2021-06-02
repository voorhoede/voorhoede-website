<template>
  <article class="event-list-item">
    <div class="event-list-item__transition-box">
      <calendar-icon :date="event.date" fill="dim"/>
      <div class="event-list-item__content">
        <nuxt-link
          class="event-list-item__link"
          :to="localeUrl({ name: 'events-slug', params: { slug: event.slug } })"
        >
          <h3 class="event-list-item__title event-list-item__title--compact body">{{ event.title }}</h3>
          <h3 class="event-list-item__title event-list-item__title--large h4">{{ event.title }}</h3>
        </nuxt-link>
        <rich-text-block v-if="event.description" :text="event.description"/>
      </div>
    </div>
  </article>
</template>

<script>

  export default {
    props: {
      event: {
        type: Object,
        required: true,
        validator(event) {
          return (
            typeof(event.slug) === 'string'
            && typeof(event.date) === 'string'
            && typeof(event.title) === 'string'
            && typeof(event.description) === 'string'
          )
        }
      }
    }
  }
</script>

<style>
  .event-list-item {
    position: relative;
  }

  .event-list-item__transition-box {
    padding: var(--spacing-small) 0;
    transition: var(--animation-shift-transition);
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .event-list-item__transition-box:hover,
  .event-list-item__transition-box:focus {
    transform: var(--animation-shift-transform);
  }

  @media (prefers-reduced-motion: reduce) {
    .event-list-item__transition-box:hover,
    .event-list-item__transition-box:focus {
      transform: none;
    }
  }

  .event-list-item__link::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .event-list-item .calendar-icon {
    flex-shrink: 0;
  }

  .event-list-item__content {
    margin-left: var(--spacing-large);
  }

  .event-list-item__title--large {
    display: none;
  }

  .event-list-item .rich-text {
    display: none;
  }

  .page-event__upcoming-events-list {
    margin-top: var(--spacing-larger);
    margin-bottom: var(--spacing-large);
  }

  @media (min-width: 720px) {
    .event-list-item__transition-box {
      align-items: flex-start;
    }

    .event-list-item__title--compact {
      display: none;
    }

    .event-list-item__title--large {
      display: block;
    }

    .event-list-item .rich-text {
      display: block;
    }
  }
</style>
