<template>
  <form @submit.prevent="onFormSubmit" method="POST" name="contact-form" class="contact-form" data-netlify="true" netlify-honeypot="magic-castle" novalidate>
    <fieldset class="contact-form__fieldset">
      <legend class="h4">{{ subjectTitle }}</legend>
      <input type="hidden" name="form-name" value="contact-form">
      <label class="hidden">
        Don't fill this out if you're human:
        <input name="magic-castle">
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ subjectLabel }}</span>
        <select class="body greyed-out" type="select" name="need-help-with" v-greyed-out-first>
          <option v-for="subject in subjectOptions" :key="subject.value" :value="subject.value">{{ subject.label }}</option>
        </select>
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ budgetLabel }}</span>
        <select class="body greyed-out" type="select" name="budget-of" v-greyed-out-first>
          <option v-for="option in budgetOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ projectLabel }}</span>
        <textarea rows="5" class="contact-form__description body" type="text" name="project-description" :placeholder="projectPlaceholder"/>
      </label>
    </fieldset>
    <fieldset class="contact-form__fieldset">
      <legend class="h4">{{ contactTitle }}</legend>
      <input-field
        v-model="name"
        id="name"
        type="text"
        :label="nameLabel"
        :placeholder-label="namePlaceholder"
        required
        :validate="formIsValidated"
        validation-error-message="Your name is required"
      />
      <input-field
        id="business"
        type="text"
        :label="businessLabel"
        :placeholder-label="businessPlaceholder"
        :validate="formIsValidated"
      />
      <input-field
        id="website"
        type="text"
        :label="websiteLabel"
        :placeholder-label="websitePlaceholder"
        :validate="formIsValidated"
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
        validation-error-message="Your phone is required"
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
import { AppButton, InputField } from '~/components'

const greyOutFirstOption = ({ target }) => {
  const { selectedIndex } = target
  if (typeof selectedIndex !== 'number') {
    return
  }
  target.classList.toggle('greyed-out', selectedIndex === 0)
}

export default {
  components: {
    AppButton,
    InputField,
  },
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
      name: '',
      email: '',
      phone: '',
      formIsValidated: false,
    }
  },
  computed: {
    emailValidationErrorMessage() {
      return this.email ? 'Please provide a valid e-mail address' : 'Your e-mail address is required'
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

select {
  -webkit-appearance: none;
}

.greyed-out {
  color: var(--very-dim);
}

.hidden {
  display: none;
}

.contact-form__fieldset {
  margin-bottom: var(--spacing-large);
}

.contact-form__description {
  resize: none;
}
</style>
