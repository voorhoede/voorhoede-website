<template>
  <section
    class="leads-form grid"
    :class="{ 'leads-form--no-background': noBackground }"
  >
    <form
      ref="leadsForm"
      @submit="submit"
      target="_blank"
      :novalidate="useCustomValidation"
      class="leads-form__form"
    >
      <input-field
        v-model="form.name"
        id="leads-form_name"
        type="text"
        :label="$t('my_first_name_is')"
        :placeholder-label="$t('your_first_name')"
        class="leads-form__input-field body"
      />
      <input-field
        v-model="form.email"
        id="leads-form_email"
        type="email"
        :label="$t('you_can_email_me_at')"
        :placeholder-label="$t('email_address')"
        required
        :validate="formIsValidated"
        :validation-error-message="emailValidationErrorMessage"
        class="leads-form__input-field body"
      />
      <input-checkbox
        v-model="form.consent"
        value="consent"
        id="consent"
        name=""
        :label="$t('leads_form_consent')"
        required
        :validate="formIsValidated"
        :validation-error-message="$t('leads_form_consent')"
        class="leads-form__input-checkbox body-petite"
      />
      <app-button
        :label="pendingSubmit ? $t('leads_form_pending') : buttonLabel"
        type="submit"
        :small="true"
        class="leads-form__button"
        :disabled="pendingSubmit"
      />
    </form>
    <div v-if="submitSucces || submitError" class="leads-form__message">
      <p v-if="submitSucces" class="body">{{ $t('leads_form_succes') }}</p>
      <p v-if="submitError" class="body">{{ $t('leads_form_error') }}</p>
    </div>
  </section>
</template>

<script>
  import fetch from 'node-fetch'
  import AppButton from '../app-button'
  import InputCheckbox from '../input-checkbox'
  import InputField from '../input-field'

  export default {
    components: {
      AppButton,
      InputCheckbox,
      InputField,
    },
    props: {
      buttonLabel: {
        type: String,
        default: 'Download',
      },
      file: {
        type: Object,
        default: () => {}
      },
      noBackground: {
        type: Boolean,
        required: false
      },
    },
    data () {
      return {
        url: 'https://script.google.com/a/voorhoede.nl/macros/s/AKfycbysdL21dgl951PdtkT7qo8KBPvDovo0OkdULVi7bA/exec',
        form: {
          consent: false,
          email: '',
          name: '',
        },
        formIsValidated: false,
        useCustomValidation: false,
        pendingSubmit: false,
        submitSucces: false,
        submitError: false,
      }
    },
    computed: {
      emailValidationErrorMessage() {
        return this.form.email ? this.$t('provide_valid_email') : this.$t('email_is_required')
      }
    },
    mounted () {
      this.useCustomValidation = true
    },
    methods: {
      downloadFile() {
        const clickEvent = new MouseEvent('click')
        const element = document.createElement('a')

        element.href = this.file.url
        element.download = this.file.filename
        element.dispatchEvent(clickEvent)
      },
      submit(event) {
        this.formIsValidated = true

        if (!event.target.checkValidity()) {
          event.preventDefault()
          return false
        } else {
          event.preventDefault()
          this.pendingSubmit = true
          this.postFormData()
        }
      },
      postFormData() {
        const formData = new FormData(this.$refs.leadsForm)

        fetch(this.url, { method: 'POST', body: formData })
          .then(res => {
            if (res.status === 200) {
              this.pendingSubmit = false
              this.submitSucces = true

              this.downloadFile()
            }
          })
          .catch(err => {
            this.pendingSubmit = false
            this.submitError = true

            console.error('Error!', err.message)
          })
      },
    },
  }
</script>

<style>
  .leads-form {
    grid-column-start: 1;
    grid-column-end: 51;
    background-color: var(--bg-pastel);
  }

  .leads-form--no-background {
    background-color: var(--white);
  }

  .leads-form__title {
    grid-column-start: 6;
    grid-column-end: 46;
    grid-row: 1;
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .leads-form__form {
    grid-row: 2;
    max-width: 400px;
    margin: 0 auto;
    text-align: left;
  }

  .leads-form__input-field,
  .leads-form__input-checkbox {
    margin-bottom: var(--spacing-small);
  }

  .leads-form__message {
    grid-row: 3;
    color: var(--html-blue);
  }

  @media (min-width: 900px) {
    .leads-form__form {
      display: flex;
      grid-column-start: 12;
      grid-column-end: 40;
      flex-wrap: wrap;
      max-width: 100%;
    }

    .input-field.leads-form__input-field {
      flex: 1 1 auto;
      order: 1;
      margin: 0 var(--spacing-medium) var(--spacing-medium) 0;
    }

    .leads-form__button {
      flex: 0 0 auto;
      align-self: flex-end;
      order: 2;
      margin-bottom: var(--spacing-medium);
    }

    .leads-form__input-checkbox {
      order: 3;
      max-width: 450px;
    }
  }

  @media (min-width: 1100px) {
    .leads-form__form {
      grid-column-start: 12;
      grid-column-end: 40;
    }

    .leads-form .leads-form__input-field {
      display: block;
    }
  }
</style>
