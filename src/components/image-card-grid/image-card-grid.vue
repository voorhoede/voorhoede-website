<template>
  <section
    class="image-card-grid"
    :class="{
      'image-card-grid--horizontal': cardOrientation === 'horizontal',
      'image-card-grid--pastel-background': backgroundColor === BackgroundColor.PastelYellow,
    }"
  >
    <h2 class="image-card-grid__title h2">
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
          :width="card.image.width"
          :height="card.image.height"
          :sizes="imageSizes"
          loading="eager"
        />
        <div class="image-card-grid__card-content">
          <h3 class="h3">
            {{ card.title }}
          </h3>

          <structured-text-block
            class="image-card-grid__body"
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
            :to="getDatoNuxtRoute(card.links[0].link)"
            secondary
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { BackgroundColor } from '../../types/index.d'

const { getDatoNuxtRoute } = useDatoNuxtRoute()

type Props = {
  title: string
  items: {
    id: string
    title: string
    body: object
    image: {
      url: string
      width: number
      height: number
    }
    links: (
      | {
          __typename: 'ExternalLinkRecord'
          title: string
          url: string
        }
      | {
          __typename: 'InternalLinkRecord'
          title: string
          link: {
            __typename: string
            slug: string
          }
        }
    )[]
  }[]
  backgroundColor: BackgroundColor,
  cardOrientation: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: BackgroundColor.None,
  cardOrientation: 'vertical',
})

const imageSizes = computed(() => {
  return props.cardOrientation === 'horizontal' ? '(min-width: 1100px) 225px, 170px' : '170px'
})
</script>

<style>
  :root {
    --image-offset: 150px;
  }

  .image-card-grid__title {
    margin-bottom: var(--spacing-medium);
    text-align: center;
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
    flex-basis: 20rem;
    padding: var(--spacing-medium);
    background: var(--bg-pastel);
    margin-top: var(--image-offset);
  }

  .image-card-grid--pastel-background .image-card-grid__card {
    background-color: var(--white);
  }

  .image-card-grid__image {
    margin-top: calc(-1 * var(--image-offset));
    align-self: center;
    width: 170px;
    height: 170px;
  }

  .image-card-grid__card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--spacing-small);
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

  @media (min-width: 720px) {
    .image-card-grid--horizontal .image-card-grid__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1100px) {
    .image-card-grid--horizontal .image-card-grid__list {
      column-gap: var(--spacing-small);
    }

    .image-card-grid--horizontal .image-card-grid__card {
      margin-top: 0;
      margin-left: 25%;
      padding-left: 0;
      flex-direction: row;
    }

    .image-card-grid--horizontal .image-card-grid__image {
      margin-top: 0;
      margin-left: -20%;
      margin-right: var(--spacing-small);
      width: 40%;
      height: auto;
      flex-shrink: 0;
    }

    .image-card-grid__card-content {
      width: 40%;
      gap: var(--spacing-large);
    }
  }

  @media (min-width: 1440px) {
    .image-card-grid--horizontal .image-card-grid__image {
      margin-left: -25%;
      margin-right: var(--spacing-large);
      width: 50%;
    }
    .image-card-grid__card-content {
      width: 25%;
    }

  }
</style>
