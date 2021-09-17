<template>
  <form
    @submit.prevent="submit"
    method="POST"
    :name="form['form-name']"
    :action="localeUrl({ name: 'contact-slug', params: { slug: 'confirmation' } })"
    class="contact-page-form__form"
    data-netlify="true"
    netlify-honeypot="magic-castle"
    :novalidate="useCustomValidation"
  >
    <fieldset>
      <legend class="sr-only">{{ ariaLabelOrTitle }}</legend>
      <div class="contact-page-form__personal-details">
        <div class="contact-page-form__column">
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
            @input="createEmailSubject"
            :label="$t('my_name_is')"
            :placeholder-label="$t('your_name')"
            required
            :validate="formIsValidated"
            :validation-error-message="$t('name_is_required')"
            class="body-petite contact-page-form__input-field"
          />
          <input-field
            v-model="form.business"
            id="business"
            type="text"
            :label="$t('my_business_is')"
            :placeholder-label="$t('company_name')"
            class="body-petite contact-page-form__input-field"
          />
        </div>

        <div class="contact-page-form__column">
          <input-field
            v-model="form.email"
            id="email"
            type="email"
            :label="$t('you_can_email_me_at')"
            :placeholder-label="$t('email_address')"
            required
            :validate="formIsValidated"
            :validation-error-message="emailValidationErrorMessage"
            class="body-petite contact-page-form__input-field"
          />
          <input-field
            v-model="form.phone"
            id="phone"
            type="tel"
            :label="$t('you_can_call_me_at')"
            :placeholder-label="$t('phone_number')"
            class="body-petite contact-page-form__input-field"
          />
        </div>
      </div>

      <input-field
        textarea
        v-model="form.explanation"
        id="explanation"
        type="text"
        :label="$t('my_project_is')"
        :placeholder-label="$t('project_description')"
        class="body-petite contact-page-form__input-field"
      />
      <app-button
        @click.native="trackEvent()"
        class="contact-page-form__button"
        :label="$t('get_in_touch')"
        type="submit"
      />
    </fieldset>
  </form>
</template>

<script>
  import submitContactForm from '../../lib/submit-contact-form'

  export default {
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
      }
    },
    mounted() {
      this.useCustomValidation = true
    },
    methods: {
      createEmailSubject(name) {
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
      },
      trackEvent () {
        const formValidationState = this.formIsValidated ? 'success' : 'failed'
        return this.$ga.event('Newsletter form', 'click submit', formValidationState, 0)
      },
    }
  }
</script>

<style>
  @import '../forms/forms.css';

  :root {
    --contact-page-form-thumbnail-size: 120px;
  }

  .contact-page-form__contact-person {
    display: none;
  }

  .contact-page-form__contact-person .responsive-image {
    margin-bottom: var(--spacing-small);
    width: var(--contact-page-form-thumbnail-size-small);
  }

  .contact-page-form__label:first-of-type {
    margin-top: 0;
  }

  .contact-page-form__button {
    margin-top: var(--spacing-large);
    margin-bottom: var(--spacing-small);
  }

  @media (min-width: 520px) {
    .contact-page-form__contact-person .responsive-image {
      margin-left: 0;
      margin-right: 0;
    }

    .contact-page-form__personal-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .contact-page-form__column {
      width: calc(50% - var(--spacing-medium));
    }

    .contact-page-form__input-field {
      flex-direction: column;
      margin: var(--spacing-large) 0;
    }
  }

  @media (min-width: 1100px) {
    .contact-page-form__contact-person {
      display: block;
    }

    .contact-page-form__contact-person .responsive-image {
      width: var(--contact-page-form-thumbnail-size);
    }
  }
</style>
