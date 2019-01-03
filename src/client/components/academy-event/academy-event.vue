<template>
  <article class="academy-event" :class="{ 'academy-event__themed': isMeetup }">
    <header class="academy-event__header">
      <time
        :datetime="dateString"
        class="academy-event__calendar" :class="{ 'academy-event__calendar-themed': isMeetup }">
        <span class="academy-event__day font-bold ">{{ day }}</span>
        <span class="academy-event__month">{{ month }}</span>
      </time>

      <div v-if="illustration" class="academy-event__illustration-column">
        <lazy-load>
          <img class="academy-event__illustration" :src="illustration.url" alt="illustration.alt">
        </lazy-load>
      </div>
    </header>
    <div class="academy-event__body">
      <div class="academy-event__label body-detail" :class="{ 'academy-event__label-themed': isMeetup }">{{ label }}</div>
      <h2 class="academy-event__title h4">{{ title }}</h2>
      <p class="academy-event__description body">{{ description }}</p>
    </div>
  </article>
</template>



<script>
  import { mapState } from 'vuex'
  import { LazyLoad } from '~/components'

  export default {
    components: { LazyLoad },
    props: {
      dateString: {
        type: String,
        required: true,
      },
      dateBgColor: {
        type: String,
        required: false,
        default: ''
      },
      dateTextColor: {
        type: String,
        required: false,
        default: ''
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      label: {
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
      isMeetup() {
        return this.label.toLowerCase() === 'meet-up'
      }
    },
  }
</script>

<style>
  .academy-event {
    padding-bottom: var(--spacing-small);
    margin-bottom: var(--spacing-large);
    border-bottom: 1px solid var(--very-dim);
    overflow: hidden;
  }

  .academy-event:hover {
    outline: var(--spacing-tiny) solid var(--html-blue);
  }

  .academy-event__themed:hover {
    outline: var(--spacing-tiny) solid var(--brand-yellow);
  }

  .academy-event__header {
    height: 130px;
    position: relative;
    text-align: center;
    background-color: var(--bg-pastel);
  }

  .academy-event__illustration {
    position: absolute;
    bottom: calc(var(--spacing-small) * -1);
    left: 135px;
    height: 100%;
  }

  .academy-event__illustration-column {
    height: inherit;
    position: relative;
  }

  .academy-event__title {
    margin-bottom: var(--spacing-small);
    text-align: center;
  }

  .academy-event__description {
    display: none;
  }

  .academy-event__calendar {
    display: block;
    position: absolute;
    top: var(--spacing-small);
    left: var(--spacing-small);
    width: 4.2rem;
    padding: var(--spacing-tiny) 0;
    background-color: var(--html-blue);
    font-family: var(--font-sans);
    text-align: center;
    color: var(--white);
    grid-column-start: 2;
    grid-column-end: 13;
    align-self: start;
    justify-self: end;
  }

  .academy-event__calendar-themed {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .academy-event__calendar::before,
  .academy-event__calendar::after {
    content: '';
    position: absolute;
    top: calc(var(--spacing-small) * -1);
    width: 3px;
    height: var(--spacing-small);
    border-radius: 1px;
    background-color: var(--html-blue);
  }

  .academy-event__calendar-themed::before,
  .academy-event__calendar-themed::after {
    background-color: var(--brand-yellow);
  }

  .academy-event__calendar::before {
    left: 12px;
  }

  .academy-event__calendar::after {
    right: 12px;
  }

  .academy-event__day {
    display: block;
    margin-top: var(--spacing-tiny);
    font-size: 2rem;
  }

  .academy-event__month {
    display: block;
    font-size: .8125rem;
    letter-spacing: 2.3px;
    text-transform: uppercase;
  }

  .academy-event__label {
    display: inline-block;
    margin-left: var(--spacing-small);
    margin-bottom: var(--spacing-small);
    padding: 3px 8px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--white);
    background-color: var(--html-blue);
  }

  .academy-event__label-themed {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .academy-event__body {
    position: relative;
    margin-top: calc(var(--spacing-small) * -1);
  }

  @media (min-width: 720px) {
    .academy-event__description {
      display: block;
    }

    .academy-event__title {
      text-align: left;
    }

    .academy-event__label {
      padding-top: 5px;
      padding-bottom: 3px;
    }

    .academy-event {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  @media (min-width: 1100px) {
    .academy-event__body {
      margin-top: var(--spacing-small);
    }

    .academy-event__calendar {
      left: var(--spacing-large);
    }

    .academy-event__label {
      margin-left: 0;
    }
  }

  @media (min-width: 1440px) {
    .academy-event__header {
      position: relative;
      height: 213px;
    }

    .academy-event__body {
      padding-right: var(--spacing-medium);
      padding-left: var(--spacing-medium);
    }
  }
</style>
