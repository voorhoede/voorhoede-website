<template>
  <article class="academy-excerpt grid">
    <time
      class="academy-excerpt__calendar"
      :datetime="date"
    >
      <span>6</span>
      <span>Juli</span>
    </time>
    <div class="academy-excerpt__content">
      <h2 class="academy-excerpt__heading h3">{{ heading }}</h2>
      <p class="academy-excerpt__body body">{{ body }}</p>
      <div class="academy-excerpt__button-group">
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
      </div>
    </div>
  </article>
</template>

<script>
  import { AppButton } from '~/components'

  export default {
    components: {
      AppButton,
    },
    props: {
      date: {
        type: String,
        required: true,
      },
      heading: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      ctaPrimaryLabel: {
        type: String,
        required: true,
      },
      ctaPrimaryTo: {
        type: String,
        required: true,
      },
      ctaSecondaryLabel: {
        type: String,
        required: true,
      },
      ctaSecondaryTo: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
    .academy-excerpt__calendar {
      grid-column-start: 2;
      grid-column-end: 5;

    }

    .academy-excerpt__content {
      grid-column-start: 6;
      grid-column-end: 18;
    }
  .academy-excerpt__heading {
    margin-bottom: var(--spacing-small);
  }

  .academy-excerpt__body {
    margin-bottom: var(--spacing-medium);
  }

  @media (max-width: 719px) {
    .academy-excerpt__primary-button {
      margin-bottom: var(--spacing-medium);
    }
  }

  @media (min-width: 720px) {
    .academy-excerpt__button-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

</style>
