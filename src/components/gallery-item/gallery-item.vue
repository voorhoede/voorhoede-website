<template>
  <app-link
    :to="$localeUrl({ name: 'team-slug', params: { slug } })"
  >
    <div class="gallery-item">
      <picture>
        <source
          type="image/webp"
          :srcset="image.responsiveImage.webpSrcSet"
        >
        <img
          class="image"
          :src="image.responsiveImage.src"
          :alt="name"
          loading="lazy"
          ref="imageRef"
        >
      </picture>
      <div class="details">
        <p class="h4">
          {{ name }}
        </p>
        <span class="body-detail">{{ jobTitle }}</span>
      </div>
    </div>
  </app-link>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: null
    },
    name: {
      type: String,
      required: true,
      default: null
    },
    quote: {
      type: String,
      required: false,
      default: null
    },
    image: {
      type: Object,
      required: true,
      default: null
    },
    jobTitle: {
      type: String,
      required: true,
      default: null
    },
    slug: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      imageRef: null
    }
  },
  mounted() {
    const image = this.$refs.imageRef
    function startScale(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry

        if (isIntersecting) {
          window.requestAnimationFrame(startAnimation(image))
        }
        window.cancelAnimationFrame()
      })
    }

    function startAnimation(item) {
      item.animate(
        {
          transform: ['scale(.5)', 'scale(1)'],
          opacity: [0, 1],
          easing: 'cubic-bezier(.13,.5,.43,.94)'
        },
        {
          duration: 300,
          dalay: Math.random() * 200,
          fill: 'both'
        }
      )
      observer.unobserve(item)
    }

    let options = {
      root: null,
      rootMargin: '20px',
      threshold: [0]
    }

    const observer = new IntersectionObserver(startScale, options)
    window.requestAnimationFrame(() => {
      observer.observe(image)
    })
  }
}
</script>

<style>
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--bg-pastel);
  overflow: hidden;
  opacity: 0;
  will-change: transform;
}

.details {
  position: absolute;
  background-color: var(--brand-yellow);
  width: 100%;
  pointer-events: none;

  bottom: 0;
  padding: 1rem;
  opacity: 0;
  z-index: var(--z-index-high);
  transform: translateY(10px);
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
}

.gallery-item:hover .details,
.gallery-item:focus .details {
  transform: translateY(0);
  opacity: 1;
}

.button {
  border: none;
  background: none;
  border: none;
}

.button:hover {
  cursor: pointer;
}
.show-details-side-view {
  right: 0;
  color: white;
}
</style>
