<template>
  <div
    class="contact-form"
    :class="{ 'grid': hasSidebar }"
  >
    <div
      v-if="hasSidebar"
      class="contact-form__header"
    >
      <h2
        v-if="title"
        class="contact-form__header h3"
      >
        {{ title }}
      </h2>
      <div
        v-if="contactPerson"
        class="contact-form__contact-person"
      >
        <dato-image
          class="contact-form__contact-person-image"
          :src="contactPerson.image.url"
          alt=""
          :width="144"
          :height="170"
          loading="lazy"
        />
        <p class="h5">
          {{ contactPerson.name }} {{ contactPerson.lastName }}
        </p>
        <p
          v-if="contactPerson.jobTitle"
          class="body-small"
        >
          {{ contactPerson.jobTitle }}
        </p>
        <a
          class="body-small link"
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
      :action="`/${$i18n.locale}/contact/confirmation/`"
      class="contact-form__form"
      data-netlify="true"
      netlify-honeypot="magic-castle"
      :novalidate="useCustomValidation"
    >
      <fieldset>
        <legend
          v-if="ariaLabelOrTitle"
          class="sr-only"
        >
          {{ ariaLabelOrTitle }}
        </legend>
        <input
          type="hidden"
          name="form-name"
          :value="form['form-name']"
        >
        <input
          type="text"
          name="subject"
          :value="form.name"
          class="hidden"
        >
        <label class="hidden">
          Don't fill this out if you're human:
          <input
            v-model="form.magicCastle"
            name="magic-castle"
          >
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
          :reset-validation="resetValidation"
          :validation-error-message="$t('name_is_required')"
          class="body-small"
        />
        <input-field
          v-model="form.business"
          id="business"
          type="text"
          :label="$t('my_business_is')"
          :placeholder-label="$t('company_name')"
          class="body-small"
        />
        <input-field
          v-model="form.email"
          id="email"
          type="email"
          :label="$t('you_can_email_me_at')"
          :placeholder-label="$t('email_address')"
          required
          :validate="formIsValidated"
          :reset-validation="resetValidation"
          :validation-error-message="emailValidationErrorMessage"
          class="body-small"
        />
        <input-field
          v-model="form.phone"
          id="phone"
          type="tel"
          :label="$t('you_can_call_me_at')"
          :placeholder-label="$t('phone_number')"
          class="body-small"
        />
        <input-field
          textarea
          v-model="form.explanation"
          id="explanation"
          type="text"
          :label="$t('my_project_is')"
          :placeholder-label="$t('project_description')"
          class="body-small"
        />
        <app-button
          @click="trackEvent()"
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
        default: undefined,
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
        resetValidation: false,
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
          this.resetValidation = true
          this.$nextTick(() => {
            this.resetValidation = false
          })
          return false
        }
        submitContactForm({
          form: event.target,
          router: this.$router,
          localeUrl: this.$localeUrl,
        })
      },
      trackEvent () {
        useTrackEvent('Send Contact Form SP');
      },
    }
  }
</script>

<style>
  :root {
    --contact-form-thumbnail-size: 120px;
  }

  .contact-form__header {
    grid-row: 1;
  }

  .contact-form__contact-person {
    display: none;
  }

  .contact-form__contact-person-image {
    margin-bottom: var(--spacing-small);
    width: var(--contact-form-thumbnail-size);
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

  @media (min-width: 1100px) {
    .contact-form__header {
      grid-column-start: 6;
      grid-column-end: 18;
      margin-bottom: var(--spacing-medium);
    }

    .contact-form__contact-person {
      display: block;
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
