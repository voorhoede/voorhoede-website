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
      <p class="academy-excerpt__description body">{{ description }}</p>
      <footer class="academy-excerpt__actions button-group">
        <app-button
          class="academy-excerpt__primary-button"
          :label="ctaPrimaryLabel"
          :to="ctaPrimaryTo"
        />
        <app-button
          :label="ctaSecondaryLabel"
          :to="ctaSecondaryTo"
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
  .academy-excerpt__calendar {
    position: relative;
    max-width: 3.75rem;
    padding: var(--spacing-tiny) 0;
    border: 3px solid var(--html-blue);
    font-family: var(--font-sans);
    text-align: center;
    color: var(--html-blue);
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
    .academy-excerpt__illustration-column {
    display: block;
  }

  .academy-excerpt__illustration {
    max-width: 100%;
    max-height: 100%;
  }
}

  @supports (display: grid) {
    .academy-excerpt__calendar {
      grid-column-start: 2;
      grid-column-end: 5;
      align-self: start;
      justify-self: end;
    }

    .academy-excerpt__content {
      grid-column-start: 6;
      grid-column-end: 18;
    }

    @media (min-width: 720px) {
      .academy-excerpt__calendar {
        grid-column-start: 7;
        grid-column-end: 9;
      }

      .academy-excerpt__content {
        grid-column-start: 10;
        grid-column-end: 23;
      }

      .academy-excerpt__illustration-column {
        grid-column-start: 24;
        grid-column-end: -2;
      }
    }

    @media (min-width: 1100px) {
      .academy-excerpt__calendar {
        grid-column-start: 12;
        grid-column-end: 15;
      }

      .academy-excerpt__content {
        grid-column-start: 16;
        grid-column-end: 31;
      }

      .academy-excerpt__illustration-column {
        grid-column-start: 32;
        grid-column-end: -7;
      }
    }
  }
</style>
