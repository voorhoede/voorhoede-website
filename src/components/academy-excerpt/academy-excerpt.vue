<template>
  <article class="academy-excerpt grid">
    <calendar-icon
      class="academy-excerpt__calendar-icon"
      :date="date"
    />
    <div class="academy-excerpt__content">
      <h2 class="academy-excerpt__title h3">
        {{ title }}
      </h2>
      <div
        class="academy-excerpt__description body"
        v-html="description"
      />
      <footer class="academy-excerpt__actions button-group">
        <app-button
          class="academy-excerpt__primary-button"
          :aria-label="$t('sign_up_for__title_', { title })"
          :label="$t('sign_up')"
          :to="link"
          external
        />
        <app-button
          :label="$t('all_events')"
          :to="$localeUrl({ name: 'events' })"
          secondary
        />
      </footer>
    </div>
    <div
      v-if="illustration"
      class="academy-excerpt__illustration-column"
    >
      <div class="academy-excerpt__illustration-wrapper">
        <dato-image
          class="academy-excerpt__illustration"
          :src="illustration.url"
          :width="illustration.width"
          :height="illustration.height"
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  </article>
</template>

<script>
  export default {
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
  }
</script>

<style>
  .academy-excerpt__content {
    grid-column-start: 17;
    grid-column-end: var(--grid-content-end);
  }

  .academy-excerpt__title {
    margin-bottom: var(--spacing-small);
  }

  .academy-excerpt__calendar-icon {
    grid-column-start: 2;
    grid-column-end: 13;
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
    .academy-excerpt__calendar-icon {
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
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      width: 300px;
    }
  }

  @media (min-width: 1100px) {
    .academy-excerpt__calendar-icon {
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
