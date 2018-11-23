<template>
  <span
    class="scroll-highlighted-text__text h1"
    :class="isIntersectedClass"
    :data-id="index"
    ref="highlightedText"
  >
    {{ line.line }}
  </span>
</template>

<script>
  import debounce from '../../lib/debounce-helper'

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
      isFirst: {
        type: Object,
        required: true,
      },
      isLast: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isIntersected: false,
        observer: null,
        scrolledAbove: false,
        scrolledBelow: false,
        observerRectTop: 0,
      }
    },
    computed: {
      isIntersectedClass() {
        if( this.isIntersected ||
            this.isFirst && this.scrolledAbove ||
            this.isLast && this.scrolledBelow ) {
          return 'scroll-highlighted-text--active'
        } else {
          return 'scroll-highlighted-text--in-active'
        }
      }
    },
    mounted() {
      const highlightedTextID = parseInt(this.$refs.highlightedText.dataset.id) 
      let offsetIntersectionObserver

      'IntersectionObserver' in window ? this.observe() : this.isIntersected = true

      window.addEventListener('scroll', debounce(() => {
        if(this.$refs.highlightedText) {
          // calculate offset from window top including rootMargin set on the observer
          offsetIntersectionObserver = this.$refs.highlightedText.offsetTop - this.observerRectTop

          // if first highlighted text line and user scrolled before intersecting with observer
          if(highlightedTextID === this.isFirst.number) {
            ((offsetIntersectionObserver) > window.scrollY)
            ? this.scrolledAbove = true
            : this.scrolledAbove = false
          }
          // if last highlighted text line and user scrolled after intersecting with observer
          if(highlightedTextID === this.isLast.number) {
            ((offsetIntersectionObserver) < window.scrollY)
            ? this.scrolledBelow = true
            : this.scrolledBelow = false
          }
        }
      }), 300)
    },
    beforeDestroyed() {
      if (this.observer !== null) {
        this.unobserve()
      }
    },
    methods: {
      observe () {
        const { rootMargin, threshold } = this
        // the viewport is the container due to negative margins
        // it will only check in a small window if intersected
        const config = { root: null, rootMargin, threshold }

        this.observer = new IntersectionObserver(this.onIntersection, config)
        //this.$el is the target container
        this.observer.observe(this.$el)
      },
      onIntersection (entries) {
        //get observer offset to rootBounds
        const rootBoundTop = entries[0].rootBounds.top
        this.observerRectTop === rootBoundTop
          ? false
          : this.observerRectTop = rootBoundTop

        this.isIntersected = entries.some(entry => {
          return entry.isIntersecting
        })
      },
      unobserve () {
        this.observer.unobserve(this.$el)
      },
    },
  }
</script>

<style>
  @import '../app-core/variables.css';
  
  @keyframes color-change-in {
    0% {
      color: var(--brand-yellow);
    }

    100% {
      color: var(--html-blue);
    }
  }
  
  @keyframes color-change-out {
    0% {
      color: var(--html-blue);
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
  
  .scroll-highlighted-text--in-active {
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
