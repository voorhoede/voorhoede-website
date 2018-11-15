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
    margin-top: var(--spacing-bigger);
    grid-column-end: 4;
    grid-row-start: 1;
    position: relative;
    /* overflow: hidden; */
  }

  .curly-bracket--right {
    grid-column-start: -4;
    grid-column-end: -2;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .curly-bracket__image {
    position: absolute;
    margin: auto;
    top: -2vh;
    bottom: -2vh;
    right: -2vh;
    /* max-height: calc(100% + 4vh); */
    width: 100%;
    /* max-height: 320px; */
  }

  .curly-bracket--right .curly-bracket__image {
    transform: scale(-1,1);
    transform-origin: center center;
    left: 0;
    right: unset;
  }
  /* @media (min-width: 540px) {
    .curly-bracket {
      max-height: none;
      overflow: visible;
      grid-column-start: 3;
      grid-column-end: 5;
    }

    .curly-bracket--right {
      grid-column-start: -4;
      grid-column-end: -1;
    }

    .curly-bracket__image {
      top: 0;
      height: auto;
      width: 80%;
    }
  } */
  @media (min-width: 720px) {
    .curly-bracket {
      margin-top: 0;
      /* margin-top: 0;
      position: absolute;
      top: calc(-1 * var(--spacing-medium));
      bottom: calc(-1 * var(--spacing-medium)); */
      grid-column-start: 2;
      grid-column-end: 6;
    }

    .curly-bracket--right {
      grid-row-start: 1;
      grid-column-start: -6;
      grid-column-end: -2;
    }

    .curly-bracket__image {

    }

    .curly-bracket--right .curly-bracket__image {
      right: 0;
      left: auto;
    }
  }
</style>
