<template>
  <div
    class="contact-form"
    :class="{ 'grid': hasSidebar }"
  >
    <div v-if="hasSidebar" class="contact-form__header">
      <h2
        v-if="title"
        class="contact-form__header h3"
      >
        {{ title }}
      </h2>
      <div v-if="contactPerson" class="contact-form__contact-person">
        <responsive-image :image="contactPerson.image"/>
        <p class="h5">{{ contactPerson.name }} {{ contactPerson.lastName }}</p>
        <p
          v-if="contactPerson.jobTitle"
          class="body-petite contact-page-form__input-field"
        >
          {{ contactPerson.jobTitle }}
        </p>
        <a
          class="body-petite contact-page-form__input-field link"
          href="mailto:post@voorhoede.nl"
        >
          post@voorhoede.nl
        </a>
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
        <div class="contact-page-form__personal-details">
          <div class="contact-page-form__input">
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
          
          <div class="contact-page-form__input">
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
          class="contact-form__button"
          :label="$t('get_in_touch')"
          type="submit"
        />
      </fieldset>
    </form>
  </div>
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
      hasSidebar() {
        return this.title || this.contactPerson
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
    --contact-form-thumbnail-size: 120px;
  }

  .contact-form__header {
    grid-row: 1;
  }

  .contact-form__contact-person {
    display: none;
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
    float: right;
  }

  @media (min-width: 520px) {
    .contact-form__contact-person .responsive-image {
      margin-left: 0;
      margin-right: 0;
    }

    .contact-page-form__personal-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .contact-page-form__input {
      width: 40%;
    }
    
    .contact-page-form__input-field {
      flex-direction: column;
    }
  }

  @media (min-width: 1100px) {
    .contact-form__header {
      grid-column-start: 6;
      grid-column-end: 18;
      margin-bottom: var(--spacing-medium);
    }

    .contact-form__contact-person {
      display: block;
    }

    .contact-form__contact-person .responsive-image {
      width: var(--contact-form-thumbnail-size);
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
