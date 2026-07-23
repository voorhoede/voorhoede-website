<template>
  <section class="logo-grid grid" v-once>
    <h2 class="logo-grid__title h3">
      {{ data.title }}
    </h2>
    <ul class="logo-grid__list">
      <li
        class="logo-grid__item"
        v-for="logo in logos"
        :key="logo.id"
      >
        <a
          v-if="logo.href"
          :href="logo.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DatoImage
            v-if="logo.image"
            class="logo-grid__image"
            :src="logo.image.url"
            :alt="logo.image.alt || logo.title || ''"
            :width="280"
            :height="80"
            loading="lazy"
          />
        </a>
        <AppLink
          v-else-if="logo.to"
          :to="logo.to"
        >
          <DatoImage
            v-if="logo.image"
            class="logo-grid__image"
            :src="logo.image.url"
            :alt="logo.image.alt || logo.title || ''"
            :width="280"
            :height="80"
            loading="lazy"
          />
        </AppLink>
        <DatoImage
          v-else-if="logo.image"
          class="logo-grid__image"
          :src="logo.image.url"
          :alt="logo.image.alt || logo.title || ''"
          :width="280"
          :height="80"
          loading="lazy"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { LogoGridBlockFragment } from "./LogoGridBlock.query";
import { type FragmentOf, readFragment } from "~/utils/graphql";

const props = defineProps<{
  data: FragmentOf<typeof LogoGridBlockFragment>;
}>();

const data = readFragment<typeof LogoGridBlockFragment>(props.data);

const logos = computed(() =>
  (data.logos ?? []).map((logo) => {
    if (logo.__typename === "MenuItemExternalRecord") {
      return {
        id: logo.id,
        title: logo.externalTitle,
        image: logo.image,
        href: logo.externalUrl,
        to: null,
      };
    }
    return {
      id: logo.id,
      title: logo.internalTitle,
      image: logo.image,
      href: null,
      to: logo.internalLink ? useDatoNuxtRoute(logo.internalLink) : null,
    };
  }),
);
</script>

<style>
.logo-grid {
  margin-bottom: var(--spacing-larger);
}

.logo-grid__title {
  text-align: center;
  margin-bottom: var(--spacing-large);
}

.logo-grid__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-large);
}

.logo-grid__item {
  flex: 0 1 140px;
}

.logo-grid__image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
