<template>
  <form
    @submit.prevent="submit"
    method="POST"
    :name="form['form-name']"
    :action="confirmationPageUrl"
    class="contact-form"
    data-netlify="true"
    netlify-honeypot="magic-castle"
    novalidate
  >
    <fieldset class="contact-form__fieldset">
      <legend class="h4">{{ subjectTitle }}</legend>
      <input type="hidden" name="form-name" :value="form['form-name']">
      <label class="hidden">
        Don't fill this out if you're human:
        <input v-model="form.magicCastle" name="magic-castle">
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ subjectLabel }}</span>
        <select class="body greyed-out" type="select" name="need-help-with" v-model="form.needHelpWith" v-greyed-out-first>
          <option v-for="subject in subjectOptions" :key="subject.value" :value="subject.value">{{ subject.label }}</option>
        </select>
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ budgetLabel }}</span>
        <select class="body greyed-out" type="select" name="budget-of" v-model="form.budgetOf" v-greyed-out-first>
          <option v-for="option in budgetOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ projectLabel }}</span>
        <textarea rows="5" class="contact-form__description body" type="text" name="project-description" v-model="form.projectDescription" :placeholder="projectPlaceholder"/>
      </label>
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
      :label="ctaLabel"
      type="submit"
    />
  </form>
</template>

<script>
  import { mapState } from 'vuex'
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
      subjectLabel: {
        type: String,
        required: true
      },
      subjectOptions: {
        type: Array,
        required: true
      },
      budgetLabel: {
        type: String,
        required: true
      },
      budgetOptions: {
        type: Array,
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
      ctaLabel: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        form: {
          'form-name': 'contact-page-form',
          needHelpWith: '',
          budgetOf: '',
          projectDescription: '',
          name: '',
          business: '',
          website: '',
          email: '',
          phone: '',
        },
        formIsValidated: false,
      }
    },
    computed: {
      ...mapState([
        'currentLocale',
      ]),
      confirmationPageUrl() {
        return '/' + this.currentLocale + '/contact/confirmation/'
      },
      emailValidationErrorMessage() {
        return this.form.email ? this.emailErrorMessageIncorrect : this.emailErrorMessageEmpty
      },
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
          currentLocale: this.currentLocale
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

  .contact-form__description {
    resize: vertical;
  }
</style>
