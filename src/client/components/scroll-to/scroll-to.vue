<template>
  <div class="scroll-to">
    <span class="scroll-to__text body-petite font-bold">Scroll</span>
    <img class="scroll-to__image" src="/images/scroll-to-arrow.svg" alt="An arrow facing downwards">
  </div>
</template>

<style>
  .scroll-to {
    display: inline-flex;
    flex-direction: column;
    position: relative;
  }

  .scroll-to__text {
    position: absolute;

    /* Distance between the text and the arrow */
    top: calc(-1 * (var(--spacing-small) + 1rem));
    left: 50%;
    text-transform: uppercase;
    transform: rotateZ(-90deg) translateY(50%);

    /* Change the origin to keep the same starting point on all the media queries */
    transform-origin: bottom left;
    color: var(--html-blue);
  }

  .scroll-to__image {
    transform: scale(.6);

    /* needs a bigger offset because the whitespace gets bigger */
    transform-origin: center 6px;
  }

  @media (min-width: 720px) {
    .scroll-to__image {
      transform: scale(.8);

      /* needs a bigger offset because the whitespace gets bigger */
      transform-origin: center 5px;
    }
  }

  @media (min-width: 1100px) {
    .scroll-to__image {
      transform: scale(1);
      transform-origin: center 0;
    }
  }
</style>
