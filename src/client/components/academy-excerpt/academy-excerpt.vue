<template>
  <article class="academy-excerpt grid">
    <time
      class="academy-excerpt__calendar"
      :datetime="dateString"
    >
      <span class="academy-excerpt__day font-bold">{{ day }}</span>
      <span class="academy-excerpt__month">{{ month }}</span>
    </time>
    <div class="academy-excerpt__content">
      <h2 class="academy-excerpt__title h3">{{ title }}</h2>
      <p class="academy-excerpt__description body" v-html="description" />
      <footer class="academy-excerpt__actions button-group">
        <app-button
          class="academy-excerpt__primary-button"
          :label="ctaPrimaryLabel"
          :to="ctaPrimaryTo"
          external
        />
        <app-button
          :label="ctaSecondaryLabel"
          :to="ctaSecondaryTo"
          external
          secondary
        />
      </footer>
    </div>
    <div v-if="illustration" class="academy-excerpt__illustration-column">
      <lazy-load>
        <img class="academy-excerpt__illustration" :src="illustration.url" alt="">
      </lazy-load>
    </div>
  </article>
</template>

<script>
  import { mapState } from 'vuex'
  import { AppButton, LazyLoad } from '~/components'

  export default {
    components: {
      AppButton,
      LazyLoad,
    },
    props: {
      dateString: {
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
      ctaPrimaryLabel: {
        type: String,
        required: true,
      },
      ctaPrimaryTo: {
        type: [String, Object],
        required: true,
      },
      ctaSecondaryLabel: {
        type: String,
        required: true,
      },
      ctaSecondaryTo: {
        type: [String, Object],
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
      ...mapState([ 'currentLocale' ]),
      date() {
        return new Date(this.dateString)
      },
      day() {
        return this.date.toLocaleDateString(this.currentLocale, {
          day: 'numeric',
        })
      },
      month() {
        return this.date.toLocaleDateString(this.currentLocale, {
          month: 'short',
        })
      },
    },
  }
</script>

<style>
  @import '../app-core/variables.css';

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
      grid-column-start: 36;
      grid-column-end: var(--grid-content-end);
    }

    .academy-excerpt__illustration {
      max-width: 100%;
      max-height: 100%;
    }

  }
</style>
