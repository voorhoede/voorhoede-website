<template>
  <div
    class="contact-form"
    :class="{ grid: hasSidebar }"
  >
    <div
      v-if="hasSidebar"
      class="contact-form__header"
    >
      <h2
        v-if="title"
        class="contact-form__header h3"
      >
        {{ title }}
      </h2>
      <div
        v-if="contactPerson"
        class="contact-form__contact-person"
      >
        <dato-image
          class="contact-form__contact-person-image"
          :src="contactPerson.image.url"
          alt=""
          :width="144"
          :height="192"
          loading="lazy"
          :quality="75"
        />
        <p class="h5">
          {{ contactPerson.name }} {{ contactPerson.lastName }}
        </p>
        <p
          v-if="contactPerson.jobTitle"
          class="body-small"
        >
          {{ contactPerson.jobTitle }}
        </p>
        <a
          class="body-small link"
          href="mailto:post@voorhoede.nl"
        >
          post@voorhoede.nl
        </a>
      </div>
    </div>
    <form
      class="contact-form__form"
      method="POST"
      action="/api/contact/"
    >
      <label class="sr-only">
        <span>Don't fill this out if you're human:</span>
        <input
          type="url"
          name="url-page"
        >
      </label>
      <label class="input-field">
        <span class="input-field__label">{{ $t("my_name_is") }}</span>
        <input
          class="body"
          type="text"
          name="name"
          required
          :placeholder="$t('your_name')"
        >
      </label>
      <label class="input-field">
        <span class="input-field__label">{{ $t("my_business_is") }}</span>
        <input
          class="body"
          type="text"
          name="business"
          :placeholder="$t('company_name')"
        >
      </label>
      <label class="input-field">
        <span class="input-field__label">{{ $t("you_can_email_me_at") }}</span>
        <input
          class="body"
          type="text"
          name="email"
          required
          :placeholder="$t('email_address')"
        >
      </label>
      <label class="input-field">
        <span class="input-field__label">{{ $t("you_can_call_me_at") }}</span>
        <input
          class="body"
          type="text"
          name="phone"
          :placeholder="$t('phone_number')"
        >
      </label>
      <label class="input-field">
        <span class="input-field__label">{{ $t("my_project_is") }}</span>
        <textarea
          class="body"
          type="text"
          name="explanation"
          rows="5"
          required
          :placeholder="$t('project_description')"
        />
      </label>
      <app-button
        @click="trackEvent()"
        class="contact-form__button"
        :label="$t('get_in_touch')"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    contactPerson: {
      type: Object,
      default: undefined,
      validator(contactPerson) {
        return (
          !contactPerson ||
          (typeof contactPerson.name === "string" &&
            typeof contactPerson.lastName === "string" &&
            typeof contactPerson.image === "object")
        );
      },
    },
  },
  computed: {
    hasSidebar() {
      return this.title || this.contactPerson;
    },
  },
  methods: {
    trackEvent() {
      useTrackEvent("Send Contact Form SP");
    },
  },
};
</script>

<style>
:root {
  --contact-form-thumbnail-size: 144px;
}

.contact-form__header {
  grid-row: 1;
}

.contact-form__contact-person {
  display: none;
}

.contact-form__contact-person-image {
  margin-bottom: var(--spacing-small);
  width: var(--contact-form-thumbnail-size);
}

.contact-form__header ~ .contact-form__form {
  grid-row: 2;
}

.contact-form__label:first-of-type {
  margin-top: 0;
}

.contact-form__button {
  margin-top: var(--spacing-larger);
}

@media (min-width: 1100px) {
  .contact-form__header {
    grid-column-start: 6;
    grid-column-end: 18;
    margin-bottom: var(--spacing-medium);
  }

  .contact-form__contact-person {
    display: block;
  }

  .contact-form__header ~ .contact-form__form {
    grid-column-start: 21;
    grid-column-end: 46;
    grid-row: 1;
  }

  .contact-form__header ~ .contact-form__form > .contact-form__label-text {
    width: 9rem;
  }
}
</style>
