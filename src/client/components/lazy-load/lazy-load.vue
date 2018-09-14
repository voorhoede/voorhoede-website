<template>
  <div class="lazy-load">
    <slot v-if="isIntersected" />
  </div>
</template>

<script>
export default {
  props: {
    rootMargin: {
      type: String,
      default: '0px 0px 0px 0px',
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
      const config = { root: undefined, rootMargin, threshold }
      this.observer = new IntersectionObserver(this.onIntersection, config)
      this.observer.observe(this.$el)
    },
    onIntersection (entries) {
      this.isIntersected = entries.some(entry => entry.intersectionRatio > 0)
      if (this.isIntersected) {
        this.unobserve()
      }
    },
    unobserve () {
      this.observer.unobserve(this.$el)
    },
  },
}
</script>

<style>
  .lazy-load {
    height: 100%; /* without the 100% height child will not size properly */
  }
</style>
