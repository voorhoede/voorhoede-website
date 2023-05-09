<template>
  <ul class="tag-list">
    <li
      v-for="item in items"
      :key="item.id"
      class="tag-list__item body-big"
    >
      <strong>{{ item.amount }}</strong> {{ item.label }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      items: {
        type: Object,
        required: true,
        validator(items) {
          return items.every(item => typeof item.amount === 'number' && typeof item.label === 'string')
        }
      },
    }
  }
</script>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-smaller);
  }

  .tag-list__item {
    padding: .2em 1em .1em 1em;
    color: var(--html-blue);
    background: var(--brand-yellow);
    border-radius: 2rem;
    white-space: nowrap;
  }
</style>
