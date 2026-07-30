<template>
  <section class="locations-list grid block">
    <h2 v-if="data.title" class="locations-list__title h2">
      {{ data.title }}
    </h2>
    <ul class="locations-list__grid">
      <li
        v-for="location in data.items"
        :key="location.id"
        class="locations-list__item"
      >
        <LinkCard
          v-if="location.image"
          :image="location.image"
          :title="location.title"
          :body="`${location.address} - ${location.postalCode} ${location.city}`"
          :external-link="location.googleMaps ?? undefined"
          sizes="(min-width: 1200px) 600px, (min-width: 720px) 50vw, 100vw"
          class="locations-list__card"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { LocationsListBlockFragment } from "./LocationsListBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof LocationsListBlockFragment>;
}>();

const data = readFragment<typeof LocationsListBlockFragment>(props.data);
</script>

<style scoped>
.locations-list {
  grid-column: var(--grid-page);
}

.locations-list__title {
  margin-bottom: var(--spacing-larger);
  text-align: center;
}

.locations-list__grid {
  display: grid;
  margin-bottom: var(--spacing-large);
}

.locations-list__item {
  margin-bottom: var(--spacing-large);
}

.locations-list__card,
:deep(.link-card) {
  height: 100%;
}

@media screen and (min-width: 720px) {
  .locations-list__grid {
    justify-self: center;
    grid-template-columns: repeat(2, 1fr);
    row-gap: var(--spacing-large);
    column-gap: var(--spacing-large);
  }

  .locations-list__item {
    margin-bottom: 0;
  }
}
</style>
