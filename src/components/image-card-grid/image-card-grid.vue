<template>
  <section>
    <h2 class="image-card-grid__title h3">
      {{ title }}
    </h2>
    <ul class="image-card-grid__list">
      <li
        v-for="card in items"
        :key="card.id"
        class="image-card-grid__card"
      >
        <dato-image
          class="image-card-grid__image"
          :src="card.image.url"
          alt=""
          :width="170"
          :height="170"
          loading="eager"
        />
        <h3 class="h4">
          {{ card.title }}
        </h3>

        <structured-text-block
          :content="card.body"
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
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
  }
</script>

<style>
  :root {
    --image-offset: 150px;
  }

  .image-card-grid__title {
    text-align: center;
    margin-bottom: var(--spacing-medium);
  }

  .image-card-grid__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-large);
  }

  .image-card-grid__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 20rem;
    gap: var(--spacing-small);
    padding: var(--spacing-medium);
    background: var(--white);
    margin-top: var(--image-offset);
  }

  .image-card-grid__image {
    margin-top: calc(-1 * var(--image-offset));
  }
</style>
