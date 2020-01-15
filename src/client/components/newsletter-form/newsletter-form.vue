<template>
  <form
    action="https://voorhoede.us20.list-manage.com/subscribe/post?u=bd1491faa00c5405cce7ba212&amp;id=76cc576b8d"
    method="post"
    target="_blank"
    :novalidate="useCustomValidation"
  >
    <input
      type="text"
      name="b_bd1491faa00c5405cce7ba212_76cc576b8d"
      value=""
      class="hidden"
    >
    <input-field
      v-model="form.email"
      id="EMAIL"
      type="text"
      :label="$t('you_can_email_me_at')"
      :placeholder-label="$t('email_address')"
      required
      :validate="formIsValidated"
      :validation-error-message="emailValidationErrorMessage"
      class="newsletter-form__input-field body-detail"
    />
    <input-checkbox
      v-model="form.consent"
      id="gdpr_38537"
      name="gdpr[38537]"
      :label="$t('newsletter_permission')"
      required
      :validate="formIsValidated"
      validation-error-message="Please accept the terms"
      class="newsletter-form__input-field body-detail"
    />
    <app-button
      :label="$t('get_in_touch')"
      type="submit"
      small="true"
    />
  </form>
</template>

<script>
  import AppButton from '../app-button'
  import InputCheckbox from '../input-checkbox'
  import InputField from '../input-field'

  export default {
    components: {
      AppButton, InputCheckbox, InputField,
    },
    data () {
      return {
        form: {
          consent: false,
          email: '',
        },
        formIsValidated: false,
        useCustomValidation: false,
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
      submit(event) {
        this.formIsValidated = true
        if (!event.target.checkValidity()) {
          return false
        }
      }
    },
  }
</script>

<style>
  .newsletter-form__input-field {
    margin-bottom: var(--spacing-small);
  }
</style>
