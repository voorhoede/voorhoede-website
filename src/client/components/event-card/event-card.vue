<template>
  <article class="event-card">
    <header class="event-card__header">
      <div v-if="illustration" class="event-card__illustration">
        <responsive-image :image="illustration"/>
      </div>
      <calendar-icon
        :date="dateString"
        :fill="(isMeetup) ? 'yellow' : 'blue'"
      />
    </header>
    <div class="event-card__body">
      <div class="event-card__type body-detail" :class="{ 'event-card__type--alt': isMeetup }">{{ label }}</div>
      <nuxt-link
        :to="localeUrl({ name: 'events-slug', params: { slug } })"
        class="event-card__link"
        :class="{ 'event-card__link--alt': isMeetup }"
      >
        <h2 class="event-card__title h4">{{ title }}</h2>
      </nuxt-link>
      <rich-text-block
        v-if="description"
        :key="description"
        :text="description"
      />
    </div>
  </article>
</template>

<script>
  export default {
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
    position: relative;
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

  .event-card__link::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .event-card__link:hover::before ,
  .event-card__link:focus::before  {
    outline: var(--spacing-tiny) solid var(--html-blue);
  }

  .event-card__link--alt:hover::before ,
  .event-card__link--alt:focus::before  {
    outline: var(--spacing-tiny) solid var(--brand-yellow);
  }

  .event-card__header {
    height: 130px;
    position: relative;
    text-align: center;
    background-color: var(--bg-pastel);
  }

  .event-card__illustration {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .event-card .responsive-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .event-card__title {
    margin-bottom: var(--spacing-small);
    text-align: center;
  }

  .event-card .rich-text {
    display: none;
  }

  .event-card .calendar-icon {
    position: absolute;
    top: var(--spacing-small);
    left: var(--spacing-small);
  }

  .event-card__type {
    position: relative;
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
    margin-top: calc(var(--spacing-small) * -1);
  }

  @media (min-width: 720px) {
    .event-card__body {
      padding: var(--spacing-small);
      padding-top: 0;
    }

    .event-card .rich-text {
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

    .event-card__body {
      margin-top: var(--spacing-small);
    }

    .event-card .calendar-icon {
      left: var(--spacing-large);
    }

    .event-card__type {
      margin-left: 0;
    }
  }

  @media (min-width: 1440px) {
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
