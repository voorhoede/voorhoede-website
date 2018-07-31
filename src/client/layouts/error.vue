<template>
  <section>
    <h1>Error ({{ error.statusCode }})</h1>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
