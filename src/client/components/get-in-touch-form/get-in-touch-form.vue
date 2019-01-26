<template>
  <div class="get-in-touch-form grid">
    <h2 class="get-in-touch-form__title h3">{{ title }}</h2>
    <form
      @submit.prevent="submit"
      method="POST"
      :name="form['form-name']"
      :action="confirmationPageUrl"
      class="get-in-touch-form__form"
      data-netlify="true"
      netlify-honeypot="magic-castle"
      :novalidate="useCustomValidation">
      <input type="hidden" name="form-name" :value="form['form-name']">
      <label class="hidden">
        Don't fill this out if you're human:
        <input v-model="form.magicCastle" name="magic-castle">
      </label>
      <input-field
        v-model="form.name"
        id="name"
        type="text"
        :label="nameLabel"
        :placeholder-label="namePlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="nameErrorMessage"
      />
      <input-field
        v-model="form.email"
        id="email"
        type="email"
        :label="emailLabel"
        :placeholder-label="emailPlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="emailValidationErrorMessage"
      />
      <input-field
        v-model="form.phone"
        id="phone"
        type="tel"
        :label="phoneLabel"
        :placeholder-label="phonePlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="phoneErrorMessage"
      />
      <input-field
        textarea
        v-model="form.explanation"
        id="explanation"
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
  import submitContactForm from '../../lib/submit-contact-form'

  export default {
    components: { AppButton, InputField },
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
        form: {
          'form-name': 'get-in-touch',
          name: '',
          email: '',
          phone: '',
          explanation: '',
        },
        formIsValidated: false,
        useCustomValidation: false,
      }
    },
    computed: {
      confirmationPageUrl() {
        return this.localeUrl({ name: 'contact-slug', params: { slug: 'confirmation' } })
      },
      emailValidationErrorMessage() {
        return this.form.email ? this.emailErrorMessageIncorrect : this.emailErrorMessageEmpty
      },
    },
    mounted() {
      this.useCustomValidation = true
    },
    methods: {
      submit(event) {
        this.formIsValidated = true
        if (!event.target.checkValidity()) {
          return false
        }

        submitContactForm({
          form: this.form,
          router: this.$router,
          localeUrl: this.localeUrl,
        })
      }
    }
  }
</script>

<style>
  @import '../forms/forms.css';

  .get-in-touch-form {
    grid-column: var(--grid-page);
  }

  .get-in-touch-form__title {
    grid-row: 1;
  }

  .get-in-touch-form__form {
    grid-row: 2;
  }

  .get-in-touch-form__label:first-of-type {
    margin-top: 0;
  }

  .get-in-touch-form__button {
    margin-top: var(--spacing-larger);
  }

  @media (min-width: 1100px) {
    .get-in-touch-form__title {
      grid-column-start: 6;
      grid-column-end: 18;
      margin-bottom: var(--spacing-medium);
    }

    .get-in-touch-form__form {
      grid-column-start: 21;
      grid-column-end: 46;
      grid-row: 1;
    }

    .get-in-touch-form__label-text {
      width: 9rem;
    }
  }
</style>
