<template>
  <section v-if="items.length" class="events-list">
    <h2 v-if="data.title" class="events-list__title h2">
      {{ data.title }}
    </h2>
    <ul class="events-list__list">
      <li v-for="event in items" :key="event.slug" class="events-list__item">
        <EventCard
          v-if="isUpcoming(event.date) && event.image"
          :date-string="event.date"
          :title="event.title"
          :description="event.description"
          :illustration="event.image"
          :slug="event.slug"
          :label="event.label"
        />
        <EventListItem
          v-else
          :event="{
            date: event.date,
            title: event.title,
            slug: event.slug,
            social: { description: event.description },
          }"
        />
      </li>
    </ul>
  </section>
  <section v-else-if="data.title" class="events-list events-list--empty">
    <h2 class="events-list__title h2">
      {{ data.title }}
    </h2>
  </section>
</template>

<script setup lang="ts">
import type { EventsListBlockFragment } from "./EventsListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";
import EventCard from "~/components/event-card/event-card.vue";
import EventListItem from "~/components/event-list-item/event-list-item.vue";

const props = defineProps<{
  data: FragmentOf<typeof EventsListBlockFragment>;
}>();

const data = readFragment<typeof EventsListBlockFragment>(props.data);

const items = computed(() =>
  (data.items ?? [])
    .filter((event) => Boolean(event.slug))
    .map((event) => {
      const eventTag = event.tags?.find((tag) => tag.category === "event");
      return {
        title: event.title,
        slug: event.slug,
        date: event.date,
        image: event.image,
        description: event.seo?.description ?? "",
        label: eventTag?.title ?? event.tags?.[0]?.title ?? "Event",
      };
    }),
);

function isUpcoming(dateString: string) {
  return new Date(dateString).getTime() > Date.now();
}
</script>

<style scoped>
.events-list {
  grid-column: var(--grid-page);
}

.events-list__title {
  margin-bottom: var(--spacing-medium);
  text-align: center;
}

.events-list__list {
  grid-column: var(--grid-content);
  display: grid;
  gap: var(--spacing-medium);
}

.events-list__item + .events-list__item {
  padding-top: var(--spacing-small);
  border-top: 1px solid var(--very-dim);
}

@media (min-width: 720px) {
  .events-list__list {
    grid-column: var(--grid-content-smallest);
  }

  .events-list__item + .events-list__item {
    border: none;
    padding-top: 0;
  }
}
</style>
