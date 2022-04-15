<template>
  <svg class="game-timer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44.967"/>
    <path :stroke-dasharray="pathLength" :stroke-dashoffset="progressLength" ref="path" d="M50,5.033c24.835,0,44.967,20.132,44.967,44.967S74.835,94.967,50,94.967S5.033,74.835,5.033,50S25.165,5.033,50,5.033"/>
  </svg>
</template>

<script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true
      }
    },

    data: () => ({
      pathLength: 0
    }),

    computed: {
      progressLength() {
        return this.pathLength - (this.pathLength * this.progress)
      }
    },

    mounted() {
      this.pathLength = this.$refs.path.getTotalLength()
    }
  }
</script>

<style src="./game-timer.css"></style>
