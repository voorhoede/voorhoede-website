<template>
  <section
    v-if="items.length"
    class="toc-section"
  >
    <nav :aria-label="$t('table_of_content')">
      <ul class="flat-list">
        <li
          class="toc-section__list-item"
          v-for="({titleId, title}) in items"
          :key="titleId"
        >
          <a
            :href="`#${titleId}`"
            class="body"
          >
            {{ title }}
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup>
  defineProps({
    items: {
      type: Array,
      required: true,
    },
  })
</script>

<style>
  .toc-section {
    display: none;
  }

  @media (min-width: 720px) {
    .toc-section {
      display: block;
      position: sticky;
      top: var(--spacing-large);
      margin: var(--spacing-large) 0;
    }

    .toc-section__list-item {
      text-decoration: underline;
      margin-bottom: var(--spacing-small);
    }
  }
</style>
