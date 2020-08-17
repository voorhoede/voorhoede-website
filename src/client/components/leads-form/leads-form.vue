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
        id="FNAME"
        type="text"
        :label="$t('my_first_name_is')"
        :placeholder-label="$t('your_first_name')"
        class="leads-form__input-field body"
      />
      <input-field
        v-model="form.email"
        id="EMAIL"
        type="email"
        :label="$t('you_can_email_me_at')"
        :placeholder-label="$t('email_address')"
        class="leads-form__input-field body"
      />
      <input
        type="checkbox"
        :value="mailchimpGroup.value"
        :name="mailchimpGroup.name"
        :id="mailchimpGroup.id"
        class="hidden"
        checked>
      <input
        type="text"
        name="b_bd1491faa00c5405cce7ba212_76cc576b8d"
        tabindex="-1"
        class="hidden"
        value="">
      <input-checkbox
        v-model="form.consent"
        value="Y"
        id="leads-form-gdpr_38537"
        name="gdpr[38537]"
        :label="$t('leads_form_consent')"
        required
        :validate="formIsValidated"
        :validation-error-message="$t('leads_form_consent')"
        class="leads-form__input-checkbox body-petite"
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
        default: () => {},
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
        formIsValidated: false,
        useCustomValidation: false,
      }
    },
    mounted () {
      this.useCustomValidation = true
    },
    methods: {
      submit(event) {
        this.formIsValidated = true

        if (!event.target.checkValidity()) {
          event.preventDefault()
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
    background-color: var(--white);
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
