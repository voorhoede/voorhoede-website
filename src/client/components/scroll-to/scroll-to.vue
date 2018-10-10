<template>
  <div class="scroll-to">
    <span class="scroll-to__text body-petite font-bold">Scroll</span>
    <img class="scroll-to__image" src="/images/scroll-to-arrow.svg" alt="An arrow facing downwards">
  </div>
</template>

<style>
  :root {
    --scroll-to-arrow-height: 40px;
    --scroll-to-arrow-width: var(--scroll-to-arrow-height);
    --arrow-animation: cubic-bezier(.075, .82, .165, 1);
  }

  .scroll-to {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  .scroll-to__text {
    position: absolute;

    /* Distance between the text and the arrow */
    top: calc(-1 * (var(--spacing-tiny) + 2.5rem));
    left: 50%;
    transform: rotateZ(-90deg) translateY(50%);

    /* Change the origin to keep the same starting point on all the media queries */
    transform-origin: bottom left;
    color: var(--html-blue);
    text-transform: uppercase;
    letter-spacing: .0625rem;
  }

  .scroll-to__image {
    height: var(--scroll-to-arrow-height);
    width: var(--scroll-to-arrow-width);
    object-fit: contain;
    transition: bouncein-and-out var(--arrow-animation);
    animation: bouncein-and-out 1400ms infinite;
  }

  @keyframes bouncein-and-out {
    0% {
      transform: translateY(-15px);
    }

    50% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-15px);
    }
  }

  @media (min-width: 720px) {
    .scroll-to {
      position: absolute;
    }
  }
</style>
