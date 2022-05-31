<template>
  <section
    class="leads-form grid"
    :class="{ 'leads-form--has-background': hasBackground }"
  >
    <form
      @submit="submit"
      :action="action"
      method="post"
      target="_blank"
      :novalidate="useCustomValidation"
      class="leads-form__form"
    >
      <input-field
        v-model="form.name"
        :id="mailchimpFieldnamesMapping.firstName"
        type="text"
        :label="$t('my_first_name_is')"
        :placeholder-label="$t('your_first_name')"
        required
        :validate="formIsValidated"
        :reset-validation="resetValidation"
        :validation-error-message="$t('name_is_required')"
        class="leads-form__input-field body"
      />
      <input-field
        v-model="form.email"
        :id="mailchimpFieldnamesMapping.email"
        type="email"
        :label="$t('you_can_email_me_at')"
        :placeholder-label="$t('email_address')"
        required
        :validate="formIsValidated"
        :reset-validation="resetValidation"
        :validation-error-message="emailValidationErrorMessage"
        class="leads-form__input-field body"
      />
      <label class="hidden">
        Don't uncheck this if you're human
        <input
          type="checkbox"
          :value="mailchimpGroup.value"
          :name="mailchimpGroup.name"
          :id="mailchimpGroup.id"
          checked>
      </label>
      <label class="hidden">
        Don't fill this out if you're human
        <input
          type="text"
          :name="mailchimpFieldnamesMapping.honeypot"
          tabindex="-1"
          value="">
      </label>
      <input-checkbox
        v-model="form.consent"
        value="Y"
        id="leads-form-gdpr-consent"
        :name="mailchimpFieldnamesMapping.gdprConsent"
        :label="$t('leads_form_consent')"
        required
        :validate="formIsValidated"
        :reset-validation="resetValidation"
        :validation-error-message="$t('leads_consent_is_required')"
        class="leads-form__input-checkbox body-small"
      />
      <app-button
        :label="buttonLabel"
        type="submit"
        :small="true"
        class="leads-form__button"
      />
    </form>
  </section>
</template>

<script>
  export default {
    props: {
      buttonLabel: {
        type: String,
        default: 'Download',
      },
      mailchimpGroup: {
        type: Object,
        default: () => {},
      },
      hasBackground: {
        type: Boolean,
        required: false,
      },
    },
    data () {
      return {
        action: 'https://voorhoede.us20.list-manage.com/subscribe/post?u=bd1491faa00c5405cce7ba212&amp;id=76cc576b8d',
        form: {
          consent: false,
          email: '',
          name: '',
        },
        mailchimpFieldnamesMapping: {
          firstName: 'FNAME',
          email: 'EMAIL',
          honeypot: 'b_bd1491faa00c5405cce7ba212_76cc576b8d',
          gdprConsent: 'leads-form-gdpr_38537',
        },
        formIsValidated: false,
        resetValidation: false,
        useCustomValidation: false,
      }
    },
    computed: {
      emailValidationErrorMessage() {
        return this.form.email ? this.$t('provide_valid_email') : this.$t('email_is_required')
      },
    },
    mounted () {
      this.useCustomValidation = true
    },
    methods: {
      submit(event) {
        this.formIsValidated = true

        if (!event.target.checkValidity()) {
          event.preventDefault()
          this.resetValidation = true
          this.$nextTick(() => {
            this.resetValidation = false
          })
          return false
        }
      },
    },
  }
</script>

<style>
  .leads-form {
    grid-column-start: var(--grid-page-start);
    grid-column-end: var(--grid-page-end);
  }

  .leads-form--has-background {
    background-color: var(--bg-pastel);
  }

  .leads-form__title {
    grid-column-start: var(--grid-content-narrow-start);
    grid-column-end: var(--grid-content-narrow-end);
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
      grid-column-start: var(--grid-content-smallest-start);
      grid-column-end: var(--grid-content-smallest-end);
      flex-wrap: wrap;
      max-width: 100%;
    }

    .input-field.leads-form__input-field + .input-field.leads-form__input-field,
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
      grid-column-start: var(--grid-content-smallest-start);
      grid-column-end: var(--grid-content-smallest-end);
    }

    .leads-form .leads-form__input-field {
      display: block;
    }
  }
</style>
