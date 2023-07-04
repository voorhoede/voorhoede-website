<template>
  <button
    :class="rootClass"
    v-if="to === ''"
    v-bind="$attrs"
  >
    <span v-if="primary || small">{{ label }}</span>
    <template v-else>
      {{ label }} &rarr;
    </template>
  </button>
  <a
    v-else-if="external"
    :class="rootClass"
    v-bind="$attrs"
    :href="to"
    target="_blank"
    rel="noreferrer noopener"
  >
    <span v-if="primary || small">{{ label }}</span>
    <template v-else>{{ label }} &rarr;</template>
  </a>
  <app-link
    v-else
    :class="rootClass"
    v-bind="$attrs"
    :to="to?.__typename ? useDatoNuxtRoute(to) : to"
  >
    <span v-if="primary || small">{{ label }}</span>
    <template v-else>
      {{ label }} &rarr;
    </template>
  </app-link>
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
          'app-button--small body-small font-bold': this.small
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
    padding: .85rem 1.5rem .7rem 1.5rem;
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

  .app-button--primary > span::after {
    content: '\2192';
    display: inline-block;
    margin-left: .3em;
    font-size: 1.2em;
    line-height: .5;
    vertical-align: middle;
    transition: transform var(--app-button-duration);
    transform: translateX(0);
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

  .app-button--primary:hover > span::after,
  .app-button--primary:focus > span::after,
  .app-button--hover.app-button--primary > span::after {
    transform: translateX(.5em);
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
    height: 1px;
    background-color: var(--html-blue);
    transform: scaleX(1);
    transform-origin: 0% 50%;
    transition: var(--app-button-duration) transform ease-in-out;
  }

  .app-button--secondary:hover::after,
  .app-button--secondary:focus::after,
  .app-button--secondary:active::after,
  .app-button--secondary.app-button--hover::after,
  .app-button--secondary.app-button--active::after {
    transform: scaleX(0);
    transform-origin: 100% 50%;
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
