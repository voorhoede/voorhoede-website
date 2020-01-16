<template>
  <section
    class="newsletter-form grid"
    :class="{ 'newsletter-form--no-background': noBackground }"
  >
    <h2 class="newsletter-form__title h3">
      {{ $t('newsletter') }}
    </h2>
    <form
      @submit="submit"
      action="https://voorhoede.us20.list-manage.com/subscribe/post?u=bd1491faa00c5405cce7ba212&amp;id=76cc576b8d"
      method="post"
      target="_blank"
      :novalidate="useCustomValidation"
      class="newsletter-form__form"
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
        type="email"
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
        :validation-error-message="$t('newsletter_permission')"
        class="newsletter-form__input-field body-detail"
      />
      <app-button
        :label="$t('subscribe')"
        type="submit"
        :small="true"
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
      AppButton, InputCheckbox, InputField,
    },
    props: {
      noBackground: {
        type: Boolean,
        required: false
      }
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
          event.preventDefault()
          return false
        }
      }
    },
  }
</script>

<style>
  .newsletter-form {
    grid-column-start: 1;
    grid-column-end: 51;
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
    background-color: var(--bg-pastel);
  }

  .newsletter-form--no-background {
    background-color: var(--white);
  }

  .newsletter-form__title,
  .newsletter-form__form {
    grid-column-start: 10;
    grid-column-end: 41;
  }

  .newsletter-form__title {
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .newsletter-form__input-field {
    margin-bottom: var(--spacing-small);
  }
</style>
