<template>
  <article class="event-card">
    <nuxt-link
      :to="{ name: 'locale-events-slug', params: { locale: currentLocale, slug }}"
      class="event-card__link"
      :class="{ 'event-card__link--alt': isMeetup }">
      <header class="event-card__header">
        <time
          :datetime="dateString"
          class="event-card__calendar" :class="{ 'event-card__calendar--alt': isMeetup }">
          <span class="event-card__day font-bold ">{{ day }}</span>
          <span class="event-card__month">{{ month }}</span>
        </time>

        <div v-if="illustration" class="event-card__illustration-content">
          <lazy-load>
            <img class="event-card__illustration" :src="illustration.url" :alt="illustration.alt">
          </lazy-load>
        </div>
      </header>
      <div class="event-card__body">
        <div class="event-card__type body-detail" :class="{ 'event-card__type--alt': isMeetup }">{{ label }}</div>
        <h2 class="event-card__title h4">{{ title }}</h2>
        <rich-text-block
          v-if="description"
          :key="description"
          :text="description"
          class="event-card__description" />
      </div>
    </nuxt-link>
  </article>
</template>



<script>
  import { mapState } from 'vuex'
  import { LazyLoad, RichTextBlock  } from '~/components'

  export default {
    components: { LazyLoad, RichTextBlock  },
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
      price: {
        type: String,
        required: false,
        default: ''
      },
      slug: {
        type: String,
        required: true
      }
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
  .event-card {
    width: 100%;
    padding-bottom: var(--spacing-small);
    margin-bottom: var(--spacing-large);
    border-bottom: 1px solid var(--very-dim);
  }

  .event-card__link {
    display: block;
    height: 100%;
    overflow: hidden;
  }

  .event-card__link:hover,
  .event-card__link:focus {
    outline: var(--spacing-tiny) solid var(--html-blue);
  }

  .event-card__link--alt:hover,
  .event-card__link--alt:focus {
    outline: var(--spacing-tiny) solid var(--brand-yellow);
  }

  .event-card__header {
    height: 130px;
    position: relative;
    text-align: center;
    background-color: var(--bg-pastel);
  }

  .event-card__illustration {
    position: absolute;
    right: 0;
    bottom: calc(var(--spacing-small) * -1);
    height: 65%;
  }

  .event-card__illustration-content {
    height: inherit;
    position: relative;
  }

  .event-card__title {
    margin-bottom: var(--spacing-small);
    text-align: center;
  }

  .event-card__description {
    display: none;
  }

  .event-card__calendar {
    display: block;
    position: absolute;
    top: var(--spacing-small);
    left: var(--spacing-small);
    align-self: start;
    justify-self: end;
    width: 4.2rem;
    padding: var(--spacing-tiny) 0;
    background-color: var(--html-blue);
    font-family: var(--font-sans);
    text-align: center;
    color: var(--white);
  }

  .event-card__calendar--alt {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .event-card__calendar::before,
  .event-card__calendar::after {
    content: '';
    position: absolute;
    top: calc(var(--spacing-small) * -1);
    width: 3px;
    height: var(--spacing-small);
    border-radius: 1px;
    background-color: var(--html-blue);
  }

  .event-card__calendar--alt::before,
  .event-card__calendar--alt::after {
    background-color: var(--brand-yellow);
  }

  .event-card__calendar::before {
    left: 12px;
  }

  .event-card__calendar::after {
    right: 12px;
  }

  .event-card__day {
    display: block;
    margin-top: var(--spacing-tiny);
    font-size: 2rem;
  }

  .event-card__month {
    display: block;
    font-size: .8125rem;
    letter-spacing: 2.3px;
    text-transform: uppercase;
  }

  .event-card__type {
    display: inline-block;
    margin-left: var(--spacing-small);
    margin-bottom: var(--spacing-small);
    padding: 3px 8px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--white);
    background-color: var(--html-blue);
  }

  .event-card__type--alt {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .event-card__body {
    position: relative;
    margin-top: calc(var(--spacing-small) * -1);
  }

  @media (min-width: 500px) {
    .event-card__illustration {
      left: 50%;
      height: 85%;
      transform: translateX(-50%);
    }
  }

  @media (min-width: 720px) {
    .event-card__illustration {
      left: auto;
      right: 0;
      height: 57%;
      transform: none;
    }

    .event-card__body {
      padding: var(--spacing-small);
      padding-top: 0;
    }

    .event-card__description {
      display: block;
    }

    .event-card__title {
      text-align: left;
    }

    .event-card__type {
      padding-top: 5px;
      padding-bottom: 3px;
    }

    .event-card {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  @media (min-width: 1100px) {
    .event-card {
      max-width: 350px;
    }

    .event-card__illustration {
      height: 70%;
    }

    .event-card__body {
      margin-top: var(--spacing-small);
    }

    .event-card__calendar {
      left: var(--spacing-large);
    }

    .event-card__type {
      margin-left: 0;
    }
  }

  @media (min-width: 1440px) {
    .event-card__illustration {
      height: 60%;
    }

    .event-card__header {
      position: relative;
      height: 213px;
    }

    .event-card__body {
      padding-right: var(--spacing-medium);
      padding-left: var(--spacing-medium);
    }
  }
</style>
