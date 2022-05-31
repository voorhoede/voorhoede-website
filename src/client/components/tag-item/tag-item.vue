<template>
  <component :is="tag" class="tag-item body-big">
    <strong>{{ amount }}</strong> {{ label }}
  </component>
</template>

<script>
  export default {
    props: {
      tag: {
        type: String,
        default: 'div',
      },
      amount: {
        type: Number,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  .tag-item {
    padding: .2em 1em .1em 1em;
    color: var(--html-blue);
    background: var(--brand-yellow);
    border-radius: 2rem;
    white-space: nowrap;
  }
</style>
