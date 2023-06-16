<template>
  <section v-once>
    <h2 class="h2 open-source-projects__title">
      {{ title }}
    </h2>
    <ul class="open-source-projects__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="open-source-projects__item"
      >
        <h3 class="h3 open-source-projects__item-title">
          {{ item.title }}
        </h3>
        <p class="open-source-projects__item-description body">
          {{ item.description }}
        </p>
        <app-link
          class="open-source-projects__item-link"
          :to="`https://github.com/${item.repositoryOwner}/${item.repositoryName}`"
          variant="underline"
        >
          {{ item.repositoryOwner }}/{{ item.repositoryName }}
        </app-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  items: Array<{
    id: string;
    title: string;
    repositoryOwner: string;
    repositoryName: string;
    description: string;
  }>;
}>();
</script>

<style>
.open-source-projects__title {
  margin-bottom: var(--spacing-small);
}

.open-source-projects__list {
  display: grid;
  gap: var(--spacing-large);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 64ch), 1fr));
}

.open-source-projects__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  background: var(--bg-pastel);
  padding: var(--spacing-small);
}

.open-source-projects__item-title {
  margin-bottom: var(--spacing-tiny);
}

.open-source-projects__item-description {
  margin-bottom: var(--spacing-small);
  height: 100%;
  min-height: 3.7rem;
}

.open-source-projects__item-link::before {
  content: '';
  position: absolute;
  inset: 0;
}
</style>
