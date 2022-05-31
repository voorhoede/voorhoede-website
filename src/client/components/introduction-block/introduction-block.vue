<template>
  <div class="body">
    <h2
      v-if="title"
      class="introduction-block__title h3"
    >
      {{ title }}
    </h2>
    <rich-text-block
      v-if="body"
      :text="body"
      :large-text="true"
    />
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      body: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style>
  .introduction-block__title {
    margin-bottom: var(--spacing-smaller);
  }
</style>
