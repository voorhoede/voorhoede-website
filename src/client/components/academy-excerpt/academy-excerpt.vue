<template>
  <article class="academy-excerpt grid">
    <time
      class="academy-excerpt__calendar"
      :datetime="date"
    >
      <span class="academy-excerpt__day font-bold">{{ day }}</span>
      <span class="academy-excerpt__month">{{ month }}</span>
    </time>
    <div class="academy-excerpt__content">
      <h2 class="academy-excerpt__title h3">{{ title }}</h2>
      <div class="academy-excerpt__description body" v-html="description" />
      <footer class="academy-excerpt__actions button-group">
        <app-button
          class="academy-excerpt__primary-button"
          :aria-label="$t('sign_up_for__title_', { title })"
          :label="$t('sign_up')"
          :to="link"
          external
        />
        <app-button
          :label="$t('more_events')"
          :to="localeUrl('events')"
          external
          secondary
        />
      </footer>
    </div>
    <div v-if="illustration" class="academy-excerpt__illustration-column">
      <div class="academy-excerpt__illustration-wrapper">
        <lazy-load>
          <img class="academy-excerpt__illustration" :src="illustration.url" alt="">
        </lazy-load>
      </div>
    </div>
  </article>
</template>

<script>
  import { AppButton, LazyLoad } from '~/components'

  export default {
    components: {
      AppButton,
      LazyLoad,
    },
    props: {
      date: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      illustration: {
        type: Object,
        default: null,
        validator(illustration) {
          return typeof(illustration.url) === 'string'
        }
      },
    },
    computed: {
      dateObject() {
        return new Date(this.date)
      },
      day() {
        return this.dateObject.toLocaleDateString(this.$i18n.locale, {
          day: 'numeric',
        })
      },
      month() {
        return this.dateObject.toLocaleDateString(this.$i18n.locale, {
          month: 'short',
        })
      },
    },
  }
</script>

<style>
  :root {
    --button-group-spacing: var(--spacing-large);
  }

  .academy-excerpt__calendar {
    display: block;
    position: relative;
    max-width: 3.75rem;
    padding: var(--spacing-tiny) 0;
    border: 3px solid var(--html-blue);
    font-family: var(--font-sans);
    text-align: center;
    color: var(--html-blue);
    grid-column-start: 2;
    grid-column-end: 13;
    align-self: start;
    justify-self: end;
  }

  .academy-excerpt__calendar::before,
  .academy-excerpt__calendar::after {
    content: '';
    position: absolute;
    top: -60px;
    width: 2px;
    height: 64px;
    border-radius: 1px;
    background-color: var(--html-blue);
  }

  .academy-excerpt__calendar::before {
    left: 8px;
  }

  .academy-excerpt__calendar::after {
    right: 8px;
  }

  .academy-excerpt__content {
    grid-column-start: 17;
    grid-column-end: var(--grid-content-end);
  }

  .academy-excerpt__day {
    display: inline-block;
    font-size: 1.8125rem;
  }

  .academy-excerpt__month {
    display: inline-block;
    font-size: .8125rem;
    letter-spacing: 2.3px;
    text-transform: uppercase;
  }

  .academy-excerpt__title {
    margin-bottom: var(--spacing-small);
  }

  .academy-excerpt__description {
    margin-bottom: var(--spacing-medium);
  }

  .academy-excerpt__illustration-column {
    display: none;
  }

  @media (max-width: 719px) {
    .academy-excerpt__actions {
      flex-direction: column;
      align-items: flex-start;
    }

    .academy-excerpt__actions .app-button:first-child {
      width: 100%;
      margin-bottom: var(--spacing-medium);
    }

    .academy-excerpt__actions .app-button + .app-button {
      margin-left: 0;
    }
  }

  @media (min-width: 720px) {
    .academy-excerpt__calendar {
      grid-column-start: 9;
      grid-column-end: 16;
    }

    .academy-excerpt__content {
      grid-column-start: 17;
      grid-column-end: 35;
    }

    .academy-excerpt__illustration-column {
      display: block;
      position: relative;
      grid-column-start: 36;
      grid-column-end: var(--grid-content-end);
    }

    /* Make sure the image doesn't define the height of the full component */
    .academy-excerpt__illustration-wrapper {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }

    .academy-excerpt__illustration {
      max-width: 100%;
      max-height: 100%;
    }
  }

  @media (min-width: 1100px) {
    .academy-excerpt__calendar {
      grid-column-start: 11;
      grid-column-end: 14;
    }

    .academy-excerpt__content {
      grid-column-start: 16;
      grid-column-end: 31;
    }

    .academy-excerpt__illustration-column {
      grid-column-start: 32;
      grid-column-end: 44;
    }
  }
</style>
