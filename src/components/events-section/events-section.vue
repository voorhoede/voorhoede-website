<template>
  <section
    class="events-section grid"
    v-once
  >
    <h2 class="events-section__title h3">
      {{ props.title }}
    </h2>
    <ul class="events-section__list">
      <li
        v-for="event in props.items"
        :key="event.slug"
      >
        <events-section-item
          :event="event"
        />
      </li>
    </ul>
  </section>
</template>

<script setup>
  const props = defineProps({
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
  margin-bottom: var(--spacing-big);
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
