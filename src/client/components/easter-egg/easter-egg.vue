<template>
  <div class="game" :class="{'game--open': isOpen }">
    <button
      v-if="!isOpen"
      @click="open"
      class="game__open-button"
      type="button"
      aria-label="Play the eastern game"
    />

    <button
      v-if="isOpen"
      @click="close"
      class="game__close-button"
      type="button"
      aria-label="Close"
    >
      <app-icon name="close" alt="" />
    </button>

    <div v-if="step === 1" class="game__intro">
      <h3 class="sub-title">
        This is how it works
      </h3>

      <button
        @click="play"
        class="app-button app-button--small body-petite font-bold"
        type="button"
      >
        <span>Play</span>
      </button>
    </div>

    <div v-if="step === 2" class="game__fill">
      <dl class="game__current-scores body-petite">
        <dt>score</dt>
        <dd>{{ currentScore }}</dd>

        <template v-if="highScore">
          <dt>high score</dt>
          <dd>{{ highScore }}</dd>
        </template>
      </dl>

      <game-timer :progress="progress" />
    </div>

    <ul
      v-if="step === 2"
      class="game__fill"
      ref="eggs"
    >
      <li
        v-for="(egg, index) in eggs"
        class="game__egg"
        :key="egg"
        ref="items"
      >
        <button
          @click="() => score(index)"
          tabindex="-1"
          type="button"
          aria-label="Click me"
          :style="{'background-image': `url(/images/game/${egg}.jpg)`}"
        />
      </li>
    </ul>

    <div v-if="step === 3" class="game__end-screen">
      <h3 class="h1">{{ feedback }}</h3>

      <button
        @click="play"
        class="app-button app-button--small body-petite font-bold"
        type="button"
      >
        <span>Play again</span>
      </button>

      <game-share :share-text="shareText" />
    </div>
  </div>
</template>

<script>
  import localStorageSupported from '../../lib/local-storage-supported'
  import GameTimer from './game-timer'
  import GameShare from './game-share'

  const feedbacks = [
    'You just don\'t carrot all.',
    'Keep on eggs-ercising',
    'That\'s egg-cellent!',
    'You\'re egg-ceptional!'
  ]

  export default {
    components: { GameTimer, GameShare },

    data: () => ({
      eggs: ['game-01', 'game-02', 'game-03'],
      isOpen: false,
      step: 0,
      currentScore: 0,
      tweens: [],
      playbackRate: 1,
      animationFrame: null,
      startTime: undefined,
      duration: 20000,
      progress: 0,
      highScore: undefined
     }),

     computed: {
       shareText() {
         return `Check my score of ${this.currentScore}`
       },

       feedback() {
         return this.currentScore < 4
          ? feedbacks[0]
          : this.currentScore < 10
          ? feedbacks[1]
          : this.currentScore < 20
          ? feedbacks[2]
          : feedbacks[3]
       }
     },

     mounted() {
      if(localStorageSupported) {
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
         requestAnimationFrame(this.handleTiming)

         this.$nextTick(() => {
          this.animateEggs()
        })
       },

       finish() {
        if(localStorageSupported) {
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
        if(hightScore < this.currentScore) {
          localStorage.setItem('gameHighScore', this.currentScore)
          this.highScore = this.currentScore
        }
       },

       handleTiming(timeStamp) {
         if(this.startTime === undefined) {
           this.startTime = timeStamp
         }

         this.progress = (timeStamp - this.startTime) / this.duration

         if(this.step === 2 && (this.startTime + this.duration > timeStamp)) {
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
          [...this.$refs.eggs.children].forEach((egg, index) => {
            egg.style.setProperty('--x-offset', Math.random())
            this.tweens[index] = egg.animate({
              transform: [
                `translateY(-100%) rotate(${Math.random() * -200}deg)`,
                `translateY(105vh) rotate(${Math.random() * 360}deg)`
              ]
            }, {
              duration: 10000,
              delay: Math.random() * 3000
            })

            this.tweens[index].onfinish = () => {
              egg.style.setProperty('--x-offset', Math.random())

              this.tweens[index].effect.updateTiming({
                delay: Math.random() * 1000
              })
              this.tweens[index].play()
            }
          })
       },

       score(index) {
         this.playbackRate += .2
         this.updatePlaybackRate()

         this.tweens[index].finish()
         this.tweens[index].cancel()
         this.tweens[index].play()
         this.currentScore++
       },

       updatePlaybackRate() {
         if(!this.tweens.length) {
           return
         }

         this.tweens.forEach(tween => tween.updatePlaybackRate(this.playbackRate))
       }
     }
  }
</script>

<style src="./game.css"></style>
