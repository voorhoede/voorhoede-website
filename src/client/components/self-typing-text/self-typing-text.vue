<template>
  <span
    ref="text"
    v-html="selfTypingText"
    class="self-typing-text"
    aria-hidden="true"
    :class="{
      'self-typing-text--enhanced': enhanced,
      'self-typing-text--ended': animationEnded
    }"
  />
</template>

<script>
const MIN_INTERVAL = 35 // Time between letters should be at least 35ms
const MAX_INTERVAL = 70 // Time between letters should be no more than 70ms
const BASE_DURATION = 1000 // Time to aim for is 1s

export default {
  props:{
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      /* by adding the this.text initally it will calculate the height needed.
      This way the header doesnt get larger when the sentence is typed */
      selfTypingText: this.text,
      animationEnded: false,
    }
  },
  computed: {
    enhanced () {
      return process.client
    }
  },
  mounted() {
    const height = this.$refs.text.clientHeight
    const letters = this.text.split('')

    const intervalByDuration = (BASE_DURATION / this.text.length)
    /* Get interval that is not higher than max or lower than min */
    const interval = [MIN_INTERVAL, MAX_INTERVAL, Math.round(intervalByDuration)].sort()[1]

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
          this.animationEnded = true // remove cursor
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
    display: block;
    margin-top: var(--spacing-smaller);
    hyphens: auto;
    overflow-wrap: break-word;
    opacity: 0;
    animation: var(--show-text-animation);
    animation-delay: var(--show-text-animation-delay);
  }

  .self-typing-text--enhanced {
    opacity: 1;
    animation: none;
  }

  .self-typing-text--enhanced::after {
    content: '';
    position: relative;
    display: inline-block;
    left: -0.025em;
    top: -0.025em;
    height: 1em;
    vertical-align: middle;
    border-right: 3px solid var(--html-blue);
    animation: var(--blink-text-animation);
  }

  .self-typing-text--ended::after {
    content: none;
  }
</style>
