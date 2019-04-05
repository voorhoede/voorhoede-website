<template>
  <div class="contact-form">
    <div v-if="title" class="contact-form__header">
      <h2
        v-if="title"
        class="contact-form__header h3"
      >
        {{ title }}
      </h2>
      <div v-if="contactPerson" class="contact-form__contact-person">
        <responsive-image :image="contactPerson.image"/>
        <dl>
          <dt class="sr-only">{{ $t('name') }}</dt>
          <dd class="h5">{{ contactPerson.name }} {{ contactPerson.lastName }}</dd>
          <dt class="sr-only">{{ $t('email') }}</dt>
          <dd class="body-petite">
            <a
              class="link"
              :href="`mailto:${contactPerson.name}@voorhoede.nl`"
            >{{ contactPerson.name }}@voorhoede.nl</a>
          </dd>
          <template v-if="contactPerson.jobTitle">
            <dt class="sr-only">{{ $t('job_title') }}</dt>
            <dd class="body-petite">Project manager</dd>
          </template>
        </dl>
      </div>
    </div>
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
        <label class="hidden">
          Don't fill this out if you're human:
          <input v-model="form.magicCastle" name="magic-castle">
        </label>
        <input-field
          v-model="form.name"
          id="name"
          type="text"
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
  import ResponsiveImage from '../responsive-image'

  export default {
    components: { AppButton, InputField, ResponsiveImage },
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
      },
      contactPerson: {
        type: Object,
        default: undefined,
        validator(contactPerson) {
          return !contactPerson || (
            typeof(contactPerson.name) === 'string'
            && typeof(contactPerson.lastName) === 'string'
            && typeof(contactPerson.image) === 'object'
          )
        }
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

  :root {
    --contact-form-thumbnail-size-small: 80px;
    --contact-form-thumbnail-size-large: 120px;
  }

  .contact-form__header {
    grid-row: 1;
  }

  .contact-form__contact-person {
    margin-top: var(--spacing-medium);
    text-align: center;
  }

  .contact-form__contact-person .responsive-image {
    margin-bottom: var(--spacing-small);
    width: var(--contact-form-thumbnail-size-small);
  }

  .contact-form__header ~ .contact-form__form {
    grid-row: 2;
  }

  .contact-form__label:first-of-type {
    margin-top: 0;
  }

  .contact-form__button {
    margin-top: var(--spacing-larger);
  }

  @media (min-width: 520px) {
    .contact-form__contact-person {
      text-align: left;
    }

    .contact-form__contact-person .responsive-image {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media (min-width: 1100px) {
    .contact-form__header {
      grid-column-start: 6;
      grid-column-end: 18;
      margin-bottom: var(--spacing-medium);
    }

    .contact-form__contact-person .responsive-image {
      width: var(--contact-form-thumbnail-size-large);
    }

    .contact-form__header ~ .contact-form__form {
      grid-column-start: 21;
      grid-column-end: 46;
      grid-row: 1;
    }

    .contact-form__header ~ .contact-form__form > .contact-form__label-text {
      width: 9rem;
    }
  }
</style>
