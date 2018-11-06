<template>
  <span
    class="scroll-highlighted-text__text h1"
    :class="
      (isIntersected) ? 'scroll-highlighted-text--active' 
      : (isFirst && scrolledAbove) ? 'scroll-highlighted-text--active'
      : (isLast && scrolledBelow) ? 'scroll-highlighted-text--active'
      : 'scroll-highlighted-text--non-active'
    "
    :data-id="index"
    ref="highlightedText"
  >
    {{ line.line }}
  </span>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      line: {
        type: Object,
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
        scrollY: null,
        isFirst: (this.index === 0) ? true : false,
        isLast: (this.index === 3) ? true : false,
        scrolledAbove: false,
        scrolledBelow: false,
        observerRectTop: 0
      }
    },
    mounted() {
      const firstItem = 0
      const lastItem = 3
      const highlightedTextID = parseInt(this.$refs.highlightedText.dataset.id) 

      if ('IntersectionObserver' in window) {
        this.observe()
      } else {
        this.isIntersected = true
      }

      window.addEventListener('scroll', this.debounce(() => {
        let offsetIntersectionObserver = this.$refs.highlightedText.offsetTop - this.observerRectTop
        this.scrollY = window.scrollY

        if(highlightedTextID === firstItem) {
          ((offsetIntersectionObserver) > this.scrollY)
          ? this.scrolledAbove = true
          : this.scrolledAbove = false
        }

        if(highlightedTextID === lastItem) {
          ((offsetIntersectionObserver) < this.scrollY)
          ? this.scrolledBelow = true
          : this.scrolledBelow = false
        }
      }), 300)
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
        this.isIntersected = entries.some(entry => {
          this.observerRectTop = (entry.rootBounds.top - entry.rootBounds.height)

          return entry.isIntersecting
        })
      },
      unobserve () {
        this.observer.unobserve(this.$el)
      },
      debounce(callback, wait, context = this) {
        let timeout = null
        let callbackArgs = null

        const later = () => callback.apply(context, callbackArgs)

        return function() {
          callbackArgs = arguments
          clearTimeout(timeout)
          timeout = setTimeout(later, wait)
        }
      }
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

  :root {
    --animate-text-in: color-change-in 600ms forwards;
    --animate-text-out: color-change-out 600ms forwards;
  }

  .scroll-highlighted-text {
    text-align: center;
  }

  .scroll-highlighted-text__text {
    color: var(--brand-yellow);
    display: block;
    margin-bottom: var(--spacing-medium);
  }

  .scroll-highlighted-text--active {
    animation: var(--animate-text-in);
  }
  
  .scroll-highlighted-text--non-active {
    animation: var(--animate-text-out);
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
