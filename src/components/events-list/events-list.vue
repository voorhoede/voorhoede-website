<template>
  <ul
    class="event-list"
  >
    <li
      v-for="event in props.items"
      :key="event.slug"
    >
      <event-list-item
        :event="event"
      />
    </li>
  </ul>
</template>

<script setup>
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  })
</script>

<style>
.event-list {
  grid-column: var(--grid-content-smallest);
}

@media (min-width: 720px) {
  .event-list {
    grid-column: var(--grid-content);
  }
}
</style>
