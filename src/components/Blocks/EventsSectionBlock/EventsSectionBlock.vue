<template>
  <section
    class="events-section grid"
    v-once
  >
    <h2 class="events-section__title h3">
      {{ data.title }}
    </h2>
    <ul class="events-section__list">
      <li
        v-for="event in data.items"
        :key="event.slug"
      >
        <EventListItem
          :event="event"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { EventsSectionBlockFragment } from "./EventsSectionBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof EventsSectionBlockFragment>;
}>();

const data = readFragment<typeof EventsSectionBlockFragment>(props.data);
</script>

<style scoped>
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
