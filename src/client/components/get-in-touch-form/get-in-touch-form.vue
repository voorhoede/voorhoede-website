<template>
  <section class="get-in-touch-form grid">
    <h2 class="get-in-touch-form__title h3">{{ title }}</h2>

    <form
      class="get-in-touch-form__form"
      method="POST"
      data-netlify="true"
      name="Get in touch form"
      action=""
    >
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">{{ nameLabel }}</span>
        <input class="body" type="text" :placeholder="namePlaceholder" name="name">
      </label>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">{{ emailLabel }}</span>
        <input class="body" type="text" :placeholder="emailPlaceholder" name="email">
      </label>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">{{ phoneLabel }}</span>
        <input class="body" type="text" :placeholder="phonePlaceholder" name="number">
      </label>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">{{ summaryLabel }}</span>
        <input class="body" type="text" :placeholder="summaryPlaceholder" name="explanation">
      </label>
      <app-button
        class="get-in-touch-form__button"
        :label="ctaLabel"
        type="submit"
      />
    </form>
  </section>
</template>

<script>
  import { AppButton } from '~/components'

  export default {
    components: {
      AppButton
    },
    props: {
      title: {
        type: String,
        required: true
      },
      nameLabel: {
        type: String,
        required: true
      },
      namePlaceholder: {
        type: String,
        required: true
      },
      emailLabel: {
        type: String,
        required: true
      },
      emailPlaceholder: {
        type: String,
        required: true
      },
      phoneLabel: {
        type: String,
        required: true
      },
      phonePlaceholder: {
        type: String,
        required: true
      },
      summaryLabel: {
        type: String,
        required: true
      },
      summaryPlaceholder: {
        type: String,
        required: true
      },
      ctaLabel: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
  @import '../forms/forms.css';

  .get-in-touch-form {
    grid-column: page;
  }

  .get-in-touch-form__label:first-of-type {
    margin-top: 0;
  }

  .get-in-touch-form__button {
    margin-top: var(--spacing-larger);
  }

  @media (max-width: 1099px) {
    .get-in-touch-form__title {
      margin-bottom: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .get-in-touch-form__title {
      grid-column-start: 6;
      grid-column-end: 18;
    }

    .get-in-touch-form__form {
      grid-column-start: 21;
      grid-column-end: 46;
    }

    .get-in-touch-form__label-text {
      width: 9rem;
    }
  }
</style>
