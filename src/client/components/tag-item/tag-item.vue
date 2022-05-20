<template>
  <div class="tag-item body-big">
    <strong>{{ amount }}</strong> {{ label }}
  </div>
</template>

<script>
  export default {
    props: {
      amount: {
        type: Number,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    }
  }
</script>

<style>
  .tag-item {
    padding: .2rem 1rem .1rem 1rem;
    color: var(--html-blue);
    background: var(--brand-yellow);
    border-radius: 2rem;
    white-space: nowrap;
  }
</style>
