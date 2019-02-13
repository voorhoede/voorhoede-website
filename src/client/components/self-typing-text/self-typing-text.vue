<template>
  <div>
    <div
      ref="text"
      v-html="selfTypingText"
      class="self-typing-text self-typing-text--animated"
      aria-hidden="true"
      :class="{
        'self-typing-text--enhanced': enhanced,
        'self-typing-text--ended': animationEnded
      }"
    />
    <div class="self-typing-text self-typing-text--reduced-motion" v-html="text"/>
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

    const height = this.$refs.text.clientHeight
    const letters = this.text.split('')
    const intervalByDuration = (BASE_DURATION / this.text.length)
    /* Get interval that is not higher than max or lower than min */
    const interval = [MIN_INTERVAL, Math.round(intervalByDuration), MAX_INTERVAL].sort()[1]

    this.enhanced = true // Only enhance when javascript in the client is available
    this.$refs.text.style.height = `${height}px`
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
        if (index === this.text.length - 1 && this.$refs.text) {
          this.$refs.text.style.removeProperty('height')
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
    hyphens: auto;
    overflow-wrap: break-word;
  }

  .self-typing-text--animated {
    opacity: 0;
    animation: var(--show-text-animation);
    animation-delay: var(--show-text-animation-delay);
  }

  .self-typing-text--reduced-motion {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .self-typing-text--animated {
      display: none;
    }

    .self-typing-text--reduced-motion {
      display: block;
    }
  }

  .self-typing-text--enhanced {
    opacity: 1;
    animation: none;
  }

  .self-typing-text--enhanced::after {
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

  .self-typing-text--ended::after {
    content: none;
  }
</style>
