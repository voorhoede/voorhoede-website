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
    --logo-grid-columns: 4;

    grid-column-end: var(--grid-page-end);
    grid-column-start: var(--grid-page-start);
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

  @media (max-width: 600px) {
    .logo-grid {
      --logo-grid-columns: 2;
    }
  }

  @media (min-width: 1100px) {
    .logo-grid__title {
      margin-bottom: var(--spacing-big);
    }
  }
</style>
