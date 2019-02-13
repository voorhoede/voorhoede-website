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
  .code-block pre {
    line-height: 2;
  }

  @media (min-width: 720px) {
    .code-block pre {
      padding: var(--spacing-large);
    }
  }

  @media (min-width: 1440px) {
    .code-block pre {
      padding: var(--spacing-large) var(--spacing-larger);
    }
  }
</style>
