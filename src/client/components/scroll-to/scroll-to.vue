<template>
  <div class="scroll-to">
    <div v-if="pointDown" class="scroll-to__point-down">
      <span class="scroll-to__text body-petite font-bold">Scroll</span>
      <img
        class="scroll-to__image"
        src="/images/scroll-to-arrow--down.svg"
        alt="An arrow facing downwards">
    </div>
    <a v-if="pointUp" href="#" class="scroll-to__point-up">
      <img
        class="scroll-to__image"
        src="/images/scroll-to-arrow--up.svg"
        alt="An arrow facing upwards">
      <span class="scroll-to__text body-petite font-bold">Return</span>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      pointDown: {
          type: Boolean,
          default: false,
          required: false
      },
      pointUp: {
          type: Boolean,
          default: false,
          required: false
      },
    },
  }
</script>

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
    justify-content: center;
    width: var(--scroll-back-arrow-width);
    height: 150px;
    user-select: none;
  }

  .scroll-to__text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform-origin: center center;
    color: var(--html-blue);
    letter-spacing: .0625rem;
    line-height: var(--scroll-back-arrow-width);
    text-transform: uppercase;
  }

  .scroll-to__image {
    width: var(--scroll-to-arrow-width);
    height: 64px;
    object-fit: contain;
  }

  .scroll-to__point-down .scroll-to__image {
    animation: pointDownBounce 1.4s infinite;
  }

  .scroll-to__point-up .scroll-to__image {
    animation: pointUpBounce 1.4s infinite;
  }

  @keyframes pointDownBounce {
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

  @keyframes pointUpBounce {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-15px);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
