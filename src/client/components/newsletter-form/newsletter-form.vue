<template>
  <section
    class="newsletter-form grid"
    :class="{ 'newsletter-form--has-background': hasBackground }"
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
      <label class="hidden">
        Don't fill this out if you're human
        <input
          type="text"
          :name="mailchimpFieldnamesMapping.honeypot"
          value=""
        >
      </label>
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
        class="newsletter-form__input-field body"

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
        class="newsletter-form__input-field body"
      />
      <input-checkbox
        v-model="form.consent"
        value="Y"
        id="newsletter-form-gdpr"
        :name="mailchimpFieldnamesMapping.gdprConsent"
        :label="$t('newsletter_permission')"
        required
        :validate="formIsValidated"
        :reset-validation="resetValidation"
        :validation-error-message="$t('newsletter_consent_is_required')"
        class="newsletter-form__input-checkbox body-petite"
      />
      <app-button
        @click.native="trackEvent()"
        :label="$t('subscribe')"
        type="submit"
        :small="true"
        class="newsletter-form__button"
      />
    </form>
  </section>
</template>

<script>
  export default {
    props: {
      hasBackground: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        form: {
          consent: false,
          email: '',
          name: '',
        },
        mailchimpFieldnamesMapping: {
          honeypot: 'b_bd1491faa00c5405cce7ba212_76cc576b8d',
          firstName: 'FNAME',
          email: 'EMAIL',
          gdprConsent: 'gdpr[38537]',
        },
        formIsValidated: false,
        resetValidation: false,
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
      trackEvent () {
        const formValidationState = this.formIsValidated ? 'success' : 'failed'
        return this.$ga.event('Newsletter form', 'click submit', formValidationState, 0)
      },
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
    }
  }
</script>

<style>
  @import '../forms/forms.css';

  .newsletter-form {
    grid-column-start: 1;
    grid-column-end: 51;
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-larger);
  }

  .newsletter-form--has-background {
    background-color: var(--bg-pastel);
  }

  .newsletter-form__title {
    grid-row: 1;
    grid-column-start: 6;
    grid-column-end: 46;
    margin-bottom: var(--spacing-medium);
    text-align: center;
  }

  .newsletter-form__form {
    grid-row: 2;
    margin: 0 auto;
    max-width: 400px;
    text-align: left;
  }

  .newsletter-form__input-field,
  .newsletter-form__input-checkbox {
    margin-bottom: var(--spacing-small);
  }

  @media (min-width: 900px) {
    .newsletter-form__form {
      display: flex;
      flex-wrap: wrap;
      grid-column-start: 12;
      grid-column-end: 40;
      max-width: 100%;
    }

    .input-field.newsletter-form__input-field + .input-field.newsletter-form__input-field,
    .input-field.newsletter-form__input-field {
      order: 1;
      flex: 1 1 33%;
      margin-top: 0;
      margin-right: var(--spacing-medium);
      margin-bottom: var(--spacing-medium);
      margin-left: 0;
    }

    .newsletter-form__button {
      order: 2;
      flex: 0 0 auto;
      align-self: flex-end;
      margin-bottom: var(--spacing-medium);
    }

    .newsletter-form__input-checkbox {
      order: 3;
      max-width: 450px;
    }
  }

  @media (min-width: 1100px) {
    .newsletter-form__form {
      grid-column-start: 12;
      grid-column-end: 40;
    }

    .newsletter-form .newsletter-form__input-field {
      display: block;
    }
  }
</style>
