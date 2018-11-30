<template>
  <span
    ref="text"
    v-html="selfTypingText"
    class="self-typing-text"
    aria-hidden="true"
    :class="{
      'self-typing-text--js-bootstrapped': jsBootstrapped
    }"
  />
</template>

<script>
export default {
  props:{
    text: {
      type: String,
      required: true,
    },
    speedIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      /* by adding the this.text initally it will calculate the height needed.
      This way the header doesnt get larger when the sentence is typed */
      typingSpeed: this.speedIndex,
      selfTypingText: this.text,
      jsBootstrapped: false,
    }
  },
  mounted() {
    const height = this.$refs.text.clientHeight
    const letters = this.text.split('')
    const minInterval = 50
    const maxInterval = 70
    const minDuration = 600
    const maxDuration = 1400
    const duration = this.comparator(minDuration, maxDuration, (this.speedIndex * this.text.length))
    const letterInterval = this.comparator(minInterval, maxInterval, (duration / this.text.length))

    this.typingSpeed = letterInterval
    this.jsBootstrapped = true
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
        }
      }, this.typingSpeed * index)
    })
  },
  methods: {
    comparator (min, max, value) {
      return (
        value < min ?
          value = min
        : value > max ?
          value = max
        : value
      )
    }
  }
}
</script>
<style>
  :root {
    --cursor-h1-height-low: 2.75rem;
    --cursor-h1-height-medium: 4.0625rem;
    --cursor-h1-height-high: 5.625rem;
    --cursor-hero-height-low: 3.8125rem;
    --cursor-hero-height-medium: 4.5rem;
    --cursor-hero-height-high: 6.6875rem;
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

  .self-typing-text::after {
    content: '';
    position: relative;
    display: inline-block;
    left: -2px;
    top: -2px;
    height: 100%;
    vertical-align: middle;
    border-right: 3px solid var(--html-blue);
    animation: var(--blink-text-animation);
  }

  .self-typing-text--hero::after {
     height: var(--cursor-hero-height-low);
  }

  .self-typing-text--h1::after {
     height: var(--cursor-h1-height-low);
  }

  @media (min-width: 720px) {
    .self-typing-text--hero::after {
      height: var(--cursor-hero-height-medium);
    }

    .self-typing-text--h1::after {
      height: var(--cursor-h1-height-medium);
    }
  }

  @media (min-width: 1100px) {
    .self-typing-text--hero::after {
      left: -4px;
      top: -7px;
      height: var(--cursor-hero-height-high);
    }

    .self-typing-text--h1::after {
      left: -5px;
      top: -7px;
      height: var(--cursor-h1-height-high);
    }
  }

  .self-typing-text--js-bootstrapped {
    opacity: 1;
    animation: none;
  }
</style>
