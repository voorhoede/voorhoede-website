<template>
  <section class="logo-grid grid" v-once>
    <h2 class="logo-grid__title h3">
      {{ data.title }}
    </h2>
    <ul class="logo-grid__list">
      <li
        class="logo-grid__item"
        v-for="(logo, index) in data.logos"
        :key="index"
      >
        <a
          v-if="logo.customData?.pageUrl"
          :href="logo.customData?.pageUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DatoImage
            class="logo-grid__image"
            :src="logo.url"
            :alt="logo.alt || ''"
            :width="280"
            :height="80"
            loading="lazy"
          />
        </a>
        <DatoImage
          v-else
          class="logo-grid__image"
          :src="logo.url"
          :alt="logo.alt || ''"
          :width="280"
          :height="80"
          loading="lazy"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { type LogoGridFragment } from "./LogoGrid.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof LogoGridFragment>;
}>();

const data = readFragment<typeof LogoGridFragment>(props.data);
</script>

<style scoped>
.logo-grid {
  --logo-grid-columns: 2;

  grid-column-end: var(--grid-page-end);
  grid-column-start: var(--grid-page-start);
  margin-top: 1rem;
}

.logo-grid__title {
  margin-bottom: var(--spacing-larger);
  text-align: center;
}

.logo-grid__list {
  display: grid;
  grid-template-columns: repeat(var(--logo-grid-columns), minmax(0, 1fr));
  row-gap: var(--spacing-medium);
  column-gap: var(--spacing-tiny);
}

.logo-grid__item {
  width: auto;
}

.logo-grid__image {
  object-fit: contain;
}

@media (min-width: 600px) {
  .logo-grid {
    --logo-grid-columns: 4;
  }
}

@media (min-width: 1100px) {
  .logo-grid__title {
    margin-bottom: var(--spacing-big);
  }
}
</style>
