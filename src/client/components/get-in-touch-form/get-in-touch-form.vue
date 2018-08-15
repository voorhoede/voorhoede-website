<template>
  <section class="get-in-touch-form grid">
    <h2 class="get-in-touch-form__title h3">Let's discuss what we can do - together.</h2>

    <form class="get-in-touch-form__form">
      <label>
        <span class="get-in-touch-form__label-text body-petite">My name is</span>
        <input class="body" type="text" placeholder="Your name">
      </label>
      <label>
        <span class="get-in-touch-form__label-text body-petite">You can email me at</span>
        <input class="body" type="text" placeholder="Email address">
      </label>
      <label>
        <span class="get-in-touch-form__label-text body-petite">You can call me on</span>
        <input class="body" type="number" placeholder="Phone number">
      </label>
      <label>
        <span class="get-in-touch-form__label-text body-petite">My project is</span>
        <input class="body" type="text" placeholder="Short summary of my project">
      </label>
      <app-button
        label="Get in touch"
        class="get-in-touch-form__button"
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
  .get-in-touch-form__button {
    margin-top: var(--spacing-larger);
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
