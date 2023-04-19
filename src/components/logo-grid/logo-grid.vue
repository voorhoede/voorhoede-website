<template>
  <section
    class="logo-grid grid"
    v-once
  >
    <h2 class="logo-grid__title h3">
      {{ title }}
    </h2>
    <ul class="logo-grid__list">
      <li
        class="logo-grid__item"
        v-for="(logo, index) in logos"
        :key="index"
      >
        <dato-image
          class="logo-grid__image"
          :src="logo.url"
          :alt="logo.alt"
          :width="280"
          :height="80"
          loading="lazy"
        />
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      logos: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style>
  .logo-grid {
    background: var(--fog);
    grid-column-end: var(--grid-page-end);
    grid-column-start: var(--grid-page-start);
    padding: clamp(var(--spacing-larger), 14%, var(--spacing-big)) 0;
  }

  .logo-grid__title {
    margin-bottom: var(--spacing-larger);
    text-align: center;
  }

  .logo-grid__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    align-items: center;
  }

  .logo-grid__item {
    flex-grow: 1;
  }

  .logo-grid__image {
    object-fit: contain;
    margin: 0 auto;
  }

  @media (min-width: 1100px) {
    .logo-grid__title {
      margin-bottom: var(--spacing-big);
    }
  }
</style>
