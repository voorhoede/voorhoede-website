<template>
  <span
    class="scroll-highlighted-text__text h1"
    :class="
      (isIntersected) ? 'scroll-highlighted-text--active' 
      : (isFirst) ? 'scroll-highlighted-text--active'
      : (isLast) ? 'scroll-highlighted-text--active'
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
        scrollDirection: 'down',
        isFirst: (this.index === 0) ? true : false,
        isLast: false
      }
    },
    mounted() {
      const active = 'scroll-highlighted-text--active'
      const nonActive = 'scroll-highlighted-text--non-active'
      const highlightedTextClass = this.$refs.highlightedText.classList
      const highlightedTextID = parseInt(this.$refs.highlightedText.dataset.id) 
      let previous = window.scrollY

      if ('IntersectionObserver' in window) {
        this.observe()
      } else {
        this.isIntersected = true
      }

      this.$root.$on('activeClass', i => {
        if(highlightedTextID === i ) { 
          highlightedTextClass.replace(nonActive, active)
        }
      })
      
      this.$root.$on('nonActiveClass', i => {
        if(highlightedTextID === i ) { 
          highlightedTextClass.replace(active, nonActive)
        }
      })

      window.addEventListener('scroll', () => {
        window.scrollY > previous ? this.scrollDirection = 'down': this.scrollDirection = 'up'
        this.scrollY = window.scrollY
        previous = window.scrollY
        
        if(this.scrollY > this.$refs.highlightedText.offsetTop) {
          this.$root.$emit('activeClass', 3)
          this.$root.$emit('nonActiveClass', 0)
        }
      })
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
          if(this.isFirst && entry.isIntersecting && this.scrollDirection === 'up') {
            this.$root.$emit('activeClass', 0)
          }
         
          if(this.index === 1 && entry.isIntersecting && this.scrollDirection === 'down') {
            this.$root.$emit('nonActiveClass', 0)
          }
          
          if(this.index === 2 && entry.isIntersecting && this.scrollDirection === 'up') {
             this.$root.$emit('nonActiveClass', 3)
          }
          
          if(this.index === 3 && entry.isIntersecting) {    
            this.$root.$emit('activeClass', 3)

            if(this.scrollY >= (entry.target.offsetTop - entry.intersectionRect.top)) {
              this.isLast = true
              this.$root.$emit('nonActiveClass', 0)
            } 
          }

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
