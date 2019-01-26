<template>
  <form
    @submit.prevent="submit"
    method="POST"
    :name="form['form-name']"
    :action="confirmationPageUrl"
    class="contact-form"
    data-netlify="true"
    netlify-honeypot="magic-castle"
    :novalidate="useCustomValidation">
    <fieldset class="contact-form__fieldset">
      <legend class="h4">{{ subjectTitle }}</legend>
      <input type="hidden" name="form-name" :value="form['form-name']">
      <label class="hidden">
        Don't fill this out if you're human:
        <input v-model="form.magicCastle" name="magic-castle">
      </label>
      <input-field
        textarea
        v-model="form.projectDescription"
        id="projectDescription"
        class="contact-form__description body"
        :label="projectLabel"
        type="text"
        :placeholder-label="projectPlaceholder"
        required
        :validate="formIsValidated"
        :validation-error-message="projectErrorMessage"
      />
    </fieldset>
    <fieldset class="contact-form__fieldset">
      <legend class="h4">{{ contactTitle }}</legend>
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
        v-model="form.business"
        id="business"
        type="text"
        :label="businessLabel"
        :placeholder-label="businessPlaceholder"
        :validate="formIsValidated"
      />
      <input-field
        v-model="form.website"
        id="website"
        type="text"
        :label="websiteLabel"
        :placeholder-label="websitePlaceholder"
        :validate="formIsValidated"
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
    </fieldset>
    <app-button
      class="contact-form__button"
      :label="$t('get_in_touch')"
      type="submit"
    />
  </form>
</template>

<script>
  import { AppButton, InputField } from '~/components'
  import submitContactForm from '../../lib/submit-contact-form'

  const greyOutFirstOption = ({ target }) => {
    const { selectedIndex } = target
    if (typeof selectedIndex !== 'number') {
      return
    }
    target.classList.toggle('greyed-out', selectedIndex === 0)
  }

  export default {
    components: { AppButton, InputField },
    directives: {
      greyedOutFirst: {
        bind(el){
          el.addEventListener('change', greyOutFirstOption)
        },
        unbind(el) {
          el.removeEventListener('change', greyOutFirstOption)
        }
      }
    },
    props: {
      subjectTitle: {
        type: String,
        required: true
      },
      contactTitle: {
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
      businessLabel: {
        type: String,
        required: true
      },
      businessPlaceholder: {
        type: String,
        required: true
      },
      websiteLabel: {
        type: String,
        required: true
      },
      websitePlaceholder: {
        type: String,
        required: true
      },
      projectLabel: {
        type: String,
        required: true
      },
      projectPlaceholder: {
        type: String,
        required: true
      },
      projectErrorMessage: {
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
          'form-name': 'contact-page-form',
          projectDescription: '',
          name: '',
          business: '',
          website: '',
          email: '',
          phone: '',
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

  .greyed-out {
    color: var(--very-dim);
  }

  .contact-form__fieldset {
    margin-bottom: var(--spacing-large);
  }
</style>
