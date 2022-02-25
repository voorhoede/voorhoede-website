<template>
  <div class="code-pen-block" v-html="iframe" />
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    iframe: {
      type: String,
      required: true,
    },
  },
}
</script>
