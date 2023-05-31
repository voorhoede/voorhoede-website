<template>
  <section
    class="gallery-parallax grid"
    ref="galleryRootRef"
  >
    <div
      :class="{ 'gallery-parallax__wrapper': !isMobile }"
      :style="!isMobile && `--grid-template: ${gridColumnTemplateAmount}`"
    >
      <ul
        v-if="isMobile"
        class="gallery-parallax__wrapper"
        :style="`--grid-template: ${gridColumnTemplateAmount}`"
      >
        <template v-for="galleryColumn in galleryItems">
          <li
            class="gallery-parallax_item gallery-parallax_item--mobile"
            v-for="item in galleryColumn"
            :key="item.id"
            :style="{
              '--ratio': `${item && (item.size.height / item.size.width) * 100}%`,
            }"
          >
            <gallery-item
              :name="item.name"
              :image="item.image"
              :role="item.jobTitle"
              :id="item.id"
              :slug="item.slug"
            />
          </li>
        </template>
      </ul>
      <template v-else>
        <ul
          v-for="galleryColumn in galleryItems"
          :key="galleryColumn.id"
          :class="{ 'gallery-parallax__wrapper': gridColumnTemplateAmount <= 1 }"
          class="gallery-parallax__row--desktop"
          ref="galleryItemsRef"
          :style="`--grid-template: ${gridColumnTemplateAmount}`"
        >
          <li
            v-for="(item) in galleryColumn"
            :key="item.id"
            class="gallery-parallax_item"
            :style="`--ratio: ${item && (item.size.height / item.size.width) * 100}%`"
          >
            <gallery-item
              :name="item.name"
              :image="item.image"
              :role="item.jobTitle"
              :id="item.id"
              :slug="item.slug"
            />
          </li>
        </ul>
      </template>
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
      columnItems: 3,
      columnImageAmountOdd: 3,
      responseData: [],
      galleryItemsRef: null,
      galleryRootRef: null,
      hasListener: false,
      screenInnerWidth: this.innerWidth,
      timeout: null,
      filter: []
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
      this.loadImage(this.responseData)

      this.$nextTick(() => {
        this.galleryItemsRef = this.$refs.galleryItemsRef
        this.galleryRootRef = this.$refs.galleryRootRef

        this.animateGalleryOnScroll()
      })
    } catch (error) {
      throw new Error('Failed to fetch profile picture', { cause: error })
    }
  },
  computed: {
    galleryItems() {
      const imagePerColumn = this.amountImagePerColumn(this.loadImage(this.responseData))
      return this.isMobile ? [this.loadImage(this.responseData)] : imagePerColumn
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
    isMobile() {
      return this.screenInnerWidth < 500
    },
    columnImageAmountEven() {
      switch (true) {
        case this.isMobile:
          return 3
        case this.screenInnerWidth < 800:
          return 5
        default:
          return 4
      }
    },
  },
  methods: {
    loadImage(data) {
      return data.reduce((newObject, oldObject) => {
        newObject.push({
          ...oldObject,
          size: {
            width: oldObject.image.responsiveImage.width,
            height: oldObject.image.responsiveImage.height
          },
          speed: Math.floor(Math.random() * (20 - 5 + 1) + 5)
        })
        return newObject
      }, [])
    },
    amountImagePerColumn(refactoredResponse) {
      const { columnImageAmountOdd, columnImageAmountEven } = this
      const columnGroupSize = columnImageAmountEven + columnImageAmountOdd

      return refactoredResponse.reduce(
        (resultValue, currentValue, index) => {
          let currentArray = resultValue[resultValue.length - 1]

          if (
            (index % columnGroupSize === 0 &&
              currentArray.length === columnImageAmountEven) ||
            (index % columnGroupSize === columnImageAmountOdd &&
              currentArray.length === columnImageAmountOdd)
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

          if (column) {
            column.animate(
              {
                transform: `translateY(${ galleryWrapperTopPosition * speed * -1 }px)`,
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
  --gap: 10px;
  --radius: 10px;
  --blender: 150px;
  --unit-medium: 20px;
}

.gallery-parallax {
  position: relative;
  margin-top: var(--blender);
  margin-bottom: var(--blender);
  background-color: white;

  /* force gpu to avoid render glitches */
  transform: translateZ(0);

  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}

.gallery-parallax::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: var(--blender);
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
  background-size: cover;
  pointer-events: none;
}

.gallery-parallax__wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--grid-template), 1fr);
  grid-gap: var(--gap);
  grid-column: var(--grid-content);
}

.gallery-parallax__row--desktop {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.gallery-parallax_grid {
  display: grid;
  align-content: center;
  list-style: none;
  overflow: unset;
  will-change: transform;
}

.gallery-parallax_item {
  position: relative;
  height: 100%;
}

.gallery-parallax_item::before {
  content: "";
  display: block;
  padding-top: var(--ratio);
}

@media screen and (min-width: 500px) {
  .gallery-parallax_item+.gallery-parallax_item {
    margin-top: var(--gap);
  }
}

@media screen and (min-width: 800px) {
  .gallery-parallax {
    --gap: var(--unit-medium);
    --radius: 20px;
    --blender: 200px;
  }

  .gallery-parallax__wrapper {
    /* grid-template-columns: 0.5fr repeat(var(--grid-template), 1fr) 0.5fr; */
    grid-template-columns: repeat(var(--grid-template), 1fr);
  }

  .gallery-parallax_grid {
    overflow: hidden;
  }
}

@media screen and (min-width: 1200px) {
  .gallery-parallax {
    --blender: 250px;
  }
}
</style>
