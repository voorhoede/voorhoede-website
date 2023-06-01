<template>
  <section
    class="gallery-parallax grid"
    ref="galleryRootRef"
  >
    <div
      :class="{ 'gallery-parallax__wrapper': !isMobile }"
      :style="!isMobile && `--gallery-parallax-grid-template: ${gridColumnTemplateAmount}`"
    >
      <ul
        v-for="items in galleryItems"
        :key="items.id"
        :class="`${isMobile ? 'gallery-parallax__wrapper' : 'gallery-parallax__wrapper--desktop'}`"
        ref="galleryItemsRef"
        :style="`--gallery-parallax-grid-template: ${gridColumnTemplateAmount}`"
      >
        <li
          v-for="item in items"
          :key="item.id"
          class="gallery-parallax__item"
          :style="`--ratio: ${(item.size.height / item.size.width) * 100}%`"
        >
          <gallery-item-employee
            :name="item.name"
            :image="item.image"
            :job-title="item.jobTitle"
            :id="item.id"
            :slug="item.slug"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    team: {
      type: Array,
      default: null,
      required: true
    }
  },
  data() {
    return {
      galleryItemsRef: null,
      galleryRootRef: null,
      oddColumnItemAmount: 3,
      responseData: [],

      hasListener: false,
      screenInnerWidth: this.innerWidth,
      timeout: null,
    }
  },
  async mounted() {
    try {
      this.screenInnerWidth = window.innerWidth

      window.addEventListener(
        'resize',
        () => (this.screenInnerWidth = window.innerWidth)
      )

      this.responseData = this.team
      this.galleryItemsRef = this.$refs.galleryItemsRef
      this.galleryRootRef = this.$refs.galleryRootRef

      this.$nextTick(() => {
        if(this.screenInnerWidth < 800) return
        this.galleryItemsRef.forEach((column, index) => {
          const { speed } = this.galleryItems[index][0]
          const galleryWrapperTopPosition =
            (window.innerHeight -
              this.galleryRootRef.getBoundingClientRect().top) *
            0.01
          column.style.transform = `translateY(${ galleryWrapperTopPosition * speed * -1 }px)`

        })
      })

      this.animateGalleryOnScroll()

    } catch (error) {
      throw new Error('Failed to fetch profile picture', { cause: error })
    }
  },
  computed: {
    modifiedResponseData() {
      return this.responseData.reduce((newObject, oldObject) => {
        newObject.push({
          ...oldObject,
          size: {
            width: oldObject.image.responsiveImage.width,
            height: oldObject.image.responsiveImage.height
          },
          speed: Math.floor(Math.random() * (10 - 5 + 1) + 5)
        })
        return newObject
      }, [])
    },
    galleryItems() {
      const imagePerColumn = this.arrangeImagesByColumns(this.modifiedResponseData)
      return this.isMobile ? [this.modifiedResponseData] : imagePerColumn
    },
    gridColumnTemplateAmount() {
      switch (true) {
        case this.isMobile:
          return 2
        case this.screenInnerWidth < 800:
          return 3
        default:
          return 7
      }
    },
    evenColumnItemAmount() {
      switch (true) {
        case this.isMobile:
          return 2
        case this.screenInnerWidth < 800:
          return 5
        default:
          return 4
      }
    },
    isMobile() {
      return this.screenInnerWidth < 500
    },
  },
  methods: {
    arrangeImagesByColumns(refactoredResponse) {
      const { oddColumnItemAmount, evenColumnItemAmount } = this
      const columnGroupSize = evenColumnItemAmount + oddColumnItemAmount

      return refactoredResponse.reduce(
        (resultValue, currentValue, index) => {
          let currentArray = resultValue[resultValue.length - 1]

          if (
            (index % columnGroupSize === 0 &&
              currentArray.length === evenColumnItemAmount) ||
            (index % columnGroupSize === oddColumnItemAmount &&
              currentArray.length === oddColumnItemAmount)
          ) {
            resultValue.push([currentValue])
          } else {
            currentArray.push(currentValue)
          }
          return resultValue
        },
        [[]]
      )
    },
    handleIntersect(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry

        if (isIntersecting && !this.hasListener && this.screenInnerWidth > 800) {
          this.hasListener = true
          document.addEventListener('scroll', this.scrollHandler, false)
        }
        if (!isIntersecting && this.hasListener) {
          this.hasListener = false
          document.removeEventListener('scroll', this.scrollHandler, false)
        }
      })
    },
    scrollHandler() {
      debounce(() => {
        const galleryWrapperTopPosition =
          (window.innerHeight -
            this.galleryRootRef.getBoundingClientRect().top) *
          0.01

        this.galleryItemsRef.forEach((column, index) => {
          const { speed } = this.galleryItems[index][0]
          const shouldResetAnimation = this.screenInnerWidth < 800;
          if (column) {
            column.animate(
              {
                transform: shouldResetAnimation ?
                  'translateY(0)' :
                  `translateY(${ galleryWrapperTopPosition * speed * -1 }px)`,
                easing: 'ease-out'
              },
              {
                duration: 500,
                fill: 'both'
              }
            )
          }
        })
      })

      function debounce(fn, timeout = 300) {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => fn())
      }
    },
    animateGalleryOnScroll() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0]
      }

      const observer = new IntersectionObserver(
        this.handleIntersect,
        options
      )
      observer.observe(this.galleryRootRef)
    },
  }
}
</script>

<style>
:root {
  --gallery-parallax-gap: 10px;
  --gallery-parallax-spacing-top: 50px;
}

.gallery-parallax {
  position: relative;
  margin-top: var(--gallery-parallax-spacing-top);
  /* force gpu to avoid render glitches */
  transform: translateZ(0);
  grid-column: var(--grid-page);
  z-index: 1;
}

@media (min-width: 800px) {
  .gallery-parallax {
    --gallery-parallax-spacing-top: 100px;
  }
}

@media (min-width: 1400px) {
  .gallery-parallax {
    grid-column: var(--grid-content);
  }
}

.gallery-parallax__wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--gallery-parallax-grid-template), 1fr);
  grid-gap: var(--gallery-parallax-gap);
  grid-column: var(--grid-page);
}

.gallery-parallax__wrapper--desktop {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.gallery-parallax__item {
  position: relative;
  height: 100%;
}

.gallery-parallax__item::before {
  content: "";
  display: block;
  padding-top: var(--ratio);
}

@media (min-width: 500px) {
  .gallery-parallax__item +
  .gallery-parallax__item {
    margin-top: var(--gallery-parallax-gap);
  }
}
</style>
