<template>
  <section class="get-in-touch-form grid">
    <h2 class="get-in-touch-form__title h3">Let's discuss what we can do - together.</h2>

    <form class="get-in-touch-form__form" method="POST" netlify>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">My name is</span>
        <input class="body" type="text" placeholder="Your name" name="name">
      </label>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">You can email me at</span>
        <input class="body" type="text" placeholder="Email address" name="email">
      </label>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">You can call me on</span>
        <input class="body" type="number" placeholder="Phone number" name="number">
      </label>
      <label class="get-in-touch-form__label">
        <span class="get-in-touch-form__label-text body-petite">My project is</span>
        <input class="body" type="text" placeholder="Short summary of my project" name="explanation">
      </label>
      <app-button
        class="get-in-touch-form__button"
        label="Get in touch"
        type="submit"
      />
    </form>
  </section>
</template>

<script>
  import { AppButton } from '~/components'

  export default {
    components: {
      AppButton
    }
  }
</script>

<style>
  .get-in-touch-form__label:first-of-type {
    margin-top: 0;
  }

  .get-in-touch-form__button {
    margin-top: var(--spacing-larger);
  }

  @media (max-width: 1099px) {
    .get-in-touch-form__title {
      margin-bottom: var(--spacing-medium);
    }
  }

  @media (min-width: 1100px) {
    .get-in-touch-form__title {
      grid-column-start: 6;
      grid-column-end: 18;
    }

    .get-in-touch-form__form {
      grid-column-start: 21;
      grid-column-end: 46;
    }

    .get-in-touch-form__label-text {
      width: 9rem;
    }
  }
</style>
