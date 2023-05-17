<template>
  <section
    class="blogs-section grid"
    v-once
  >
    <h2 class="blogs-section__title h3">
      {{ title }}
    </h2>

    <blogs-list
      :items="items"
      :pinned-items="pinnedItems"
      :item-size="itemSize"
    />
  </section>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    pinnedItems: {
      type: Array,
      default: () => [],
    },
    itemSize: {
      type: String,
      default: 'large',
    }
  })
</script>

<style>
.blogs-section__title {
  text-align: center;
  margin-bottom: var(--space-medium);
}
</style>
