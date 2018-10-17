<template>
  <span 
    ref="text"
    v-html="selfTypingText" 
    class="self-typing-text"
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
      selfTypingText: this.text,
      jsBootstrapped: false,
    }
  },
  mounted() {
    const typingSpeed = this.speedIndex
    const height = this.$refs.text.clientHeight
    const letters = this.text.split('')

    this.jsBootstrapped = true
    this.$refs.text.style.height = `${height}px`
    this.selfTypingText = ''
    
    letters.forEach((letter, index) => {
      setTimeout(() => {
        this.selfTypingText += letter
        
        /* by removing the height property when the last letter is typed 
        it will scale normaly when window is resized */
        if (index === this.text.length - 1) {
          this.$refs.text.style.removeProperty('height')
        }
      }, typingSpeed * index)

    })
  }, 
}
</script>
<style>
  :root {
    --show-text-animation-delay: 1.5s;
    --show-text-animation: show 1s forwards;
    --blink-text-animation: blink 750ms infinite;
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

  /* positioned absolute to keep the cursor behind the text */
  .self-typing-text::after {
    content: '|';
    position: absolute;
    display: inline-block;
    margin-left: var(--spacing-tiny);
    transform: scaleX(.5);
    font-weight: normal;
    animation: var(--blink-text-animation);
    vertical-align: middle;
  }

  .self-typing-text--js-bootstrapped {
    opacity: 1;
    animation: none;
  }
</style>