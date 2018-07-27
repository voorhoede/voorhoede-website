<template>
  <button
    :class="rootClass"
    v-if="to === ''"
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ label }}
    <svg
      v-if="secondary"
      class="app-button__svg"
      width="16"
      height="16"
      viewBox="0 0 15 15">
      <path d="M8.461 7.5L4.177 5.273V3.046l6.646 3.468v1.972l-6.646 3.468V9.727z"/>
    </svg>
  </button>
  <nuxt-link
    v-else
    :class="rootClass"
    v-bind="$attrs"
    v-on="$listeners"
    :to="to"
  >
    {{ label }}
    <svg
      v-if="secondary"
      class="app-button__svg"
      width="16"
      height="16"
      viewBox="0 0 15 15">
      <path d="M8.461 7.5L4.177 5.273V3.046l6.646 3.468v1.972l-6.646 3.468V9.727z"/>
    </svg>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        default: '',
      },
      secondary: {
        type: Boolean,
        default: false,
      },
      small: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      body() {
        return !this.small
      },
      primary() {
        return !this.secondary && !this.small
      },
      rootClass() {
        return {
          'app-button': true,
          'body': this.body,
          'body-petite': this.small,
          'app-button--primary': this.primary,
          'app-button--secondary': this.secondary,
          'app-button--small': this.small,
        }
      },
    },
  }
</script>

<style>
  .app-button {
    display: inline-block;
    background: none;
    border: 0;
    text-decoration: none;
    cursor: pointer;
  }

  .app-button--primary {
    color: var(--white);
    background: var(--html-blue);
    border-radius: 3px;
    width: 100%;
    min-width: 14.375rem;
    padding: 0.75rem 1.5625rem;
    transition: 200ms transform ease-in-out;
  }

  .app-button--primary:hover,
  .app-button--primary:focus,
  .app-button--primary.app-button--hover {
    transform: scale(1.03);
  }

  .app-button--primary:active,
  .app-button--primary.app-button--active {
    background-color: var(--active-blue);
    transform: scale(0.95);
    transition: 100ms transform ease-in-out;
  }

  .app-button--primary:disabled,
  .app-button--primary[disabled] {
    pointer-events: none;
    transform: scale(1);
    background-color: var(--v-dim);
  }

  .app-button--secondary {
    color: var(--html-blue);
  }

  .app-button--secondary:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: var(--brand-yellow);
    transform: scaleX(0);
    transform-origin: left;
    transition: 200ms transform ease-in-out;
  }

  .app-button--secondary:hover:after,
  .app-button--secondary:focus:after,
  .app-button--secondary:active:after,
  .app-button--secondary.app-button--hover:after,
  .app-button--secondary.app-button--active:after {
    transform: scaleX(1);
  }

  .app-button--secondary:active,
  .app-button--secondary--active {
    color: var(--active-blue);
  }

  .app-button--secondary:disabled,
  .app-button--secondary[disabled] {
    pointer-events: none;
    color: var(--v-dim);
  }

  .app-button--small {
    color: var(--white);
    background: var(--html-blue);
    border-radius: 3px;
    padding: 0.375rem 0.9375rem;
    transition: 200ms transform ease-in-out;
  }

  .app-button--small:hover,
  .app-button--small:focus,
  .app-button--small--hover {
    transform: scale(1.05);
  }

  .app-button--small:active,
  .app-button--small--active {
    background-color: var(--active-blue);
    transform: scale(0.9);
    transition: 100ms transform ease-in-out;
  }

  .app-button--small:disabled,
  .app-button--small[disabled] {
    pointer-events: none;
    transform: scale(1);
    background-color: var(--v-dim);
  }

  .app-button--yellow {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .app-button--yellow:active,
  .app-button--yellow--active {
    background-color: #e9d100;
  }

  .app-button__svg {
    vertical-align: middle;
    fill: var(--html-blue);
  }

  .app-button--secondary:disabled .app-button__svg,
  .app-button--secondary[disabled] .app-button__svg {
    fill: var(--v-dim);
  }

</style>
