<template>
  <ul class="counter-item-list">
    <li
      v-for="item in items"
      :key="item.id"
      class="counter-item-list__item body-big"
    >
      <strong>{{ item.amount }}</strong> {{ item.label }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
  defineProps<{
    items: Array<{
      id: string
      amount: number
      label: string
    }>
  }>()
</script>

<style>
  .counter-item-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-smaller);
  }

  .counter-item-list__item {
    padding: .2rem 1rem .1rem;
    color: var(--html-blue);
    background: var(--brand-yellow);
    border-radius: 2rem;
    white-space: nowrap;
  }
</style>
