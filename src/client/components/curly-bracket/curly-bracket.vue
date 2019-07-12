<template>
  <div :class="`curly-bracket curly-bracket--${side}`">
    <img
      alt=""
      class="curly-bracket__image"
      :src="`/images/curly-bracket--${color}.svg`"
    >
  </div>
</template>

<script>
export default {
  props: {
    side: {
      type: String,
      default: 'left',
      validator: side => ['left', 'right'].indexOf(side) !== -1,
    },
    color: {
      type: String,
      default: 'blue',
      validator: color => ['blue', 'paper'].indexOf(color) !== -1,
    },
  }
}
</script>

<style>
  .curly-bracket {
    position: relative;
    display: none;
    margin-top: var(--spacing-bigger);
    grid-row: 1 / 2;
  }

  .curly-bracket--left {
    grid-column-start: 1;
    grid-column-end: 8;
  }

  .curly-bracket--right {
    grid-column-start: 44;
    grid-column-end: 51;
    grid-row: 1 / 3;
  }

  .curly-bracket__image {
    position: absolute;
    margin: auto;
    top: -2vh;
    bottom: -2vh;
    left: 0;
    max-height: calc(100% + 4vh);
    width: 100%;
  }

  /* Show the curly bracket only on newer browsers for screens < 720px */
  @supports (display: grid) {
    .curly-bracket {
      display: block;
    }
  }

  .curly-bracket--right .curly-bracket__image {
    transform: scaleX(-1);
    transform-origin: center center;
    left: unset;
    right: 0;
  }

  @media (min-width: 720px) {
    .curly-bracket {
      margin-top: 0;
    }

    .curly-bracket--left {
      grid-column-start: 2;
      grid-column-end: 8;
    }

    .curly-bracket--right {
      grid-column-start: 44;
      grid-column-end: 50;
    }

    .curly-bracket--right .curly-bracket__image {
      right: 0;
      left: auto;
    }
  }

  @media (min-width: 1100px) {
    .curly-bracket--left {
      grid-column-start: 3;
      grid-column-end: 8;
    }

    .curly-bracket--right {
      grid-column-start: 44;
      grid-column-end: 49;
    }
  }
</style>
