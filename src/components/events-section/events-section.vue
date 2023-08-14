<template>
  <section
    class="events-section grid"
    v-once
  >
    <h2 class="events-section__title h3">
      {{ title }}
    </h2>
    <ul class="events-section__list">
      <li
        v-for="event in items"
        :key="event.slug"
      >
        <event-list-item
          :event="event"
        />
      </li>
    </ul>
  </section>
</template>

<script setup>
  defineProps({
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  })
</script>

<style>
.events-section__title {
  text-align: center;
  margin-bottom: var(--spacing-medium);
}

.events-section__list {
  grid-column: var(--grid-content);
}

@media (min-width: 720px) {
  .events-section__list {
    grid-column: var(--grid-content-smallest);
  }
}
</style>
