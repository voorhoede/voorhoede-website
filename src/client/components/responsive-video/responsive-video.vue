<template>
  <div class="responsive-video">
    <figure>
      <fixed-ratio class="responsive-video__canvas" :width="video.width" :height="video.height">
        <lazy-load>
          <div
            class="responsive-video__background"
            :style="{ backgroundImage: `url(${imageUrl})` }"
          />
          <iframe
            v-if="isPlaying"
            class="responsive-video__i-frame"
            :src="videoUrl"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            allow="autoplay"
          />
          <a
            v-if="!isPlaying"
            class="responsive-video__button"
            :href="video.url"
            @click.prevent="play">
            <span class="sr-only">Play video</span>
            <img class="responsive-video__icon" src="/icons/icon_play.svg">
          </a>
        </lazy-load>
      </fixed-ratio>
      <figcaption v-if="video.title">
        <a class="responsive-video__caption body-detail" target="_blank" rel="noopener" :href="video.url" >
          {{ video.title }}
        </a>
      </figcaption>
    </figure>
  </div>
</template>

<script>
  import FixedRatio from '../fixed-ratio/fixed-ratio'
  import LazyLoad from '../lazy-load/lazy-load'

  const binaryBoolean = value => (value) ? 1 : 0

  export default {
    components: { FixedRatio, LazyLoad },
    props: {
      video: {
        type: Object,
        required: true,
      },
      autoplay: {
        type: Boolean,
        required: true,
      },
      loop: {
        type: Boolean,
        required: true,
      },
      mute: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        isPlaying: this.autoplay,
        width: null,
      }
    },
    computed: {
      imageUrl() {
        const sizeRegex = /\d+\.\w+$/
        let preset = '/maxresdefault.jpg'

        switch (this.video.provider) {
          case 'vimeo':
            return this.video.thumbnailUrl.replace(sizeRegex, `${this.width}.jpg`)
          case 'youtube':
            if (this.width < 320) {
              preset = '/mqdefault.jpg'
            } else if (this.width < 480) {
              preset = '/hqdefault.jpg'
            }

            return this.video.thumbnailUrl.replace('/hqdefault.jpg', preset)
          default:
            throw Error(`unsupported video provider for cover image: ${this.video.provider}`)
        }
      },
      videoUrl() {
        if (!this.isPlaying) {
          return ''
        }

        const { autoplay, loop, mute = autoplay } = this
        const { provider, providerUid } = this.video

        switch (provider) {
          case 'vimeo':
            return `https://player.vimeo.com/video/${providerUid}?autoplay=1&muted=${binaryBoolean(mute)}&loop=${binaryBoolean(loop)}`
          case 'youtube':
            return `https://www.youtube.com/embed/${providerUid}?autoplay=1&mute=${binaryBoolean(mute)}&loop=${binaryBoolean(loop)}&playlist=${providerUid}`
          default:
            throw Error(`unsupported video provider: ${provider}`)
        }
      }
    },
    mounted() {
      const pixelRatio = window.devicePixelRatio || 1
      const cssWidth = this.$el.getBoundingClientRect().width

      this.width = cssWidth * pixelRatio
    },
    methods: {
      play() {
        this.isPlaying = true
      },
    },
  }
</script>

<style>
  .responsive-video {
    position: relative;
    grid-column: page;
  }

  .responsive-video__canvas {
    background-color: var(--bg-pastel);
  }

  .responsive-video__background {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
  }

  .responsive-video__i-frame {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .responsive-video__button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: background-color .25s ease;
  }

  .responsive-video__button:hover,
  .responsive-video__button:focus {
    border-bottom: none;
    background-color: rgba(0, 0, 0, .25);
  }

  .responsive-video__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .responsive-video__caption {
    display: block;
    text-align: center;
    margin-top: var(--spacing-smaller);
  }

  @media (min-width: 1440px) {
    .responsive-video {
      margin: 0 auto;
      width: 1440px;
    }
  }
</style>
