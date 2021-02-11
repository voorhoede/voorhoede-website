<template>
  <button
    :class="rootClass"
    v-if="to === ''"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span v-if="primary || small">{{ label }}</span>
    <template v-else>{{ label }}</template>
    <svg
      v-if="secondary"
      class="app-button__svg"
      width="16"
      height="16"
      viewBox="0 0 15 15">
      <path d="M8.461 7.5L4.177 5.273V3.046l6.646 3.468v1.972l-6.646 3.468V9.727z"/>
    </svg>
  </button>
  <a
    v-else-if="external"
    :class="rootClass"
    v-bind="$attrs"
    v-on="$listeners"
    :href="to"
    target="_blank"
    rel="noreferrer noopener"
  >
    <span v-if="primary || small">{{ label }}</span>
    <template v-else>{{ label }}</template>
    <svg
      v-if="secondary"
      class="app-button__svg"
      width="16"
      height="16"
      viewBox="0 0 15 15">
      <path d="M8.461 7.5L4.177 5.273V3.046l6.646 3.468v1.972l-6.646 3.468V9.727z"/>
    </svg>
  </a>
  <nuxt-link
    v-else
    :class="rootClass"
    v-bind="$attrs"
    v-on="$listeners"
    :to="to"
  >
    <span v-if="primary || small">{{ label }}</span>
    <template v-else>{{ label }}</template>
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
        type: [String, Object],
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
      external: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      primary() {
        return !this.secondary && !this.small
      },
      rootClass() {
        return {
          'app-button': true,
          'body': !this.small,
          'app-button--primary font-bold': this.primary,
          'app-button--secondary': this.secondary,
          'app-button--small body-petite font-bold': this.small,
          'font-bold': this.secondary,
        }
      },
    },
  }
</script>

<style>
  :root {
    --app-button-duration: .15s;
  }

  .app-button {
    display: inline-block;
    background: none;
    border: 0;
    text-align: center;
    text-decoration: none;
    line-height: 1.18;
    white-space: nowrap;
    cursor: pointer;
  }

  .app-button > span {
    position: relative;
    z-index: 2;
  }

  .app-button--primary,
  .app-button--small {
    position: relative;
    color: var(--white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app-button--primary {
    width: 100%;
    min-width: 14.375rem;
    padding: .8rem 1.5625rem .7rem 1.5625rem;
  }

  .app-button--small {
    padding: .375rem .9375rem;
  }

  .app-button--primary::before,
  .app-button--small::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--html-blue);
    border-radius: var(--border-radius);
    transition: transform var(--app-button-duration);
    transform: scaleX(1) scaleY(1);
  }

  .app-button--primary > span::before {
    content: '';
    position: absolute;
    top: 4px;
    right: calc(100% + 10px);
    width: 0;
    height: 0;
    border: 4px solid var(--white);
    border-top-color: transparent;
    border-left-color: transparent;
    transition: transform var(--app-button-duration);
    transform: scale(0) rotate(-45deg);
  }

  .app-button--primary:hover::before,
  .app-button--primary:focus::before,
  .app-button--hover.app-button--primary::before,
  .app-button--primary:active::before,
  .app-button--active.app-button--primary::before,
  .app-button--small:hover::before,
  .app-button--small:focus::before,
  .app-button--hover.app-button--small::before {
    transform: scaleX(1.05) scaleY(1.3);
  }

  .app-button--primary:hover > span::before,
  .app-button--primary:focus > span::before,
  .app-button--hover.app-button--primary > span::before {
    transform: scale(1) rotate(-45deg);
  }

  .app-button--primary:disabled::before,
  .app-button--primary[disabled]::before {
    pointer-events: none;
    background-color: var(--very-dim);
    transform: scaleX(1) scaleY(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .app-button--primary:hover::before,
    .app-button--primary:focus::before,
    .app-button--hover.app-button--primary::before,
    .app-button--primary:active::before,
    .app-button--active.app-button--primary::before {
      transform: none;
    }
  }

  .app-button--secondary {
    color: var(--html-blue);
  }

  .app-button--secondary::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--brand-yellow);
    transform: scaleX(0);
    transform-origin: left;
    transition: var(--app-button-duration) transform ease-in-out;
  }

  .app-button--secondary:hover::after,
  .app-button--secondary:focus::after,
  .app-button--secondary:active::after,
  .app-button--secondary.app-button--hover::after,
  .app-button--secondary.app-button--active::after {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .app-button--secondary::after {
      transition: none;
    }
  }

  .app-button--secondary:active,
  .app-button--secondary--active {
    color: var(--active-blue);
  }

  .app-button--secondary:disabled,
  .app-button--secondary[disabled] {
    pointer-events: none;
    color: var(--very-dim);
  }

  .app-button--yellow {
    background-color: var(--brand-yellow);
    color: var(--html-blue);
  }

  .app-button--yellow:active,
  .app-button--yellow--active {
    background-color: var(--active-yellow);
  }

  .app-button__svg {
    vertical-align: middle;
    fill: var(--html-blue);
  }

  .app-button--secondary:disabled .app-button__svg,
  .app-button--secondary[disabled] .app-button__svg {
    fill: var(--very-dim);
  }

  @media (min-width: 720px) {
    .app-button--primary {
      width: auto;
    }
  }

</style>
