<template>
  <div class="scroll-to">
    <div
      v-if="direction === 'down'"
      class="scroll-to__point-down"
    >
      <span class="scroll-to__text body-petite font-bold">
        {{ $t('scroll') }}
      </span>
      <img
        class="scroll-to__image"
        src="/images/scroll-to-arrow--down.svg"
        alt="">
    </div>
    <a
      v-if="direction === 'up'"
      class="scroll-to__point-up"
      href="#top"
    >
      <img
        class="scroll-to__image"
        src="/images/scroll-to-arrow--up.svg"
        alt="">
      <span class="scroll-to__text body-petite font-bold" aria-hidden="true">
        {{ $t('return') }}
      </span>
      <span class="sr-only">
        {{ $t('return_to_top') }}
      </span>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      direction: {
        type: String,
        default: 'down',
        required: false,
        validator: direction => ['up', 'down'].indexOf(direction) !== -1
      },
    }
  }
</script>

<style>
  .scroll-to {
    display: flex;
    position: relative;
    z-index: var(--z-index-low);
    width: 32px;
    height: 150px;
    user-select: none;
  }

  .scroll-to__text {
    color: var(--html-blue);
    letter-spacing: .0625rem;
    line-height: 32px;
    text-transform: uppercase;
  }

  .scroll-to__image {
    width: 32px;
    height: 64px;
    object-fit: contain;
  }

  .scroll-to__point-up,
  .scroll-to__point-down {
    position: relative;
    width: 32px;
    height: 150px;
  }

  .scroll-to__point-up .scroll-to__text,
  .scroll-to__point-down .scroll-to__text,
  .scroll-to__point-down .scroll-to__image,
  .scroll-to__point-up .scroll-to__image {
    position: absolute;
  }

  .scroll-to__point-up .scroll-to__text,
  .scroll-to__point-down .scroll-to__text {
    left: 0;
  }

  .scroll-to__point-down .scroll-to__image,
  .scroll-to__point-up .scroll-to__image {
    animation: arrowBounce ease-in-out 1.4s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-to__point-down .scroll-to__image,
    .scroll-to__point-up .scroll-to__image {
      animation: none;
    }
  }

  .scroll-to__point-down .scroll-to__text {
    transform: rotate(90deg);
    top: -25px;
    transform-origin: bottom left;
  }

  .scroll-to__point-down .scroll-to__image {
    bottom: 10px;
  }

  .scroll-to__point-up .scroll-to__text {
    transform: rotate(-90deg);
    bottom: -32px;
    transform-origin: top left;
  }

  .scroll-to__point-up .scroll-to__image {
    top: 0;
  }

  @keyframes arrowBounce {
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
