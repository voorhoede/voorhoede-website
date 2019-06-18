<template>
  <div class="contact-form">
    <h2
      v-if="title"
      class="contact-form__title h3"
    >
      {{ title }}
    </h2>
    <form
      @submit.prevent="submit"
      method="POST"
      :name="form['form-name']"
      :action="localeUrl({ name: 'contact-slug', params: { slug: 'confirmation' } })"
      class="contact-form__form"
      data-netlify="true"
      netlify-honeypot="magic-castle"
      :novalidate="useCustomValidation"
    >
      <fieldset>
        <legend class="sr-only">{{ ariaLabelOrTitle }}</legend>
        <input type="hidden" name="form-name" :value="form['form-name']">
        <input type="text" name="subject" :value="form.name" class="hidden"/>
        <label class="hidden">
          Don't fill this out if you're human:
          <input v-model="form.magicCastle" name="magic-castle">
        </label>
        <input-field
          v-model="form.name"
          id="name"
          type="text"
          @input="emailTitle"
          :label="$t('my_name_is')"
          :placeholder-label="$t('your_name')"
          required
          :validate="formIsValidated"
          :validation-error-message="$t('name_is_required')"
        />
        <input-field
          v-model="form.business"
          id="business"
          type="text"
          :label="$t('my_business_is')"
          :placeholder-label="$t('company_name')"
        />
        <input-field
          v-model="form.email"
          id="email"
          type="email"
          :label="$t('you_can_email_me_at')"
          :placeholder-label="$t('email_address')"
          required
          :validate="formIsValidated"
          :validation-error-message="emailValidationErrorMessage"
        />
        <input-field
          v-model="form.phone"
          id="phone"
          type="tel"
          :label="$t('you_can_call_me_at')"
          :placeholder-label="$t('phone_number')"
        />
        <input-field
          textarea
          v-model="form.explanation"
          id="explanation"
          type="text"
          :label="$t('my_project_is')"
          :placeholder-label="$t('project_description')"
        />
        <app-button
          class="contact-form__button"
          :label="$t('get_in_touch')"
          type="submit"
        />
      </fieldset>
    </form>
  </div>
</template>

<script>
  import AppButton from '../app-button'
  import InputField from '../input-field'
  import submitContactForm from '../../lib/submit-contact-form'

  export default {
    components: { AppButton, InputField },
    props: {
      title: {
        type: String,
        required: false,
        default: undefined
      },
      ariaLabel: {
        type: String,
        required: false,
        default () {
          this.$t('lets_discuss')
        },
      }
    },
    data() {
      return {
        form: {
          'form-name': 'get-in-touch',
          name: '',
          email: '',
          phone: '',
          business: '',
          explanation: '',
          subject: '',
        },
        formIsValidated: false,
        useCustomValidation: false,
      }
    },
    computed: {
      ariaLabelOrTitle () {
        return this.ariaLabel || this.title
      },
      emailValidationErrorMessage() {
        return this.form.email ? this.$t('provide_valid_email') : this.$t('email_is_required')
      },
    },
    mounted() {
      this.useCustomValidation = true
    },
    methods: {
      emailTitle(name) {
        this.form.subject = `${name} has sent a message`
      },
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

  .contact-form__title {
    grid-row: 1;
  }

  .contact-form__title ~ .contact-form__form {
    grid-row: 2;
  }

  .contact-form__label:first-of-type {
    margin-top: 0;
  }

  .contact-form__button {
    margin-top: var(--spacing-larger);
  }

  @media (min-width: 1100px) {
    .contact-form__title {
      grid-column-start: 6;
      grid-column-end: 18;
      margin-bottom: var(--spacing-medium);
    }

    .contact-form__title ~ .contact-form__form {
      grid-column-start: 21;
      grid-column-end: 46;
      grid-row: 1;
    }

    .contact-form__title ~ .contact-form__form > .contact-form__label-text {
      width: 9rem;
    }
  }
</style>
