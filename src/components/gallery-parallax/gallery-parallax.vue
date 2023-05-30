<template>
  <section
    class="gallery-parallax gallery-parallax--full-width"
    ref="galleryRootRef"
  >
    <div
      :class="{ 'gallery-parallax_wrapper': gridFragmentAmount > 1 }"
      :style="gridFragmentAmount > 1 && `--grid-template: ${gridFragmentAmount}`"
    >
      <ul
        :class="{ 'gallery-parallax_wrapper': gridFragmentAmount <= 1 }"
        v-for="galleryColumn in galleryItems"
        :key="galleryColumn.id"
        ref="galleryItemsRef"
        :style="gridFragmentAmount <= 1 && `--grid-template: ${gridFragmentAmount}`"
      >
        <li
          v-for="(item) in galleryColumn"
          :key="item.id"
          class="gallery-parallax_item"
          :style="`--ratio: ${item && (item.size.height / item.size.width) * 100}%`
          "
        >
          <gallery-item
            :name="item.name"
            :image="item.image"
            :role="item.jobTitle"
            :id="item.id"
            :slug="item.slug"
          />
        </li>
        <!-- <li
          class="gallery-parallax_item"
          v-for="(item) in galleryColumn"
          :key="item.id"
          :style="
            `--ratio: ${item && (item.size.height / item.size.width) * 100}%`
          "
        >
          <gallery-item
            :name="item.name"
            :image="item.image"
            :role="item.jobTitle"
            :id="item.id"
            :slug="item.slug"
          />
        </li> -->
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
      columnItems: 3,
      oddColumnImageAmount: 3, // index 1, 3, 5, 7 etc
      evenColumnImageAmount: 4, // index 2, 4, 6, 8 etc

      responseData: [],
      galleryItemsRef: null,
      galleryRootRef: null,
      // gridFragmentAmount: 1,
      hasListener: false,
      // galleryItems: [],
      screenInnerWidth: this.innerWidth,
      timeout: null,
      filter: []
    }
  },
  watch: {
    // columnItems() {
    //   this.loadImage(this.responseData)
    // },
    screenInnerWidth() {
      //   document.addEventListener('scroll', this.scrollHandler, false)

      //   if (this.screenInnerWidth <= 800) {
      //     this.columnItems = 8
      //     document.removeEventListener('scroll', this.scrollHandler, false)
      //     this.galleryItemsRef.forEach(
      //       item => (item.transform = 'translateY(0)')
      //     )
      //   }
    }
  },
  async mounted() {
    try {
      this.updateColumnItems()
      window.addEventListener('resize', this.updateColumnItems)
      window.addEventListener(
        'resize',
        () => (this.screenInnerWidth = window.innerWidth)
      )

      this.responseData = this.team
      this.loadImage(this.responseData)

      this.$nextTick(() => {

        this.galleryItemsRef = this.$refs.galleryItemsRef
        this.galleryRootRef = this.$refs.galleryRootRef

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
      })
    } catch (error) {
      throw new Error('Failed to fetch profile picture', { cause: error })
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.updateColumnItems)
  },
  computed: {
    galleryItems() {
      const imagePerColumn = this.amountImagePerColumn(this.loadImage(this.responseData))
      return this.screenInnerWidth < 500 ? [this.loadImage(this.responseData)] : imagePerColumn
    },
    gridFragmentAmount() {
      // take the innerwidth of the screen and devide the width of the image to get the amount of grid fragments
      // const pictureAmount = this.responseData.length * this.responseData[0].width
      console.log(this.responseData)
      // const gridAmount = this.screenInnerWidth / pictureAmount
      // console.log(gridAmount)
      return this.screenInnerWidth < 500 ? 1 : 7
    }
  },
  methods: {
    updateColumnItems() {
      // if (this.responseData.length <= 10 && window.innerWidth < 800) {
      //   this.columnItems = 2
      // } else {
      //   this.columnItems = 1
      // }
      // if (window.innerWidth < 800) {
      //   this.columnItems = 4
      // } else {
      //   this.columnItems = 3
      // }
    },
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
      const { oddColumnImageAmount, evenColumnImageAmount } = this
      const columnGroupSize = evenColumnImageAmount + oddColumnImageAmount

      return refactoredResponse.reduce(
        (resultValue, currentValue, index) => {
          let currentArray = resultValue[resultValue.length - 1]

          if (
            (index % columnGroupSize === 0 &&
              currentArray.length === evenColumnImageAmount) ||
            (index % columnGroupSize === oddColumnImageAmount &&
              currentArray.length === oddColumnImageAmount)
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

        if (isIntersecting && !this.hasListener && window.innerWidth >= 800) {
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
        const y =
          (window.innerHeight -
            this.galleryRootRef.getBoundingClientRect().top) *
          0.01

        this.galleryItemsRef.forEach((column, index) => {
          const { speed } = this.galleryItems[index][0]

          if (column) {
            column.animate(
              {
                transform: `translateY(${ y * speed * -1 }px)`,
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
    }
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
  z-index: 10;
  margin-top: var(--blender);
  margin-bottom: var(--blender);
  background-color: white;

  transform: translateZ(0);
  /* force gpu to avoid render glitches */
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

.gallery-parallax--full-width {
  display: inline-block;
  width: 100%;
  grid-column: 1 / 51;
  grid-column: var(--grid-page);
}

.gallery-parallax_wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr repeat(2, 1fr) 0.5fr;
  grid-gap: var(--gap);
}

.gallery-parallax_grid {
  display: grid;
  align-content: center;
  list-style: none;
  overflow: unset;
  will-change: transform;
}

.gallery-parallax_grid:first-child li,
.gallery-parallax_grid:last-child li {
  /* width: 200%; */
}

.gallery-parallax_grid:first-child li {
  /* transform: translateX(-50%); */
}

.gallery-parallax_item {
  position: relative;
}

.gallery-parallax_item::before {
  content: "";
  display: block;
  padding-top: var(--ratio);
}

.gallery-parallax_item+.gallery-parallax_item {
  margin-top: var(--gap);
}

@media screen and (min-width: 800px) {
  .gallery-parallax {
    --gap: var(--unit-medium);
    --radius: 20px;
    --blender: 200px;
  }

  .gallery-parallax_wrapper {
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
