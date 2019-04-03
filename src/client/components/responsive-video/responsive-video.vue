<template>
  <div class="responsive-video">
    <figure>
      <fixed-ratio class="responsive-video__canvas" :width="canvasWidth" :height="canvasHeight">
        <lazy-load>
          <div
            class="responsive-video__background"
            :style="{ backgroundImage: `url(${imageUrl})` }"
          />
          <iframe
            v-if="video && isPlaying"
            class="responsive-video__i-frame"
            :src="videoUrl"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            allow="autoplay"
          />
          <video
            v-if="gif && isPlaying"
            class="responsive-video__i-frame"
            autoplay="true"
            :loop="loop"
            muted
            controls
          >
            <source :src="`${gif.url}?fm=mp4`" type="video/mp4">
          </video>
          <component
            :is="video ? 'a' : 'button'"
            v-if="!isPlaying"
            class="responsive-video__button"
            :href="video ? video.url : null"
            @click.prevent="play"
          >
            <span class="sr-only">Play video</span>
            <img class="responsive-video__icon" src="/icons/icon_play.svg">
          </component>
        </lazy-load>
      </fixed-ratio>
      <figcaption>
        <a v-if="video" class="responsive-video__caption body-detail" target="_blank" rel="noreferrer noopener" :href="video.url" >
          {{ video.title }}
        </a>
        <span v-if="gif" class="responsive-video__caption body-detail">{{ gif.title }}</span>
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
        default: null
      },
      gif: {
        type: Object,
        default: null
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
        canvasWidth: this.video ? this.video.width : this.gif.width,
        canvasHeight: this.video ? this.video.height : this.gif.height
      }
    },
    computed: {
      imageUrl() {
        if(this.gif) {
          return `${this.gif.url}?fm=jpg`
        }

        const sizeRegex = /\d+\.\w+$/
        let preset = '/maxresdefault.jpg'

        switch (this.video.provider) {
          case 'vimeo':
            return (
              this.width === null
              ? false
              : this.video.thumbnailUrl.replace(sizeRegex, `${this.width}.jpg`)
            )
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
      },
    },
    created() {
      if(!this.video && !this.gif) {
        throw new Error('Responsive video requires a video or a gif prop')
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
    grid-column: var(--grid-page);
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

  .responsive-video video {
    width: 100%;
  }

  .responsive-video__button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color .25s ease;
  }

  .responsive-video__button:hover,
  .responsive-video__button:focus {
    border-bottom: none;
    background-color: rgba(0, 0, 0, .25);
  }

  button.responsive-video__button {
    border: 0;
    background-color: rgba(0, 0, 0, 0);
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
      width: 1440px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
