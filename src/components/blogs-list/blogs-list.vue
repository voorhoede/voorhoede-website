<template>
  <ul
    class="blogs-list"
  >
    <li
      v-for="blog in pinnedItems"
      :key="blog.slug"
    >
      <blog-list-item
        :item="blog"
        :large="itemSize === 'large'"
        pinned
      />
    </li>
    <li
      v-for="blog in items"
      :key="blog.slug"
    >
      <blog-list-item
        :item="blog"
        :large="itemSize === 'large'"
      />
    </li>
  </ul>
</template>

<script setup>
  defineProps({
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
.blogs-list {
  grid-column: var(--grid-content);
}

@media (min-width: 720px) {
  .blogs-list {
    grid-column: var(--grid-content-smallest);
  }
}
</style>
