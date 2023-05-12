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

<script lang="ts" setup>
  type Props = {
    items: {
      id: string
      amount: number
      label: string
    }[]
  }

  defineProps<Props>()
</script>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-smaller);
  }

  .tag-list__item {
    padding: .2rem 1rem .1rem;
    color: var(--html-blue);
    background: var(--brand-yellow);
    border-radius: 2rem;
    white-space: nowrap;
  }
</style>
