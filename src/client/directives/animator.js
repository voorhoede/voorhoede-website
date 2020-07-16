import Vue from 'vue'

let observer = null
let isIntersected = false

Vue.directive('animator', {
  inserted: function(container) {
    if (!('IntersectionObserver' in window) || !container) return

    const rootMargin = '0px 0px 0px 0px'
    const threshold = [0, .25, .5, .75, 1]

    setDefaultClasses()
    observe()

    function observe() {
      const config = { root: undefined, rootMargin, threshold }
      observer = new IntersectionObserver(onIntersection, config)
      observer.observe(container)
    }

    function onIntersection(entries) {
      isIntersected = entries.some((entry) => entry.intersectionRatio > 0)
      if (isIntersected) {
        setActiveClasses()
        unobserve()
      }
    }

    function unobserve() {
      if ('IntersectionObserver' in window) {
        observer.unobserve(container)
      }
    }

    function setDefaultClasses() {
      container.classList.add('animator')

      const items = [...container.querySelectorAll('[animator-item]')]
      items.forEach( item => item.classList.add('animator__slide-up'))

      const staggerItems = [...container.querySelectorAll('[animator-stagger]')]
      staggerItems.forEach((item, i) => item.classList.add(`animator--stagger-${i + 1}`))
    }

    function setActiveClasses() {
      container.classList.add('animator--active')
    }
  },

  unbind: function(container) {
    if (('IntersectionObserver' in window) && observer && container) {
      observer.unobserve(container)
    }
  }
})
