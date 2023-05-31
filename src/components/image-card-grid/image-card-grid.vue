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
        :class="{
          'image-card-grid__card--has-link': card.link?.url || card.link?.page,
        }"
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

        <app-button
          v-if="card.links[0]?.__typename === 'ExternalLinkRecord'"
          class="image-card-grid__link"
          :label="card.links[0].title"
          :to="card.links[0].url"
          external
          secondary
        />
        <app-button
          v-if="card.links[0]?.__typename === 'InternalLinkRecord'"
          class="image-card-grid__link"
          :label="card.links[0].title"
          :to="$localeUrl({
            name: 'slug', params: { slug: card.links[0].link.slug.split('/') }
          })"
          secondary
        />
      </li>
    </ul>
  </section>
</template>

<script>
import { createHref } from '../../lib/links'

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
  methods: {
    createHref
  }
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 20rem;
    gap: var(--spacing-small);
    padding: var(--spacing-medium);
    background: var(--white);
    margin-top: var(--image-offset);
    transition: box-shadow var(--app-button-duration);
  }

  .image-card-grid__image {
    margin-top: calc(-1 * var(--image-offset));
  }

  .image-card-grid__link {
    margin-top: auto;
    align-self: flex-start;
  }

  .image-card-grid__link::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
