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
      class="newsletter-form__form"
    >
      <label class="sr-only">
        Don't fill this out if you're human
        <input
          type="text"
          :name="mailchimpFieldnamesMapping.honeypot"
          value=""
        >
      </label>
      <input-field
        :id="mailchimpFieldnamesMapping.firstName"
        type="text"
        :label="$t('my_first_name_is')"
        :placeholder-label="$t('your_first_name')"
        :required="true"
        class="newsletter-form__input-field body"
      />
      <input-field
        :id="mailchimpFieldnamesMapping.email"
        type="email"
        :label="$t('you_can_email_me_at')"
        :placeholder-label="$t('email_address')"
        :required="true"
        class="newsletter-form__input-field body"
      />
      <input-checkbox
        value="Y"
        id="newsletter-form-gdpr"
        :name="mailchimpFieldnamesMapping.gdprConsent"
        :label="$t('newsletter_permission')"
        :required="true"
        class="newsletter-form__input-checkbox body-small"
      />
      <app-button
        @click="trackEvent"
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
        mailchimpFieldnamesMapping: {
          honeypot: 'b_bd1491faa00c5405cce7ba212_76cc576b8d',
          firstName: 'FNAME',
          email: 'EMAIL',
          gdprConsent: 'gdpr[38537]',
        },
      }
    },
    methods: {
      trackEvent() {
        useTrackEvent('Subscribe to newsletter');
      },
    },
  }
</script>

<style>
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
