<template>
  <ul class="tag-list">
    <li
      v-for="item in items"
      :key="item.id"
    >
      <nuxt-link
        class="tag-list__item"
        :to="item.to"
        :class="{
          'tag-list__item--active': item.isActive
        }"
      >
        {{ item.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { NuxtLinkProps } from 'nuxt/app'

  type Props = {
    items: {
      id: string
      title: number
      slug: string
      to: NuxtLinkProps['to']
      isActive: boolean
    }[]
  }

  defineProps<Props>()
</script>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-smaller);
  }

  .tag-list__item {
    display: inline-block;
    font-family: var(--font-sans);
    padding: 0.5rem 1.5rem;
    color: var(--html-blue);
    background: var(--bg-pastel);
    border-radius: 2rem;
    white-space: nowrap;
    border: 1px solid transparent;
  }

  .tag-list__item--active {
    border: 1px solid var(--html-blue);
  }
</style>
