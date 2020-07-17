import Vue from 'vue'

let observer = null
let isAnimating = false

Vue.directive('scroll-highlight', {
  inserted: function(container) {
    if (!('IntersectionObserver' in window) || !container) return

    let items = [...container.querySelectorAll('[scroll-highlight-item]')]

    const rootMargin = '0px 0px 0px 0px'
    const threshold = [0, .25, .5, .75, 1]

    let isIntersected = false
    let centerScreen = 0
    let containerTop = 0

    container.classList.add('scroll-text--active')
    for(let i = 0; i < items.length; i++) {
      items[i].style.setProperty('--z-position', '-1px')
    }

    observe()

    function observe() {
      const config = { root: undefined, rootMargin, threshold }
      observer = new IntersectionObserver(onIntersection, config)
      observer.observe(container)
    }

    function onIntersection(entries) {
      isIntersected = entries.some((entry) => entry.intersectionRatio > 0)
      if (isIntersected && !isAnimating) {
        isAnimating = window.requestAnimationFrame(animate)
      }
      if (!isIntersected) {
        window.cancelAnimationFrame(isAnimating)
        isAnimating = false
      }
    }

    function animate() {
      setScaleVector()
      if(isAnimating) {
        isAnimating = window.requestAnimationFrame(animate)
      }
    }

    function setScaleVector() {
      centerScreen = window.innerHeight * .5
      containerTop = container.getBoundingClientRect().top
      let item, top, height, centerItem, distance, zPosition

      for(let i = 0; i < items.length; i++) {
        item = items[i]
        top = containerTop + item.offsetTop
        height = item.clientHeight

        centerItem = top + height * .5
        distance = distanceTo(centerScreen, centerItem)

        zPosition = -1 + smoothstep(centerScreen, 0, distance)
        item.style.setProperty('--z-position', `${zPosition}px`)
      }
    }

    function distanceTo(x1, x2) {
      let x = x2 - x1
      x *= x
      return Math.sqrt(x)
    }

    function smoothstep (min, max, value) {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
      return x * x * (3 - 2 * x)
    }
  },
  unbind: function(container) {
    if (('IntersectionObserver' in window) && observer && container) {
      console.log('observer', observer)
      console.log('container', container)
      console.log('isAnimating', isAnimating)
      // observer.unobserve(container)
      window.cancelAnimationFrame(isAnimating)
      isAnimating = false
    }
  },
})
