<template>
  <div
    class="self-typing-text"
    aria-hidden="true"
    :class="{
      'self-typing-text--enhanced': enhanced,
      'self-typing-text--ended': animationEnded
    }"
  >
    <div class="self-typing-text__placeholder" v-html="text"/>
    <div class="self-typing-text__text" v-html="selfTypingText"/>
  </div>
</template>

<script>
const MIN_INTERVAL = 35 // Time between letters should be at least 35ms
const MAX_INTERVAL = 70 // Time between letters should be no more than 70ms
const BASE_DURATION = 1000 // Transition duration to aim for is 1s

export default {
  props:{
    text: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      /* by adding the this.text initally it will calculate the height needed.
      This way the header doesnt get larger when the sentence is typed */
      animationEnded: false,
      enhanced: false,
      selfTypingText: this.text,
    }
  },
  mounted () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const letters = this.text.split('')
    const intervalByDuration = (BASE_DURATION / this.text.length)
    /* Get interval that is not higher than max or lower than min */
    const interval = [MIN_INTERVAL, Math.round(intervalByDuration), MAX_INTERVAL].sort()[1]

    this.enhanced = true // Only enhance when javascript in the client is available
    this.selfTypingText = ''

    letters.forEach((letter, index) => {
      setTimeout(() => {
        this.selfTypingText += letter
        /*
         * By removing the height property when the last letter is typed,
         * it will scale normaly when window is resized.
         *
         * this.$refs.text is checked, because the component might be unmounted,
         * by the time the code is run, because of the timeout.
         */
        if (index === this.text.length - 1) {
          this.animationEnded = true // Remove cursor
        }
      }, interval * index)
    })
  }
}
</script>
<style>
  :root {
    --show-text-animation-delay: 1.5s;
    --show-text-animation: show 1s forwards;
    --blink-text-animation: blink 850ms infinite;
  }

  .self-typing-text {
    margin-top: var(--spacing-smaller);
    position: relative;
  }

  .self-typing-text__text,
  .self-typing-text__placeholder {
    hyphens: auto;
    overflow-wrap: break-word;
    opacity: 0;
  }

  .self-typing-text__text {
    animation: var(--show-text-animation);
    animation-delay: var(--show-text-animation-delay);
    position: absolute;
    top: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .self-typing-text__text {
      animation: none;
      opacity: 1;
    }
  }

  .self-typing-text--enhanced .self-typing-text__text {
    opacity: 1;
    animation: none;
  }

  .self-typing-text--enhanced .self-typing-text__text::after {
    content: '';
    position: relative;
    display: inline-block;
    left: -.025em;
    top: -.025em;
    height: 1em;
    vertical-align: middle;
    border-right: 3px solid var(--html-blue);
    animation: var(--blink-text-animation);
  }

  .self-typing-text--ended .self-typing-text__text::after {
    content: none;
  }
</style>
