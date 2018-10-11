<template>
  <div class="scroll-to">
    <span class="scroll-to__text body-petite font-bold">Scroll</span>
    <img class="scroll-to__image" src="/images/scroll-to-arrow.svg" alt="An arrow facing downwards">
  </div>
</template>

<style>
  :root {
    --scroll-back-arrow-width: 32px;
    --arrow-animation: ease-in-out;
  }

  .scroll-to {
    display: flex;
    z-index: var(--z-index-low);
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: var(--scroll-back-arrow-width);
    height: 135px;
  }

  .scroll-to__text {
    transform: rotateZ(-90deg) translateX(20px);
    transform-origin: center center;
    color: var(--html-blue);
    letter-spacing: .0625rem;
    line-height: var(--scroll-back-arrow-width);
    text-transform: uppercase;
  }

  .scroll-to__image {
    width: var(--scroll-to-arrow-width);
    height: 64px;
    transition: scrollToBounce var(--arrow-animation);
    animation: scrollToBounce 1400ms infinite;
    object-fit: contain;
  }

  @keyframes scrollToBounce {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(15px);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
