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
    grid-row-start: 1;
    grid-row-end: 5;
    position: relative;
  }

  .curly-bracket--left {
    margin-top: var(--spacing-bigger);
    grid-column-start: 1;
    grid-column-end: 8;
  }

  .curly-bracket--right {
    grid-column-start: 43;
    grid-column-end: 51;
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

  .curly-bracket--right .curly-bracket__image {
    transform: scaleX(-1);
    transform-origin: center center;
    left: auto;
    right: 0;
  }

  @media (min-width: 720px) {
    .curly-bracket--left {
      margin-top: 0;
      grid-column-start: 2;
    }

    .curly-bracket--right {
      grid-column-end: 49;
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
      grid-column-start: 43;
      grid-column-end: 48;
    }
  }
</style>
