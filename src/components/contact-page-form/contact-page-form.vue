<template>
  <form
    method="POST"
    name="get-in-touch"
    :action="`/${$i18n.locale()}/contact/confirmation/`"
    class="contact-page-form__form"
    data-netlify="true"
    data-netlify-honeypot="url-page"
  >
    <fieldset>
      <legend class="sr-only">
        {{ title }}
      </legend>
      <div class="contact-page-form__personal-details">
        <div class="contact-page-form__column">
          <input
            type="hidden"
            name="form-name"
            value="get-in-touch"
          >
          <label class="sr-only">
            Don't fill this out if you're human:
            <input
              name="url-page"
              type="url"
            >
          </label>
          <label class="input-field contact-page-form__input-field body-small">
            <span class="input-field__label">{{ $t('my_name_is') }}</span>
            <input
              name="name"
              type="text"
              :placeholder="$t('your_name')"
              required
              class="input-field__input body"
            >
          </label>
          <label class="input-field contact-page-form__input-field body-small">
            <span class="input-field__label">{{ $t('my_business_is') }}</span>
            <input
              name="business"
              type="text"
              :placeholder="$t('company_name')"
              class="input-field__input body"
            >
          </label>
        </div>

        <div class="contact-page-form__column">
          <label class="input-field contact-page-form__input-field body-small">
            <span class="input-field__label">{{ $t('you_can_email_me_at') }}</span>
            <input
              name="email"
              type="email"
              :placeholder="$t('email_address')"
              required
              class="input-field__input body"
            >
          </label>
          <label class="input-field contact-page-form__input-field body-small">
            <span class="input-field__label">{{ $t('you_can_call_me_at') }}</span>
            <input
              name="phone"
              type="tel"
              :placeholder="$t('phone_number')"
              class="input-field__input body"
            >
          </label>
        </div>
      </div>

      <label class="input-field contact-page-form__input-field body-small">
        <span class="input-field__label">{{ $t('my_project_is') }}</span>
        <textarea
          name="explanation"
          type="text"
          :placeholder="$t('project_description')"
          class="input-field__input body"
          rows="4"
        />
      </label>
      <app-button
        @click="trackEvent()"
        class="contact-page-form__button"
        :label="$t('get_in_touch')"
        type="submit"
      />
    </fieldset>
  </form>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    methods: {
      trackEvent () {
        useTrackEvent('Send Contact Form CP');
      },
    }
  }
</script>

<style>
  :root {
    --contact-page-form-thumbnail-size: 120px;
  }

  .contact-page-form__contact-person {
    display: none;
  }

  .contact-page-form__contact-person .responsive-image {
    margin-bottom: var(--spacing-small);
    width: var(--contact-page-form-thumbnail-size-small);
  }

  .contact-page-form__label:first-of-type {
    margin-top: 0;
  }

  .contact-page-form__button {
    margin-top: var(--spacing-large);
    margin-bottom: var(--spacing-small);
  }

  @media (min-width: 520px) {
    .contact-page-form__contact-person .responsive-image {
      margin-left: 0;
      margin-right: 0;
    }

    .contact-page-form__personal-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .contact-page-form__column {
      width: calc(50% - var(--spacing-medium));
    }

    .contact-page-form__form .contact-page-form__input-field {
      display: block;
      margin: var(--spacing-large) 0;
    }
  }

  @media (min-width: 1100px) {
    .contact-page-form__contact-person {
      display: block;
    }

    .contact-page-form__contact-person .responsive-image {
      width: var(--contact-page-form-thumbnail-size);
    }
  }
</style>
