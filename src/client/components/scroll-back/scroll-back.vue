<template>
  <a href="#" class="scroll-back">
    <span class="scroll-back__text body-petite font-bold">Return</span>
    <img class="scroll-back__image" src="/images/scroll-to-arrow.svg" alt="An arrow facing upwards">
  </a>
</template>

<style>
  :root {
    --scroll-back-arrow-width: 32px;
    --arrow-animation: ease-in-out;
  }

  .scroll-back {
    display: flex;
    z-index: var(--z-index-low);
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    width: var(--scroll-back-arrow-width);
    height: 135px;
  }

  .scroll-back__text {
    transform: rotateZ(90deg) translateX(20px);
    transform-origin: center center;
    color: var(--html-blue);
    letter-spacing: .0625rem;
    line-height: var(--scroll-back-arrow-width);
    text-transform: uppercase;
  }

  .scroll-back__image {
    width: var(--scroll-back-arrow-width);
    height: 64px;
    transform: rotateZ(180deg);
    transition: scrollBackBounce var(--arrow-animation);
    animation: scrollBackBounce 1.4s infinite;
    object-fit: contain;
  }

  @keyframes scrollBackBounce {
    0% {
      transform: rotateZ(180deg) translateY(0);
    }

    50% {
      transform: rotateZ(180deg) translateY(15px);
    }

    100% {
      transform: rotateZ(180deg) translateY(0);
    }
  }
</style>
