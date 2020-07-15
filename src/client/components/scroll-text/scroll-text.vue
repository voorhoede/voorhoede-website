<template>
  <div class="scroll-text">
    <div class="scroll-text__item h1" scroll-text-item style="--z-position: -1px;">Wij helpen je vooruit op het web</div>
    <div class="scroll-text__item h1" scroll-text-item style="--z-position: -1px;">Beginnen klein en itereren snel</div>
    <div class="scroll-text__item h1" scroll-text-item style="--z-position: -1px;">Om voor onze eindgebruikers,</div>
    <div class="scroll-text__item h1" scroll-text-item style="--z-position: -1px;">geweldige producten te ontwikkelen</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isIntersected: false,
      observer: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0, .25, .5, .75, 1],
      isAnimating: false,
      items: [],
      centerScreen: 0,
      containerTop: 0
    }
  },
  mounted() {
    if ('IntersectionObserver' in window) {
      this.observe()
      this.items = [...this.$el.querySelectorAll('[scroll-text-item]')]
    }
  },
  beforeDestroy() {
    this.unobserve()
  },
  methods: {
    observe() {
      const { rootMargin, threshold } = this
      const config = { root: undefined, rootMargin, threshold }
      this.observer = new IntersectionObserver(this.onIntersection, config)
      this.observer.observe(this.$el)
    },
    onIntersection(entries) {
      this.isIntersected = entries.some((entry) => entry.intersectionRatio > 0)
      if (this.isIntersected && !this.isAnimating) {
        this.isAnimating = window.requestAnimationFrame(this.animate)
      }
      if (!this.isIntersected) {
        window.cancelAnimationFrame(this.isAnimating)
        this.isAnimating = false
      }
    },
    unobserve() {
      if ('IntersectionObserver' in window) {
        this.observer.unobserve(this.$el)
      }
    },
    animate() {
      this.setScaleVector()
      if(this.isAnimating) {
        this.isAnimating = window.requestAnimationFrame(this.animate)
      }
    },
    setScaleVector() {
      this.centerScreen = window.innerHeight * .5
      this.containerTop = this.$el.getBoundingClientRect().top
      let item, top, height, centerItem, distance, zPosition

      for(let i = 0; i < this.items.length; i++) {
        item = this.items[i]
        top = this.containerTop + item.offsetTop
        height = item.clientHeight

        centerItem = top + height * .5
        distance = this.distanceTo(this.centerScreen, centerItem)

        zPosition = -1 + this.smoothstep(this.centerScreen, 0, distance)
        item.style.setProperty('--z-position', `${zPosition}px`)
      }
    },
    distanceTo(x1, x2) {
      let x = x2 - x1
      x *= x
      return Math.sqrt(x)
    },
    smoothstep (min, max, value) {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
      return x * x * (3 - 2 * x)
    },
  },
}
</script>

<style>
  .scroll-text {
    padding-bottom: 5vh;
    transform-style: preserve-3d;
    perspective: 3;
  }

  .scroll-text__item {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;
    transform: translateZ(var(--z-position));
    transition: transform .1s linear;
  }
</style>
