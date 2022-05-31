<template>
  <div class="game" :class="{'game--open': isOpen }">
    <span class="game__background" />
    <button
      v-if="!isOpen"
      @click="open"
      class="game__open-button"
      type="button"
      :aria-label="translations.open[$i18n.locale]"
    ></button>

    <button
      v-if="isOpen"
      @click="close"
      class="game__close-button"
      type="button"
      :aria-label="translations.close[$i18n.locale]"
    >
      <app-icon name="close" alt="" />
    </button>

    <transition name="step-animation">
      <div v-if="step === 1" class="game__intro">
        <h3 class="h1">
          {{ translations.introTitle[$i18n.locale] }}
        </h3>
        <p class="body">
          {{ translations.introBody[$i18n.locale] }}
        </p>

        <button
          @click="play"
          class="app-button app-button--small body-small font-bold"
          type="button"
        >
          <span>{{ translations.play[$i18n.locale] }}</span>
        </button>
      </div>
    </transition>

    <transition name="step-animation">
      <div v-if="step === 2" class="game__fill">
        <dl class="game__current-scores body-small">
          <dt>score</dt>
          <dd>{{ currentScore }}</dd>

          <template v-if="highScore">
            <dt>high score</dt>
            <dd>{{ highScore }}</dd>
          </template>
        </dl>

        <game-timer :progress="progress" />
      </div>
    </transition>

    <ul
      v-if="step === 2"
      class="game__fill"
    >
      <li
        v-for="(egg, index) in eggs"
        class="game__egg"
        :key="egg"
        ref="items"
      >
        <button
          @click="(event) => score(event, index)"
          tabindex="-1"
          type="button"
          aria-label="Click me"
          :style="{'background-image': `url(/images/game/${egg}.jpg)`}"
        ></button>
      </li>
    </ul>

    <transition name="step-animation">
      <div v-if="step === 3" class="game__end-screen">
        <h3 class="h1">
          {{ currentScore }}<br/>
          {{ feedback }}
        </h3>

        <button
          @click="play"
          class="app-button app-button--small body-small font-bold"
          type="button"
        >
          <span>{{ translations.playAgain[$i18n.locale] }}</span>
        </button>

        <game-share :share-text="shareText" />
      </div>
    </transition>
  </div>
</template>

<script>
  import localStorageSupported from '../../lib/local-storage-supported'
  import translations from './game-translations'
  import GameTimer from './game-timer'
  import GameShare from './game-share'

  const feedbacks = [
    'You just don\'t carrot all.',
    'Keep on eggs-ercising',
    'That\'s egg-cellent!',
    'You\'re egg-ceptional!',
  ]

  export default {
    components: { GameTimer, GameShare },

    data: () => ({
      eggs: ['game-01', 'game-02', 'game-03', 'game-04', 'game-05', 'game-06', 'game-07', 'game-08'],
      isOpen: false,
      step: 0,
      currentScore: 0,
      tweens: [],
      playbackRate: 1,
      animationFrame: null,
      startTime: undefined,
      duration: 20000,
      progress: 0,
      highScore: undefined,
      translations,
     }),

     computed: {
       shareText() {
         return this.translations.shareText[this.$i18n.locale].replace('{{currentScore}}', this.currentScore)
       },

       feedback() {
         return this.currentScore < 4
          ? feedbacks[0]
          : this.currentScore < 15
          ? feedbacks[1]
          : this.currentScore < 30
          ? feedbacks[2]
          : feedbacks[3]
       },
     },

     mounted() {
      if (localStorageSupported) {
        this.highScore = localStorage.getItem('gameHighScore')
      }
    },

     methods: {
        open() {
            this.isOpen = true
            this.step = 1
        },

        close() {
          this.isOpen = false
          this.step = 0
          this.currentScore = 0
          this.playbackRate = 1
          this.cancelTweens()
        },

        play() {
          this.step = 2
          this.currentScore = 0

          this.$nextTick(() => {
            this.animateEggs()
            requestAnimationFrame(this.handleTiming)
          })
        },

        finish() {
          if (localStorageSupported) {
            this.setHighScore()
          }

          this.cancelTweens()
          this.step = this.isOpen ? 3 : 0
          this.playbackRate = 1
          this.startTime = undefined
          this.progress = 0
        },

        setHighScore() {
          const hightScore = localStorage.getItem('gameHighScore')
          if (hightScore < this.currentScore) {
            localStorage.setItem('gameHighScore', this.currentScore)
            this.highScore = this.currentScore
          }
        },

        handleTiming(timeStamp) {
          if (this.startTime === undefined) {
            this.startTime = timeStamp
          }

          this.progress = (timeStamp - this.startTime) / this.duration

          if (this.step === 2 && (this.startTime + this.duration > timeStamp)) {
            this.animationFrame = requestAnimationFrame(this.handleTiming)
          } else {
            cancelAnimationFrame(this.handleTiming)
            this.finish()
          }
        },

        cancelTweens() {
          this.tweens.forEach(tween => tween.cancel())
          this.tweens = []
        },

       animateEggs() {
          this.$refs.items.forEach((egg, index) => {
            const xPosition = +(Math.random() * 90).toPrecision(2)
            const tween = egg.animate({
              transform: [
                `translateX(${xPosition}vw) translateY(0vh) rotate(${+(Math.random() * -200).toPrecision(2)}deg)`,
                `translateX(${xPosition}vw) translateY(130vh) rotate(${+(Math.random() * 360).toPrecision(2)}deg)`,
              ],
            }, {
              duration: 3000 + Math.random() * 4000,
              delay: Math.random() * 4000,
              fill: 'both',
            })

            tween.onfinish = ({ target }) => {
              target.effect.updateTiming({
                delay: Math.random() * 1000,
              })
              target.play()
            }

            this.tweens.splice(index, 0, tween)
          })
       },

        score(event, index) {
          this.playbackRate += .2
          const tween = this.tweens[index]
          const button = event.target
          button.disabled = true

          const subTween = button.animate({
            transform: ['scale(1)', 'scale(2)'],
            opacity: [1, 0],
          }, {
            duration: 150,
            fill: 'both',
          })

          subTween.onfinish = () => {
            setTimeout(() => {
              subTween.cancel()
            }, 10)
            tween.finish()
            this.currentScore++
            button.disabled = false
          }
        },
     },
  }
</script>

<style src="./game.css"></style>
