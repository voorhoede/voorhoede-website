<template>
  <section v-if="items.length" class="toc-section">
    <h2 class="body-big font-html-blue">{{ $t('table_of_content') }}</h2>
    <nav>
      <ul class="flat-list">
        <li
          class="toc-section__list-item"
          v-for="({slug, title}) in items" :key="slug">
          <a :href="`#${slug}`" class="body">
            {{ title }}
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  }
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
