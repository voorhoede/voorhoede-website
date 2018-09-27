<template>
  <div class="code-block">
    <pre :class="codeLanguage"><code v-html="content"/></pre>
  </div>
</template>
<script>
export default {
  props: {
    language: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    codeLanguage(){
      return Array.of(`language-${this.language}`)
    }
  }
}
</script>

<style>
</style>
