<template>
  <div
    class="scroll-text"
    ref="container"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    isIntersectionDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      isIntersected: this.isIntersectionDisabled,
      observer: null,
      isAnimated: this.isIntersectionDisabled,
      rootMargin: '0px 0px 0px 0px',
      threshold: [.1, .2, .3, .4, .5]
    }
  },
  mounted() {
    if ('IntersectionObserver' in window && !this.isIntersectionDisabled) {
      this.observe()
      this.isAnimated = true
    } else {
      this.isIntersected = true
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
      if(entries[0].isIntersecting) console.log('entries', entries[0].intersectionRatio)
      this.isIntersected = entries.some((entry) => entry.intersectionRatio > 0)
      if (this.isIntersected) {
        // this.unobserve()
      }
    },
    unobserve() {
      if ('IntersectionObserver' in window && !this.isIntersectionDisabled) {
        this.observer.unobserve(this.$el)
      }
    },
  },
}
</script>

<style>

</style>
