<template>
  <section>
    <h1>Error ({{ error.statusCode }})</h1>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
      required: true,
    },
  },
}
</script>
