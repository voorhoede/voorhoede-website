<template>
  <div class="get-in-touch-form grid">
    <h2 class="get-in-touch-form__title h3">{{ title }}</h2>

    <form
      @submit.prevent="onFormSubmit"
      novalidate
      class="get-in-touch-form__form"
      method="POST"
      data-netlify="true"
      name="get-in-touch"
    >
      <input type="hidden" name="form-name" value="get-in-touch">
      <input-field
        v-model="name"
        id="name"
        type="text"
        :label="nameLabel"
        :placeholder-label="namePlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="nameErrorMessage"
      />
      <input-field
        v-model="email"
        id="email"
        type="email"
        :label="emailLabel"
        :placeholder-label="emailPlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="emailValidationErrorMessage"
      />
      <input-field
        v-model="phone"
        id="phone"
        type="tel"
        :label="phoneLabel"
        :placeholder-label="phonePlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="phoneErrorMessage"
      />
      <input-field
        v-model="project"
        id="project"
        type="text"
        :label="summaryLabel"
        :placeholder-label="summaryPlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="summaryErrorMessage"
      />
      <app-button
        class="get-in-touch-form__button"
        :label="ctaLabel"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
  import { AppButton, InputField } from '~/components'

  export default {
    components: {
      AppButton,
      InputField,
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
      nameErrorMessage: {
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
      emailErrorMessageEmpty: {
        type: String,
        required: true
      },
      emailErrorMessageIncorrect: {
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
      phoneErrorMessage: {
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
      summaryErrorMessage: {
        type: String,
        required: true
      },
      ctaLabel: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        project: '',
        formIsValidated: false,
      }
    },
    computed: {
      emailValidationErrorMessage() {
        return this.email ? this.emailErrorMessageEmpty : this.emailErrorMessageIncorrect
      },
    },
    methods: {
      onFormSubmit(event) {
        this.formIsValidated = true
        if (!event.target.checkValidity()) {
          return false
        }
      },
    },
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
