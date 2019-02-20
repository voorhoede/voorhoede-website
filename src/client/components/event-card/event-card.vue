<template>
  <article class="event-card">
    <nuxt-link
      :to="localeUrl({ name: 'events-slug', params: { slug } })"
      class="event-card__link"
      :class="{ 'event-card__link--alt': isMeetup }">
      <header class="event-card__header">
        <calendar-icon
          class="event-card__calendar-icon"
          :date="dateString"
          :fill="(isMeetup) ? 'yellow' : 'blue'"
        />
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
  import { CalendarIcon, LazyLoad, RichTextBlock } from '~/components'

  export default {
    components: { CalendarIcon, LazyLoad, RichTextBlock },
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
      date() {
        return new Date(this.dateString)
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

  .event-card__calendar-icon {
    position: absolute;
    top: var(--spacing-small);
    left: var(--spacing-small);
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

    .event-card__calendar-icon {
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
