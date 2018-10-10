<template>
  <form
    @submit.prevent="submit"
    method="POST"
    name="contact-form"
    :action="confirmationPageUrl"
    class="contact-form"
    data-netlify="true"
    netlify-honeypot="magic-castle"
  >
    <fieldset class="contact-form__fieldset">
      <legend class="h4">{{ subjectTitle }}</legend>
      <input type="hidden" name="form-name" value="contact-form">
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
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ nameLabel }}</span>
        <input type="text" class="body" name="name" v-model="form.name" :placeholder="namePlaceholder">
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ businessLabel }}</span>
        <input type="text" class="body" name="business" v-model="form.business" :placeholder="businessPlaceholder">
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ websiteLabel }}</span>
        <input class="body" type="text" name="website" v-model="form.website" :placeholder="websitePlaceholder">
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ emailLabel }}</span>
        <input class="body" type="email" name="email" v-model="form.email" :placeholder="emailPlaceholder">
      </label>
      <label class="contact-form__label">
        <span class="contact-form__label-text body-petite">{{ phoneLabel }}</span>
        <input class="body" type="phone" name="phone" v-model="form.phone" :placeholder="phonePlaceholder">
      </label>
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
import { AppButton } from '~/components'
import submitContactForm from '../../lib/submit-contact-form'

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
      }
    }
  },
  computed: {
    ...mapState([
      'currentLocale',
    ]),
    confirmationPageUrl() {
      return '/' + this.currentLocale + '/contact/confirmation/'
    }
  },
  methods: {
    submit() {
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
