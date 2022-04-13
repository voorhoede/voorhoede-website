<template>
  <div class="game" :class="{'game--open': isOpen }">
    <span class="game__background" />
    <button
      v-if="!isOpen"
      @click="open"
      class="game__open-button"
      type="button"
      aria-label="Play the eastern game"
    ></button>

    <button
      v-if="isOpen"
      @click="close"
      class="game__close-button"
      type="button"
      aria-label="Close"
    >
      <app-icon name="close" alt="" />
    </button>

    <transition name="step-animation">
      <div v-if="step === 1" class="game__intro">
        <h3 class="h1">
          Awesome, you discovered our secret easter egg. Now let's hunt some more.
        </h3>
        <p class="body">
          Collect as many eggs as possible by tapping on the eggs before they disappear.
        </p>

        <button
          @click="play"
          class="app-button app-button--small body-petite font-bold"
          type="button"
        >
          <span>Play</span>
        </button>
      </div>
    </transition>

    <transition name="step-animation">
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
    </transition>

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
          class="app-button app-button--small body-petite font-bold"
          type="button"
        >
          <span>Play again</span>
        </button>

        <game-share :share-text="shareText" />
      </div>
    </transition>
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
      highScore: undefined
     }),

     computed: {
       shareText() {
         return `I went on an easter egg hunt @devoorhoede and collected ${this.currentScore}! Can you beat me? #easteregghunt #easteratdevoorhoede`
       },

       feedback() {
         return this.currentScore < 4
          ? feedbacks[0]
          : this.currentScore < 12
          ? feedbacks[1]
          : this.currentScore < 22
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

         this.$nextTick(() => {
          this.animateEggs()
          requestAnimationFrame(this.handleTiming)
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
            const xPosition = Math.random() * 90
            this.tweens[index] = egg.animate({
              transform: [
                `translateX(${xPosition}vw) translateY(0) rotate(${Math.random() * -200}deg)`,
                `translateX(${xPosition}vw) translateY(130vh) rotate(${Math.random() * 360}deg)`
              ]
            }, {
              duration: 8000 + Math.random() * 4000,
              delay: Math.random() * 4000,
            })

            this.tweens[index].onfinish = () => {
              this.tweens[index].effect.updateTiming({
                delay: Math.random() * 1000
              })
              this.tweens[index].play()
            }
          })
       },

       score(index) {
         this.playbackRate += .2

        this.tweens[index].pause()
        const tween = this.tweens[index].effect.target.animate({
          transform: 'translate(0, 100vh) scale(.3) rotate(360deg)'
        }, 300)

        tween.onfinish = () => {
          this.updatePlaybackRate()
         this.tweens[index].finish()
         this.tweens[index].cancel()
         this.tweens[index].play()
         this.currentScore++
        }
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
