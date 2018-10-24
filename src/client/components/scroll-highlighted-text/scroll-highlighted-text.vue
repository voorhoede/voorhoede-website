<template>
  <span
    class="scroll-highlighted-text__text h1 font-yellow"
    :class="isIntersected ? 'scroll-highlighted-text--active' : ''"
  >
    {{ line }}
  </span>
</template>

<script>
  export default {
    props: {
      line: {
        type: String,
        required: true
      },
      rootMargin: {
        type: String,
        default: '-49% 0px -49% 0px',
      },
      threshold: {
        type: [Number, Array],
        default: 0,
      },
    },
    data() {
      return {
        isIntersected: false,
        observer: null,
      }
    },
    mounted() {
      if ('IntersectionObserver' in window) {
        this.observe()
      } else {
        this.isIntersected = true
      }
    },
    unmounted() {
      this.unobserve()
    },
    methods: {
      observe () {
        const { rootMargin, threshold } = this
        const config = { root: null, rootMargin, threshold }
        this.observer = new IntersectionObserver(this.onIntersection, config)
        this.observer.observe(this.$el)
      },
      onIntersection (entries) {
        this.isIntersected = entries.some(entry => entry.intersectionRatio > 0)
      },
      unobserve () {
        this.observer.unobserve(this.$el)
      },
    },
  }
  
</script>

<style>
  @keyframes color-change-in {
    0% {
      color: var(--brand-yellow);
    }

    50% {
      color: var(--off-black);
    }

    100% {
      color: var(--html-blue);
    }
  }
  
  @keyframes color-change-out {
    0% {
      color: var(--html-blue);
    }

    50% {
      color: var(--off-black);
    }

    100% {
      color: var(--brand-yellow);
    }
  }

  .scroll-highlighted-text {
    text-align: center;
  }

  .scroll-highlighted-text__text {
    display: block;
    color: var(--brand-yellow);
    animation: color-change-out 600ms forwards;
  }

  .scroll-highlighted-text__text + .scroll-highlighted-text__text {
    margin-top: var(--spacing-medium);
  }

  .scroll-highlighted-text--active {
    color: var(--html-blue);
    animation: color-change-in 600ms forwards;
  }

  @media (max-width: 520px) {
    .scroll-highlighted-text__text {
      font-size: 32px;
    }
  }

  @media (min-width: 720px) {
    .scroll-highlighted-text__text {
      margin-bottom: var(--spacing-large);
    }
  }

  @media (min-width: 1100px) {
    .scroll-highlighted-text__text {
      margin-bottom: var(--spacing-larger);
    }
  }
</style>
