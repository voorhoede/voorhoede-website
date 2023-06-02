<template>
  <app-link
    :to="$localeUrl({ name: 'team-slug', params: { slug } })"
    class="gallery-item"
  >
    <dato-image
      class="gallery-item__image"
      :src="image.url"
      :alt="name"
      :width="image.width"
      :height="image.height"
      loading="lazy"
      ref="galleryItemImageRef"
    />
    <div class="gallery-item__details">
      <p class="h4">
        {{ name }}
      </p>
      <span class="body-detail">{{ jobTitle }}</span>
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
      galleryItemImage: null
    }
  },
  mounted() {
    const imageRef = this.$refs.galleryItemImageRef
    function startScale(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry

        if (isIntersecting) {
          window.requestAnimationFrame(startAnimation(imageRef))
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
      observer.observe(imageRef)
    })
  }
}
</script>

<style>
.gallery-item__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--bg-pastel);
  overflow: hidden;
  will-change: transform;
}

.gallery-item__details {
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

.gallery-item:hover .gallery-item__details,
.gallery-item:focus .gallery-item__details {
  transform: translateY(0);
  opacity: 1;
}
</style>
